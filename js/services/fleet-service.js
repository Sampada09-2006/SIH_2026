/**
 * DRISHTI - Logistics Fleet Telemetry & Simulation Service
 * Ports and enhances simulated-GPS movement (3-second tick interval, speed/heading deltas, waypoint progression).
 * Explicitly watermarked as SIMULATED GPS — DEMO MODE per Data Honesty rules.
 */

import { store } from "../state/store.js";

export class FleetService {
  static intervalId = null;
  static isSimulationRunning = false;

  /**
   * Start the 3-second live vehicle position update loop
   */
  static startSimulation() {
    if (this.isSimulationRunning) return;
    this.isSimulationRunning = true;

    this.intervalId = setInterval(() => {
      this.tick();
    }, 3000);
  }

  /**
   * Stop position updates
   */
  static stopSimulation() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isSimulationRunning = false;
  }

  /**
   * Update vehicle coordinates along waypoints based on speed and heading
   */
  static tick() {
    const state = store.getState();
    const updatedFleet = state.fleet.map(vehicle => {
      // If vehicle is HALTED or DELIVERED, do not increment movement
      if (vehicle.status === "HALTED" || vehicle.status === "DELIVERED") {
        return vehicle;
      }

      const waypoints = vehicle.waypoints || [];
      if (waypoints.length < 2) return vehicle;

      let currentIndex = vehicle.currentWaypointIndex || 0;
      let currentCoords = [...vehicle.coordinates];
      const targetWaypoint = waypoints[currentIndex + 1] || waypoints[waypoints.length - 1];

      // Calculate direction towards target waypoint
      const latDelta = targetWaypoint[0] - currentCoords[0];
      const lngDelta = targetWaypoint[1] - currentCoords[1];
      const distToTarget = Math.sqrt(latDelta * latDelta + lngDelta * lngDelta);

      // Speed-scaled step (approx. ~0.002 to 0.005 degrees per 3s tick)
      const stepSize = Math.max(0.001, (vehicle.speedKmph || 30) * 0.00008);

      if (distToTarget < stepSize * 1.5) {
        // Reached waypoint, advance to next
        if (currentIndex + 2 < waypoints.length) {
          currentIndex += 1;
          currentCoords = [waypoints[currentIndex][0], waypoints[currentIndex][1]];
        } else {
          // Reached destination
          return {
            ...vehicle,
            status: "DELIVERED",
            statusLabel: "Delivered at Destination",
            speedKmph: 0,
            etaFormatted: "Arrived",
            lastGpsUpdateMinutesAgo: 0
          };
        }
      } else {
        // Step forward along vector
        const ratio = stepSize / distToTarget;
        currentCoords[0] += latDelta * ratio;
        currentCoords[1] += lngDelta * ratio;
      }

      // Calculate heading in degrees (0 = North, 90 = East, etc.)
      const headingDeg = Math.round((Math.atan2(lngDelta, latDelta) * 180 / Math.PI + 360) % 360);

      // Simulate slight engine telemetry fluctuations
      const engineTemp = vehicle.telemetry ? `${84 + Math.floor(Math.random() * 6)}°C` : "88°C";

      return {
        ...vehicle,
        coordinates: [Number(currentCoords[0].toFixed(5)), Number(currentCoords[1].toFixed(5))],
        headingDeg,
        currentWaypointIndex: currentIndex,
        lastGpsUpdateMinutesAgo: 0,
        telemetry: {
          ...vehicle.telemetry,
          engineTemp
        }
      };
    });

    store.dispatch("UPDATE_FLEET", updatedFleet);
  }

  /**
   * Execute reroute action on a specific vehicle
   */
  static rerouteVehicle(vehicleId, alternateCorridorName, alternateWaypoints = null) {
    const state = store.getState();
    const updatedFleet = state.fleet.map(v => {
      if (v.id === vehicleId) {
        const newWaypoints = alternateWaypoints || [
          v.coordinates,
          [v.coordinates[0] + 0.08, v.coordinates[1] - 0.05],
          [v.coordinates[0] + 0.15, v.coordinates[1] + 0.08],
          v.waypoints[v.waypoints.length - 1]
        ];

        return {
          ...v,
          status: "REROUTED",
          statusLabel: `Diverted via ${alternateCorridorName}`,
          currentCorridor: alternateCorridorName,
          currentRisk: "LOW",
          rerouteAdvised: false,
          delayMinutes: Math.max(0, (v.delayMinutes || 0) - 45),
          waypoints: newWaypoints,
          currentWaypointIndex: 0
        };
      }
      return v;
    });

    store.dispatch("UPDATE_FLEET", updatedFleet);
    store.addAuditLog("FLEET_REROUTE_DISPATCHED", `Vehicle ${vehicleId} successfully rerouted via ${alternateCorridorName}.`);
  }

  /**
   * Set vehicle status to HALTED / AT RISK
   */
  static markVehicleAtRisk(vehicleId, riskLevel = "RED", reason = "Blocked Corridor Ahead") {
    const state = store.getState();
    const updatedFleet = state.fleet.map(v => {
      if (v.id === vehicleId) {
        return {
          ...v,
          status: "AT_RISK",
          statusLabel: `Halted: ${reason}`,
          currentRisk: riskLevel,
          speedKmph: 0,
          rerouteAdvised: true
        };
      }
      return v;
    });

    store.dispatch("UPDATE_FLEET", updatedFleet);
    store.addAuditLog("VEHICLE_MARKED_AT_RISK", `Vehicle ${vehicleId} marked AT RISK due to ${reason}.`);
  }
}

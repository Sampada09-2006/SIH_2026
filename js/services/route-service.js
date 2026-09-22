/**
 * DRISHTI - Smart Route Planning & Essential Supply Logistics Service
 * Evaluates origin-destination routes, calculates ETA/delays, and prioritizes critical freight.
 */

import { RiskEngine } from "./risk-engine.js";

export class RouteService {
  /**
   * Plan and compare alternative routes between NER hubs
   * @param {Object} params
   * @param {string} params.origin - Origin city/hub
   * @param {string} params.destination - Destination hub
   * @param {string} params.cargoCategory - 'Medicines' | 'Food' | 'Agriculture' | 'Construction'
   * @param {string} params.priority - 'CRITICAL' | 'HIGH' | 'NORMAL'
   */
  static planRoute({ origin, destination, cargoCategory = "Medicines", priority = "HIGH" }) {
    // Standard NER Route Pairs Knowledge Base
    const routePairKey = `${origin.toLowerCase()}-${destination.toLowerCase()}`;

    // Default Fallback Route Analysis
    let primaryName = `Primary Corridor (${origin} to ${destination})`;
    let primaryDistKm = 145;
    let primaryBaseTimeMin = 210;
    let primaryCorridorCode = "NH-29";
    let primaryCondition = "OPERATIONAL";
    let primaryRiskScore = 38;
    let primaryDisruptions = [];

    let alternateName = `Alternate Bypass via Regional Link`;
    let alternateDistKm = 185;
    let alternateBaseTimeMin = 270;
    let alternateCorridorCode = "ALT-BYPASS-01";
    let alternateRiskScore = 22;

    if (routePairKey.includes("dimapur") && routePairKey.includes("kohima")) {
      primaryName = "NH-29 Direct Highway (Medziphema - Pagal Pahar)";
      primaryDistKm = 74;
      primaryBaseTimeMin = 135;
      primaryCorridorCode = "NH-29";
      primaryRiskScore = 48;
      primaryDisruptions = ["Pagal Pahar Sinking Zone (KM 42)"];

      alternateName = "Niuland - Ghaspani - Kohima Outer Bypass";
      alternateDistKm = 102;
      alternateBaseTimeMin = 180;
      alternateCorridorCode = "NH-02 Spur";
      alternateRiskScore = 24;
    } else if (routePairKey.includes("siliguri") && routePairKey.includes("gangtok")) {
      primaryName = "NH-10 Teesta River Highway (Sevoke - Rangpo)";
      primaryDistKm = 114;
      primaryBaseTimeMin = 230;
      primaryCorridorCode = "NH-10";
      primaryRiskScore = 68;
      primaryDisruptions = ["29th Mile Road Subsidence"];

      alternateName = "Lava - Algarah - Reshi - Rhenock Mountain Route";
      alternateDistKm = 146;
      alternateBaseTimeMin = 300;
      alternateCorridorCode = "SH-12";
      alternateRiskScore = 32;
    } else if (routePairKey.includes("shillong") && routePairKey.includes("silchar")) {
      primaryName = "NH-06 National Corridor (Jowai - Sonapur Tunnel)";
      primaryDistKm = 215;
      primaryBaseTimeMin = 340;
      primaryCorridorCode = "NH-06";
      primaryRiskScore = 56;
      primaryDisruptions = ["Sonapur Tunnel Mudflow Slurry"];

      alternateName = "Haflong - Umrangso - Silchar Eastern Link";
      alternateDistKm = 278;
      alternateBaseTimeMin = 430;
      alternateCorridorCode = "NH-27 Spur";
      alternateRiskScore = 28;
    } else if (routePairKey.includes("guwahati") && routePairKey.includes("aizawl")) {
      primaryName = "NH-27 / NH-306 Corridor via Meghalaya & Silchar";
      primaryDistKm = 460;
      primaryBaseTimeMin = 720;
      primaryCorridorCode = "NH-306";
      primaryRiskScore = 44;
      primaryDisruptions = ["Kawnpui Incline Single-Lane"];

      alternateName = "Lumding - Haflong - Silchar - Sairang Bypass";
      alternateDistKm = 520;
      alternateBaseTimeMin = 810;
      alternateCorridorCode = "NH-27 Bypass";
      alternateRiskScore = 30;
    }

    // Cargo & Priority Sensitivity
    let priorityMultiplier = 1.0;
    let recommendationReason = "";
    if (priority === "CRITICAL" && cargoCategory === "Medicines") {
      priorityMultiplier = 1.35; // zero-risk tolerance for life-saving cargo
      recommendationReason = "Critical cold-chain medicine cargo: Zero-delay bypass recommended to avoid landslide entrapment.";
    } else if (priority === "HIGH") {
      priorityMultiplier = 1.15;
      recommendationReason = "High-priority essential food supplies: Alternate bypass favored if primary risk exceeds 50.";
    } else {
      recommendationReason = "Standard logistics: Primary route cost-efficient if open.";
    }

    const isPrimaryDisrupted = primaryRiskScore >= 70 || primaryDisruptions.length > 0;
    const recommendedRoute = (isPrimaryDisrupted && priority !== "NORMAL") ? "ALTERNATE" : (primaryRiskScore < 50 ? "PRIMARY" : "ALTERNATE");

    return {
      origin,
      destination,
      cargoCategory,
      priority,
      recommendationReason,
      recommendedRoute,
      routes: [
        {
          id: "ROUTE-PRIMARY",
          type: "PRIMARY",
          name: primaryName,
          corridorCode: primaryCorridorCode,
          distanceKm: primaryDistKm,
          baseTimeMin: primaryBaseTimeMin,
          estimatedDelayMin: isPrimaryDisrupted ? 120 : 15,
          totalEtaFormatted: `${Math.floor((primaryBaseTimeMin + (isPrimaryDisrupted ? 120 : 15)) / 60)}h ${(primaryBaseTimeMin + (isPrimaryDisrupted ? 120 : 15)) % 60}m`,
          riskScore: primaryRiskScore,
          riskBand: primaryRiskScore >= 70 ? "CRITICAL" : (primaryRiskScore >= 45 ? "HIGH" : "MODERATE"),
          disruptions: primaryDisruptions,
          isBlocked: isPrimaryDisrupted,
          dataFreshness: "Fresh (< 10m)"
        },
        {
          id: "ROUTE-ALTERNATE",
          type: "ALTERNATE",
          name: alternateName,
          corridorCode: alternateCorridorCode,
          distanceKm: alternateDistKm,
          baseTimeMin: alternateBaseTimeMin,
          estimatedDelayMin: 20,
          totalEtaFormatted: `${Math.floor((alternateBaseTimeMin + 20) / 60)}h ${(alternateBaseTimeMin + 20) % 60}m`,
          riskScore: alternateRiskScore,
          riskBand: alternateRiskScore >= 50 ? "MODERATE" : "LOW",
          disruptions: [],
          isBlocked: false,
          dataFreshness: "Fresh (< 15m)"
        }
      ],
      provenance: "ROUTE INTELLIGENCE ENGINE — SIMULATED DEMO SCENARIO"
    };
  }
}

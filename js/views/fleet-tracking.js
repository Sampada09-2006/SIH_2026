/**
 * DRISHTI - Fleet Tracking & Logistics Telemetry View
 * Monitors multi-vehicle freight convoys with live simulated GPS telemetry.
 */

import { store } from "../state/store.js";
import { renderIcon } from "../icons.js";

export class FleetTrackingView {
  static render() {
    const state = store.getState();
    const fleet = state.fleet;

    return `
      <div class="view-header">
        <div class="view-title-group">
          <h2>Essential Logistics Fleet Tracking</h2>
          <p>Continuous telemetry, cargo cold-chain monitoring, and risk exposure for freight convoys.</p>
        </div>
        <div class="view-actions-group">
          <span class="data-provenance-tag provenance-simulated">SIMULATED GPS — DEMO MODE</span>
          <button class="btn btn-primary btn-sm" onclick="window.drishtiApp.navigate('regionalMap')">
            ${renderIcon("map", { size: 14 })} Track on GIS Map
          </button>
        </div>
      </div>

      <!-- Vehicle Cards Grid -->
      <div class="grid grid-2 gap-6">
        ${fleet.map(v => {
          let badgeStatusClass = "badge-green";
          if (v.status === "AT_RISK" || v.status === "DELAYED") badgeStatusClass = "badge-red";
          if (v.status === "REROUTED") badgeStatusClass = "badge-gold";

          return `
            <div class="drishti-card" style="border-left: 4px solid ${v.status === 'AT_RISK' ? 'var(--status-red-badge)' : 'var(--accent-gold)'};">
              <div class="drishti-card-header">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="badge ${v.priority === 'CRITICAL' ? 'badge-red' : 'badge-gold'} font-bold">${v.priority}</span>
                    <span class="badge ${badgeStatusClass}">${v.statusLabel}</span>
                  </div>
                  <h3 style="font-size: var(--text-md); margin-top: 6px;">
                    ${v.id} <span class="text-muted font-mono" style="font-size: var(--text-xs);">(${v.plate})</span>
                  </h3>
                  <div class="text-muted" style="font-size: var(--text-xs);">${v.cargoCategory}</div>
                </div>
                <div style="text-align: right;">
                  <div class="font-mono font-bold" style="font-size: var(--text-lg);">${v.etaFormatted}</div>
                  <div class="text-muted" style="font-size: 0.6875rem;">Est. Arrival</div>
                </div>
              </div>

              <!-- Route & Consignment Info -->
              <div style="background: var(--bg-surface-alt); padding: 10px 12px; border-radius: var(--radius-md); margin-bottom: var(--space-4); font-size: var(--text-xs);">
                <div class="font-bold flex items-center gap-1" style="color: var(--text-primary); margin-bottom: 2px;">
                  ${renderIcon("navigation", { size: 12, color: "var(--accent-gold)" })} ${v.origin} &rarr; ${v.destination}
                </div>
                <div class="text-secondary">
                  Corridor: <strong>${v.currentCorridor}</strong>
                </div>
                <div class="text-muted" style="margin-top: 4px;">
                  ${v.cargoDetail}
                </div>
              </div>

              <!-- Driver & Vehicle Telemetry -->
              <div class="grid grid-2 gap-2 font-mono" style="font-size: var(--text-xs); color: var(--text-secondary); margin-bottom: var(--space-4); border-top: 1px solid var(--border-subtle); padding-top: 8px;">
                <div>Driver: <strong class="text-charcoal">${v.driverName}</strong></div>
                <div>Phone: <a href="tel:${v.phone.replace(/[^0-9+]/g, '')}" class="text-gold">${v.phone}</a></div>
                <div>Speed: <strong class="text-charcoal">${v.speedKmph} km/h</strong></div>
                <div>Heading: <strong class="text-charcoal">${v.headingDeg || 0}°</strong></div>
                <div>Engine Temp: <strong class="text-charcoal">${v.telemetry ? v.telemetry.engineTemp : '88°C'}</strong></div>
                <div>Cabin Temp: <strong class="text-charcoal">${v.telemetry ? v.telemetry.cabinTemp : 'Optimal'}</strong></div>
              </div>

              ${v.suggestedAlternate ? `
                <div class="drishti-banner banner-gold" style="padding: 6px 10px; font-size: var(--text-xs); margin-bottom: var(--space-3);">
                  ${renderIcon("shield-alert", { size: 14 })} Bypass Available: <strong>${v.suggestedAlternate}</strong>
                </div>
              ` : ''}

              <div class="flex gap-2">
                <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="window.drishtiApp.inspectVehicle('${v.id}')">
                  ${renderIcon("map-pin", { size: 14 })} Locate on Map
                </button>
                <button class="btn btn-secondary btn-sm" onclick="window.drishtiApp.triggerRerouteModal('${v.id}')">
                  ${renderIcon("route", { size: 14 })} Reroute
                </button>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }
}

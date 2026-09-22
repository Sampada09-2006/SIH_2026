/**
 * DRISHTI - Command Center Overview View
 * Provides high-level operational situational awareness across NER corridors.
 */

import { store } from "../state/store.js";
import { renderIcon } from "../icons.js";

export class OverviewView {
  static render() {
    const state = store.getState();
    const activeCorridorsCount = state.corridors.length;
    const criticalFleets = state.fleet.filter(f => f.priority === "CRITICAL").length;
    const pendingReportsCount = state.pendingReports.length;
    const activeAlertsCount = state.alerts.length;

    return `
      <div class="view-header">
        <div class="view-title-group">
          <h2>Command Overview</h2>
          <p>Real-time situational intelligence and logistics monitoring across North Eastern Region corridors.</p>
        </div>
        <div class="view-actions-group">
          <button class="btn btn-outline-gold btn-sm" onclick="window.drishtiApp.navigate('regionalMap')">
            ${renderIcon("map", { size: 14 })} Regional GIS Map
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.drishtiApp.navigate('controlRoom')">
            ${renderIcon("radio", { size: 14 })} Control Room Triage
          </button>
        </div>
      </div>

      <!-- Key Metrics Row -->
      <div class="metrics-row">
        <div class="stat-card">
          <div class="stat-label">Strategic Corridors <span>${renderIcon("route", { size: 16, color: "var(--accent-gold)" })}</span></div>
          <div class="stat-value">${activeCorridorsCount}</div>
          <div class="stat-subtext">Across 8 NER States</div>
        </div>

        <div class="stat-card">
          <div class="stat-label">Critical Convoys <span>${renderIcon("truck", { size: 16, color: "var(--accent-gold)" })}</span></div>
          <div class="stat-value">${criticalFleets}</div>
          <div class="stat-subtext">Medicines & Life-Safety Cargo</div>
        </div>

        <div class="stat-card">
          <div class="stat-label">Active Alerts <span>${renderIcon("alert-triangle", { size: 16, color: "var(--status-amber-badge)" })}</span></div>
          <div class="stat-value">${activeAlertsCount}</div>
          <div class="stat-subtext">Weather & Structural Advisory</div>
        </div>

        <div class="stat-card" style="border-left: 4px solid var(--accent-gold);">
          <div class="stat-label">Pending Verification <span>${renderIcon("clock", { size: 16, color: "var(--accent-gold)" })}</span></div>
          <div class="stat-value">${pendingReportsCount}</div>
          <div class="stat-subtext">Field Reports Awaiting Triage</div>
        </div>
      </div>

      <!-- Quick Actions Banner -->
      <div class="drishti-banner banner-gold">
        <div>${renderIcon("info", { size: 20 })}</div>
        <div style="flex: 1;">
          <strong>Operational Guideline:</strong> Data integrity is enforced. Unverified field reports must be triaged in the Control Room before triggering automated route recalculation.
        </div>
        <button class="btn btn-secondary btn-sm" onclick="window.drishtiApp.navigate('controlRoom')">
          Open Verification Queue
        </button>
      </div>

      <!-- Strategic Highway Network Status -->
      <div class="drishti-card" style="margin-bottom: var(--space-6);">
        <div class="drishti-card-header">
          <div>
            <div class="drishti-card-title">${renderIcon("route", { size: 18, color: "var(--accent-gold)" })} Strategic Highway Status</div>
            <div class="drishti-card-subtitle">Continuous risk assessment and verification freshness</div>
          </div>
          <span class="data-provenance-tag provenance-verified">Verified Infrastructure Dataset</span>
        </div>

        <div class="table-container">
          <table class="drishti-table">
            <thead>
              <tr>
                <th>Corridor</th>
                <th>Highway Name</th>
                <th>State / District</th>
                <th>Status</th>
                <th>Explainable Risk</th>
                <th>Freshness</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${state.corridors.map(c => {
                let badgeClass = "badge-green";
                if (c.status === "CAUTION") badgeClass = "badge-amber";
                if (c.status === "DISRUPTED" || c.status === "CLOSED") badgeClass = "badge-red";

                return `
                  <tr>
                    <td class="font-mono font-bold">${c.code}</td>
                    <td><strong>${c.name}</strong></td>
                    <td class="text-muted">${c.state}</td>
                    <td><span class="badge ${badgeClass}">${c.status}</span></td>
                    <td>
                      <div class="flex items-center gap-2">
                        <span class="font-bold">${c.riskScore}/100</span>
                        <span class="badge ${c.riskScore >= 60 ? 'badge-red' : (c.riskScore >= 35 ? 'badge-amber' : 'badge-green')}">${c.riskBand}</span>
                      </div>
                    </td>
                    <td class="text-muted font-mono" style="font-size: var(--text-xs);">${c.dataFreshness || 'Fresh'}</td>
                    <td>
                      <button class="btn btn-secondary btn-sm" onclick="window.drishtiApp.inspectCorridor('${c.code}')">
                        Inspect
                      </button>
                    </td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Grid of Active Convoys and Recent Alerts -->
      <div class="grid grid-2 gap-6">
        <!-- Active Essential Freight Convoys -->
        <div class="drishti-card">
          <div class="drishti-card-header">
            <div>
              <div class="drishti-card-title">${renderIcon("truck", { size: 18, color: "var(--accent-gold)" })} Monitored Convoys</div>
              <div class="drishti-card-subtitle">Live simulated GPS telemetry</div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="window.drishtiApp.navigate('fleetTracking')">View All</button>
          </div>
          <div>
            ${state.fleet.slice(0, 3).map(v => `
              <div style="padding: 12px; border-bottom: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-mono font-bold">${v.id}</span>
                    <span class="badge ${v.priority === 'CRITICAL' ? 'badge-red' : 'badge-gold'}">${v.priority}</span>
                  </div>
                  <div class="text-muted" style="font-size: var(--text-xs); margin-top: 2px;">
                    ${v.cargoCategory} • ${v.origin} &rarr; ${v.destination}
                  </div>
                </div>
                <div style="text-align: right;">
                  <div class="font-bold" style="font-size: var(--text-sm);">${v.speedKmph} km/h</div>
                  <div class="text-muted font-mono" style="font-size: 0.6875rem;">ETA: ${v.etaFormatted}</div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Recent Disruption & Hazard Alerts -->
        <div class="drishti-card">
          <div class="drishti-card-header">
            <div>
              <div class="drishti-card-title">${renderIcon("alert-triangle", { size: 18, color: "var(--status-amber-badge)" })} Active Disruption Advisories</div>
              <div class="drishti-card-subtitle">Automated corridor risk notifications</div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="window.drishtiApp.navigate('alerts')">View All</button>
          </div>
          <div>
            ${state.alerts.slice(0, 3).map(a => `
              <div style="padding: 12px; border-bottom: 1px solid var(--border-subtle);">
                <div class="flex items-center justify-between">
                  <span class="font-bold" style="font-size: var(--text-sm);">${a.title}</span>
                  <span class="badge ${a.severity === 'CRITICAL' ? 'badge-red' : 'badge-amber'}">${a.severity}</span>
                </div>
                <div class="text-secondary" style="font-size: var(--text-xs); margin-top: 4px;">
                  ${a.impact}
                </div>
                <div class="text-muted font-mono" style="font-size: 0.6875rem; margin-top: 4px;">
                  ${a.state} • ${a.corridor} • ${a.timestamp}
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  }
}

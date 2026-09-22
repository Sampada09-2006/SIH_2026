/**
 * DRISHTI - Control Room Operator Triage Console
 * Central operational hub to review pending reports, verify incidents, mark disruptions, and reroute convoys.
 */

import { store } from "../state/store.js";
import { renderIcon } from "../icons.js";

export class ControlRoomView {
  static render() {
    const state = store.getState();
    const pendingReports = state.pendingReports;
    const atRiskVehicles = state.fleet.filter(v => v.status === "AT_RISK" || v.status === "DELAYED");

    return `
      <div class="view-header">
        <div class="view-title-group">
          <h2>Control Room Operator Console</h2>
          <p>Triage pending field reports, authorize highway status changes, and dispatch rerouting orders.</p>
        </div>
        <div class="view-actions-group">
          <span class="role-pill">Active Role: ${state.currentRole}</span>
          <span class="data-provenance-tag provenance-verified">Operator Authorized</span>
        </div>
      </div>

      <div class="control-room-layout">
        <!-- Main Triage Queue Column -->
        <div>
          <div class="drishti-card-title" style="margin-bottom: var(--space-4);">
            ${renderIcon("shield-alert", { size: 18, color: "var(--accent-gold)" })} Pending Verification Queue (${pendingReports.length})
          </div>

          ${pendingReports.length === 0 ? `
            <div class="drishti-card" style="text-align: center; padding: var(--space-8); color: var(--text-muted);">
              ${renderIcon("check-circle", { size: 36, color: "var(--status-green-badge)" })}
              <div style="font-size: var(--text-md); font-weight: 700; color: var(--text-primary); margin-top: var(--space-2);">
                Queue Clean
              </div>
              <p style="font-size: var(--text-xs); margin-top: 4px;">
                No unverified field submissions pending operator triage.
              </p>
            </div>
          ` : `
            <div>
              ${pendingReports.map(r => `
                <div class="triage-queue-item ${r.severity === 'CRITICAL' ? 'critical' : ''}">
                  <div class="flex items-start justify-between" style="margin-bottom: var(--space-2);">
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="badge ${r.severity === 'CRITICAL' ? 'badge-red' : 'badge-amber'} font-bold">${r.severity}</span>
                        <span class="badge badge-neutral">${r.incidentType}</span>
                        <span class="font-mono text-muted" style="font-size: 0.6875rem;">${r.id}</span>
                      </div>
                      <h3 style="font-size: var(--text-md); margin-top: 4px;">${r.corridor}: ${r.locationName || r.district}</h3>
                    </div>
                    <div class="text-muted font-mono" style="font-size: var(--text-xs);">${r.timestamp}</div>
                  </div>

                  <p style="font-size: var(--text-xs); color: var(--text-secondary); margin-bottom: var(--space-3); line-height: 1.5;">
                    ${r.description}
                  </p>

                  <!-- Photo Evidence Attachment Preview if available -->
                  ${r.photoUrl ? `
                    <div style="margin-bottom: var(--space-3); border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-default); max-width: 280px;">
                      <img src="${r.photoUrl}" alt="Photo Evidence" style="width: 100%; height: auto; display: block;">
                    </div>
                  ` : ''}

                  <div class="flex items-center justify-between" style="font-size: var(--text-xs); color: var(--text-muted); border-top: 1px dashed var(--border-subtle); padding-top: 8px;">
                    <div>
                      Reporter: <strong>${r.reporterName || r.reporterRole}</strong> (${r.reporterPhone || 'Field Post'})
                    </div>
                    <div class="font-mono">
                      GPS: ${r.coordinates ? r.coordinates.join(", ") : "Manual"}
                    </div>
                  </div>

                  <!-- Operator Action Controls -->
                  <div class="triage-actions">
                    <button class="btn btn-primary btn-sm" onclick="window.drishtiApp.verifyIncident('${r.id}')">
                      ${renderIcon("check", { size: 14 })} Verify & Mark Disrupted
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="window.drishtiApp.rejectIncident('${r.id}')">
                      ${renderIcon("x", { size: 14 })} Reject Report
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="window.drishtiApp.escalateIncident('${r.id}')">
                      ${renderIcon("shield-alert", { size: 14 })} Escalate to SDMA
                    </button>
                  </div>
                </div>
              `).join("")}
            </div>
          `}
        </div>

        <!-- Right Side: Vehicles at Risk & Quick Action Controls -->
        <div>
          <!-- Vehicles at Risk Card -->
          <div class="drishti-card" style="margin-bottom: var(--space-6);">
            <div class="drishti-card-header">
              <div>
                <div class="drishti-card-title">${renderIcon("truck", { size: 18, color: "var(--status-red-badge)" })} Convoys Requiring Action</div>
                <div class="drishti-card-subtitle">En route towards elevated risk corridors</div>
              </div>
            </div>

            ${atRiskVehicles.length === 0 ? `
              <div style="text-align: center; padding: var(--space-4); color: var(--text-muted); font-size: var(--text-xs);">
                No convoys currently halted or at critical risk.
              </div>
            ` : `
              <div>
                ${atRiskVehicles.map(v => `
                  <div style="padding: 10px; border-bottom: 1px solid var(--border-subtle); margin-bottom: 8px;">
                    <div class="flex items-center justify-between">
                      <span class="font-mono font-bold">${v.id}</span>
                      <span class="badge badge-red">${v.status}</span>
                    </div>
                    <div class="text-muted" style="font-size: var(--text-xs); margin: 2px 0;">
                      ${v.cargoCategory} on ${v.currentCorridor}
                    </div>
                    <button class="btn btn-primary btn-sm" style="width: 100%; margin-top: 6px;" onclick="window.drishtiApp.triggerRerouteModal('${v.id}')">
                      Dispatch Alternate Reroute
                    </button>
                  </div>
                `).join("")}
              </div>
            `}
          </div>

          <!-- Direct Operational Override Buttons -->
          <div class="drishti-card">
            <div class="drishti-card-title" style="margin-bottom: var(--space-3);">
              ${renderIcon("radio", { size: 18, color: "var(--accent-gold)" })} Direct Protocol Triggers
            </div>
            <div class="flex flex-col gap-2">
              <button class="btn btn-secondary btn-sm" style="justify-content: flex-start;" onclick="window.drishtiApp.simulateHeavyMonsoonRisk()">
                ${renderIcon("cloud-rain", { size: 14 })} Simulate Heavy Monsoon Surge (NH-29)
              </button>
              <button class="btn btn-secondary btn-sm" style="justify-content: flex-start;" onclick="window.drishtiApp.resolveAllDisruptions()">
                ${renderIcon("check-circle", { size: 14 })} Clear Disruption & Restore Corridor
              </button>
              <button class="btn btn-outline-gold btn-sm" style="justify-content: flex-start;" onclick="window.drishtiApp.navigate('architecture')">
                ${renderIcon("file-text", { size: 14 })} View Immutable Audit Ledger
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}


/**
 * DRISHTI - System Architecture, Provenance & Production Roadmap View
 * Displays pipeline diagram, audit ledger, and production roadmap.
 */

import { store } from "../state/store.js";
import { renderIcon } from "../icons.js";

export class ArchitectureView {
  static render() {
    const state = store.getState();
    const auditLogs = state.auditLogs;

    return `
      <div class="view-header">
        <div class="view-title-group">
          <h2>System Architecture & Provenance</h2>
          <p>
            Technical implementation details, data provider boundaries,
            and verified operational audit trail.
          </p>
        </div>
      </div>

      <!-- End-to-End Pipeline Visualization -->
      <div class="drishti-card" style="margin-bottom: var(--space-6);">
        <div class="drishti-card-header">
          <div>
            <div class="drishti-card-title">
              ${renderIcon("layers", {
                size: 18,
                color: "var(--accent-gold)"
              })}
              Core Data Pipeline Architecture
            </div>

            <div class="drishti-card-subtitle">
              Layered separation between sensory ingest, validation,
              decision logic, and low-connectivity fallbacks
            </div>
          </div>
        </div>

        <div
          style="
            background: var(--bg-surface-alt);
            padding: var(--space-5);
            border-radius: var(--radius-md);
            font-family: var(--font-family-mono);
            font-size: var(--text-xs);
            line-height: 1.6;
            color: var(--text-primary);
            overflow-x: auto;
          "
        >
Field Sensors / Weather Feeds / Field Reports / Logistics Telemetry
                        ↓
            Data Validation & Provenance Layer
                        ↓
          Explainable Multi-Factor Risk Engine (0-100 Score)
                        ↓
          GIS Spatial Network + Route Optimization Layer
                        ↓
          Central Control Room Triage & Operator Authority
                        ↓
          Automated Alerts / Fleet Reroute Dispatch / SOS
                        ↓
          Low-Bandwidth Fallbacks (Offline Sync / SMS / USSD / IVR)
        </div>
      </div>

      <!-- Feature Integrity Matrix -->
      <div
        class="grid grid-2 gap-6"
        style="margin-bottom: var(--space-6);"
      >

        <!-- Implemented Features -->
        <div
          class="drishti-card"
          style="border-top: 4px solid var(--status-green-badge);"
        >
          <div
            class="drishti-card-title"
            style="
              margin-bottom: var(--space-3);
              font-size: var(--text-sm);
            "
          >
            ${renderIcon("check-circle", {
              size: 16,
              color: "var(--status-green-badge)"
            })}
            Core Platform Capabilities
          </div>

          <ul
            style="
              margin-left: 18px;
              font-size: var(--text-xs);
              color: var(--text-secondary);
              line-height: 1.6;
            "
          >
            <li>Zero Blue & Zero Black Design System</li>
            <li>Zero Emojis SVG Icon Engine</li>
            <li>Plain OSM GIS Tiles with Warm Matrix</li>
            <li>8 NER States Highway Database</li>
            <li>Bridge Infrastructure & Weight Modeling</li>
            <li>Explainable Risk Engine with Factor Breakdown</li>
            <li>Essential Supply Route Comparison</li>
            <li>Ported 3s Vehicle Movement Simulation</li>
            <li>Control Room Verification Workflow</li>
            <li>IndexedDB / localStorage Offline Queue</li>
            <li>12 NER Language Localization Architecture</li>
            <li>2G SMS / USSD / IVR Simulators</li>
            <li>Immutable Operational Audit Ledger</li>
          </ul>
        </div>

        <!-- Production Roadmap -->
        <div
          class="drishti-card"
          style="border-top: 4px solid var(--text-muted);"
        >
          <div
            class="drishti-card-title"
            style="
              margin-bottom: var(--space-3);
              font-size: var(--text-sm);
            "
          >
            ${renderIcon("compass", {
              size: 16,
              color: "var(--text-muted)"
            })}
            Production Roadmap
          </div>

          <ul
            style="
              margin-left: 18px;
              font-size: var(--text-xs);
              color: var(--text-secondary);
              line-height: 1.6;
            "
          >
            <li>Live NHAI / NHIDCL FASTag Ingestion</li>
            <li>Direct IMD Radar Doppler API Hookup</li>
            <li>State Police PWD Official Single Sign-On</li>
            <li>High-Precision Satellite InSAR Slope Radar</li>
            <li>Production GSM Cellular Gateway Integration</li>
          </ul>
        </div>
      </div>

      <!-- Live Immutable Audit Ledger -->
      <div class="drishti-card">
        <div class="drishti-card-header">
          <div>
            <div class="drishti-card-title">
              ${renderIcon("file-text", {
                size: 18,
                color: "var(--accent-gold)"
              })}
              Verifiable Operational Audit Trail (${auditLogs.length} Events)
            </div>

            <div class="drishti-card-subtitle">
              Operational ledger recording operator and system actions
            </div>
          </div>

          <span class="data-provenance-tag provenance-verified">
            Cryptographically Tracked
          </span>
        </div>

        <div class="table-container">
          <table class="drishti-table">
            <thead>
              <tr>
                <th>Event ID</th>
                <th>Timestamp</th>
                <th>Actor / Role</th>
                <th>Action Type</th>
                <th>Details</th>
                <th>State</th>
              </tr>
            </thead>

            <tbody>
              ${
                auditLogs.length > 0
                  ? auditLogs
                      .map(
                        (l) => `
                <tr>
                  <td
                    class="font-mono font-bold"
                    style="font-size: var(--text-xs);"
                  >
                    ${l.id}
                  </td>

                  <td
                    class="font-mono text-muted"
                    style="font-size: var(--text-xs);"
                  >
                    ${l.timestamp}
                  </td>

                  <td>
                    <strong>${l.actor}</strong>
                    <span
                      class="text-muted"
                      style="font-size: var(--text-xs);"
                    >
                      (${l.role})
                    </span>
                  </td>

                  <td>
                    <span class="badge badge-neutral font-mono">
                      ${l.action}
                    </span>
                  </td>

                  <td
                    style="
                      font-size: var(--text-xs);
                      color: var(--text-secondary);
                    "
                  >
                    ${l.details}
                  </td>

                  <td>
                    <span class="badge badge-green">
                      ${l.status}
                    </span>
                  </td>
                </tr>
              `
                      )
                      .join("")
                  : `
                <tr>
                  <td
                    colspan="6"
                    style="
                      text-align: center;
                      padding: var(--space-6);
                      color: var(--text-muted);
                    "
                  >
                    No operational events recorded yet.
                  </td>
                </tr>
              `
              }
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}

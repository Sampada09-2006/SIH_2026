/**
 * DRISHTI - Emergency SOS & Authority Dispatch Console View
 * High-priority distress signal broadcaster with safe SMTP degradation and recipient breakdown.
 */

import { store } from "../state/store.js";
import { renderIcon } from "../icons.js";
import { NER_STATES, resolveAuthorityRecipients } from "../data/ner-geography.js";

export class SosView {
  static render() {
    const state = store.getState();
    const lastDispatch = state.lastSosDispatch;

    return `
      <div class="view-header">
        <div class="view-title-group">
          <h2>Emergency SOS Dispatch Console</h2>
          <p>Instant distress broadcasting to State (SDMA) & National (NDMA) Disaster Management Authorities.</p>
        </div>
        <div class="view-actions-group">
          <span class="data-provenance-tag provenance-simulated">SAFE DEMO ENVIRONMENT</span>
        </div>
      </div>

      <div class="sos-console-container">
        <!-- Prominent Status Banner of Last Dispatch if available -->
        ${lastDispatch ? `
          <div class="drishti-banner ${lastDispatch.deliveryMode === 'LIVE_SMTP' ? 'banner-green' : 'banner-gold'}" style="margin-bottom: var(--space-6);">
            <div>${renderIcon(lastDispatch.deliveryMode === 'LIVE_SMTP' ? "shield-check" : "radio", { size: 24 })}</div>
            <div style="flex: 1;">
              <div style="font-weight: 800; font-size: var(--text-md);">
                ${lastDispatch.statusBadge}
              </div>
              <div style="font-size: var(--text-xs); margin-top: 2px;">
                Reference: <strong>${lastDispatch.payload.sosId}</strong> • Timestamp: <strong>${lastDispatch.payload.timestampFormatted}</strong> • 
                Recipient Count: <strong>${(lastDispatch.sentTo || []).length} Authorities</strong>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="window.drishtiApp.toggleEmailPreviewModal()">
              View Dispatched Text
            </button>
          </div>
        ` : ''}

        <!-- Panic Trigger Card -->
        <div class="sos-trigger-card">
          <div style="font-size: var(--text-xs); font-weight: 700; color: var(--status-red-text); text-transform: uppercase; letter-spacing: 0.08em;">
            Life-Safety Quick Action Broadcast
          </div>
          <button id="sos-panic-btn" class="sos-panic-btn" onclick="window.drishtiApp.triggerEmergencySos()">
            ${renderIcon("siren", { size: 36, color: "#FFFFFF" })}
            <span>SOS</span>
          </button>
          <div style="font-size: var(--text-sm); font-weight: 700; color: var(--status-red-text);">
            Press to Transmit Distress Coordinates & Request Quick Rescue Team
          </div>
          <div style="font-size: var(--text-xs); color: var(--text-muted); margin-top: 4px;">
            Safe Demo Mode: Transmits to test recipient inboxes (@ner-demo.gov.in). Never triggers false government alarms.
          </div>
        </div>

        <!-- SOS Incident Configuration Form -->
        <div class="drishti-card" style="margin-bottom: var(--space-6);">
          <div class="drishti-card-title" style="margin-bottom: var(--space-4);">
            ${renderIcon("shield-alert", { size: 18, color: "var(--status-red-badge)" })} Emergency Context & Geolocation
          </div>

          <form id="sos-form" onsubmit="window.drishtiApp.submitCustomSos(event)">
            <div class="grid grid-2 gap-4">
              <div class="form-group">
                <label class="form-label">State Jurisdiction</label>
                <select id="sos-state" class="form-select" onchange="window.drishtiApp.updateSosRecipientList(this.value)">
                  ${NER_STATES.map(s => `<option value="${s.id}">${s.name} (${s.capital})</option>`).join("")}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Calamity / Distress Type</label>
                <select id="sos-type" class="form-select">
                  <option value="Landslide / Road Entrapment">Landslide / Road Entrapment</option>
                  <option value="Flash Flood / Waterlogging">Flash Flood / High Water Entrapment</option>
                  <option value="Medical Emergency on Highway">Critical Medical Convoy Stranded</option>
                  <option value="Severe Road Collapse">Road Collapse / Vehicle Stuck in Valley</option>
                </select>
              </div>
            </div>

            <div class="grid grid-2 gap-4">
              <div class="form-group">
                <label class="form-label">Persons Affected</label>
                <input type="number" id="sos-people" class="form-control font-mono" value="4" min="1" max="500">
              </div>

              <div class="form-group">
                <label class="form-label">GPS Geolocation</label>
                <div class="flex gap-2">
                  <input type="text" id="sos-gps" class="form-control font-mono" value="25.7400, 93.9900" placeholder="Latitude, Longitude">
                  <button type="button" class="btn btn-secondary btn-sm" onclick="window.drishtiApp.captureGpsForSos()">
                    ${renderIcon("navigation", { size: 14 })} GPS
                  </button>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Immediate Situation Description</label>
              <textarea id="sos-desc" class="form-textarea" placeholder="Provide vehicle details, injury status, and terrain obstruction...">Medical transport van blocked by rockfall at NH-29 KM 42. Oxygen and essential cold-chain supplies on board. Immediate road clearance required.</textarea>
            </div>

            <!-- Target Authority Recipient Breakdown -->
            <div class="form-group">
              <label class="form-label">Mapped Authority Recipients (Safe Demo Mode):</label>
              <div id="sos-recipient-list" class="recipient-pill-list">
                ${resolveAuthorityRecipients("assam").map(r => `
                  <div class="recipient-pill font-mono">
                    <strong>${r.name}</strong> &lt;${r.email}&gt;
                  </div>
                `).join("")}
              </div>
            </div>

            <div class="flex gap-3">
              <button type="submit" class="btn btn-danger" style="flex: 1;">
                ${renderIcon("send", { size: 16 })} Dispatch Distress Broadcast
              </button>
              <button type="button" class="btn btn-secondary" onclick="window.drishtiApp.openNativeMailtoSos()">
                ${renderIcon("mail", { size: 16 })} Native Mail Fallback
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}

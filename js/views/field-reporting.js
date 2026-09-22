/**
 * DRISHTI - Field Incident Reporting View
 * Geo-tagged field reports with photo evidence and triage workflow.
 */

import { renderIcon } from "../icons.js";
import { NER_STATES } from "../data/ner-geography.js";

export class FieldReportingView {
  static render() {
    return `
      <div class="view-header">
        <div class="view-title-group">
          <h2>Geo-Tagged Field Incident Reporting</h2>
          <p>Submit verified obstruction, landslide, and flood reports directly to the Central Control Room.</p>
        </div>
        <div class="view-actions-group">
          <span class="badge badge-gold">Workflow: Submit &rarr; Pending Verification &rarr; Control Room Triage</span>
        </div>
      </div>

      <div class="grid grid-2 gap-6" style="max-width: 1000px; margin: 0 auto;">
        <!-- Submission Form Card -->
        <div class="drishti-card">
          <div class="drishti-card-title" style="margin-bottom: var(--space-4);">
            ${renderIcon("camera", { size: 18, color: "var(--accent-gold)" })} Incident Details & Evidence
          </div>

          <form id="field-report-form" onsubmit="window.drishtiApp.submitFieldReport(event)">
            <div class="form-group">
              <label class="form-label">Incident Classification</label>
              <select id="report-type" class="form-select" required>
                <option value="Landslide">Landslide / Debris Flow</option>
                <option value="Flood">River Flooding / Waterlogging</option>
                <option value="Road Damage">Road Subsidence / Sinking Formation</option>
                <option value="Bridge Damage">Bridge Damage / Scouring</option>
                <option value="Traffic Blockage">Heavy Multi-Axle Congestion</option>
                <option value="Fallen Tree">Fallen Tree / Heavy Timber Obstruction</option>
                <option value="Weather Obstruction">Severe Cloudburst / Hailstorm</option>
              </select>
            </div>

            <div class="grid grid-2 gap-3">
              <div class="form-group">
                <label class="form-label">State Jurisdiction</label>
                <select id="report-state" class="form-select" required>
                  ${NER_STATES.map(s => `<option value="${s.name}">${s.name}</option>`).join("")}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Corridor / Highway</label>
                <input type="text" id="report-corridor" class="form-control" placeholder="e.g. NH-29 Pagal Pahar" required value="NH-29">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Severity Level</label>
              <select id="report-severity" class="form-select">
                <option value="CRITICAL">CRITICAL (Complete Blockage of Highway)</option>
                <option value="MODERATE">MODERATE (Single-Lane Restriction)</option>
                <option value="LOW">LOW (Hazard Advisory)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">GPS Geolocation</label>
              <div class="flex gap-2">
                <input type="text" id="report-gps" class="form-control font-mono" placeholder="25.7400, 93.9900" value="25.7400, 93.9900" required>
                <button type="button" class="btn btn-secondary btn-sm" onclick="window.drishtiApp.captureGpsForReport()">
                  ${renderIcon("navigation", { size: 14 })} GPS
                </button>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Situation Description</label>
              <textarea id="report-desc" class="form-textarea" placeholder="Describe the obstruction width, soil stability, and vehicles affected..." required>Landslide with heavy boulder run covering both lanes. Immediate clearance needed.</textarea>
            </div>

            <div class="form-group">
              <label class="form-label">Photo Evidence Upload</label>
              <div style="border: 2px dashed var(--border-default); border-radius: var(--radius-md); padding: var(--space-4); text-align: center; background: var(--bg-surface-alt);">
                <div style="margin-bottom: var(--space-2); color: var(--text-secondary);">${renderIcon("upload-cloud", { size: 24, color: "var(--accent-gold)" })}</div>
                <div style="font-size: var(--text-xs); color: var(--text-muted); margin-bottom: var(--space-2);">
                  Attach JPG/PNG geotagged photo or capture from field device
                </div>
                <input type="file" id="report-photo" class="form-control" accept="image/*" style="font-size: var(--text-xs); display: inline-block; width: auto;">
              </div>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%;">
              ${renderIcon("send", { size: 16 })} Submit Report for Verification
            </button>
          </form>
        </div>

        <!-- Verification Protocol Information Card -->
        <div class="drishti-card">
          <div class="drishti-card-title" style="margin-bottom: var(--space-4);">
            ${renderIcon("shield-check", { size: 18, color: "var(--accent-gold)" })} Data Integrity & Triage Protocol
          </div>

          <div style="font-size: var(--text-sm); line-height: 1.6; color: var(--text-secondary);">
            <p style="margin-bottom: var(--space-3);">
              <strong>Silence is Not Safety:</strong> To prevent false alarms from disrupting interstate essential commodity supply chains, every citizen and field submission enters a <code>PENDING_VERIFICATION</code> state.
            </p>

            <div style="background: var(--bg-surface-alt); padding: 12px; border-radius: var(--radius-md); margin-bottom: var(--space-4); border-left: 3px solid var(--accent-gold);">
              <div class="font-bold text-charcoal" style="margin-bottom: 4px;">Control Room Verification Lifecycle:</div>
              <ol style="margin-left: 18px; font-size: var(--text-xs); color: var(--text-secondary);">
                <li>Field Report Received & Geotag Extracted</li>
                <li>Control Room Operator cross-checks sensor & radar feeds</li>
                <li>Operator executes <strong>Verify</strong> or <strong>Reject</strong></li>
                <li>On verification, Road status updates to Disrupted</li>
                <li>Automated convoy rerouting notifications are dispatched</li>
              </ol>
            </div>

            <div class="flex gap-2">
              <button class="btn btn-secondary btn-sm" style="flex: 1;" onclick="window.drishtiApp.navigate('controlRoom')">
                View Control Room Queue
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

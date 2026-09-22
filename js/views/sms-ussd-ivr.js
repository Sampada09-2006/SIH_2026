/**
 * DRISHTI - 2G Feature Phone Fallback Simulator View
 * Provides interactive simulators for SMS queries, USSD menus (*999*29#), and IVR audio prompts.
 * Strictly watermarked as SIMULATOR — DEMO MODE.
 */

import { renderIcon } from "../icons.js";

export class SmsUssdIvrView {
  static currentTab = "SMS"; // SMS | USSD | IVR
  static smsMessages = [
    { type: "outgoing", text: "STATUS NH29", time: "10:14 AM" },
    { type: "incoming", text: "DRISHTI ALERT: NH-29 Pagal Pahar sector blocked by Landslide at KM 42. Risk: 84/100 (CRITICAL). Alternate: Use Niuland Bypass (+28km, +45m delay).", time: "10:14 AM" }
  ];
  static ussdScreenText = "DRISHTI NER ROAD INFO\n1. Check Highway Status\n2. Report Obstruction\n3. Emergency SOS\n4. Bypass Recommendations\n\nReply with number:";
  static ivrStep = 1;

  static render() {
    return `
      <div class="view-header">
        <div class="view-title-group">
          <h2>2G Low-Bandwidth Fallback Simulator</h2>
          <p>Accessible road intelligence for truck drivers and rural citizens using basic feature phones without mobile internet.</p>
        </div>
        <div class="view-actions-group">
          <span class="data-provenance-tag provenance-simulated">SIMULATOR — DEMO MODE</span>
        </div>
      </div>

      <div class="simulator-container">
        <!-- Phone Device Frame -->
        <div class="phone-device-frame">
          <div class="phone-screen">
            <div class="phone-screen-header">
              <span>BSNL NER • 2G</span>
              <span>10:15 AM</span>
            </div>

            <!-- Tab Switcher on Phone Screen -->
            <div style="display: flex; gap: 4px; margin-bottom: 8px; border-bottom: 1px solid var(--border-default); padding-bottom: 6px;">
              <button class="btn ${this.currentTab === 'SMS' ? 'btn-primary' : 'btn-secondary'} btn-sm" style="flex: 1; padding: 3px 6px; font-size: 0.65rem;" onclick="window.drishtiApp.switchSimulatorTab('SMS')">
                SMS (56161)
              </button>
              <button class="btn ${this.currentTab === 'USSD' ? 'btn-primary' : 'btn-secondary'} btn-sm" style="flex: 1; padding: 3px 6px; font-size: 0.65rem;" onclick="window.drishtiApp.switchSimulatorTab('USSD')">
                USSD (*999#)
              </button>
              <button class="btn ${this.currentTab === 'IVR' ? 'btn-primary' : 'btn-secondary'} btn-sm" style="flex: 1; padding: 3px 6px; font-size: 0.65rem;" onclick="window.drishtiApp.switchSimulatorTab('IVR')">
                IVR Voice (1800)
              </button>
            </div>

            <!-- SMS Interface -->
            ${this.currentTab === 'SMS' ? `
              <div class="phone-messages-area" id="sms-messages-container">
                ${this.smsMessages.map(m => `
                  <div class="sms-bubble ${m.type}">
                    <div>${m.text}</div>
                    <div style="font-size: 0.55rem; color: ${m.type === 'outgoing' ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)'}; text-align: right; margin-top: 2px;">${m.time}</div>
                  </div>
                `).join("")}
              </div>

              <div style="display: flex; gap: 4px; margin-top: 8px;">
                <input type="text" id="sms-input-field" class="form-control" placeholder="Type: STATUS NH10 or SOS..." style="font-size: 0.75rem; padding: 6px 8px;" value="STATUS NH10" onkeypress="if(event.key==='Enter') window.drishtiApp.sendSimulatedSms()">
                <button class="btn btn-primary btn-sm" onclick="window.drishtiApp.sendSimulatedSms()">
                  ${renderIcon("send", { size: 12 })}
                </button>
              </div>
            ` : ''}

            <!-- USSD Interface -->
            ${this.currentTab === 'USSD' ? `
              <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                <div class="ussd-modal-screen">
                  <pre style="background: transparent; border: none; font-size: 0.7rem; white-space: pre-wrap; color: var(--text-primary); font-family: inherit;">${this.ussdScreenText}</pre>
                </div>

                <div style="margin-top: 8px;">
                  <div class="flex gap-2">
                    <input type="text" id="ussd-input-field" class="form-control font-mono" placeholder="Enter option 1-4" style="font-size: 0.75rem; padding: 6px 8px;" value="1">
                    <button class="btn btn-primary btn-sm" onclick="window.drishtiApp.sendSimulatedUssd()">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            ` : ''}

            <!-- IVR Voice Interface -->
            ${this.currentTab === 'IVR' ? `
              <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 12px;">
                <div style="width: 50px; height: 50px; border-radius: var(--radius-full); background: var(--accent-gold-subtle); color: var(--accent-gold-dark); display: flex; align-items: center; justify-content: center; margin-bottom: 12px;">
                  ${renderIcon("phone", { size: 24 })}
                </div>
                <div style="font-weight: 700; font-size: var(--text-sm); margin-bottom: 4px;">DRISHTI Voice Helpline</div>
                <div class="text-muted font-mono" style="font-size: 0.65rem; margin-bottom: 12px;">Toll-Free: 1800-345-XXXX</div>

                <div style="background: var(--bg-surface-alt); border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: 10px; font-size: var(--text-xs); text-align: left; margin-bottom: 12px; width: 100%;">
                  <strong>Audio Script Preview:</strong>
                  <div style="color: var(--text-secondary); margin-top: 4px; font-style: italic;">
                    "Welcome to DRISHTI Northeast Road Helpline. For English, press 1. অসমীয়াৰ বাবে ২ টিপক। हिन्दी के लिए ३ दबाएं..."
                  </div>
                </div>

                <div class="flex gap-2">
                  <button class="btn btn-primary btn-sm" onclick="window.drishtiApp.playIvrPrompt(1)">Press 1 (English)</button>
                  <button class="btn btn-secondary btn-sm" onclick="window.drishtiApp.playIvrPrompt(2)">Press 2 (Assamese)</button>
                  <button class="btn btn-secondary btn-sm" onclick="window.drishtiApp.playIvrPrompt(3)">Press 3 (Hindi)</button>
                </div>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Documentation on 2G Fallback Integration -->
        <div class="drishti-card">
          <div class="drishti-card-title" style="margin-bottom: var(--space-4);">
            ${renderIcon("shield-check", { size: 18, color: "var(--accent-gold)" })} Inclusivity & Last-Mile Connectivity
          </div>

          <div style="font-size: var(--text-sm); line-height: 1.6; color: var(--text-secondary);">
            <p style="margin-bottom: var(--space-3);">
              Over 40% of commercial truck drivers navigating mountain passes in Manipur, Nagaland, and Arunachal Pradesh use keypad feature phones or experience total data outage.
            </p>

            <div style="background: var(--bg-surface-alt); padding: 12px; border-radius: var(--radius-md); margin-bottom: var(--space-4); border-left: 3px solid var(--accent-gold);">
              <div class="font-bold text-charcoal" style="margin-bottom: 4px;">Supported Fast Commands:</div>
              <ul style="margin-left: 18px; font-size: var(--text-xs); color: var(--text-secondary);">
                <li><code>STATUS NH29</code> &rarr; Instant status & detour advisory</li>
                <li><code>STATUS NH10</code> &rarr; Teesta river & landslide check</li>
                <li><code>REPORT LANDSLIDE KOHIMA</code> &rarr; Creates pending field ticket</li>
                <li><code>*999*29#</code> &rarr; Direct USSD speed dial for highway status</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

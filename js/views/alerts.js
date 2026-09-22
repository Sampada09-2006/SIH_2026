/**
 * DRISHTI - Automated Disruption Alerts View
 * Real-time hazard notifications, weather warnings, and corridor advisories.
 */

import { store } from "../state/store.js";
import { renderIcon } from "../icons.js";

export class AlertsView {
  static render() {
    const state = store.getState();
    const alerts = state.alerts;

    return `
      <div class="view-header">
        <div class="view-title-group">
          <h2>Automated Disruption & Hazard Alerts</h2>
          <p>Continuous corridor monitoring alerts dispatched to logistics controllers and field teams.</p>
        </div>
        <div class="view-actions-group">
          <span class="data-provenance-tag provenance-verified">Verified Event Stream</span>
        </div>
      </div>

      <!-- Alert Feed Grid -->
      <div class="flex flex-col gap-4">
        ${alerts.map(a => {
          const isCritical = a.severity === "CRITICAL" || a.severity === "HIGH";

          return `
            <div class="drishti-card" style="border-left: 4px solid ${isCritical ? 'var(--status-red-badge)' : 'var(--status-amber-badge)'};">
              <div class="drishti-card-header">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="badge ${isCritical ? 'badge-red' : 'badge-amber'} font-bold">${a.severity}</span>
                    <span class="badge badge-neutral">${a.category}</span>
                    <span class="data-provenance-tag provenance-verified" style="font-size: 0.65rem;">${a.provenance || 'VERIFIED SOURCE'}</span>
                  </div>
                  <h3 style="font-size: var(--text-md); margin-top: 6px;">${a.title}</h3>
                </div>
                <div class="text-muted font-mono" style="font-size: var(--text-xs);">${a.timestamp}</div>
              </div>

              <div class="grid grid-2 gap-4" style="font-size: var(--text-xs); margin-bottom: var(--space-4);">
                <div>
                  <span class="text-muted">Geographic Jurisdiction:</span>
                  <div class="font-bold text-charcoal">${a.state} (${a.district})</div>
                </div>
                <div>
                  <span class="text-muted">Affected Corridor:</span>
                  <div class="font-mono font-bold text-charcoal">${a.corridor}</div>
                </div>
              </div>

              <div style="background: var(--bg-surface-alt); padding: 10px 12px; border-radius: var(--radius-md); font-size: var(--text-xs); margin-bottom: var(--space-3);">
                <div style="margin-bottom: 4px;">
                  <strong class="text-charcoal">Impact Summary:</strong> ${a.impact}
                </div>
                <div>
                  <strong class="text-gold">Recommended Operator Action:</strong> ${a.recommendedAction}
                </div>
              </div>

              <div class="flex justify-between items-center" style="font-size: 0.6875rem; color: var(--text-muted);">
                <span>Source: ${a.source}</span>
                <button class="btn btn-secondary btn-sm" onclick="window.drishtiApp.inspectCorridor('${a.corridor}')">
                  ${renderIcon("map-pin", { size: 12 })} View on Map
                </button>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }
}

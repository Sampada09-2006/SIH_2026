/**
 * DRISHTI - NER Regional Analytics View
 * Infrastructure vulnerability analytics, risk distributions, and connectivity indices across 8 NER states.
 */

import { renderIcon } from "../icons.js";
import { NER_STATES } from "../data/ner-geography.js";

export class AnalyticsView {
  static render() {
    return `
      <div class="view-header">
        <div class="view-title-group">
          <h2>NER Regional Infrastructure Analytics</h2>
          <p>State-by-state corridor vulnerability, hazard density, and logistics supply chain resilience.</p>
        </div>
        <div class="view-actions-group">
          <span class="data-provenance-tag provenance-simulated">SIMULATED DEMO DATA</span>
        </div>
      </div>

      <!-- State-wise Vulnerability Table -->
      <div class="drishti-card" style="margin-bottom: var(--space-6);">
        <div class="drishti-card-header">
          <div>
            <div class="drishti-card-title">${renderIcon("activity", { size: 18, color: "var(--accent-gold)" })} 8 NER States Connectivity & Vulnerability Index</div>
            <div class="drishti-card-subtitle">Aggregated geotechnical terrain profile and corridor resilience</div>
          </div>
          <span class="data-provenance-tag provenance-simulated">Analytical Model</span>
        </div>

        <div class="table-container">
          <table class="drishti-table">
            <thead>
              <tr>
                <th>State</th>
                <th>Capital Hub</th>
                <th>Primary Terrain Hazard Profile</th>
                <th>Monitored Lifelines</th>
                <th>Vulnerability Index</th>
                <th>Connectivity Rating</th>
              </tr>
            </thead>
            <tbody>
              ${NER_STATES.map(s => {
                let ratingClass = "badge-green";
                let ratingText = "Resilient";
                let vulnScore = "Low (24%)";

                if (s.id === "nagaland" || s.id === "sikkim") {
                  ratingClass = "badge-red";
                  ratingText = "High Landslide Vulnerability";
                  vulnScore = "Severe (78%)";
                } else if (s.id === "meghalaya" || s.id === "manipur" || s.id === "mizoram") {
                  ratingClass = "badge-amber";
                  ratingText = "Moderate Monsoon Hazard";
                  vulnScore = "Moderate (54%)";
                }

                return `
                  <tr>
                    <td><strong>${s.name}</strong></td>
                    <td class="text-muted">${s.capital}</td>
                    <td style="font-size: var(--text-xs);">${s.terrainRisk}</td>
                    <td class="font-mono text-muted" style="font-size: var(--text-xs);">${s.districts.length} Districts Monitored</td>
                    <td><span class="font-mono font-bold">${vulnScore}</span></td>
                    <td><span class="badge ${ratingClass}">${ratingText}</span></td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Incident Types & Risk Breakdown Grid -->
      <div class="grid grid-2 gap-6">
        <div class="drishti-card">
          <div class="drishti-card-header">
            <div>
              <div class="drishti-card-title">${renderIcon("mountain", { size: 18, color: "var(--accent-gold)" })} Disruption Hazards by Category</div>
              <div class="drishti-card-subtitle">Historical distribution in Northeast mountain sectors</div>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; gap: var(--space-3); font-size: var(--text-xs);">
            <div>
              <div class="flex justify-between" style="margin-bottom: 4px;">
                <span>Landslides & Slope Failures</span>
                <strong>48%</strong>
              </div>
              <div style="height: 8px; background: var(--bg-surface-sunken); border-radius: var(--radius-full); overflow: hidden;">
                <div style="width: 48%; height: 100%; background: var(--status-red-badge);"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between" style="margin-bottom: 4px;">
                <span>Flash Floods & Riverbank Scour</span>
                <strong>28%</strong>
              </div>
              <div style="height: 8px; background: var(--bg-surface-sunken); border-radius: var(--radius-full); overflow: hidden;">
                <div style="width: 28%; height: 100%; background: var(--status-amber-badge);"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between" style="margin-bottom: 4px;">
                <span>Pavement Subsidence & Sinking Formation</span>
                <strong>14%</strong>
              </div>
              <div style="height: 8px; background: var(--bg-surface-sunken); border-radius: var(--radius-full); overflow: hidden;">
                <div style="width: 14%; height: 100%; background: var(--accent-gold);"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between" style="margin-bottom: 4px;">
                <span>Bridge Structural & Weight Restrictions</span>
                <strong>10%</strong>
              </div>
              <div style="height: 8px; background: var(--bg-surface-sunken); border-radius: var(--radius-full); overflow: hidden;">
                <div style="width: 10%; height: 100%; background: var(--text-muted);"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="drishti-card">
          <div class="drishti-card-header">
            <div>
              <div class="drishti-card-title">${renderIcon("truck", { size: 18, color: "var(--accent-gold)" })} Essential Supply Chain Metrics</div>
              <div class="drishti-card-subtitle">Freight performance under terrain constraints</div>
            </div>
          </div>
          <div class="grid grid-2 gap-4">
            <div class="stat-card" style="background: var(--bg-surface-alt);">
              <div class="stat-label">Avg Reroute Latency</div>
              <div class="stat-value font-mono">1.8s</div>
              <div class="stat-subtext">Real-time alternative computation</div>
            </div>
            <div class="stat-card" style="background: var(--bg-surface-alt);">
              <div class="stat-label">Cold-Chain Assurance</div>
              <div class="stat-value font-mono">99.4%</div>
              <div class="stat-subtext">Zero spoilage on critical runs</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

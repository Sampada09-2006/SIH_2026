/**
 * DRISHTI - Road & Bridge Status View
 * Detailed accessibility database across all 8 NER states with explainable risk breakdowns.
 */

import { store } from "../state/store.js";
import { renderIcon } from "../icons.js";
import { NER_STATES } from "../data/ner-geography.js";

export class RoadStatusView {
  static render() {
    const state = store.getState();
    let corridors = state.corridors;
    let bridges = state.bridges;

    // Apply State Filter if selected
    if (state.selectedStateFilter && state.selectedStateFilter !== "ALL") {
      const stateObj = NER_STATES.find(s => s.id === state.selectedStateFilter);
      if (stateObj) {
        corridors = corridors.filter(c => c.state.toLowerCase().includes(stateObj.name.toLowerCase()));
        bridges = bridges.filter(b => b.state.toLowerCase().includes(stateObj.name.toLowerCase()));
      }
    }

    return `
      <div class="view-header">
        <div class="view-title-group">
          <h2>Road & Bridge Accessibility Intelligence</h2>
          <p>Continuous condition assessment, structural restrictions, and explainable risk factors across NER corridors.</p>
        </div>
        <div class="view-actions-group">
          <!-- State Filter Dropdown -->
          <select class="form-select" style="width: 200px;" onchange="window.drishtiApp.filterByState(this.value)">
            <option value="ALL">All 8 NER States</option>
            ${NER_STATES.map(s => `<option value="${s.id}" ${state.selectedStateFilter === s.id ? 'selected' : ''}>${s.name}</option>`).join("")}
          </select>
          <button class="btn btn-primary btn-sm" onclick="window.drishtiApp.navigate('regionalMap')">
            ${renderIcon("map", { size: 14 })} View on GIS Map
          </button>
        </div>
      </div>

      <!-- Strategic Corridors Table -->
      <div class="drishti-card" style="margin-bottom: var(--space-6);">
        <div class="drishti-card-header">
          <div>
            <div class="drishti-card-title">${renderIcon("route", { size: 18, color: "var(--accent-gold)" })} Strategic Highway Corridors</div>
            <div class="drishti-card-subtitle">8 NER States Lifeline Highways (${corridors.length} segments monitored)</div>
          </div>
          <span class="data-provenance-tag provenance-verified">Field Verified Dataset</span>
        </div>

        <div class="table-container">
          <table class="drishti-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Corridor Name</th>
                <th>State / District</th>
                <th>Status</th>
                <th>Explainable Risk</th>
                <th>Contributing Factors</th>
                <th>Freshness</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${corridors.map(c => `
                <tr>
                  <td class="font-mono font-bold">${c.code}</td>
                  <td>
                    <strong>${c.name}</strong>
                    <div class="text-muted" style="font-size: var(--text-xs);">${c.category} • ${c.lengthKm} km</div>
                  </td>
                  <td class="text-muted">${c.state} (${c.district})</td>
                  <td>
                    <span class="badge ${c.status === 'DISRUPTED' ? 'badge-red' : (c.status === 'CAUTION' ? 'badge-amber' : 'badge-green')}">${c.status}</span>
                  </td>
                  <td>
                    <div class="font-bold">${c.riskScore}/100</div>
                    <span class="badge ${c.riskScore >= 60 ? 'badge-red' : (c.riskScore >= 35 ? 'badge-amber' : 'badge-green')}">${c.riskBand}</span>
                  </td>
                  <td style="font-size: var(--text-xs); max-width: 280px;">
                    ${(c.riskFactors || []).map(f => `<div>• <strong>${f.name}</strong>: ${f.contribution} (${f.score} pts)</div>`).join("")}
                  </td>
                  <td class="font-mono text-muted" style="font-size: var(--text-xs);">${c.dataFreshness || 'Fresh'}</td>
                  <td>
                    <button class="btn btn-secondary btn-sm" onclick="window.drishtiApp.inspectCorridor('${c.code}')">
                      Map View
                    </button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Critical Bridge Infrastructure Table (Requirement #13) -->
      <div class="drishti-card">
        <div class="drishti-card-header">
          <div>
            <div class="drishti-card-title">${renderIcon("building", { size: 18, color: "var(--accent-gold)" })} Critical River Bridges & Viaducts</div>
            <div class="drishti-card-subtitle">Requirement #13: First-class structural and flood clearance modeling</div>
          </div>
          <span class="data-provenance-tag provenance-verified">Structural Sensor Gateway</span>
        </div>

        <div class="table-container">
          <table class="drishti-table">
            <thead>
              <tr>
                <th>Bridge ID</th>
                <th>Structure Name</th>
                <th>River / Basin</th>
                <th>Connected Corridor</th>
                <th>Max Axle Weight</th>
                <th>Flood Clearance</th>
                <th>Status</th>
                <th>Restrictions</th>
              </tr>
            </thead>
            <tbody>
              ${bridges.map(b => `
                <tr>
                  <td class="font-mono font-bold">${b.id}</td>
                  <td>
                    <strong>${b.name}</strong>
                    <div class="text-muted" style="font-size: var(--text-xs);">${b.state} • ${b.lengthMeters} meters</div>
                  </td>
                  <td>${b.river}</td>
                  <td class="font-mono">${b.connectedRoad}</td>
                  <td><strong>${b.maxWeightTonnes} Tonnes</strong></td>
                  <td><span class="badge ${b.floodClearanceMeters < 2.5 ? 'badge-amber' : 'badge-green'}">${b.floodClearanceMeters}m</span></td>
                  <td><span class="badge ${b.status === 'RESTRICTED' ? 'badge-amber' : 'badge-green'}">${b.status}</span></td>
                  <td style="font-size: var(--text-xs); color: var(--text-secondary);">${b.restrictions}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}

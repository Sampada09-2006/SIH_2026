/**
 * DRISHTI - Smart Route Planner View
 * Essential supply logistics route calculation and alternative corridor comparison.
 */

import { RouteService } from "../services/route-service.js";
import { renderIcon } from "../icons.js";

export class RoutePlannerView {
  static currentPlan = null;

  static render() {
    if (!this.currentPlan) {
      this.currentPlan = RouteService.planRoute({
        origin: "Dimapur",
        destination: "Kohima",
        cargoCategory: "Medicines",
        priority: "CRITICAL"
      });
    }

    const plan = this.currentPlan;

    return `
      <div class="view-header">
        <div class="view-title-group">
          <h2>Essential Supply Route Planner</h2>
          <p>Multi-corridor optimization taking terrain hazard, landslide risk, and cargo priority into account.</p>
        </div>
        <div class="view-actions-group">
          <span class="data-provenance-tag provenance-simulated">${plan.provenance}</span>
        </div>
      </div>

      <div class="route-comparison-grid">
        <!-- Input Configuration Card -->
        <div class="route-form-card">
          <div class="drishti-card-title" style="margin-bottom: var(--space-4);">
            ${renderIcon("filter", { size: 18, color: "var(--accent-gold)" })} Plan Dispatch Route
          </div>

          <form id="route-planner-form" onsubmit="window.drishtiApp.calculateRoute(event)">
            <div class="form-group">
              <label class="form-label">Origin Freight Hub</label>
              <select id="route-origin" class="form-select">
                <option value="Dimapur" ${plan.origin === 'Dimapur' ? 'selected' : ''}>Dimapur Freight Terminal (Nagaland)</option>
                <option value="Siliguri" ${plan.origin === 'Siliguri' ? 'selected' : ''}>Siliguri Central Depot (North Bengal)</option>
                <option value="Guwahati" ${plan.origin === 'Guwahati' ? 'selected' : ''}>Guwahati Logistics Park (Assam)</option>
                <option value="Shillong" ${plan.origin === 'Shillong' ? 'selected' : ''}>NEIGRIHMS Shillong (Meghalaya)</option>
                <option value="Silchar" ${plan.origin === 'Silchar' ? 'selected' : ''}>Silchar Valley Depot (Assam)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Destination Hub</label>
              <select id="route-dest" class="form-select">
                <option value="Kohima" ${plan.destination === 'Kohima' ? 'selected' : ''}>Kohima Relief Center (Nagaland)</option>
                <option value="Gangtok" ${plan.destination === 'Gangtok' ? 'selected' : ''}>District Hospital, Gangtok (Sikkim)</option>
                <option value="Aizawl" ${plan.destination === 'Aizawl' ? 'selected' : ''}>Aizawl Central Storage (Mizoram)</option>
                <option value="Silchar" ${plan.destination === 'Silchar' ? 'selected' : ''}>Silchar Civil Hospital (Assam)</option>
                <option value="Imphal" ${plan.destination === 'Imphal' ? 'selected' : ''}>Imphal Valley Depot (Manipur)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Cargo Category</label>
              <select id="route-cargo" class="form-select">
                <option value="Medicines" ${plan.cargoCategory === 'Medicines' ? 'selected' : ''}>Medicines & Cold-Chain Supplies</option>
                <option value="Food" ${plan.cargoCategory === 'Food' ? 'selected' : ''}>PDS Food Grains & Infant Nutrition</option>
                <option value="Agriculture" ${plan.cargoCategory === 'Agriculture' ? 'selected' : ''}>Perishable Agricultural Produce</option>
                <option value="Construction" ${plan.cargoCategory === 'Construction' ? 'selected' : ''}>Emergency Construction Materials</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Consignment Priority</label>
              <select id="route-priority" class="form-select">
                <option value="CRITICAL" ${plan.priority === 'CRITICAL' ? 'selected' : ''}>CRITICAL (Zero-Delay Life Safety)</option>
                <option value="HIGH" ${plan.priority === 'HIGH' ? 'selected' : ''}>HIGH (Essential Commodities)</option>
                <option value="NORMAL" ${plan.priority === 'NORMAL' ? 'selected' : ''}>NORMAL (Standard Freight)</option>
              </select>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: var(--space-2);">
              ${renderIcon("route", { size: 16 })} Calculate Alternatives
            </button>
          </form>
        </div>

        <!-- Route Comparison Results -->
        <div class="route-results-container">
          <!-- Recommendation Banner -->
          <div class="drishti-banner banner-gold">
            <div>${renderIcon("shield-check", { size: 22, color: "var(--accent-gold-dark)" })}</div>
            <div style="flex: 1;">
              <strong>AI Route Optimization Recommendation:</strong> ${plan.recommendationReason}
            </div>
          </div>

          <!-- Comparison Cards -->
          <div class="grid grid-2 gap-4">
            ${plan.routes.map(r => {
              const isRecommended = (plan.recommendedRoute === r.type);

              return `
                <div class="route-option-card ${isRecommended ? 'recommended' : ''}">
                  <div class="flex items-center justify-between" style="margin-bottom: var(--space-3);">
                    <span class="badge ${r.type === 'PRIMARY' ? 'badge-neutral' : 'badge-gold'} font-bold">
                      ${r.type === 'PRIMARY' ? 'PRIMARY ROUTE' : 'ALTERNATE BYPASS'}
                    </span>
                    ${isRecommended ? `<span class="badge badge-green">${renderIcon("check", { size: 12 })} Recommended</span>` : ''}
                  </div>

                  <h3 style="font-size: var(--text-md); margin-bottom: 4px;">${r.name}</h3>
                  <div class="text-muted font-mono" style="font-size: var(--text-xs);">${r.corridorCode}</div>

                  <div class="route-stats-grid">
                    <div class="route-stat-item">
                      <div class="stat-val font-mono">${r.distanceKm} km</div>
                      <div class="stat-lbl">Distance</div>
                    </div>
                    <div class="route-stat-item">
                      <div class="stat-val font-mono">${r.totalEtaFormatted}</div>
                      <div class="stat-lbl">Total ETA</div>
                    </div>
                    <div class="route-stat-item">
                      <div class="stat-val font-mono text-amber">+${r.estimatedDelayMin}m</div>
                      <div class="stat-lbl">Est. Delay</div>
                    </div>
                    <div class="route-stat-item">
                      <div class="stat-val font-mono ${r.riskScore >= 60 ? 'text-red' : (r.riskScore >= 35 ? 'text-amber' : 'text-green')}">${r.riskScore}/100</div>
                      <div class="stat-lbl">Risk Score</div>
                    </div>
                  </div>

                  <!-- Known Obstructions or Clear Path -->
                  <div style="font-size: var(--text-xs); margin-bottom: var(--space-4);">
                    ${r.disruptions.length > 0 ? `
                      <div class="text-red font-semibold flex items-center gap-1">
                        ${renderIcon("alert-triangle", { size: 14 })} Disrupted: ${r.disruptions.join(", ")}
                      </div>
                    ` : `
                      <div class="text-green font-semibold flex items-center gap-1">
                        ${renderIcon("check-circle", { size: 14 })} Bypass Corridor Clear of Major Blocks
                      </div>
                    `}
                  </div>

                  <div class="flex gap-2">
                    <button class="btn ${isRecommended ? 'btn-primary' : 'btn-secondary'} btn-sm" style="flex: 1;" onclick="window.drishtiApp.assignRouteToFleet('${r.name}')">
                      Dispatch Along This Route
                    </button>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      </div>
    `;
  }
}

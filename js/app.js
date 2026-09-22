/**
 * DRISHTI application bootstrap and controller.
 *
 * This file is intentionally aligned with the current project architecture:
 * state/store -> services -> views. The previous version referenced an older
 * components/ and data/ structure, which caused a cascade of 404 errors.
 */

import { store } from "./state/store.js";
import { renderIcon } from "./icons.js";
import { NER_STATES, resolveAuthorityRecipients } from "./data/ner-geography.js";
import { OfflineService } from "./services/offline-service.js";
import { SosService } from "./services/sos-service.js";
import { RouteService } from "./services/route-service.js";
import { OverviewView } from "./views/overview.js";
import { RegionalMapView } from "./views/regional-map.js";
import { RoadStatusView } from "./views/road-status.js";
import { RoutePlannerView } from "./views/route-planner.js";
import { FleetTrackingView } from "./views/fleet-tracking.js";
import { AlertsView } from "./views/alerts.js";
import { FieldReportingView } from "./views/field-reporting.js";
import { ControlRoomView } from "./views/control-room.js";
import { AnalyticsView } from "./views/analytics.js";
import { SosView } from "./views/sos.js";
import { OfflineSyncView } from "./views/offline-sync.js";
import { SmsUssdIvrView } from "./views/sms-ussd-ivr.js";
import { ArchitectureView } from "./views/architecture.js";
import { LandingView } from "./views/landing.js";

const VIEW_DEFINITIONS = [
  { id: "overview", label: "Command Overview", icon: "layout-dashboard", group: "Operations" },
  { id: "regionalMap", label: "Regional GIS Map", icon: "map", group: "Operations" },
  { id: "roadStatus", label: "Road & Bridge Status", icon: "route", group: "Operations" },
  { id: "routePlanner", label: "Route Planner", icon: "navigation", group: "Logistics" },
  { id: "fleetTracking", label: "Fleet Tracking", icon: "truck", group: "Logistics" },
  { id: "alerts", label: "Automated Alerts", icon: "alert-triangle", group: "Operations" },
  { id: "fieldReporting", label: "Field Reporting", icon: "camera", group: "Field" },
  { id: "controlRoom", label: "Control Room", icon: "shield-alert", group: "Control" },
  { id: "analytics", label: "NER Analytics", icon: "bar-chart-3", group: "Intelligence" },
  { id: "sos", label: "Emergency SOS", icon: "siren", group: "Emergency" },
  { id: "offlineSync", label: "Offline Sync", icon: "wifi-off", group: "Connectivity" },
  { id: "smsUssdIvr", label: "2G Fallback", icon: "smartphone", group: "Connectivity" },
  { id: "architecture", label: "Architecture & Audit", icon: "file-text", group: "System" }
];

const VIEW_COMPONENTS = {
  landing: LandingView,
  overview: OverviewView,
  regionalMap: RegionalMapView,
  roadStatus: RoadStatusView,
  routePlanner: RoutePlannerView,
  fleetTracking: FleetTrackingView,
  alerts: AlertsView,
  fieldReporting: FieldReportingView,
  controlRoom: ControlRoomView,
  analytics: AnalyticsView,
  sos: SosView,
  offlineSync: OfflineSyncView,
  smsUssdIvr: SmsUssdIvrView,
  architecture: ArchitectureView
};

class DrishtiApp {
  constructor() {
    this.currentView = "landing";
    this.toastContainer = null;
    this.simulatedOffline = false;
  }

  init() {
    this.buildShell();
    this.setupToastContainer();
    this.setupGlobalListeners();

    OfflineService.init();
    this.navigate("landing");

    store.subscribe((state, previous, action) => {
      if (action === "SET_ONLINE_STATUS") this.updateConnectivityBadge(state.isOnline);
    });

    this.updateConnectivityBadge(navigator.onLine);
    console.log("DRISHTI initialized successfully.");
  }

  buildShell() {
    const root = document.getElementById("app");
    if (!root) throw new Error("#app container not found");

    const grouped = {};
    VIEW_DEFINITIONS.forEach(item => {
      if (!grouped[item.group]) grouped[item.group] = [];
      grouped[item.group].push(item);
    });

    const nav = Object.entries(grouped).map(([group, items]) => `
      <div class="sidebar-heading">${group}</div>
      ${items.map(item => `
        <button type="button" class="nav-item nav-tab-item" data-view="${item.id}">
          <span class="nav-icon">${renderIcon(item.icon, { size: 17 })}</span>
          <span>${item.label}</span>
        </button>
      `).join("")}
    `).join("");

    root.innerHTML = `
      <div id="drishti-shell" style="min-height:100vh;display:flex;flex-direction:column;">
        <header class="app-header">
          <button id="brand-logo-btn" class="header-brand" type="button" style="border:0;background:transparent;cursor:pointer;padding:0;">
            <span class="brand-icon-box">${renderIcon("eye", { size: 20 })}</span>
            <span>
              <span class="brand-title" style="display:block;">DRISHTI</span>
              <span class="brand-subtitle">AI Logistics & Accessibility Intelligence</span>
            </span>
          </button>

          <div class="header-center">
            <div class="global-search-wrapper">
              ${renderIcon("search", { size: 16 })}
              <input id="global-search-input" class="global-search-input" type="search" placeholder="Search corridor, vehicle or alert..." autocomplete="off">
            </div>
          </div>

          <div class="header-actions">
            <select id="header-language-select" class="form-select" style="width:100px;padding:7px 8px;">
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="as">Assamese</option>
              <option value="bn">Bengali</option>
            </select>
            <button id="btn-toggle-offline-header" class="btn btn-secondary btn-sm" type="button">
              ${renderIcon("wifi", { size: 14 })}<span id="offline-badge-label">Online</span>
            </button>
          </div>
        </header>

        <div style="display:flex;flex:1;min-height:calc(100vh - var(--header-height));">
          <aside class="app-sidebar" id="drishti-sidebar">
            <nav class="sidebar-nav">${nav}</nav>
            <div style="margin-top:auto;padding:12px;border-top:1px solid var(--border-default);">
              <div class="data-provenance-tag provenance-simulated" style="display:block;text-align:center;">SIH26002 • DEMO ENVIRONMENT</div>
            </div>
          </aside>

          <main id="drishti-main" style="flex:1;min-width:0;padding:var(--space-6);background:var(--bg-app);">
            <div id="view-root"></div>
          </main>
        </div>

        <button id="global-sos-fab" class="sos-fab" type="button" title="Emergency SOS">
          ${renderIcon("siren", { size: 20 })}
        </button>
      </div>
    `;

    document.querySelectorAll(".nav-tab-item").forEach(button => {
      button.addEventListener("click", () => this.navigate(button.dataset.view));
    });

    document.getElementById("brand-logo-btn")?.addEventListener("click", () => this.navigate("overview"));
    document.getElementById("global-sos-fab")?.addEventListener("click", () => this.navigate("sos"));
  }

  setupGlobalListeners() {
    const search = document.getElementById("global-search-input");
    search?.addEventListener("keydown", event => {
      if (event.key !== "Enter") return;
      this.handleSearch(search.value.trim());
    });

    document.getElementById("btn-toggle-offline-header")?.addEventListener("click", () => this.toggleSimulatedNetwork());
  }

  setupToastContainer() {
    this.toastContainer = document.createElement("div");
    this.toastContainer.id = "toast-container";
    this.toastContainer.className = "toast-container";
    document.body.appendChild(this.toastContainer);
  }

  showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast-item ${type === "danger" ? "toast-danger" : type === "warning" ? "toast-warning" : type === "success" ? "toast-success" : ""}`;
    toast.textContent = message;
    this.toastContainer?.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  }

  navigate(viewId) {
    if (!VIEW_COMPONENTS[viewId]) {
      console.warn("Unknown DRISHTI view:", viewId);
      return;
    }

    this.currentView = viewId;
    store.dispatch("SET_VIEW", viewId);

    const root = document.getElementById("view-root");
    const sidebar = document.getElementById("drishti-sidebar");
    const main = document.getElementById("drishti-main");

    document.querySelectorAll(".nav-tab-item").forEach(item => {
      item.classList.toggle("active", item.dataset.view === viewId);
    });

    if (viewId === "landing") {
      sidebar.style.display = "none";
      main.style.padding = "0";
      main.style.minHeight = "calc(100vh - var(--header-height))";
    } else {
      sidebar.style.display = "flex";
      main.style.padding = "var(--space-6)";
    }

    const component = VIEW_COMPONENTS[viewId];
    root.innerHTML = component.render();

    if (viewId === "landing") {
      const enter = document.getElementById("enter-drishti");
      enter?.addEventListener("click", () => this.navigate("overview"));
    }

    if (viewId === "regionalMap") {
      setTimeout(() => RegionalMapView.initMap(), 0);
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }

  handleSearch(query) {
    if (!query) return;
    const q = query.toUpperCase();
    const state = store.getState();
    const corridor = state.corridors.find(c => `${c.code} ${c.name}`.toUpperCase().includes(q));
    if (corridor) return this.inspectCorridor(corridor.code);
    const vehicle = state.fleet.find(v => `${v.id} ${v.plate}`.toUpperCase().includes(q));
    if (vehicle) return this.inspectVehicle(vehicle.id);
    store.dispatch("SET_SEARCH", query);
    this.navigate("alerts");
    this.showToast(`No direct asset match for "${query}". Alerts view opened.`, "warning");
  }

  updateConnectivityBadge(isOnline) {
    const button = document.getElementById("btn-toggle-offline-header");
    const label = document.getElementById("offline-badge-label");
    if (!button || !label) return;
    label.textContent = isOnline ? "Online" : "Offline";
    button.classList.toggle("is-offline", !isOnline);
  }

  filterByState(stateId) {
    store.dispatch("SET_STATE_FILTER", stateId);
    this.navigate(this.currentView);
  }

  filterMapByState(stateId) {
    this.filterByState(stateId);
  }

  inspectCorridor(code) {
    this.navigate("regionalMap");
    setTimeout(() => RegionalMapView.focusCorridor(code), 150);
  }

  inspectVehicle(id) {
    this.navigate("regionalMap");
    setTimeout(() => RegionalMapView.focusVehicle(id), 150);
  }

  resetMapView() {
    const map = RegionalMapView.mapInstance;
    if (map) map.flyTo({ lat: 26.2006, lng: 92.9376 }, 7);
  }

  locateUserOnMap() {
    if (!navigator.geolocation) return this.showToast("Geolocation is not available in this browser.", "warning");
    navigator.geolocation.getCurrentPosition(
      position => {
        const map = RegionalMapView.mapInstance;
        if (map) map.flyTo({ lat: position.coords.latitude, lng: position.coords.longitude }, 12);
        this.showToast("Current device location displayed on the map.", "success");
      },
      () => this.showToast("Location permission was unavailable. Showing the regional map instead.", "warning"),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
    );
  }

  toggleMapLayer(layerName, visible) {
    RegionalMapView.toggleLayer(layerName, visible);
  }

  calculateRoute(event) {
    event?.preventDefault();
    const plan = RouteService.planRoute({
      origin: document.getElementById("route-origin")?.value || "Dimapur",
      destination: document.getElementById("route-dest")?.value || "Kohima",
      cargoCategory: document.getElementById("route-cargo")?.value || "Medicines",
      priority: document.getElementById("route-priority")?.value || "CRITICAL"
    });
    RoutePlannerView.currentPlan = plan;
    this.navigate("routePlanner");
    this.showToast("Route alternatives recalculated.", "success");
  }

  assignRouteToFleet(routeName) {
    const state = store.getState();
    const target = state.fleet.find(v => v.priority === "CRITICAL") || state.fleet[0];
    if (target) {
      const updated = state.fleet.map(v => v.id === target.id ? { ...v, status: "REROUTED", statusLabel: "REROUTED", suggestedAlternate: routeName } : v);
      store.dispatch("UPDATE_FLEET", updated);
    }
    this.showToast(`Dispatch order assigned to ${target?.id || "fleet"}.`, "success");
  }

  submitFieldReport(event) {
    event?.preventDefault();
    const gps = (document.getElementById("report-gps")?.value || "").split(",").map(Number);
    const report = {
      id: `INC-${Date.now().toString(36).toUpperCase()}`,
      incidentType: document.getElementById("report-type")?.value || "Landslide",
      state: document.getElementById("report-state")?.value || "Nagaland",
      corridor: document.getElementById("report-corridor")?.value || "NH-29",
      severity: document.getElementById("report-severity")?.value || "CRITICAL",
      coordinates: gps.length === 2 && gps.every(Number.isFinite) ? gps : [25.74, 93.99],
      description: document.getElementById("report-desc")?.value || "Field incident reported.",
      timestamp: new Date().toLocaleTimeString(),
      status: "PENDING_VERIFICATION",
      reporterName: "Field Operator",
      reporterRole: "Field Reporter"
    };

    const updated = [report, ...store.getState().pendingReports];
    store.dispatch("UPDATE_PENDING_REPORTS", updated);
    store.addAuditLog("FIELD_REPORT_SUBMITTED", `Report ${report.id} entered PENDING_VERIFICATION.`);
    this.showToast(`Report ${report.id} submitted for Control Room verification.`, "success");
    this.navigate("controlRoom");
  }

  captureGpsForReport() {
    this.captureGpsInto("report-gps");
  }

  captureGpsForSos() {
    this.captureGpsInto("sos-gps");
  }

  captureGpsInto(elementId) {
    if (!navigator.geolocation) return this.showToast("Geolocation is unavailable.", "warning");
    navigator.geolocation.getCurrentPosition(
      p => {
        const input = document.getElementById(elementId);
        if (input) input.value = `${p.coords.latitude.toFixed(6)}, ${p.coords.longitude.toFixed(6)}`;
        this.showToast("GPS coordinates captured.", "success");
      },
      () => this.showToast("GPS permission was not granted. You can enter coordinates manually.", "warning"),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
    );
  }

  verifyIncident(id) {
    const state = store.getState();
    const report = state.pendingReports.find(r => r.id === id);
    if (!report) return;

    const pending = state.pendingReports.filter(r => r.id !== id);
    const incidents = [{ ...report, status: "VERIFIED", verifiedAt: new Date().toLocaleTimeString() }, ...state.incidents];
    const corridors = state.corridors.map(c => {
      if (c.code.toUpperCase() === report.corridor.split(" ")[0].toUpperCase() || report.corridor.toUpperCase().includes(c.code.toUpperCase())) {
        return { ...c, status: "DISRUPTED", riskScore: Math.max(c.riskScore || 0, 84), riskBand: "CRITICAL", dataFreshness: "Updated just now" };
      }
      return c;
    });

    store.dispatch("UPDATE_PENDING_REPORTS", pending);
    store.dispatch("UPDATE_INCIDENTS", incidents);
    store.dispatch("UPDATE_CORRIDORS", corridors);
    store.addAuditLog("INCIDENT_VERIFIED", `Operator verified ${id} and updated the affected corridor to DISRUPTED.`);
    this.showToast(`${id} verified. Affected corridor marked disrupted.`, "success");
    this.navigate("controlRoom");
  }

  rejectIncident(id) {
    const state = store.getState();
    store.dispatch("UPDATE_PENDING_REPORTS", state.pendingReports.filter(r => r.id !== id));
    store.addAuditLog("INCIDENT_REJECTED", `Operator rejected field report ${id}.`);
    this.showToast(`${id} rejected and removed from the verification queue.`, "warning");
    this.navigate("controlRoom");
  }

  escalateIncident(id) {
    store.addAuditLog("INCIDENT_ESCALATED", `Incident ${id} escalated to the state disaster management authority.`);
    this.showToast(`${id} escalated to SDMA for further review.`, "warning");
  }

  simulateHeavyMonsoonRisk() {
    const state = store.getState();
    const corridors = state.corridors.map(c => c.code === "NH-29" ? { ...c, status: "DISRUPTED", riskScore: 84, riskBand: "CRITICAL", dataFreshness: "Simulated surge just now" } : c);
    const alerts = [{ id: `ALT-${Date.now()}`, title: "Heavy Monsoon Surge — NH-29", severity: "CRITICAL", impact: "Simulated rainfall surge elevates landslide exposure near Pagal Pahar.", state: "Nagaland", corridor: "NH-29", timestamp: new Date().toLocaleTimeString() }, ...state.alerts];
    store.dispatch("UPDATE_CORRIDORS", corridors);
    store.dispatch("UPDATE_ALERTS", alerts);
    store.addAuditLog("MONSOON_RISK_SIMULATED", "NH-29 risk elevated to 84/100 in the demonstration scenario.");
    this.showToast("Heavy monsoon risk simulated on NH-29.", "warning");
    this.navigate("controlRoom");
  }

  resolveAllDisruptions() {
    const state = store.getState();
    store.dispatch("UPDATE_CORRIDORS", state.corridors.map(c => ({ ...c, status: c.status === "DISRUPTED" ? "CAUTION" : c.status })));
    store.addAuditLog("DISRUPTIONS_CLEARED", "Demonstration corridor disruptions were cleared by the operator.");
    this.showToast("Demonstration disruptions cleared.", "success");
    this.navigate("overview");
  }

  triggerRerouteModal(vehicleId) {
    const state = store.getState();
    const updated = state.fleet.map(v => v.id === vehicleId ? { ...v, status: "REROUTED", statusLabel: "REROUTED", suggestedAlternate: "Niuland - Ghaspani - Kohima Outer Bypass" } : v);
    store.dispatch("UPDATE_FLEET", updated);
    store.addAuditLog("FLEET_REROUTE", `Alternate route dispatched to ${vehicleId}.`);
    this.showToast(`Alternate reroute dispatched to ${vehicleId}.`, "success");
    this.navigate("fleetTracking");
  }

  filterVehicles() {
    this.navigate("fleetTracking");
  }

  filterHelplines() {
    this.navigate("sos");
  }

  async triggerEmergencySos() {
    if (this.currentView !== "sos") {
      this.navigate("sos");
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    this.submitCustomSos();
  }

  async submitCustomSos(event) {
    event?.preventDefault();
    const gps = (document.getElementById("sos-gps")?.value || "").split(",").map(Number);
    const stateId = document.getElementById("sos-state")?.value || "assam";
    const stateObj = NER_STATES.find(s => s.id === stateId);
    const coords = gps.length === 2 && gps.every(Number.isFinite) ? { lat: gps[0], lng: gps[1], accuracyM: 25 } : null;
    const payload = SosService.buildPayload({
      stateId,
      stateLabel: stateObj?.name || stateId,
      emergencyType: document.getElementById("sos-type")?.value,
      peopleCount: document.getElementById("sos-people")?.value,
      description: document.getElementById("sos-desc")?.value,
      contactName: "DRISHTI Demo Operator",
      contactPhone: "+91-90000-00000",
      coords
    });
    const result = await SosService.dispatch(payload);
    this.showToast(result.statusBadge, result.deliveryMode === "LIVE_SMTP" ? "success" : "warning");
    this.navigate("sos");
  }

  updateSosRecipientList(stateId) {
    const recipients = resolveAuthorityRecipients(stateId);
    const container = document.getElementById("sos-recipient-list");
    if (container) container.innerHTML = recipients.map(r => `<div class="recipient-pill font-mono"><strong>${r.name}</strong> &lt;${r.email}&gt;</div>`).join("");
  }

  openNativeMailtoSos() {
    const dispatch = store.getState().lastSosDispatch;
    if (dispatch?.payload) window.location.href = SosService.getMailtoUrl(dispatch.payload);
    else this.showToast("Submit an SOS first to prepare the mail fallback.", "warning");
  }

  toggleEmailPreviewModal() {
    const existing = document.getElementById("drishti-email-preview");
    if (existing) return existing.remove();
    const text = store.getState().lastSosDispatch?.emailDraft || "No dispatch text available.";
    const overlay = document.createElement("div");
    overlay.id = "drishti-email-preview";
    overlay.className = "modal-overlay";
    overlay.innerHTML = `<div class="modal-content"><div class="modal-header"><strong>Dispatched Text Preview</strong><button class="btn btn-secondary btn-sm" type="button" id="close-mail-preview">Close</button></div><div class="modal-body"><pre style="white-space:pre-wrap;max-height:60vh;overflow:auto;font-family:var(--font-family-mono);font-size:12px;">${this.escapeHtml(text)}</pre></div></div>`;
    document.body.appendChild(overlay);
    overlay.querySelector("#close-mail-preview")?.addEventListener("click", () => overlay.remove());
  }

  escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[ch]));
  }

  toggleSimulatedNetwork() {
    this.simulatedOffline = !this.simulatedOffline;
    store.dispatch("SET_ONLINE_STATUS", !this.simulatedOffline);
    this.updateConnectivityBadge(!this.simulatedOffline);
    this.showToast(this.simulatedOffline ? "Simulated offline mode enabled. Local queues remain active." : "Simulated network restored.", this.simulatedOffline ? "warning" : "success");
  }

  async flushOfflineQueues() {
    const count = await OfflineService.syncAllQueues();
    this.showToast(`${count} queued item(s) synchronized.`, "success");
    this.navigate("offlineSync");
  }

  switchSimulatorTab(tab) {
    SmsUssdIvrView.currentTab = tab;
    this.navigate("smsUssdIvr");
  }

  sendSimulatedSms() {
    const input = document.getElementById("sms-input-field");
    const text = input?.value.trim() || "STATUS NH29";
    const upper = text.toUpperCase();
    let response = "DRISHTI: Command received. Querying regional road intelligence.";
    if (upper.includes("NH29")) response = "DRISHTI ALERT: NH-29 Pagal Pahar status available. Risk and detour advisory generated from demo data.";
    else if (upper.includes("NH10")) response = "DRISHTI: NH-10 Teesta corridor is under elevated landslide monitoring in the demo scenario.";
    else if (upper.includes("SOS")) response = "DRISHTI: SOS command acknowledged. Open the Emergency SOS console for structured dispatch.";
    SmsUssdIvrView.smsMessages.push({ type: "outgoing", text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) });
    SmsUssdIvrView.smsMessages.push({ type: "incoming", text: response, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) });
    this.navigate("smsUssdIvr");
  }

  sendSimulatedUssd() {
    const input = document.getElementById("ussd-input-field")?.value.trim() || "1";
    const responses = {
      "1": "NH-29: CRITICAL risk 84/100 in demo scenario.",
      "2": "Report menu: reply REPORT LANDSLIDE KOHIMA.",
      "3": "Emergency: open DRISHTI SOS console or use the SOS speed dial.",
      "4": "Bypass: Niuland - Ghaspani - Kohima Outer Bypass."
    };
    SmsUssdIvrView.ussdScreenText = `DRISHTI NER ROAD INFO\n\n${responses[input] || "Invalid option. Reply 1-4."}\n\nReply with number:`;
    this.navigate("smsUssdIvr");
  }

  playIvrPrompt(step) {
    SmsUssdIvrView.ivrStep = step;
    this.showToast(`IVR prompt ${step} selected. Audio simulation is represented by the on-screen script.`, "info");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    window.drishtiApp = new DrishtiApp();
    window.drishtiApp.init();
  } catch (error) {
    console.error("DRISHTI: Fatal initialization error:", error);
    const root = document.getElementById("app");
    if (root) root.innerHTML = `<div style="padding:40px;font-family:system-ui"><h2>DRISHTI failed to initialize</h2><p>${error.message}</p><pre>${error.stack || ""}</pre></div>`;
  }
});

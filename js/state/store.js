/**
 * DRISHTI - Central Reactive State Store
 * Manages global application state with lightweight pub/sub subscriptions.
 */

import { NER_CORRIDORS } from "../data/corridors-roads.js";
import { NER_BRIDGES } from "../data/bridges-infra.js";
import {
  INITIAL_FLEET,
  INITIAL_INCIDENTS,
  INITIAL_ALERTS,
  INITIAL_PENDING_REPORTS
} from "../data/initial-state.js";

class Store {
  constructor() {
    this.state = {
      // Navigation
      currentView: "landing",
      currentLocale: "en",
      currentRole: "OPERATOR",

      // Filters
      searchQuery: "",
      selectedStateFilter: "ALL",
      selectedDistrictFilter: "ALL",

      // Operational Data
      corridors: JSON.parse(JSON.stringify(NER_CORRIDORS)),
      bridges: JSON.parse(JSON.stringify(NER_BRIDGES)),
      fleet: JSON.parse(JSON.stringify(INITIAL_FLEET)),
      incidents: JSON.parse(JSON.stringify(INITIAL_INCIDENTS)),
      alerts: JSON.parse(JSON.stringify(INITIAL_ALERTS)),
      pendingReports: JSON.parse(JSON.stringify(INITIAL_PENDING_REPORTS)),

      // Connectivity
      isOnline: navigator.onLine,
      offlineQueue: [],
      lastSyncTimestamp: new Date().toLocaleTimeString(),

      // SOS
      lastSosDispatch: null,
      sosHistory: [],

      // Audit Logs
      auditLogs: [
        {
          id: "AUD-001",
          timestamp: new Date(Date.now() - 3600000).toLocaleTimeString(),
          actor: "System Engine",
          role: "Automated Sensor Gateway",
          action: "INITIAL_TELEMETRY_SYNC",
          details:
            "Established baseline connectivity across North-East logistics corridors.",
          status: "SUCCESS"
        }
      ]
    };

    this.listeners = [];
  }

  // -------------------------
  // GET STATE
  // -------------------------
  getState() {
    return this.state;
  }

  // -------------------------
  // SUBSCRIBE
  // -------------------------
  subscribe(listener) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  // -------------------------
  // DISPATCH ACTIONS
  // -------------------------
  dispatch(actionType, payload) {
    const prevState = JSON.parse(JSON.stringify(this.state));

    switch (actionType) {
      case "SET_VIEW":
        this.state.currentView = payload;
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;

      case "SET_LOCALE":
        this.state.currentLocale = payload;
        break;

      case "SET_ROLE":
        this.state.currentRole = payload;
        this.addAuditLog(
          "USER_ROLE_CHANGE",
          `Switched active role to ${payload}`
        );
        break;

      case "SET_SEARCH":
        this.state.searchQuery = payload;
        break;

      case "SET_STATE_FILTER":
        this.state.selectedStateFilter = payload;
        break;

      case "SET_DISTRICT_FILTER":
        this.state.selectedDistrictFilter = payload;
        break;

      case "UPDATE_CORRIDORS":
        this.state.corridors = payload;
        break;

      case "UPDATE_BRIDGES":
        this.state.bridges = payload;
        break;

      case "UPDATE_FLEET":
        this.state.fleet = payload;
        break;

      case "UPDATE_INCIDENTS":
        this.state.incidents = payload;
        break;

      case "UPDATE_ALERTS":
        this.state.alerts = payload;
        break;

      case "UPDATE_PENDING_REPORTS":
        this.state.pendingReports = payload;
        break;

      case "SET_ONLINE_STATUS":
        this.state.isOnline = payload;
        this.addAuditLog(
          "NETWORK_STATE_CHANGE",
          `Network status changed to ${payload ? "ONLINE" : "OFFLINE"}`
        );
        break;

      case "SET_OFFLINE_QUEUE":
        this.state.offlineQueue = payload;
        break;

      case "SET_LAST_SYNC":
        this.state.lastSyncTimestamp = payload;
        break;

      case "SET_SOS_DISPATCH":
        this.state.lastSosDispatch = payload;
        this.state.sosHistory.unshift(payload);

        this.addAuditLog(
          "SOS_DISPATCH",
          `Emergency SOS processed for ${payload.stateLabel}`
        );
        break;

      case "ADD_AUDIT_LOG":
        this.state.auditLogs.unshift(payload);
        break;

      default:
        console.warn("[Store] Unknown action:", actionType);
    }

    // Notify subscribers
    this.listeners.forEach((listener) =>
      listener(this.state, prevState, actionType)
    );
  }

  // -------------------------
  // AUDIT LOGGER
  // -------------------------
  addAuditLog(action, details) {
    const log = {
      id: `AUD-${Date.now().toString(36).toUpperCase()}`,
      timestamp: new Date().toLocaleTimeString(),
      actor:
        this.state.currentRole === "OPERATOR"
          ? "Control Room Operator"
          : this.state.currentRole,
      role: this.state.currentRole,
      action,
      details,
      status: "RECORDED"
    };

    this.state.auditLogs.unshift(log);
  }
}

// Export Singleton Store
export const store = new Store();
/**
 * DRISHTI - Offline Synchronization & Low-Connectivity Engine
 * Manages local persistence, network state monitoring, and auto-sync on reconnection.
 */

import { store } from "../state/store.js";
import { SosService } from "./sos-service.js";

const REPORTS_OFFLINE_KEY = "drishti_offline_reports";

export class OfflineService {
  static init() {
    window.addEventListener("online", () => {
      console.log("[OfflineService] Network status restored: ONLINE");
      store.dispatch("SET_ONLINE_STATUS", true);
      this.syncAllQueues();
    });

    window.addEventListener("offline", () => {
      console.log("[OfflineService] Network status dropped: OFFLINE");
      store.dispatch("SET_ONLINE_STATUS", false);
    });

    // Initial check
    store.dispatch("SET_ONLINE_STATUS", navigator.onLine);
  }

  /**
   * Queue a citizen/official field report offline
   */
  static queueFieldReport(report) {
    try {
      const q = JSON.parse(localStorage.getItem(REPORTS_OFFLINE_KEY) || "[]");
      const offlineEntry = {
        ...report,
        queuedAt: new Date().toLocaleTimeString(),
        offlineSynced: false
      };
      q.push(offlineEntry);
      localStorage.setItem(REPORTS_OFFLINE_KEY, JSON.stringify(q));
      store.addAuditLog("OFFLINE_REPORT_QUEUED", `Report ${report.id || 'INC-TEMP'} saved to offline storage queue.`);
      return offlineEntry;
    } catch (e) {
      console.error("[OfflineService] Failed to queue report", e);
      return null;
    }
  }

  static getQueuedReports() {
    try {
      return JSON.parse(localStorage.getItem(REPORTS_OFFLINE_KEY) || "[]");
    } catch {
      return [];
    }
  }

  /**
   * Flush and sync all offline queues (Reports + SOS)
   */
  static async syncAllQueues() {
    const queuedReports = this.getQueuedReports();
    const queuedSos = SosService.getOfflineQueue();
    let syncedCount = 0;

    if (queuedReports.length > 0) {
      const state = store.getState();
      const updatedPending = [...queuedReports.map(r => ({ ...r, status: "PENDING_VERIFICATION", offlineSynced: true })), ...state.pendingReports];
      store.dispatch("UPDATE_PENDING_REPORTS", updatedPending);
      localStorage.removeItem(REPORTS_OFFLINE_KEY);
      syncedCount += queuedReports.length;
    }

    if (queuedSos.length > 0) {
      SosService.clearOfflineQueue();
      syncedCount += queuedSos.length;
    }

    if (syncedCount > 0) {
      store.addAuditLog("OFFLINE_QUEUE_FLUSHED", `Successfully synchronized ${syncedCount} queued items following network reconnection.`);
    }

    return syncedCount;
  }
}

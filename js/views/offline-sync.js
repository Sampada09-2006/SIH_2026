/**
 * DRISHTI - Offline Synchronization & Low-Connectivity Monitor View
 * Manages IndexedDB / localStorage offline queues and simulated network disconnection.
 */

import { store } from "../state/store.js";
import { renderIcon } from "../icons.js";
import { OfflineService } from "../services/offline-service.js";
import { SosService } from "../services/sos-service.js";

export class OfflineSyncView {
  static render() {
    const state = store.getState();
    const queuedReports = OfflineService.getQueuedReports();
    const queuedSos = SosService.getOfflineQueue();
    const totalQueued = queuedReports.length + queuedSos.length;

    return `
      <div class="view-header">
        <div class="view-title-group">
          <h2>Low-Connectivity & Offline Synchronization</h2>
          <p>Local queue management for remote Northeastern valleys with zero cell coverage.</p>
        </div>
        <div class="view-actions-group">
          <span class="badge ${state.isOnline ? 'badge-green' : 'badge-red'} font-bold">
            ${renderIcon(state.isOnline ? "wifi" : "wifi-off", { size: 14 })} ${state.isOnline ? 'NETWORK ONLINE' : 'OFFLINE MODE (QUEUED)'}
          </span>
          <button class="btn btn-secondary btn-sm" onclick="window.drishtiApp.toggleSimulatedNetwork()">
            ${renderIcon("refresh-cw", { size: 14 })} Toggle Simulated Connection (${state.isOnline ? 'Go Offline' : 'Go Online'})
          </button>
        </div>
      </div>

      <div class="grid grid-2 gap-6" style="max-width: 1000px; margin: 0 auto;">
        <!-- Status Card -->
        <div class="drishti-card">
          <div class="drishti-card-header">
            <div>
              <div class="drishti-card-title">${renderIcon("database", { size: 18, color: "var(--accent-gold)" })} Local Queue Status</div>
              <div class="drishti-card-subtitle">Transactions stored in client-side storage</div>
            </div>
            <span class="badge badge-gold font-mono">${totalQueued} Pending</span>
          </div>

          <div style="margin-bottom: var(--space-4);">
            <div class="stat-card" style="background: var(--bg-surface-alt); margin-bottom: var(--space-3);">
              <div class="stat-label">Pending Field Incident Reports</div>
              <div class="stat-value font-mono">${queuedReports.length}</div>
              <div class="stat-subtext">Will push to Control Room on reconnect</div>
            </div>

            <div class="stat-card" style="background: var(--bg-surface-alt);">
              <div class="stat-label">Queued Emergency SOS Events</div>
              <div class="stat-value font-mono">${queuedSos.length}</div>
              <div class="stat-subtext">Will auto-dispatch to SDMA endpoints</div>
            </div>
          </div>

          <button class="btn btn-primary" style="width: 100%;" onclick="window.drishtiApp.flushOfflineQueues()" ${totalQueued === 0 ? 'disabled' : ''}>
            ${renderIcon("refresh-cw", { size: 16 })} Force Flush & Synchronize Queues
          </button>
        </div>

        <!-- Offline Protocol Architecture Info -->
        <div class="drishti-card">
          <div class="drishti-card-title" style="margin-bottom: var(--space-4);">
            ${renderIcon("shield-check", { size: 18, color: "var(--accent-gold)" })} How DRISHTI Works in Zero-Coverage Zones
          </div>

          <div style="font-size: var(--text-sm); line-height: 1.6; color: var(--text-secondary);">
            <p style="margin-bottom: var(--space-3);">
              In mountain valleys of Arunachal Pradesh, Nagaland, and Sikkim where 4G/5G data is intermittent or absent:
            </p>

            <ul style="margin-left: 20px; font-size: var(--text-xs); color: var(--text-secondary); margin-bottom: var(--space-4);">
              <li style="margin-bottom: 6px;"><strong>Local Storage First:</strong> Field submissions and GPS fixes are written to client-side storage instantly.</li>
              <li style="margin-bottom: 6px;"><strong>Automatic Reconnection Sweep:</strong> The Service Worker & offline service monitor window connectivity events and batch-transmit payloads as soon as network returns.</li>
              <li style="margin-bottom: 6px;"><strong>2G Fallback Integration:</strong> When internet is completely blocked, drivers can utilize SMS or USSD commands (*999*29#) over basic cellular towers.</li>
            </ul>

            <button class="btn btn-secondary btn-sm" onclick="window.drishtiApp.navigate('smsUssdIvr')">
              Open 2G Feature Phone Simulator
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

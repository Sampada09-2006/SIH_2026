/**
 * DRISHTI - Emergency SOS & Authority Dispatch Service
 * Responsibilities:
 *  1. Geolocation capture (GPS with fallback).
 *  2. Resolves state SDMA & national NDMA authority recipients (safe default demo placeholders).
 *  3. Dispatches payload to backend `POST /api/sos`.
 *  4. Gracefully degrades to SIMULATED DISPATCH if offline or SMTP is unconfigured (never hangs/throws).
 *  5. Local storage offline queue + mailto: emergency fallback.
 */

import { resolveAuthorityRecipients } from "../data/ner-geography.js";
import { store } from "../state/store.js";

const SOS_OFFLINE_KEY = "drishti_sos_offline_queue";

export class SosService {
  /**
   * Request live browser GPS coordinates
   */
  static getPosition(timeoutMs = 8000) {
    return new Promise((resolve) => {
      if (!("geolocation" in navigator)) {
        return resolve(null);
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            lat: Number(pos.coords.latitude.toFixed(6)),
            lng: Number(pos.coords.longitude.toFixed(6)),
            accuracyM: Math.round(pos.coords.accuracy || 15)
          });
        },
        (err) => {
          console.warn("[SOS] Geolocation not granted, proceeding with state defaults", err);
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: timeoutMs, maximumAge: 30000 }
      );
    });
  }

  /**
   * Build structured distress payload
   */
  static buildPayload({ stateId, stateLabel, emergencyType, peopleCount, description, contactName, contactPhone, coords }) {
    const recipients = resolveAuthorityRecipients(stateId).map(r => ({
      name: r.name,
      role: r.role,
      email: r.email
    }));

    return {
      sosId: `SOS-${Date.now().toString(36).toUpperCase()}`,
      raisedAtIso: new Date().toISOString(),
      timestampFormatted: new Date().toLocaleTimeString(),
      stateId,
      stateLabel,
      emergencyType: emergencyType || "Landslide / Road Obstruction",
      peopleCount: Number(peopleCount) || 1,
      description: (description || "Emergency distress signal raised through DRISHTI.").slice(0, 1200),
      contactName: (contactName || "Citizen / Logistics Driver").slice(0, 120),
      contactPhone: (contactPhone || "+91-90000-00000").slice(0, 30),
      coords: coords || { lat: 25.6740, lng: 94.1100, accuracyM: 25 },
      mapLink: coords ? `https://www.google.com/maps?q=${coords.lat},${coords.lng}` : null,
      recipients,
      source: "DRISHTI Integrated Emergency Console"
    };
  }

  /**
   * Dispatch distress signal to backend /api/sos
   */
  static async dispatch(payload) {
    const isOnline = navigator.onLine;

    if (!isOnline) {
      this.queueOffline(payload);
      const result = {
        ok: true,
        deliveryMode: "OFFLINE_QUEUED",
        statusBadge: "QUEUED OFFLINE (NO NETWORK)",
        emailDraft: this.generateLocalDraft(payload),
        payload
      };
      store.dispatch("SET_SOS_DISPATCH", result);
      return result;
    }

    try {
      const response = await fetch("/api/sos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => ({}));
      const deliveryMode = data.deliveryMode || "SIMULATED_DISPATCH";
      const isLiveSmtp = deliveryMode === "LIVE_SMTP";

      const result = {
        ok: true,
        deliveryMode: isLiveSmtp ? "LIVE_SMTP" : "SIMULATED_DISPATCH",
        statusBadge: isLiveSmtp ? "LIVE SMTP TRANSMISSION" : "SIMULATED DISPATCH (DEMO MODE)",
        emailDraft: data.emailBody || this.generateLocalDraft(payload),
        sentTo: data.sentTo || payload.recipients.map(r => r.email),
        draftingEngine: data.draftingEngine || "Deterministic Template",
        payload
      };

      store.dispatch("SET_SOS_DISPATCH", result);
      return result;
    } catch (err) {
      console.warn("[SOS] Server API unreachable, falling back safely to simulated demo dispatch", err);
      const fallbackResult = {
        ok: true,
        deliveryMode: "SIMULATED_DISPATCH",
        statusBadge: "SIMULATED DISPATCH (DEMO MODE)",
        emailDraft: this.generateLocalDraft(payload),
        sentTo: payload.recipients.map(r => r.email),
        draftingEngine: "Local Fallback Template",
        payload
      };
      store.dispatch("SET_SOS_DISPATCH", fallbackResult);
      return fallbackResult;
    }
  }

  /**
   * Queue distress request in offline store
   */
  static queueOffline(payload) {
    try {
      const q = JSON.parse(localStorage.getItem(SOS_OFFLINE_KEY) || "[]");
      q.push(payload);
      localStorage.setItem(SOS_OFFLINE_KEY, JSON.stringify(q));
      store.dispatch("SET_OFFLINE_QUEUE", q);
    } catch (e) {
      console.error("[SOS] Offline queue write error", e);
    }
  }

  static getOfflineQueue() {
    try {
      return JSON.parse(localStorage.getItem(SOS_OFFLINE_KEY) || "[]");
    } catch {
      return [];
    }
  }

  static clearOfflineQueue() {
    localStorage.removeItem(SOS_OFFLINE_KEY);
    store.dispatch("SET_OFFLINE_QUEUE", []);
  }

  /**
   * Deterministic distress email text generator
   */
  static generateLocalDraft(p) {
    const loc = p.coords
      ? `Latitude ${p.coords.lat}, Longitude ${p.coords.lng} (Accuracy: ~${p.coords.accuracyM || 25}m)\nMap Link: https://www.google.com/maps?q=${p.coords.lat},${p.coords.lng}`
      : "GPS coordinates not available on device.";

    return [
      `SUBJECT: [URGENT SOS - REF: ${p.sosId}] ${p.emergencyType.toUpperCase()} IN ${p.stateLabel.toUpperCase()}`,
      ``,
      `TO: ${p.recipients.map(r => `${r.name} <${r.email}>`).join(", ")}`,
      ``,
      `Respected Disaster Management Authority / Control Room,`,
      ``,
      `An emergency distress alert has been raised via the DRISHTI AI Logistics & Accessibility Platform at ${new Date(p.raisedAtIso).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}.`,
      ``,
      `EMERGENCY DETAILS:`,
      `• Reference ID   : ${p.sosId}`,
      `• Calamity Type  : ${p.emergencyType}`,
      `• State / Region : ${p.stateLabel}`,
      `• Persons Impacted: ${p.peopleCount}`,
      `• Reported By    : ${p.contactName} (Contact: ${p.contactPhone})`,
      ``,
      `GEOLOCATION:`,
      loc,
      ``,
      `SITUATION DESCRIPTION:`,
      p.description || "Immediate road clearance and rescue relief requested.",
      ``,
      `ACTION REQUESTED:`,
      `Immediate dispatch of NDRF/SDRF emergency quick-response team and heavy road clearance machinery to the indicated GPS coordinate point.`,
      ``,
      `---`,
      `DRISHTI Autonomous Emergency Dispatch Gateway (SIH26002)`
    ].join("\n");
  }

  /**
   * Native mailto: fallback link for basic phone/client fallback
   */
  static getMailtoUrl(payload) {
    const to = payload.recipients.map(r => r.email).join(",");
    const subject = `[URGENT SOS - ${payload.sosId}] ${payload.emergencyType} - ${payload.stateLabel}`;
    const body = this.generateLocalDraft(payload);
    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}

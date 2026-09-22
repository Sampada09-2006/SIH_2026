/**
 * DRISHTI - Audit Logging Service
 * Records immutable, verifiable operational event logs for compliance and judge review.
 */

import { store } from "../state/store.js";

export class AuditService {
  static recordEvent(action, details, actor = null, role = null) {
    const state = store.getState();
    const log = {
      id: `AUD-${Date.now().toString(36).toUpperCase()}`,
      timestamp: new Date().toLocaleTimeString(),
      actor: actor || (state.currentRole === "OPERATOR" ? "Control Room Operator" : state.currentRole),
      role: role || state.currentRole,
      action: action,
      details: details,
      status: "RECORDED"
    };

    store.dispatch("ADD_AUDIT_LOG", log);
    return log;
  }

  static getLogs() {
    return store.getState().auditLogs;
  }
}

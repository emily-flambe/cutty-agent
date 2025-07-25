/**
 * Global Session Manager
 *
 * Provides a way for tool executions to access session state
 * This is a temporary solution until we can properly pass context
 */

import type { GeneratedFileInfo } from "./session-state";
import { SessionStateManager } from "./session-state";

// Map of session IDs to their state managers
const sessionManagers = new Map<string, SessionStateManager>();

// Current active session (set by the server before processing)
let currentSessionId: string | null = null;

export const globalSessionManager = {
  /**
   * Clean up old sessions (call periodically)
   */
  cleanup(maxAgeMs: number = 24 * 60 * 60 * 1000) {
    const now = Date.now();
    for (const [sessionId, manager] of sessionManagers.entries()) {
      const state = manager.getState();
      const lastActivity = new Date(state.lastActivity).getTime();
      if (now - lastActivity > maxAgeMs) {
        sessionManagers.delete(sessionId);
      }
    }
  },

  /**
   * Get the current session manager
   */
  getCurrentSessionManager(): SessionStateManager | null {
    if (!currentSessionId) return null;
    return sessionManagers.get(currentSessionId) || null;
  },

  /**
   * Get the last generated file for the current session
   */
  getLastGeneratedFile(): GeneratedFileInfo | null {
    const manager = this.getCurrentSessionManager();
    return manager ? manager.getLastGeneratedFile() : null;
  },
  /**
   * Set the current active session
   */
  setCurrentSession(sessionId: string) {
    currentSessionId = sessionId;
    if (!sessionManagers.has(sessionId)) {
      sessionManagers.set(sessionId, new SessionStateManager(sessionId));
    }
  },

  /**
   * Store generated file info for the current session
   */
  storeGeneratedFile(fileInfo: GeneratedFileInfo): void {
    const manager = this.getCurrentSessionManager();
    if (manager) {
      manager.addGeneratedFile(fileInfo);
    }
  },
};

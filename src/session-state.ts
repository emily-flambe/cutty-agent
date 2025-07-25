/**
 * Session State Management for Durable Objects
 *
 * Manages file generation history and session data within Durable Objects
 * instead of relying on browser window globals
 */

export interface GeneratedFileInfo {
  fileId: string;
  downloadUrl: string;
  filename: string;
  generatedAt: string;
  metadata?: {
    recordCount?: number;
    states?: string[];
  };
}

export interface SessionState {
  generatedFiles: GeneratedFileInfo[];
  lastActivity: string;
  sessionId: string;
}

export class SessionStateManager {
  private state: SessionState;

  constructor(sessionId: string) {
    this.state = {
      generatedFiles: [],
      lastActivity: new Date().toISOString(),
      sessionId,
    };
  }

  /**
   * Add a newly generated file to the session
   */
  addGeneratedFile(fileInfo: GeneratedFileInfo): void {
    this.state.generatedFiles.push(fileInfo);
    this.state.lastActivity = new Date().toISOString();

    // Keep only the last 10 files to prevent unbounded growth
    if (this.state.generatedFiles.length > 10) {
      this.state.generatedFiles = this.state.generatedFiles.slice(-10);
    }
  }

  /**
   * Get the most recently generated file
   */
  getLastGeneratedFile(): GeneratedFileInfo | null {
    if (this.state.generatedFiles.length === 0) {
      return null;
    }
    return this.state.generatedFiles[this.state.generatedFiles.length - 1];
  }

  /**
   * Get a specific file by ID
   */
  getFileById(fileId: string): GeneratedFileInfo | null {
    return this.state.generatedFiles.find((f) => f.fileId === fileId) || null;
  }

  /**
   * Get all generated files in this session
   */
  getAllGeneratedFiles(): GeneratedFileInfo[] {
    return [...this.state.generatedFiles];
  }

  /**
   * Clear all generated files (useful for cleanup)
   */
  clearGeneratedFiles(): void {
    this.state.generatedFiles = [];
    this.state.lastActivity = new Date().toISOString();
  }

  /**
   * Get the full session state
   */
  getState(): SessionState {
    return { ...this.state };
  }

  /**
   * Restore session state (useful when rehydrating from storage)
   */
  setState(state: SessionState): void {
    this.state = { ...state };
  }
}

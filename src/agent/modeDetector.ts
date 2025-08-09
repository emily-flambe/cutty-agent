/**
 * Mode Detection Logic for Cutty Agent Hybrid Mode
 * 
 * Determines whether a user message requires agent mode (with tools) 
 * or can be handled in simple chat mode (conversation only)
 */

export interface ModeAnalysis {
  mode: 'simple' | 'agent';
  confidence: number;
  reason: string;
}

export class ModeDetector {
  // Patterns that trigger agent mode
  private static AGENT_TRIGGERS = [
    // Data generation
    /\b(generate|create|make)\s+.*(data|csv|file|list)/i,
    /\b(synthetic|fake|sample|test)\s+data/i,
    
    // File operations
    /\b(download|export|save)\s+/i,
    /\bget\s+.*file/i,
    
    // Specific tool queries
    /\b(what|which|list)\s+(states|countries|regions)/i,
    /\bsupported\s+(states|locations)/i,
    
    // Action verbs indicating tool use
    /\b(calculate|compute|analyze|process)\s+/i,
    /\b(fetch|retrieve|pull|get)\s+.*(from|using)/i,
    
    // Explicit agent requests
    /\b(use|run|execute)\s+(tool|function|action)/i,
    /\bagent\s+mode/i
  ];

  /**
   * Determines the appropriate mode for handling a user message
   * @param message - The user's input message
   * @returns 'simple' for conversational mode, 'agent' for tool-enabled mode
   */
  static detectMode(message: string): 'simple' | 'agent' {
    // Check for explicit mode hints
    if (message.toLowerCase().includes('[simple]')) return 'simple';
    if (message.toLowerCase().includes('[agent]')) return 'agent';
    
    // Pattern matching for agent triggers
    const requiresAgent = this.AGENT_TRIGGERS.some(pattern => 
      pattern.test(message)
    );
    
    return requiresAgent ? 'agent' : 'simple';
  }
  
  /**
   * Performs detailed analysis of user intent including confidence scoring
   * @param message - The user's input message
   * @returns Analysis object with mode, confidence, and reasoning
   */
  static analyzeIntent(message: string): ModeAnalysis {
    const mode = this.detectMode(message);
    
    // Calculate confidence based on pattern matches
    const matches = this.AGENT_TRIGGERS.filter(pattern => pattern.test(message));
    const confidence = mode === 'agent' 
      ? Math.min(0.5 + (matches.length * 0.2), 1.0)
      : 0.9; // High confidence for simple mode
    
    const reason = mode === 'agent'
      ? `Detected action intent: ${matches.length} trigger patterns`
      : 'No action triggers detected - using conversational mode';
    
    return { mode, confidence, reason };
  }

  /**
   * Gets the matched trigger patterns for debugging purposes
   * @param message - The user's input message
   * @returns Array of regex patterns that matched the message
   */
  static getMatchedTriggers(message: string): RegExp[] {
    return this.AGENT_TRIGGERS.filter(pattern => pattern.test(message));
  }

  /**
   * Checks if a message contains explicit mode override hints
   * @param message - The user's input message
   * @returns Object indicating if override is present and which mode
   */
  static checkModeOverride(message: string): {
    hasOverride: boolean;
    mode?: 'simple' | 'agent';
  } {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('[simple]')) {
      return { hasOverride: true, mode: 'simple' };
    }
    if (lowerMessage.includes('[agent]')) {
      return { hasOverride: true, mode: 'agent' };
    }
    return { hasOverride: false };
  }
}
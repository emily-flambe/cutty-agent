/**
 * WebSocket Protocol Types for Cutty Agent Hybrid Mode
 * 
 * Enhanced WebSocket message protocol supporting dual-mode operation:
 * - Simple Chat: Fast, conversational responses
 * - Agent Mode: Tool-enabled, full capability responses
 * 
 * Maintains backward compatibility with existing WebSocket implementation
 */

/**
 * Base message structure for backward compatibility
 */
export interface BaseMessage {
  id?: string;
  message?: string;
  content?: string;
  context?: Record<string, any>;
  timestamp?: number;
}

/**
 * Enhanced message interface with hybrid mode support
 * Extends BaseMessage to preserve backward compatibility
 */
export interface EnhancedMessage extends BaseMessage {
  // Core message content
  id: string;
  content: string;
  timestamp: number;
  
  // Backward compatibility - existing frontend sends 'message' field
  message?: string;
  context?: Record<string, any>;
  
  // NEW: Mode control hints
  preferredMode?: 'simple' | 'agent' | 'auto';
  forceMode?: boolean; // Override automatic detection
  
  // NEW: Response metadata (populated in response messages)
  responseMetadata?: ResponseMetadata;
}

/**
 * Response metadata providing insights into message processing
 */
export interface ResponseMetadata {
  // Processing mode used
  mode: 'simple' | 'agent';
  
  // Detection confidence (0-1)
  confidence: number;
  
  // Processing details
  modelUsed?: string;
  toolsUsed?: string[];
  tokensUsed?: number;
  latency?: number;
  
  // Mode detection reasoning
  reason?: string;
  
  // Error information (if applicable)
  error?: {
    type: string;
    message: string;
    fallbackUsed?: boolean;
  };
}

/**
 * WebSocket message types for different interaction patterns
 */
export type WSMessageType = 
  | 'user_message'        // User input message
  | 'simple_response'     // Simple chat mode response  
  | 'agent_response'      // Agent mode response
  | 'tool_invocation'     // Tool execution notification
  | 'error'               // Error message
  | 'mode_switch'         // Mode change notification
  | 'system_status';      // System status update

/**
 * Structured WebSocket message wrapper
 */
export interface WSMessageWrapper {
  type: WSMessageType;
  id: string;
  timestamp: number;
  data: EnhancedMessage | ResponseData | ErrorData | SystemStatus;
}

/**
 * Response data structure for agent responses
 */
export interface ResponseData {
  content: string;
  metadata: ResponseMetadata;
  toolCalls?: ToolCall[];
  streamId?: string; // For streaming responses
}

/**
 * Tool call information
 */
export interface ToolCall {
  id: string;
  name: string;
  parameters: Record<string, any>;
  result?: any;
  status: 'pending' | 'executing' | 'completed' | 'failed';
  executionTime?: number;
}

/**
 * Error data structure
 */
export interface ErrorData {
  code: string;
  message: string;
  details?: Record<string, any>;
  recoverable?: boolean;
}

/**
 * System status information
 */
export interface SystemStatus {
  status: 'online' | 'degraded' | 'offline';
  capabilities: {
    simpleChat: boolean;
    agentMode: boolean;
    toolsAvailable: string[];
  };
  performance?: {
    averageLatency: number;
    successRate: number;
  };
}

/**
 * Mode analysis result from ModeDetector
 */
export interface ModeAnalysis {
  mode: 'simple' | 'agent';
  confidence: number;
  reason: string;
  triggers?: string[]; // Matched trigger patterns
  override?: {
    forced: boolean;
    source: 'user' | 'system';
  };
}

/**
 * Configuration options for message processing
 */
export interface MessageProcessingOptions {
  // Mode control
  defaultMode?: 'simple' | 'agent';
  confidenceThreshold?: number;
  
  // Performance settings
  maxTokens?: number;
  streamResponse?: boolean;
  
  // Tool execution settings
  allowToolExecution?: boolean;
  toolTimeout?: number;
  
  // Session management
  sessionId?: string;
  preserveContext?: boolean;
}

/**
 * Legacy message format support
 * Maintains compatibility with existing frontend implementation
 */
export interface LegacyMessage {
  message: string;
  context?: Record<string, any>;
}

/**
 * Message transformation utilities
 */
export namespace MessageTransform {
  /**
   * Converts legacy message format to enhanced format
   */
  export function fromLegacy(legacy: LegacyMessage, id?: string): EnhancedMessage {
    return {
      id: id || generateMessageId(),
      content: legacy.message,
      message: legacy.message, // Preserve for backward compatibility
      context: legacy.context,
      timestamp: Date.now(),
      preferredMode: 'auto' // Use automatic detection
    };
  }
  
  /**
   * Converts enhanced message to legacy format
   */
  export function toLegacy(enhanced: EnhancedMessage): LegacyMessage {
    return {
      message: enhanced.content || enhanced.message || '',
      context: enhanced.context
    };
  }
  
  /**
   * Extracts mode hints from message content
   */
  export function extractModeHints(content: string): {
    cleanContent: string;
    preferredMode?: 'simple' | 'agent';
    forceMode?: boolean;
  } {
    const lowerContent = content.toLowerCase();
    
    // Check for explicit mode hints
    if (lowerContent.includes('[simple]')) {
      return {
        cleanContent: content.replace(/\[simple\]/gi, '').trim(),
        preferredMode: 'simple',
        forceMode: true
      };
    }
    
    if (lowerContent.includes('[agent]')) {
      return {
        cleanContent: content.replace(/\[agent\]/gi, '').trim(),
        preferredMode: 'agent',
        forceMode: true
      };
    }
    
    return { cleanContent: content };
  }
}

/**
 * Utility functions
 */
export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function isEnhancedMessage(message: any): message is EnhancedMessage {
  return message && typeof message === 'object' && 
         (message.content || message.message) && 
         message.timestamp;
}

export function isLegacyMessage(message: any): message is LegacyMessage {
  return message && typeof message === 'object' && 
         message.message && 
         !message.timestamp;
}

/**
 * WebSocket event types for type-safe event handling
 */
export interface WSEvents {
  'message': (message: EnhancedMessage) => void;
  'response': (response: ResponseData) => void;
  'error': (error: ErrorData) => void;
  'mode_change': (analysis: ModeAnalysis) => void;
  'tool_start': (tool: ToolCall) => void;
  'tool_complete': (tool: ToolCall) => void;
  'system_status': (status: SystemStatus) => void;
}

/**
 * Type guard for WebSocket message validation
 */
export function validateMessage(message: unknown): message is EnhancedMessage {
  if (!message || typeof message !== 'object') return false;
  
  const msg = message as any;
  
  // Must have either content or message (for backward compatibility)
  if (!msg.content && !msg.message) return false;
  
  // If it has enhanced fields, validate them
  if (msg.preferredMode && !['simple', 'agent', 'auto'].includes(msg.preferredMode)) {
    return false;
  }
  
  if (msg.forceMode && typeof msg.forceMode !== 'boolean') {
    return false;
  }
  
  return true;
}

/**
 * Default values and constants
 */
export const DEFAULT_PROCESSING_OPTIONS: MessageProcessingOptions = {
  defaultMode: 'simple',
  confidenceThreshold: 0.7,
  maxTokens: 1000,
  streamResponse: true,
  allowToolExecution: true,
  toolTimeout: 30000,
  preserveContext: true
};

export const MESSAGE_TYPES = {
  USER_MESSAGE: 'user_message',
  SIMPLE_RESPONSE: 'simple_response',
  AGENT_RESPONSE: 'agent_response',
  TOOL_INVOCATION: 'tool_invocation',
  ERROR: 'error',
  MODE_SWITCH: 'mode_switch',
  SYSTEM_STATUS: 'system_status'
} as const;

export const MODES = {
  SIMPLE: 'simple',
  AGENT: 'agent',
  AUTO: 'auto'
} as const;
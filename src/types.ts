/**
 * Basic type definitions for Cutty Agent
 * Re-exports from websocket protocol for backward compatibility
 */

// Re-export all types from the websocket protocol
export type {
  BaseMessage,
  EnhancedMessage,
  ResponseMetadata,
  WSMessageType,
  WSMessageWrapper,
  ResponseData,
  ToolCall,
  ErrorData,
  SystemStatus,
  ModeAnalysis,
  MessageProcessingOptions,
  LegacyMessage,
  WSEvents
} from './websocket/protocol';

// Re-export utility functions
export {
  MessageTransform,
  generateMessageId,
  isEnhancedMessage,
  isLegacyMessage,
  validateMessage,
  DEFAULT_PROCESSING_OPTIONS,
  MESSAGE_TYPES,
  MODES
} from './websocket/protocol';

// Additional types that might be needed by other parts of the system
export interface SessionInfo {
  sessionId: string;
  startTime: number;
  messageCount: number;
  lastActivity: number;
}

export interface AgentCapabilities {
  simpleChat: boolean;
  toolExecution: boolean;
  fileGeneration: boolean;
  dataProcessing: boolean;
}

export interface AgentConfig {
  defaultMode: 'simple' | 'agent' | 'auto';
  maxTokens: number;
  timeout: number;
  capabilities: AgentCapabilities;
}
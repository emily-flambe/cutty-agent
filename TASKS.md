# Cutty Agent Action Enablement Tasks

## Overview

Enable the Cutty chat agent to perform actions within the Cutty app, starting with synthetic data generation.

## Phase 1: Basic Action Framework ✅

- [x] Create API client for Cutty app communication (`src/cutty-api.ts`)
- [x] Add action tools to agent (`generateSyntheticData`, `downloadGeneratedData`)
- [x] Implement tool executions with proper error handling
- [x] Update frontend to support new confirmation-required tools
- [x] Create implementation spec documentation

## Phase 2: Integration Testing & Fixes 🚧

- [ ] Fix npm dependency issues (@ai-sdk/anthropic version mismatch)
- [ ] Ensure both servers can run simultaneously (agent on 8789, cutty on 8787)
- [ ] Test cross-origin requests between agent and Cutty app
- [ ] Verify tool confirmation flow works end-to-end
- [ ] Test file download functionality

## Phase 3: Enhanced Actions 📋

- [ ] Add action: Fill out synthetic data form programmatically
  - [ ] Parse natural language requests (e.g., "Generate 50 records for California")
  - [ ] Map to form fields (count, states)
  - [ ] Trigger form submission
- [ ] Add action: Check generation status
  - [ ] Poll for completion
  - [ ] Report progress to user
- [ ] Add action: List previously generated files
  - [ ] Store generation history in session
  - [ ] Allow re-downloading old files

## Phase 4: Advanced Integration 🔄

- [ ] Event-based communication
  - [ ] Emit events from agent to Cutty app
  - [ ] Listen for completion events from Cutty app
- [ ] Form auto-fill via browser automation
  - [ ] Dispatch custom events to fill form fields
  - [ ] Trigger button clicks programmatically
- [ ] Progress tracking
  - [ ] Real-time generation progress
  - [ ] Estimated completion time

## Phase 5: User Experience 🎨

- [ ] Natural language improvements
  - [ ] Better parameter extraction from user requests
  - [ ] Suggest corrections for invalid inputs
  - [ ] Provide helpful examples
- [ ] Error recovery
  - [ ] Retry failed generations
  - [ ] Clear error messages with actionable steps
  - [ ] Fallback options
- [ ] Batch operations
  - [ ] Generate multiple files with different parameters
  - [ ] Queue management

## Technical Debt & Improvements 🔧

- [ ] Replace window global storage with proper session state
- [ ] Add TypeScript types for all API responses
- [ ] Implement proper authentication flow
- [ ] Add unit tests for tool executions
- [ ] Add integration tests for API client
- [ ] Improve CORS handling

## Security Considerations 🔒

- [ ] Validate all tool parameters
- [ ] Rate limiting for generation requests
- [ ] Secure file storage and access
- [ ] Audit logging for actions

## Documentation 📚

- [ ] User guide for natural language commands
- [ ] Developer guide for adding new actions
- [ ] API documentation for Cutty integration
- [ ] Troubleshooting guide

## Known Issues 🐛

- [ ] npm version mismatch for @ai-sdk/anthropic (1.3.0 doesn't exist)
- [ ] CORS may need configuration for cross-origin requests
- [ ] Session state persistence across page refreshes

## Next Steps

1. Fix npm dependencies
2. Test basic synthetic data generation flow
3. Implement form auto-fill functionality
4. Add progress tracking and status updates

# Cutty Agent Synthetic Data Actions - TODO List

## Overview

Task list for implementing synthetic data generation capabilities in the Cutty chat agent, enabling users to generate and download synthetic patient data through natural language commands.

## High Priority Tasks

### 1. Configure CuttyAPIClient to use production Cutty backend URL instead of localhost

**Status**: In Progress  
**File**: `src/cutty-api.ts`

- Update baseURL default from `http://localhost:8787` to production URL
- Consider environment-based configuration

### 2. Update server.ts to properly handle tool confirmation for generateSyntheticData

**Status**: Pending  
**File**: `src/server.ts`

- Ensure tool confirmations are processed correctly
- Handle confirmation responses in the message flow

### 3. Add generateSyntheticData and downloadGeneratedData to toolsRequiringConfirmation list

**Status**: Pending  
**File**: `src/app.tsx`

- Uncomment or add tools to the confirmation array
- Test confirmation UI flow

### 4. Test CORS configuration for API calls from agent to Cutty backend

**Status**: Pending

- Verify agent domain is in Cutty's allowed origins
- Test preflight requests succeed
- Ensure credentials are handled properly

### 5. Test full end-to-end flow with actual synthetic data generation

**Status**: Pending

- Test natural language request parsing
- Verify tool execution
- Confirm file download works
- Test error scenarios

## Medium Priority Tasks

### 6. Implement downloadGeneratedData tool with proper browser context handling

**Status**: Pending  
**File**: `src/tools.ts`

- Remove dependency on browser window object
- Use proper session state management

### 7. Update server.ts to store generated file info in Durable Object session state

**Status**: Pending  
**File**: `src/server.ts`

- Store file metadata in DO state
- Implement proper session persistence
- Handle state retrieval for downloads

### 8. Add error handling for network failures and API errors

**Status**: Pending  
**Files**: `src/tools.ts`, `src/cutty-api.ts`

- Implement retry logic
- Add user-friendly error messages
- Handle edge cases gracefully

## Low Priority Tasks

### 9. Implement session-based storage for generated file history (last 5 files)

**Status**: Pending

- Store generation history in session
- Implement circular buffer for last 5 files
- Add ability to re-download previous files

### 10. Update documentation with new tool capabilities and usage examples

**Status**: Pending  
**Files**: Various `.md` files in `.project/`

- Document new tools in API agreements
- Add usage examples
- Update integration guide

## Dependencies

### Cutty App Requirements

See `cutty-app-implementation-steps.md` for required changes in the main Cutty application:

- WebSocket proxy enhancements
- CORS configuration
- API endpoint implementation
- Frontend message handling

## Success Criteria

- User can ask agent to generate synthetic data via chat
- Tool confirmation flow works smoothly
- Generated files download successfully
- Errors are handled gracefully
- Session state persists across messages

# Agent Synthetic Data Actions Implementation Spec

## Overview

Enable the Cutty chat agent to perform synthetic data generation actions in the Cutty app, specifically allowing users to generate and download synthetic patient data through natural language commands.

## Use Case

User asks the agent: "Generate 100 synthetic patient records for California"
Agent responds: "I'll generate 100 synthetic patient records for California for you."
[Tool confirmation dialog appears]
User clicks "Approve"
Agent executes the generation and provides a download link

## Architecture

### Components

1. **Agent Tools** (src/tools.ts)
   - `generateSyntheticData`: Generate synthetic patient records
   - `downloadGeneratedData`: Download previously generated data
   - `getSyntheticDataStatus`: Check status of generation (read-only)

2. **API Client** (src/cutty-api.ts)
   - Handles communication with Cutty app backend
   - Manages API endpoints and authentication
   - Error handling and response parsing

3. **Tool Executions** (src/tools.ts)
   - Implementation of confirmation-required tools
   - API calls to Cutty backend
   - Response handling and user feedback

4. **Frontend Integration** (src/app.tsx)
   - Tool confirmation UI (existing)
   - Download handling
   - Session state management

## Implementation Details

### 1. API Client Structure

```typescript
// src/cutty-api.ts
class CuttyAPIClient {
  private baseURL: string;

  async generateSyntheticData(params: {
    count: number;
    states?: string[];
  }): Promise<SyntheticDataResponse>;

  async getSupportedStates(): Promise<string[]>;

  async downloadFile(fileId: string): Promise<Blob>;
}
```

### 2. Tool Definitions

```typescript
// New tools in src/tools.ts
export const generateSyntheticData = tool({
  description: "Generate synthetic patient data for testing",
  parameters: z.object({
    count: z.number().min(1).max(1000),
    states: z.array(z.string()).optional(),
  }),
});

export const downloadGeneratedData = tool({
  description: "Download generated synthetic data",
  parameters: z.object({
    fileId: z.string().optional(),
  }),
});
```

### 3. Tool Executions

```typescript
// In executions object
generateSyntheticData: async ({ count, states }) => {
  // Call API
  // Handle response
  // Return user-friendly message with download info
},

downloadGeneratedData: async ({ fileId }) => {
  // Trigger download
  // Return confirmation
}
```

### 4. Frontend Updates

- Add new tools to `toolsRequiringConfirmation` array
- Handle download URLs in session state
- Display generation progress

## API Endpoints Used

1. **GET** `/api/v1/synthetic-data/supported-states`
   - Returns list of supported state codes

2. **POST** `/api/v1/synthetic-data/generate`
   - Body: `{ count: number, states?: string[] }`
   - Returns: File metadata with download URL

3. **GET** `/api/v1/synthetic-data/download/{fileId}`
   - Returns: CSV file download

## Session State Management

Store in agent session:

- Last generated file ID
- Download URL
- Generation history (last 5)
- Generation timestamp

## Error Handling

1. **API Errors**
   - Network failures
   - Invalid parameters
   - Server errors

2. **User Errors**
   - Invalid state codes
   - Count out of range
   - Missing parameters

3. **Recovery**
   - Clear error messages
   - Suggest corrections
   - Retry capability

## Testing Plan

1. **Unit Tests**
   - Tool parameter validation
   - API client methods
   - Error handling

2. **Integration Tests**
   - End-to-end generation flow
   - Download functionality
   - Session state persistence

3. **User Acceptance**
   - Natural language understanding
   - Confirmation flow
   - Download success

## Future Enhancements

1. **Advanced Parameters**
   - Age range filtering
   - Gender distribution
   - Custom field selection

2. **Batch Operations**
   - Multiple file generation
   - Scheduled generation
   - Export formats (JSON, Excel)

3. **Progress Tracking**
   - Real-time generation status
   - Progress percentage
   - Time estimates

## Security Considerations

1. **Authentication**
   - Optional for anonymous users
   - Required for saved files

2. **Rate Limiting**
   - Max requests per session
   - File size limits
   - Storage quotas

3. **Data Privacy**
   - No real data exposure
   - Secure file storage
   - Temporary file cleanup

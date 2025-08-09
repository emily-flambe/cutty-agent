# Coding Standards

## General Principles

- **Simplicity First**: As a PoC, prioritize clarity over cleverness
- **Type Safety**: Use TypeScript's type system effectively
- **Error Handling**: Always handle errors gracefully with user-friendly messages
- **Streaming-First**: Design for streaming responses where applicable

## TypeScript Standards

### Type Definitions

- Define interfaces for all API contracts
- Use `type` for unions, `interface` for objects
- Avoid `any` - use `unknown` if type is truly unknown

### Async/Await

- Always use async/await over raw promises
- Handle errors with try/catch blocks
- Use Promise.all for concurrent operations

### Example:

```typescript
interface ChatRequest {
  message: string;
  sessionId?: string;
}

async function processMessage(req: ChatRequest): Promise<Response> {
  try {
    // Implementation
  } catch (error) {
    console.error("Chat processing error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process message" }),
      {
        status: 500,
      }
    );
  }
}
```

## Code Organization

```
src/
├── server.ts              # Main worker entry point with Chat Durable Object
├── tools.ts               # Tool definitions and executions
├── utils.ts               # Helper functions and tool processing
├── cutty-api.ts           # Cutty API integration
├── session-state.ts       # Session state management
├── global-session-manager.ts  # Global session management
├── shared.ts              # Shared utilities
├── retry-utils.ts         # Retry logic utilities
├── app.tsx                # Main React app component
├── client.tsx             # Client-side entry point
├── styles.css             # Global styles
├── components/            # React UI components
├── hooks/                 # React hooks
├── lib/                   # Library utilities
└── providers/             # React context providers
```

## Naming Conventions

- **Files**: kebab-case (e.g., `api-client.ts`)
- **Classes**: PascalCase (e.g., `ChatAgent`)
- **Functions/Variables**: camelCase (e.g., `processMessage`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`)
- **Interfaces**: PascalCase with 'I' prefix optional

## Error Handling

- Log errors with context for debugging
- Return user-friendly error messages
- Use appropriate HTTP status codes
- Never expose sensitive information in errors

## Tool Development Standards

1. Tools should have clear, descriptive names
2. Parameters must be fully typed with Zod schemas
3. Include helpful descriptions for AI model understanding
4. Separate tools requiring confirmation from auto-executing ones

## Documentation Standards

- Every exported function needs a JSDoc comment
- Document complex logic inline
- Keep README up-to-date with setup changes
- Document all API endpoints in api-agreements.md

## Git Commit Standards

- Use conventional commits: `feat:`, `fix:`, `docs:`, `chore:`
- Keep commits atomic and focused
- Write clear commit messages explaining 'why'

## Security Standards

- Never commit secrets or API keys
- Use environment variables for configuration
- Validate all user inputs
- Implement CORS properly for production use

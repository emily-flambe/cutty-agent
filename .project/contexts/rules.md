# Project Rules and Conventions

## Git Worktree Management

### Worktree Organization

- **All worktrees MUST be created within a `worktrees/` folder**
- Example: `git worktree add worktrees/feature-branch`
- This keeps the main repository clean and worktrees organized

### Worktree Naming

- Use descriptive branch names that match the worktree folder
- Format: `worktrees/<feature-type>/<feature-name>`
- Examples:
  - `worktrees/feature/agent-tools`
  - `worktrees/fix/cors-headers`
  - `worktrees/poc/streaming-test`

## Development Rules

### Environment Variables

- Never commit `.dev.vars` or any file containing secrets
- Always use `.env.example` to document required variables
- Update `.env.example` when adding new environment variables

### API Development

- All new endpoints must be documented in `.project/api-docs/api-agreements.md`
- Follow RESTful conventions for endpoint naming
- Always implement proper CORS headers for cross-origin requests

### Tool Development

- Tools requiring user confirmation should NOT have an `execute` function
- All tool parameters must be validated with Zod schemas
- Document each tool's purpose and parameters clearly

### Testing

- Test locally with `npm run dev` before deploying
- Verify CORS works with the Cutty frontend before marking integration complete
- Always test streaming responses end-to-end

## Deployment Rules

### Branch Strategy

- `main` - Production-ready code only
- `develop` - Integration branch for features
- Feature branches - Created as worktrees

### Deployment Process

1. Test locally with full integration
2. Deploy to dev environment first: `npm run deploy:dev`
3. Verify health check and basic functionality
4. Document any issues in POC_FINDINGS.md

## Documentation Rules

### Code Documentation

- All exported functions must have JSDoc comments
- Complex logic should have inline comments
- Update README.md for any setup changes

### Project Documentation

- Keep `.project/` docs in sync with code changes
- Update API agreements when endpoints change
- Document architectural decisions in architecture.md

## Security Rules

### API Keys and Secrets

- Store all secrets in environment variables
- Never log or expose API keys in responses
- Rotate keys regularly and document the process

### CORS Policy

- Only allow specific origins (no wildcards in production)
- Keep allowed origins list in sync between code and settings.json
- Test CORS thoroughly before deployment

## PoC-Specific Rules

### Scope Management

- Keep features minimal - this is a proof of concept
- Focus on core functionality over edge cases
- Document limitations clearly

### Success Metrics

- Track all success criteria from config.md
- Update POC_FINDINGS.md with results
- Make go/no-go decision based on documented criteria

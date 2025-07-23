# Cutty Agent - Proof of Concept

AI Agent for the Cutty application using Cloudflare's Agents SDK.

## Status: Proof of Concept

This is an experimental implementation to validate the feasibility of migrating from Cloudflare Workers AI to Cloudflare Agents.

## Development

1. Install dependencies: `npm install`
2. Copy `.dev.vars.example` to `.dev.vars` and add your Anthropic API key
3. Run locally: `npm run dev`
4. Deploy to dev: `npm run deploy:dev`

## Testing Integration with Main App

1. Agent runs on: http://localhost:8789
2. Health check: http://localhost:8789/health
3. Configure main app to use agent URL

## Architecture

- Uses Cloudflare Durable Objects for state management
- Anthropic Claude 3.5 Sonnet for language processing
- Streaming responses for real-time interaction
- Tool system for executing actions

## PoC Goals

- [ ] Successfully deploy agent
- [ ] Connect from Cutty frontend
- [ ] Execute one tool successfully
- [ ] Document findings

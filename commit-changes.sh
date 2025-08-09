#!/bin/bash
cd /Users/emilycogsdill/Documents/GitHub/cutty-agent
git add src/agent/prompts.ts src/agent/modeDetector.ts src/server.ts
git commit -m "🐻 Add system prompts and simple chat handler

- Create src/agent/prompts.ts with SIMPLE_CHAT_PROMPT and AGENT_SYSTEM_PROMPT
- Enhance Chat class in server.ts with handleSimpleChat() method
- Integrate ModeDetector for hybrid mode operation
- Add simple chat mode that bypasses agent flow for better performance
- Preserve all existing agent functionality
- Use Claude Haiku for fast, cost-effective simple responses

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
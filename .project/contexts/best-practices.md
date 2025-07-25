# AI Agent Development Best Practices

## Core Principles

### 1. Task Management & Organization

#### Always Create and Maintain Todo Lists

- **Immediately create a todo list** when starting any multi-step task
- Break complex tasks into specific, actionable items
- Update task status in real-time (pending → in_progress → completed)
- Only have ONE task in_progress at a time
- Mark tasks complete immediately after finishing them

#### Frequent Progress Checks

- Regularly review your todo list to ensure you're on track
- Before starting a new task, verify the current task is complete
- Use todo lists as checkpoints to prevent forgetting important steps

### 2. Version Control Best Practices

#### Make Frequent Git Checkpoints

- Commit working code frequently with clear, descriptive messages
- Create commits after completing each logical unit of work
- Never commit broken code - ensure tests pass before committing
- Use meaningful commit messages that explain the "why" not just the "what"

#### Git Workflow

```bash
# Before starting work
git status
git pull

# During work - commit frequently
git add <files>
git commit -m "feat: implement user authentication logic"

# After major milestones
git push
```

### 3. Use Subagents for Efficiency

#### When to Use Subagents

- **Always use subagents** for file searches and exploration tasks
- Launch multiple agents concurrently for parallel searches
- Use agents for open-ended research requiring multiple search rounds
- Delegate complex search operations to maximize performance

#### Subagent Best Practices

- Provide detailed, specific prompts to subagents
- Launch multiple agents simultaneously when possible
- Trust agent outputs - they're optimized for search tasks
- Use agents instead of sequential grep/find operations

### 4. Code Quality & Testing

#### Before Marking Tasks Complete

- Run all relevant tests
- Execute lint and typecheck commands
- Verify the solution works as expected
- Check for any console errors or warnings

#### Standard Verification Commands

```bash
# JavaScript/TypeScript projects
npm run lint
npm run typecheck
npm test

# Python projects
ruff check .
mypy .
pytest

# Always check project-specific commands in package.json or README
```

### 5. File Operations Best Practices

#### Read Before Edit

- **Always read files** before attempting to edit them
- Understand existing code patterns and conventions
- Check imports to understand framework choices
- Preserve exact formatting and indentation

#### Prefer Editing Over Creating

- Always edit existing files when possible
- Only create new files when absolutely necessary
- When fixing issues, modify existing implementations
- Avoid creating duplicate functionality

### 6. Environment Awareness

#### Understand the Codebase

- Search for existing patterns before implementing new features
- Check package.json, requirements.txt, etc. for available dependencies
- Follow existing naming conventions and code style
- Use framework-specific patterns already in the codebase

#### Verify Before Acting

- Check if directories exist before creating files
- Verify commands exist before running them
- Understand the project structure before making changes
- Read relevant documentation files (README, CONTRIBUTING, etc.)

### 7. Communication & Clarity

#### Progress Updates

- Provide clear, concise updates on task progress
- Explain what you're doing and why
- Alert the user to any blockers or issues immediately
- Summarize results after completing searches or analyses

#### Error Handling

- Report errors clearly with context
- Suggest solutions when encountering problems
- Ask for clarification when requirements are ambiguous
- Never proceed with assumptions on critical decisions

### 8. Efficiency Principles

#### Batch Operations

- Run multiple independent commands in parallel
- Use batch file reads when examining multiple files
- Combine related tool calls in single responses
- Minimize round trips by planning ahead

#### Search Strategies

- Use appropriate tools for the task:
  - `Glob` for finding files by pattern
  - `Grep` for searching file contents
  - `Task` (subagents) for complex searches
  - `Read` for examining specific files

### 9. Safety & Security

#### Never Commit Secrets

- Check for API keys, passwords, tokens before committing
- Use environment variables for sensitive data
- Review changes for accidental secret exposure
- Follow security best practices in all code

#### Defensive Coding

- Validate inputs before processing
- Handle errors gracefully
- Avoid operations that could harm the system
- Ask for confirmation on destructive operations

### 10. Continuous Improvement

#### Learn from the Codebase

- Study existing patterns and implementations
- Adapt to project-specific conventions
- Improve based on test results and feedback
- Document important findings for future reference

#### Self-Review Checklist

Before considering any task complete:

- [ ] All todo items marked as completed
- [ ] Code is tested and working
- [ ] Lint and type checks pass
- [ ] Changes follow project conventions
- [ ] No secrets or sensitive data exposed
- [ ] Commits are logical and well-messaged
- [ ] User requirements fully satisfied

## Summary

Following these best practices ensures efficient, safe, and high-quality development work. Remember: organization, verification, and clear communication are key to successful task completion.

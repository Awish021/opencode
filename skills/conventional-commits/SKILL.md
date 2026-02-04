---
name: conventional-commits
description: Generate commit messages following conventional commit format.
---

# Conventional Commits

## What I do

- Capture the essence of the change in the git staging area
- Draft a commit message from the staged changes

## When to use me

Use this when you want to commit the code changes that have been staged.
Ask clarifying questions if some changes are unclear to you.

## Format
`type(scope): description`

## Types
- feat: new feature
- fix: bug fix
- docs: documentation
- style: change style of code
- refactor: code restructuring
- test: adding or changing tests
- chore: maintenance
- perf: improving performance
- ci: changing or adding CI steps

## Guardrails
- A commit message contains ONLY plain text - no markdown, no code blocks, no formatting
- A commit message NEVER contains triple backticks (\`\`\`) or any markdown code block syntax
- A commit message NEVER contains any emojis or special formatting markers that suggest AI generation
- A commit message is written in an imperative mood (e.g. "add" not "added")
- A commit message must appear 100% human-written with no hints of AI involvement
- A commit message MUST be title-only unless the change complexity absolutely requires additional context. When in doubt, use title-only.

## When to Add a Body
Add a body ONLY when:
- The title cannot explain WHY the change was made
- Multiple independent changes are included in one commit
- Breaking changes need detailed explanation
- Complex migration steps are required

DO NOT add a body for:
- Simple refactors that the title clearly describes
- Single-file changes with obvious intent
- Documentation updates with clear scope

## Common Mistakes to Avoid
WRONG: "feat(api): add user authentication
Adds login functionality for users"
- Title already says it all, body is redundant

RIGHT: "feat(api): add user authentication"
- Clear, concise, no redundant body

## Examples
- `chore(deps): update dependencies`
- `fix(api): resolve authentication bug`
- `refactor(database): optimize query performance`

---
name: opencode-audit
description: Audit OpenCode configuration quality, safety, and operability with a 100-point rubric and concrete remediations.
---

# OpenCode Audit Skill

## What this skill does

This skill runs a practical OpenCode audit and outputs:

- a 100-point score with grade
- category-by-category findings
- concrete, ready-to-use commands and config snippets
- a short remediation plan

## When to use

Use this skill when the user asks to:

- audit OpenCode setup quality
- improve OpenCode safety and permissions
- review agents, commands, skills, MCP, or plugins
- prepare a hardening checklist before team rollout

## Required inputs

- Target repo or config path
- Optional focus area (permissions, agents, skills, runtime checks)

## Audit workflow

1. Load `references/OPENCODE-AUDIT.md`.
2. Discover project and global OpenCode files.
3. Score all 8 rubric categories.
4. Build prioritized findings with evidence paths.
5. Produce copy-paste remediation snippets.
6. Return total score, grade, and 7-day plan.

## Discovery checklist

- `AGENTS.md`, `.opencode/AGENTS.md`, `~/.config/opencode/AGENTS.md`
- `.opencode/config.json`, `.opencode/opencode.json`, `.opencode/opencode.jsonc`
- `~/.config/opencode/config.json`, `~/.config/opencode/opencode.json`, `~/.config/opencode/opencode.jsonc`
- `.opencode/agents/*.md`, `~/.config/opencode/agents/*.md`
- `.opencode/commands/*.md`, `~/.config/opencode/commands/*.md`
- `.opencode/skills/*/SKILL.md`, `~/.config/opencode/skills/*/SKILL.md`
- `.claude/skills/*/SKILL.md`, `~/.claude/skills/*/SKILL.md` when present
- MCP and plugin sections in config

## Output contract

Return in this order:

1. Total score and grade.
2. Category scores.
3. Top findings with severity.
4. Ready-to-use fixes.
5. 7-day action plan.

## Guardrails

- Stay OpenCode-specific; do not use non-OpenCode terminology unless compatibility paths are relevant.
- Do not invent files; only cite discovered paths.
- Keep fixes actionable and minimal.
- Prefer least-privilege recommendations for permissions.

---
description: Run a full OpenCode audit
subtask: true
---

Run an OpenCode-native audit for this workspace.

Use `OPENCODE-AUDIT.md` as the scoring authority.

Scope:
- AGENTS.md policy quality
- OpenCode config/model/permission quality
- agents, commands, and skills quality
- MCP and plugin integration posture
- formatter and runtime quality gates

Discovery:
1. Inspect both project and global locations when available:
   - `AGENTS.md`, `.opencode/AGENTS.md`, `~/.config/opencode/AGENTS.md`
   - `.opencode/config.json`, `.opencode/opencode.json`, `.opencode/opencode.jsonc`
   - `~/.config/opencode/config.json`, `~/.config/opencode/opencode.json`, `~/.config/opencode/opencode.jsonc`
   - `.opencode/agents/*.md`, `~/.config/opencode/agents/*.md`
   - `.opencode/commands/*.md`, `~/.config/opencode/commands/*.md`
   - `.opencode/skills/*/SKILL.md`, `~/.config/opencode/skills/*/SKILL.md`
   - `.claude/skills/*/SKILL.md`, `~/.claude/skills/*/SKILL.md` when present
2. Cite exact file paths for every major finding.

Output requirements:
1. Return total score `/100` and grade.
2. Return category scores exactly matching the rubric.
3. List top risks first.
4. Provide at least 5 concrete fixes with copy-paste commands/snippets.
5. Include a 7-day action plan with quick wins first.

If the user provided focus areas in `$ARGUMENTS`, prioritize those categories but still score all categories.

# OpenCode Config

Local configuration repo for OpenCode agents, skills, commands, and plugins. This is the source of truth for how your OpenCode instance routes requests and provides specialized behavior.

## Structure

- `agent/` - Custom agent definitions (Markdown with YAML frontmatter).
- `skill/` - Reusable skills grouped by folder with a `SKILL.md`.
- `command/` - CLI command definitions that route to agents (see `command/gc.md`, `command/noslop.md`).
- `plugin/` - Local plugins (see `plugin/notification.ts`).
- `opencode.json` - MCP integration configuration (Notion, Jira, Gitlab toggles).
- `AGENTS_IMPLEMENTATION_COMPLETE.md` - Historical implementation note for the agent set.
- `package.json`, `bun.lock` - Dependency metadata for the config workspace.

## Agents

- `agent/orchestrator.md` - Request router and delegation policy.
- `agent/dev.md` - TDD feature implementation and bug fixing.
- `agent/code-review.md` - Quality, security, and performance review.
- `agent/code-pattern-analyst.md` - Locate similar implementations and patterns.
- `agent/docs-architect.md` - Comprehensive documentation authoring.
- `agent/oracle.md` - Architecture guidance and best practices.
- `agent/librarian.md` - External research and documentation lookup.
- `agent/ux.md` - UI/UX design and frontend implementation.
- `agent/commits.md` - Conventional commit message generation.
- `agent/commit-message-writer.md` - Commit message drafting specialist.
- `agent/fixup.md` - Git fixup and autosquash guidance.
- `agent/test-drop.md` - Identify and remove redundant tests.
- `agent/director_of_engineering.md` - Senior engineering strategy and architecture.
- `agent/project_manager.md` - Delivery coordination and Jira-driven planning.
- `agent/scrum_master.md` - Agile ceremonies and flow improvement.

OpenCode also provides built-in agents like `general` and `explore` that are not defined in this repo.

## Skills

- `skill/conventional-commits/SKILL.md` - Conventional commit message rules.
- `skill/jira/SKILL.md` - Jira workflow guidance and tooling.
- `skill/gitlab/SKILL.md` - GitLab CI/CD pipeline patterns.
- `skill/fastapi-backend/SKILL.md` - FastAPI backend patterns and JWT auth.
- `skill/pytest-tests/SKILL.md` - Pytest testing patterns and TDD advice.
- `skill/golang-k8s-agent/SKILL.md` - Go, gRPC, and Kubernetes patterns.
- `skill/pyspark-databricks/SKILL.md` - PySpark ETL on Databricks.
- `skill/google-workspace/SKILL.md` - Google Workspace API integration patterns.

## Usage Conventions

- OpenCode loads `agent/` and `skill/` on startup; restart OpenCode after changes.
- Prefer explicit agent routing by name (`@agent-name`) for deterministic behavior.
- Keep agent frontmatter accurate: `description`, `mode`, `tools`, and `permission` control capabilities.
- Skills should be scoped, reusable, and focused on one job.

## Adding an Agent

1. Create a new Markdown file in `agent/` with YAML frontmatter (see `agent/orchestrator.md`).
2. Document the agent's role, triggers, and constraints in the body.
3. Register the agent in the orchestrator capability map so it can be routed (see `agent/orchestrator.md`).
4. Restart OpenCode to reload agents.

## Adding a Skill

1. Create a new folder under `skill/<skill-name>/`.
2. Add `SKILL.md` with frontmatter (`name`, `description`) and usage instructions (see `skill/conventional-commits/SKILL.md`).
3. Keep the skill narrowly focused and runnable as-is.

## Design Notes

- Clear separation of `agent/`, `skill/`, `command/`, and `plugin/` keeps ownership boundaries explicit and reduces coordination overhead.
- Standardized frontmatter and folder layouts make behaviors discoverable, simplifying reviews and enabling consistent governance.
- Modular skills encourage reuse and safe composition, accelerating iteration without sacrificing reliability.
- A predictable structure lowers onboarding time and reduces architectural drift as the system scales.

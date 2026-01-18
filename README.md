# OpenCode Config

Local configuration repo for OpenCode agents, skills, and orchestrator documentation. This is the source of truth for how your OpenCode instance routes requests and provides specialized behavior.

## Structure

- `agent/` — Custom agent definitions (Markdown with YAML frontmatter). Example: [agent/orchestrator.md:1](agent/orchestrator.md:1)
- `skill/` — Reusable skills grouped by folder with a `SKILL.md`. Example: [skill/conventional-commits/SKILL.md:1](skill/conventional-commits/SKILL.md:1)
- `ORCHESTRATOR_*.md` — Orchestrator documentation and testing guides:
  - [ORCHESTRATOR_README.md:1](ORCHESTRATOR_README.md:1)
  - [ORCHESTRATOR_SUMMARY.md:1](ORCHESTRATOR_SUMMARY.md:1)
  - [ORCHESTRATOR_QUICKSTART.md:1](ORCHESTRATOR_QUICKSTART.md:1)
  - [ORCHESTRATOR_TESTING.md:1](ORCHESTRATOR_TESTING.md:1)

## Usage Conventions

- OpenCode loads `agent/` and `skill/` on startup; restart OpenCode after changes.
- Prefer explicit agent routing by name (`@agent-name`) for deterministic behavior.
- Keep agent frontmatter accurate: `description`, `mode`, `tools`, and `permission` control capabilities.
- Skills should be scoped, reusable, and focused on one job.

## Adding an Agent

1. Create a new Markdown file in `agent/` with YAML frontmatter (see [agent/orchestrator.md:1](agent/orchestrator.md:1)).
2. Document the agent’s role, triggers, and constraints in the body.
3. Register the agent in the orchestrator capability map so it can be routed (see [agent/orchestrator.md:78](agent/orchestrator.md:78)).
4. Restart OpenCode to reload agents.

## Adding a Skill

1. Create a new folder under `skill/<skill-name>/`.
2. Add `SKILL.md` with frontmatter (`name`, `description`) and usage instructions (see [skill/conventional-commits/SKILL.md:1](skill/conventional-commits/SKILL.md:1)).
3. Keep the skill narrowly focused and runnable as-is.

## Orchestrator Docs

For routing logic, customization, and validation, start with [ORCHESTRATOR_README.md:1](ORCHESTRATOR_README.md:1), then use [ORCHESTRATOR_TESTING.md:1](ORCHESTRATOR_TESTING.md:1) to verify behavior.

## Design Notes

- Clear separation of `agent/`, `skill/`, and orchestrator docs keeps ownership boundaries explicit and reduces coordination overhead.
- Standardized frontmatter and folder layouts make behaviors discoverable, simplifying reviews and enabling consistent governance.
- Modular skills encourage reuse and safe composition, accelerating iteration without sacrificing reliability.
- Dedicated orchestrator docs centralize routing policy, supporting auditability and long-term evolvability.
- A predictable structure lowers onboarding time and reduces architectural drift as the system scales.

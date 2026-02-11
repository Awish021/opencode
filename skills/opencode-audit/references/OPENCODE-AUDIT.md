# OpenCode Audit Prompt

Use this prompt to audit an OpenCode setup and produce an actionable report.

## 1) Auditor Role and Instructions

You are an OpenCode configuration auditor. Your job is to evaluate how well the environment is set up for safe, reliable, high leverage coding workflows.

Rules for this audit:
- Be evidence based. Score only what you can verify from files, settings, and observable behavior.
- Prefer concrete findings over theory. Every deduction must include a reason and source.
- Treat missing artifacts as missing, not failing, unless the rubric explicitly says required.
- Prioritize practical improvements that reduce risk and increase day to day productivity.
- Keep recommendations copy paste ready.
- Do not modify files during the audit.

## 2) Discovery Checklist (Project and Global Locations)

Review these locations in order. Mark each item as Found, Missing, or Not Applicable.

Project level (repository local):
- `./AGENTS.md`
- `./.opencode/AGENTS.md`
- `./.opencode/config.json`
- `./.opencode/skills/`
- `./.opencode/commands/`
- `./.opencode/plugin/`
- `./.opencode/mcp.json` or `./.opencode/mcp/*.json`
- `./.github/workflows/` (automation hooks relevant to OpenCode)
- `./README.md` section documenting OpenCode usage

Global level (user profile):
- `~/.config/opencode/AGENTS.md`
- `~/.config/opencode/config.json`
- `~/.config/opencode/skills/`
- `~/.config/opencode/commands/`
- `~/.config/opencode/plugin/`
- `~/.config/opencode/mcp.json` or `~/.config/opencode/mcp/*.json`
- `~/.dotfiles/.../opencode/` mirror locations, if used as source of truth

Quality of evidence to collect:
- Instruction clarity and conflict checks across system, global, and project guidance
- Safety guardrails for destructive actions, secrets, and production operations
- Agent workflow quality (planning, testing, handoff, verification)
- Command catalog quality (naming, descriptions, safety defaults)
- Skill coverage for recurring tasks
- MCP integration correctness (auth, endpoints, scope, failure handling)
- Plugin and automation reliability
- Runtime and config hygiene (portability, defaults, duplication, dead entries)

## 3) Scoring Rubric (Total = 100)

Score each category from 0 to its max.

1. Rules and Instructions Quality - 20 points
- Clear priority order across instruction sources
- Low ambiguity and low contradiction
- Specific behavioral guidance for coding, testing, and reporting

2. Permissions and Safety Guardrails - 15 points
- Explicit handling of destructive commands
- Secret handling and sensitive file protections
- Production and billing risk controls

3. Agents and Workflow Design - 15 points
- Strong process guidance from discovery to handoff
- Testing philosophy is practical and enforced
- Good defaults for autonomy without unsafe assumptions

4. Commands and CLI Ergonomics - 10 points
- Commands are discoverable, named well, and documented
- Safe defaults and clear descriptions
- Minimal duplication and stale entries

5. Skills Coverage and Quality - 10 points
- Skills exist for high frequency, high value workflows
- Skill instructions are specific and executable
- Skill set is maintained and relevant

6. MCP Integration Maturity - 10 points
- MCP server definitions are valid and scoped
- Auth and permission boundaries are clear
- Failure and timeout behavior is handled

7. Plugins and Automation Reliability - 10 points
- Plugins are useful, safe, and maintained
- Automation hooks support consistency and quality
- Minimal fragile or unexplained magic

8. Runtime and Config Hygiene - 10 points
- Config is coherent, portable, and easy to reason about
- No obvious dead configs, drift, or conflicting defaults
- Startup and daily usage are predictable

Rubric total check: 20 + 15 + 15 + 10 + 10 + 10 + 10 + 10 = 100

## 4) Grade Scale

- A+ (97-100): Excellent, production grade, only minor polish left
- A (93-96): Strong setup, small targeted improvements needed
- A- (90-92): Good setup, several meaningful upgrades recommended
- B+ (87-89): Solid foundation, notable gaps in multiple areas
- B (83-86): Usable but inconsistent, moderate risk and friction
- B- (80-82): Functional with recurring operational issues
- C+ (77-79): Significant gaps, reliability concerns present
- C (73-76): Weak baseline, urgent improvements needed
- C- (70-72): High friction and elevated risk
- D (60-69): Poor setup, major redesign recommended
- F (<60): Unfit for dependable OpenCode workflows

## 5) Required Output Report Format

Use this exact structure:

```text
OpenCode Audit Report

Overall Score: <0-100>
Grade: <letter>

Category Scores:
- Rules and Instructions Quality: <x>/20
- Permissions and Safety Guardrails: <x>/15
- Agents and Workflow Design: <x>/15
- Commands and CLI Ergonomics: <x>/10
- Skills Coverage and Quality: <x>/10
- MCP Integration Maturity: <x>/10
- Plugins and Automation Reliability: <x>/10
- Runtime and Config Hygiene: <x>/10

Top Gaps:
- <bullet>
- <bullet>
- <bullet>

Risk Summary:
- Immediate risks: <text>
- Medium term risks: <text>

Top Strengths:
- <bullet>
- <bullet>
- <bullet>

Evidence Log:
- <path>: <what was found>
- <path>: <what was found>

Recommendations:
<use recommendation format below>

100 Point Action Plan:
<use action plan format below>
```

## 6) Recommendation Format (Copy Paste Fixes Required)

Each recommendation must include severity, rationale, and a copy paste patch snippet.

Use this template for every recommendation:

````text
Recommendation <N>: <short title>
Severity: <High|Medium|Low>
Targets: <file path(s)>
Why this matters: <1-2 lines>
Expected score impact: +<points>

Copy paste fix:
```<lang>
<exact text or patch to apply>
```

Validation:
- <command or check>
- <expected result>
````

Recommendation quality bar:
- Must be directly applicable without rewriting
- Must reference real paths
- Must state what score category it improves
- Must avoid vague advice like "improve docs"

## 7) Action Plan Format to Reach 100/100

Provide a phased plan with dependencies and measurable checkpoints.

Use this template:

```text
Phase 1 - Critical safety and correctness (Target: +<points>)
- Step 1: <change>
  Owner: <role>
  Depends on: <none or item>
  Done when: <measurable condition>

Phase 2 - Workflow and leverage upgrades (Target: +<points>)
- Step 2: <change>
  Owner: <role>
  Depends on: <item>
  Done when: <measurable condition>

Phase 3 - Hardening and polish (Target: +<points>)
- Step 3: <change>
  Owner: <role>
  Depends on: <item>
  Done when: <measurable condition>

Final Verification:
- Re score all 8 categories
- Confirm total = 100
- List any deferred items and why
```

Execution constraints for the action plan:
- Prioritize highest risk reductions first
- Keep each step under one working session where possible
- Include rollback notes for risky changes
- End with a clear statement of what moved the score to 100/100

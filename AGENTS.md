# Working Together

These guidelines are how I expect us to collaborate. They're not suggestions — they're the baseline for how we work.

## Quick Obligations

| Situation | Required action |
| --- | --- |
| Starting a task | Read this guide end-to-end and align with any fresh user instructions. |
| Reviewing git status or diffs | Treat them as read-only; never revert or assume missing changes were yours. |
| Adding a dependency | Research well-maintained options and confirm fit with the user before adding. |

## Mindset & Process

**Take time to think deeply.** Rushing leads to surface-level solutions that break later. The best work comes from sitting with the problem.

**No breadcrumbs.** When you move or delete code, don't leave comments marking the spot—no "// moved to X", no "relocated". Just clean it up. The git history remembers; the code shouldn't.

**Stay focused on the actual problem.** It's easy to get distracted by tangents. Keep the core issue in view.

**Fix the root cause, not the symptom.** Band-aid solutions accumulate debt. Find where the problem actually lives and solve it there. This is harder upfront but saves endless pain later.

When taking on new work, follow this sequence:
1. Think about the architecture.
2. Research official docs, blogs, or papers on the best architecture.
3. Review the existing codebase.
4. Compare the research with the codebase to choose the best fit.
5. Implement the fix or ask about the tradeoffs the user is willing to make.

**Write code that feels obvious.** The best solutions are the ones that make people say "of course" when they read them. If you have to explain it, it's probably too clever.

**Leave the codebase better than you found it.** If something smells off — a confusing name, dead code, a messy pattern — fix it. Don't let broken windows accumulate.

**Delete ruthlessly.** Unused parameters, dead helpers, obsolete code - remove them and update the callers. Don't let junk linger because "someone might need it."

**Search before pivoting.** If you're stuck, look up official docs or specs first. Don't change direction just because the current path feels hard — verify you're actually on the wrong path.

**Prefer to use subagents as much as possible.** When the task can be delegated, delegate it.

**Prefer to use skills as much as possible.** If a skill matches the job, load it.

**When code is confusing:**
1. Simplify it if you can.
2. Add an ASCII art diagram in a comment if that helps explain the structure.

## Testing Philosophy

**Test everything.** I value rigor. Tests exist so new contributors can't accidentally break what we've built, and so nothing slips through. Be thorough.

Unless I ask otherwise, run only the tests you added or modified instead of the entire suite. Don't waste time on what hasn't changed.

## Final Handoff

Before you consider a task done:

1. Confirm all tests or commands you touched actually passed (list them if I ask).
2. Summarize what changed, with specific file and line references.
3. Call out any TODOs, follow-up work, or uncertainties so I'm never surprised later.

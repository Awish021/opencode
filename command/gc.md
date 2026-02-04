---
description: Commit the changes in the git staging area
agent: commit-message-writer
---

Write a git commit message for ONLY the staged changes (not the entire branch) and create a commit.

## MANDATORY SEQUENCE OF ACTIONS

1. In a subagent, check the diff and see which changes are staged.
2. Load skill{{ name: "conventional-commits" }} skill and use it to craft a commit message.
3. Create a local commit.
4. Report what was the message and the reasoning behind it.

## GUARDRAILS
- Do NOT stage any additional files.
- Do NOT push the changes.

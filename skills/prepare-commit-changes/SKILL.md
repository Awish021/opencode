---
name: prepare-commit-changes
description: Stage specific code hunks using git hunks for selective commit preparation
---

# Prepare Commit Changes

## What I do

- List all unstaged and staged hunks with their unique IDs
- Present hunks to the user for selection
- Stage only the hunks the user explicitly selects

## When to use this

Use this when the user asks to stage changes to git.

## Hunk ID Format

`file:@-old,len+new,len` - derived from diff `@@` headers, stable across reordering

## Commands

- `git hunks list` - List all unstaged hunks with unique IDs
- `git hunks list --staged` - List already staged hunks
- `git hunks add <hunk-id> [<hunk-id> ...]` - Stage specific hunks by their ID

## Workflow

1. Run `git hunks list` to show all unstaged hunks
2. Run `git hunks list --staged` to show already staged hunks
3. Present both lists to the user with numbered options
4. Ask the user to select hunks to stage (accepts multiple: comma-separated, ranges, or all keyword)
5. Run `git hunks add` with all selected hunk IDs
6. Confirm which hunks were staged

## Guardrails

- Only stage hunks the user explicitly selects
- Never assume which hunks to stage without user confirmation
- Allow multi-hunk selection in a single prompt
- If selection is empty, stage nothing
- Show both unstaged and staged hunks so user knows current state

## Examples

List hunks and stage selected ones:

```
$ git hunks list
1. src/main.c:@-10,6+10,7
2. src/utils.c:@-25,3+25,4
3. tests/api.test.js:@-50,10+50,12

$ git hunks list --staged
A. src/config.c:@-5,2+5,3

Select hunks to stage (e.g., "1,3" or "1-2" or "all"): 1,3

$ git hunks add 'src/main.c:@-10,6+10,7' 'tests/api.test.js:@-50,10+50,12'
Staged: src/main.c:@-10,6+10,7, tests/api.test.js:@-50,10+50,12
```

Stage from already staged hunks:

```
$ git hunks list --staged
1. src/auth.c:@-100,5+100,6

Select hunks to stage (or press Enter to skip): 1

$ git hunks add 'src/auth.c:@-100,5+100,6'
Staged: src/auth.c:@-100,5+100,6
```

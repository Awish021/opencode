---
description: Removes AI code slop
agent: build
---

Check the diff against main, and remove all AI generated slop introduced in this branch.

This includes:
- Extra comments that a human wouldn't add or is inconsistent with the rest of the file.
- Unnecessary functions that exist in the standard library.
- Weird casting to get around type issues.
- Removal of tests to get around failing tests.
- Style that is inconsistent with the file.

Report at the end with only a 1-3 sentence summary of what you changed.

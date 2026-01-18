# 🚀 Orchestrator Agent - Quick Start Checklist

Follow this checklist to get your orchestrator agent up and running in 5 minutes.

---

## ☐ Step 1: Verify Installation

**Check that all files are in place:**

```bash
cd ~/.config/opencode
ls -lh agent/orchestrator.md
ls -lh ORCHESTRATOR*.md
```

**Expected output:**
- ✅ `agent/orchestrator.md` (17 KB)
- ✅ `ORCHESTRATOR_README.md` (13 KB)
- ✅ `ORCHESTRATOR_TESTING.md` (13 KB)
- ✅ `ORCHESTRATOR_SUMMARY.md` (10 KB)

---

## ☐ Step 2: Restart OpenCode

**Exit and restart OpenCode to load the new agent:**

```bash
# Close your current OpenCode session (Ctrl+C or exit)
# Then restart
opencode
```

**What happens:**
- OpenCode will scan the `agent/` directory
- It will load `orchestrator.md` as a primary agent
- The orchestrator should become your default agent

---

## ☐ Step 3: Verify Activation

**Check the agent indicator:**

Look for the agent name in your OpenCode UI (typically bottom-right corner):
- ✅ Should show: `orchestrator` or `🎭 orchestrator`
- ❌ If it shows `build` or another agent, press **Tab** to cycle

**Manual switch (if needed):**
```
Press Tab repeatedly until you see "orchestrator"
```

---

## ☐ Step 4: Run Quick Tests (2 minutes)

Copy and paste these 5 commands to validate basic functionality:

### Test 1: Basic Routing → Explore
```
Find the authentication logic
```
**Expected**: Routes to `explore` with High confidence

---

### Test 2: Git Workflow → Commit Writer
```
Write a commit message for my changes
```
**Expected**: Routes to `commit-message-writer` with High confidence

---

### Test 3: Sequential Chaining → Explore → Docs
```
Document the API endpoints
```
**Expected**: Routes to `explore` → `docs-architect` (sequential chain)

---

### Test 4: Clarification Protocol
```
Fix it
```
**Expected**: Asks 2-3 clarifying questions (does NOT route)

---

### Test 5: Custom Agent → Architecture
```
What's the best way to structure our microservices?
```
**Expected**: Routes to `director_of_engineering` with High confidence

---

## ☐ Step 5: Verify Core Behaviors

For each test above, check that the orchestrator:

- ✅ Shows **Agent(s)**: Which agent(s) it's delegating to
- ✅ Shows **Confidence**: High, Medium, or Low
- ✅ Shows **Rationale**: 2-4 bullet points explaining the decision
- ✅ Shows **Strategy**: Direct, Sequential chain, or Parallel
- ✅ **Never writes files** or runs bash commands directly
- ✅ Uses the `task` tool to delegate to subagents

---

## ☐ Step 6: Configuration (Optional)

### Option A: Set Model Fallback

If you want to configure the fallback chain (haiku → sonnet → gpt-4o-mini → GLM):

1. Open `~/.config/opencode/opencode.json`
2. Add or update:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-haiku-4-20250514",
  "agent": {
    "orchestrator": {
      "model": "anthropic/claude-haiku-4-20250514"
    }
  }
}
```

**Note**: Actual fallback logic is handled by OpenCode infrastructure, not the agent file.

### Option B: Adjust Verbosity (if needed)

If you want less verbose output:

1. Open `agent/orchestrator.md`
2. Find "Verbosity Control" section
3. Change "Default Mode" to show fewer bullets (1-2 instead of 2-4)
4. Restart OpenCode

---

## ☐ Troubleshooting

### Problem: Orchestrator not showing up

**Solution:**
```bash
# Verify file exists and has correct permissions
ls -lh ~/.config/opencode/agent/orchestrator.md

# Should show: -rw-r--r-- and ~17 KB
# If missing, re-run the implementation

# Restart OpenCode
opencode
```

### Problem: Orchestrator tries to write files

**Solution:**
1. Open `agent/orchestrator.md`
2. Verify frontmatter has:
```yaml
tools:
  write: false
  edit: false
  bash: false
permission:
  edit: deny
  bash:
    "*": deny
```
3. Restart OpenCode

### Problem: Routing unclear or missing rationale

**Solution:**
1. Check that you're using the orchestrator (Tab to switch)
2. Verify "Verbosity Control" section says "VERBOSE BY DEFAULT"
3. Try: "Explain why you chose that agent"

### Problem: Doesn't know about custom agents

**Solution:**
1. Open `agent/orchestrator.md`
2. Find "Custom Agents (Your Configuration)" table
3. Verify all your agents are listed:
   - docs-architect
   - director_of_engineering
   - project_manager
   - scrum_master
   - commit-message-writer
4. If missing, add them and restart

---

## ☐ Next Steps

Once basic tests pass:

1. **Read full docs**: `ORCHESTRATOR_README.md`
2. **Run comprehensive tests**: `ORCHESTRATOR_TESTING.md`
3. **Try real workflows**: Use with your actual projects
4. **Customize**: Adjust routing priorities and add new agents

---

## 📚 Quick Reference

### File Overview
- **`agent/orchestrator.md`** - The agent itself (primary mode)
- **`ORCHESTRATOR_SUMMARY.md`** - Implementation overview
- **`ORCHESTRATOR_README.md`** - Complete documentation
- **`ORCHESTRATOR_TESTING.md`** - 40+ test scenarios
- **`ORCHESTRATOR_QUICKSTART.md`** - This checklist

### Key Commands
- **Tab** - Cycle through primary agents (find orchestrator)
- **@agent-name** - Explicitly invoke a specific agent
- **"Explain why"** - Request extra verbose output
- **/models** - See available models

### Agent Routing Quick Reference
- `explore` - Find files, search code
- `general` - General development tasks
- `docs-architect` - Write documentation
- `director_of_engineering` - Architecture & strategy
- `project_manager` - Delivery & scope
- `scrum_master` - Agile ceremonies
- `commit-message-writer` - Git commit messages

---

## ✅ Success Criteria

Your orchestrator is working correctly if:

1. ✅ All 5 quick tests pass
2. ✅ Always shows: Agent(s), Confidence, Rationale, Strategy
3. ✅ Never writes files or runs bash commands directly
4. ✅ Uses `task` tool to delegate to subagents
5. ✅ Asks questions when requests are ambiguous
6. ✅ Chains agents when appropriate (explore → general, explore → docs-architect)
7. ✅ Routes to custom agents (director_of_engineering, project_manager, etc.)

---

## 🎉 Completion

Once all checkboxes are complete, you're ready to use the orchestrator!

**Total Time**: ~5 minutes  
**Difficulty**: Easy  
**Status**: ☐ Not Started | ☐ In Progress | ☐ Complete

---

## 💬 Support

Need help?
- Check `ORCHESTRATOR_TESTING.md` for troubleshooting
- Read `ORCHESTRATOR_README.md` for detailed docs
- Join OpenCode Discord: https://opencode.ai/discord
- Open issue: https://github.com/anomalyco/opencode/issues

---

**Last Updated**: January 14, 2026  
**Version**: 1.0

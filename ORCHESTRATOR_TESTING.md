# Orchestrator Agent Testing Guide

This guide provides comprehensive test scenarios to validate your orchestrator agent implementation.

## Quick Start

1. **Restart OpenCode** to load the new orchestrator agent:
   ```bash
   # Exit OpenCode and restart
   opencode
   ```

2. **Switch to orchestrator** (if not already default):
   ```
   Press Tab to cycle through primary agents
   ```

3. **Verify orchestrator is active**:
   Look for the agent indicator in the UI (bottom right corner should show "orchestrator")

---

## Test Categories

### 1. Basic Routing Tests

#### Test 1.1: Explicit Agent Request
**Input**: `@general help me understand this function`

**Expected Behavior**:
- Routes directly to `general` agent
- High confidence
- Rationale mentions "explicit agent request"
- No clarifying questions

---

#### Test 1.2: Git Workflow
**Input**: `Write a commit message for my changes`

**Expected Behavior**:
- Routes to `commit-message-writer`
- High confidence
- Rationale mentions "git workflow" or "commit message generation"
- Strategy: Direct delegation

---

#### Test 1.3: Architecture Question
**Input**: `What's the best way to structure our microservices architecture?`

**Expected Behavior**:
- Routes to `director_of_engineering`
- High confidence
- Rationale mentions "architectural strategy" or "technical leadership"
- Strategy: Direct delegation

---

#### Test 1.4: Project Management
**Input**: `Can you help prioritize our backlog for next sprint?`

**Expected Behavior**:
- Routes to `project_manager`
- High confidence
- Rationale mentions "backlog prioritization" or "delivery coordination"
- Strategy: Direct delegation

---

#### Test 1.5: Agile Ceremonies
**Input**: `What should we discuss in tomorrow's retrospective?`

**Expected Behavior**:
- Routes to `scrum_master`
- High confidence
- Rationale mentions "agile ceremonies" or "retrospective"
- Strategy: Direct delegation

---

### 2. Sequential Chaining Tests

#### Test 2.1: Documentation with Context Discovery
**Input**: `Create a README for the authentication module`

**Expected Behavior**:
- Routes to: `explore` → `docs-architect` (sequential chain)
- High confidence
- Rationale mentions "need to understand code first" or "context-first approach"
- Strategy: Sequential chain
- First delegation: `explore` to find and analyze auth code
- (After explore completes): Second delegation: `docs-architect` with context

---

#### Test 2.2: Bug Fix with Context Discovery
**Input**: `Fix the bug in the payment processing logic`

**Expected Behavior**:
- Routes to: `explore` → `general` (sequential chain)
- High confidence
- Rationale mentions "need to locate code first" or "context-first approach"
- Strategy: Sequential chain
- First delegation: `explore` to find payment code
- (After explore completes): Second delegation: `general` with specific context

---

#### Test 2.3: Implementation with Complete Context
**Input**: `Implement a new validation function in src/utils/validators.ts that checks email format`

**Expected Behavior**:
- Could route directly to `general` (user provided complete context)
- OR routes to: `explore` → `general` (safer, context-first)
- Medium to High confidence
- Rationale mentions "complete context provided" or justifies context-first approach

---

### 3. Parallel Execution Tests

#### Test 3.1: Independent Tasks
**Input**: `Review the security of our authentication system and update our API documentation`

**Expected Behavior**:
- Routes to: `general` (security review) + `docs-architect` (documentation) in parallel
- High confidence
- Rationale mentions "two independent tasks"
- Strategy: Parallel execution
- TWO simultaneous task tool calls in one response

---

#### Test 3.2: Multiple Agent Types
**Input**: `Check our sprint velocity and document our coding standards`

**Expected Behavior**:
- Routes to: `scrum_master` (velocity) + `docs-architect` (standards) in parallel
- High confidence
- Rationale mentions "independent workstreams"
- Strategy: Parallel execution

---

### 4. Clarification Tests

#### Test 4.1: Vague Request
**Input**: `Fix it`

**Expected Behavior**:
- NO routing/delegation
- Asks 2-3 clarifying questions:
  1. What specifically needs fixing?
  2. Which file/component?
  3. Any error messages?
- Confidence: N/A or "Pending clarification"
- Rationale explains insufficient information

---

#### Test 4.2: Ambiguous Reference
**Input**: `The thing is broken`

**Expected Behavior**:
- NO routing/delegation
- Asks clarifying questions about:
  - What "thing" refers to
  - What "broken" means (error, unexpected behavior, etc.)
  - Where it's happening
- Explains need for context

---

#### Test 4.3: Multiple Possible Interpretations
**Input**: `Help me with the auth code`

**Expected Behavior**:
- Could route to `explore` (to find auth code)
- OR asks what kind of help: review, fix bug, add feature, document, etc.
- Medium confidence
- Rationale explains the ambiguity

---

### 5. Discovery/Search Tests

#### Test 5.1: File Search
**Input**: `Where is the authentication logic defined?`

**Expected Behavior**:
- Routes to `explore`
- High confidence
- Rationale mentions "codebase search" or "file discovery"
- Strategy: Direct delegation

---

#### Test 5.2: Pattern Search
**Input**: `Find all places where we use console.log`

**Expected Behavior**:
- Routes to `explore`
- High confidence
- Rationale mentions "keyword search" or "pattern matching"
- Strategy: Direct delegation

---

#### Test 5.3: Component Location
**Input**: `Locate the user profile component`

**Expected Behavior**:
- Routes to `explore`
- High confidence
- Rationale mentions "file/component discovery"
- Strategy: Direct delegation

---

### 6. Complex Multi-step Tests

#### Test 6.1: Feature Implementation
**Input**: `Implement a new dark mode toggle in the settings page`

**Expected Behavior**:
- Routes to: `explore` → `general` (sequential chain)
- High confidence
- Rationale mentions "need to find settings page first"
- Strategy: Sequential chain
- Context-first approach

---

#### Test 6.2: Architecture Review Then Implementation
**Input**: `Review our current error handling architecture and suggest improvements, then implement them`

**Expected Behavior**:
- Routes to: `director_of_engineering` → `explore` → `general` (complex chain)
- OR asks if user wants review first, then implementation after approval
- Medium confidence
- Rationale mentions multi-phase approach

---

### 7. Edge Cases

#### Test 7.1: Non-existent Agent
**Input**: `@code-reviewer check this file` (assuming code-reviewer doesn't exist)

**Expected Behavior**:
- Informs user that `code-reviewer` doesn't exist
- Suggests alternatives (`general`, `director_of_engineering`, etc.)
- Asks if user wants to use an alternative

---

#### Test 7.2: Mixed Context
**Input**: `Find the auth logic and write a commit message`

**Expected Behavior**:
- Routes to: `explore` (auth logic) + `commit-message-writer` (commit) in parallel
- OR asks which task to do first
- Medium confidence
- Rationale explains the two distinct tasks

---

#### Test 7.3: Self-Reference
**Input**: `What can you do?` or `Help me understand how you work`

**Expected Behavior**:
- Responds directly (doesn't delegate)
- Explains orchestrator capabilities
- Lists available agents
- Describes routing process

---

### 8. Verbosity Tests

#### Test 8.1: Default Verbosity
**Input**: `Document the API endpoints`

**Expected Behavior**:
- Shows: Agent(s), Confidence, Rationale (2-4 bullets), Strategy
- Clear but not excessive explanation
- Professional formatting

---

#### Test 8.2: Requested Extra Verbosity
**Input**: `Explain why you chose that agent for documenting the API endpoints`

**Expected Behavior**:
- Extra detailed rationale (4-6 bullets)
- Mentions alternatives considered
- Explains decision-making process
- Shows assumptions

---

#### Test 8.3: Low Confidence Verbosity
**Input**: `Do something with the user thing` (intentionally vague)

**Expected Behavior**:
- If it routes: Shows extra verbose output with low confidence
- Explains uncertainty
- States assumptions clearly
- OR asks clarifying questions (preferred)

---

## Validation Checklist

After running the tests above, verify:

- [ ] **Router-only behavior**: Orchestrator NEVER writes files or runs bash commands
- [ ] **Tool permissions**: `write`, `edit`, `bash` are all disabled
- [ ] **Delegation works**: Successfully calls the `task` tool with appropriate subagent_type
- [ ] **Verbosity**: Always provides rationale and confidence levels
- [ ] **Chaining**: Can create sequential chains when needed
- [ ] **Parallelization**: Can issue multiple task calls in one response
- [ ] **Clarification**: Asks questions when information is insufficient
- [ ] **Context-first**: Prefers `explore` before implementation
- [ ] **Agent discovery**: Knows about all custom agents (docs-architect, director_of_engineering, etc.)
- [ ] **Priority routing**: Follows the 10-step priority decision tree
- [ ] **Error handling**: Gracefully handles non-existent agents
- [ ] **Self-contained prompts**: Passes complete context to subagents

---

## Troubleshooting

### Issue: Orchestrator tries to execute tasks directly
**Solution**: 
- Verify `tools: { write: false, edit: false, bash: false }` in frontmatter
- Verify `permission: { edit: deny, bash: {"*": deny} }` in frontmatter
- Check that the system prompt emphasizes "NEVER execute tasks yourself"

### Issue: Orchestrator doesn't know about custom agents
**Solution**:
- Ensure custom agents are listed in the Agent Capability Map section
- Update the capability map when adding new agents
- Restart OpenCode to reload agent definitions

### Issue: Routing decisions are unclear
**Solution**:
- Verify the Response Format section is being followed
- Check that Rationale section includes 2-4 bullets explaining the decision
- Ensure Confidence level is always included

### Issue: Not asking clarifying questions for vague requests
**Solution**:
- Strengthen the Clarification Protocol section
- Add more examples of when to ask questions
- Emphasize "do NOT guess" in Fallback routing rule

### Issue: Not chaining agents when it should
**Solution**:
- Review the Chaining & Parallelization section
- Add more examples of when to chain
- Emphasize context-first approach in routing rules

### Issue: Model isn't claude-haiku
**Solution**:
- Check `model:` field in YAML frontmatter
- Verify you have claude-haiku configured in OpenCode
- Set up model fallback in `opencode.json` if needed:
  ```json
  {
    "agent": {
      "orchestrator": {
        "model": "anthropic/claude-haiku-4-20250514"
      }
    }
  }
  ```

---

## Performance Metrics

Track these metrics to evaluate orchestrator effectiveness:

1. **Routing Accuracy**: % of requests routed to the correct agent
2. **Clarification Rate**: % of requests requiring clarification
3. **Chain Success**: % of chains that complete successfully
4. **User Satisfaction**: Subjective measure of usefulness

**Target Goals**:
- Routing Accuracy: >90%
- Clarification Rate: 5-15% (too low = guessing, too high = over-cautious)
- Chain Success: >85%

---

## Next Steps

After testing:

1. **Iterate**: Update the agent based on test results
2. **Customize**: Add new agents to the capability map as you create them
3. **Refine**: Adjust routing priorities based on your workflow
4. **Share**: Consider contributing your orchestrator pattern back to the community

---

## Quick Reference: Test Commands

Copy and paste these into OpenCode to quickly test routing:

```
# Basic routing
@general help me
Write a commit message
What's our architecture strategy?
Help prioritize the backlog
What should we discuss in retrospective?

# Chaining
Document the auth module
Fix the bug in payment logic
Implement a new feature in src/app.ts

# Parallel
Review security and update docs
Check velocity and document standards

# Clarification
Fix it
The thing is broken
Help with auth

# Discovery
Where is the auth logic?
Find all console.log statements
Locate the user profile component
```

---

## Advanced Testing

### Test Custom Agent Integration
Create a new test agent in `~/.config/opencode/agent/test-agent.md`:

```markdown
---
description: Test agent for validation
mode: subagent
---
This is a test agent.
```

Then test:
**Input**: `@test-agent do something`

**Expected**: Routes to test-agent with acknowledgment

### Test Model Fallback
1. Configure model fallback in `opencode.json`
2. Temporarily disable claude-haiku access
3. Verify orchestrator falls back to next model in chain
4. Check that routing logic remains consistent across models

### Load Testing
1. Send 10-20 requests rapidly
2. Verify consistent routing behavior
3. Check for context window issues
4. Validate delegation prompt quality doesn't degrade

---

## Documentation

Keep this testing guide updated as you:
- Add new agents
- Modify routing logic
- Discover edge cases
- Refine the orchestrator behavior

**Last Updated**: January 14, 2026

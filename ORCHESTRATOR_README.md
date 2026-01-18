# Orchestrator Agent Implementation

This directory contains a custom **Orchestrator Agent** for OpenCode - an intelligent routing system that analyzes user requests and delegates work to specialized subagents.

## Overview

The Orchestrator Agent is a **primary mode** agent that acts as a central dispatch system. Unlike standard agents that execute tasks, the orchestrator's sole purpose is to:

1. **Analyze** user requests to understand intent and context
2. **Route** requests to the most appropriate specialized agent
3. **Chain** multiple agents when tasks require sequential steps
4. **Parallelize** independent tasks for efficiency
5. **Clarify** ambiguous requests before routing

**Key Principle**: The orchestrator is a router, not an executor. It never writes files, runs commands, or executes tasks directly.

## Features

### ✅ Implemented Features

- **Primary Mode Agent**: Set as default agent for all user interactions
- **Verbose by Default**: Always explains routing decisions with clear rationale
- **10-Step Priority Routing**: Deterministic decision tree for consistent routing
- **Sequential Chaining**: Routes through multiple agents when dependencies exist (e.g., `explore` → `general`)
- **Parallel Execution**: Runs independent tasks concurrently for efficiency
- **Clarification Protocol**: Asks targeted questions when requests are ambiguous
- **Context-First Approach**: Gathers context before implementation
- **Extensible Design**: Can route to agents that don't exist yet
- **Read-Only Tools**: Only uses context-gathering tools, never execution tools
- **Self-Contained Prompts**: Creates complete, stateless prompts for subagents

### 🎯 Routing Capabilities

The orchestrator routes to these agent types:

**Built-in OpenCode Agents**:
- `general` - General-purpose multi-step tasks
- `explore` - Fast codebase search and exploration

**Custom Agents** (your configuration):
- `docs-architect` - Technical documentation
- `director_of_engineering` - Architecture and strategy
- `project_manager` - Delivery coordination
- `scrum_master` - Agile ceremonies and flow
- `commit-message-writer` - Git commit messages

## Files

### Core Implementation

- **`agent/orchestrator.md`** - Main orchestrator agent definition
  - YAML frontmatter with tool permissions and configuration
  - Comprehensive system prompt with routing logic
  - Agent capability map
  - Example scenarios and protocols

### Documentation

- **`ORCHESTRATOR_TESTING.md`** - Comprehensive testing guide
  - 40+ test scenarios covering all routing cases
  - Validation checklist
  - Troubleshooting guide
  - Performance metrics

- **`ORCHESTRATOR_README.md`** - This file
  - Implementation overview
  - Quick start guide
  - Architecture documentation

## Quick Start

### 1. Restart OpenCode

The orchestrator is automatically loaded as a primary agent. Restart OpenCode to activate it:

```bash
# Exit your current OpenCode session
# Then restart
opencode
```

### 2. Verify Activation

The orchestrator should now be your default agent. Check the agent indicator in the UI (typically bottom-right corner).

To manually switch to the orchestrator:
```
Press Tab to cycle through primary agents until you see "orchestrator"
```

### 3. Test Basic Routing

Try these commands to verify routing works:

```
Find the authentication logic
```
Expected: Routes to `explore`

```
Write a commit message for my changes
```
Expected: Routes to `commit-message-writer`

```
What's the best architecture for our microservices?
```
Expected: Routes to `director_of_engineering`

### 4. Test Chaining

```
Document the authentication module
```
Expected: Routes to `explore` → `docs-architect` (sequential chain)

### 5. Test Clarification

```
Fix it
```
Expected: Asks clarifying questions (what needs fixing, which file, etc.)

## Configuration

### Model Configuration

The orchestrator uses Claude Haiku for fast, cost-effective routing decisions:

```yaml
model: anthropic/claude-haiku-4-20250514
temperature: 0.1  # Low for deterministic routing
```

### Model Fallback Chain (Recommended)

While the agent file specifies Haiku, you can configure fallback models in your global `opencode.json`:

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

**Recommended Fallback Chain**:
1. `anthropic/claude-haiku-4-20250514` (primary, fast)
2. `anthropic/claude-sonnet-4-20250514` (fallback, more capable)
3. `openai/gpt-4o-mini` (fallback, alternative provider)
4. `deepseek/glm-4-chat` (final fallback)

**Note**: OpenCode's model fallback is configured at the infrastructure level, not per-agent.

### Tool Permissions

The orchestrator has strict read-only permissions:

**Enabled**:
- `read`, `list`, `glob`, `grep` - Context gathering
- `line_view`, `find_symbol`, `get_symbols_overview` - Code inspection
- `task` - Delegation (THE core tool)

**Disabled**:
- `write`, `edit` - No file modification
- `bash` - No command execution
- `webfetch` - No external requests
- All other execution tools

These permissions are **enforced** via:
```yaml
permission:
  edit: deny
  bash:
    "*": deny
  webfetch: deny
```

## Architecture

### Routing Logic

The orchestrator follows a **10-step priority decision tree**:

1. **Explicit Agent Request** - User says "@agent-name" or "use agent-name"
2. **Git Workflows** - Commit messages, git operations
3. **Architecture & Strategy** - Technical leadership, design decisions
4. **Project Management** - Delivery, scope, backlog
5. **Agile Ceremonies** - Sprints, retrospectives, velocity
6. **Documentation** - READMEs, API docs (chains: `explore` → `docs-architect`)
7. **Discovery / Search** - Finding files, code patterns
8. **Implementation** - Building features, fixing bugs (chains: `explore` → `general`)
9. **Complex Tasks** - General development, multi-step workflows
10. **Fallback** - Asks clarifying questions for ambiguous requests

### Chaining Strategies

**Sequential Chaining**: When later steps depend on earlier output
```
explore (find context) → general (implement with context)
explore (analyze code) → docs-architect (document with understanding)
```

**Parallel Execution**: When tasks are independent
```
general (security review) + docs-architect (update docs)
scrum_master (check velocity) + docs-architect (write standards)
```

### Output Format

All orchestrator responses follow this structure:

```markdown
### Routing Decision
- **Agent(s)**: @agent-name (or chain: @agent1 → @agent2)
- **Confidence**: High | Medium | Low
- **Rationale**: 
  • [Clear reason why this agent is appropriate]
  • [How it matches the request]
  • [Any assumptions being made]
- **Strategy**: [Direct delegation | Sequential chain | Parallel execution]

### Delegation
[Actual tool call(s) to the task tool]
```

## Customization

### Adding New Agents

When you create new custom agents, update the orchestrator's capability map:

1. Open `agent/orchestrator.md`
2. Find the "Custom Agents (Your Configuration)" table
3. Add a row with:
   - Agent name
   - Primary capability
   - Mode (usually "Subagent")
   - Trigger keywords

Example:
```markdown
| **code-reviewer** | Security and quality review | Subagent | "review", "audit", "check quality" |
```

4. Consider adding a routing rule in the "Routing Logic (Priority Order)" section if needed

### Adjusting Routing Priorities

To change which agent gets priority for certain keywords:

1. Open `agent/orchestrator.md`
2. Find the "Routing Logic (Priority Order)" section
3. Reorder or modify the numbered priority list
4. Update keywords in the capability map to match

**Remember**: Rules are checked in order, first match wins!

### Tuning Verbosity

The orchestrator is verbose by default (as requested). To adjust:

**Less Verbose**: Edit the "Verbosity Control" section to make default mode more concise

**More Verbose**: Add more detail to the "Rationale" template in "Response Format"

### Temperature Adjustment

Current: `temperature: 0.1` (very deterministic)

To make routing more creative or exploratory:
```yaml
temperature: 0.3  # Slightly more varied
```

To make routing even more deterministic:
```yaml
temperature: 0.0  # Maximum determinism
```

## Testing

See `ORCHESTRATOR_TESTING.md` for comprehensive testing guide with 40+ test scenarios.

### Quick Validation

Run these 5 tests to validate basic functionality:

```bash
# 1. Basic routing
"Find the authentication logic"  # → explore

# 2. Git workflow
"Write a commit message"  # → commit-message-writer

# 3. Chaining
"Document the API endpoints"  # → explore → docs-architect

# 4. Clarification
"Fix it"  # → Asks questions

# 5. Architecture
"What's the best way to structure this?"  # → director_of_engineering
```

All tests should:
- Show clear routing decision with rationale
- Delegate to correct agent(s)
- Never attempt to execute tasks directly

## Troubleshooting

### Orchestrator tries to execute tasks

**Problem**: Agent attempts to write files or run commands

**Solution**:
- Verify `tools: { write: false, edit: false, bash: false }` in frontmatter
- Check `permission: { edit: deny, bash: {"*": deny} }` in frontmatter
- Restart OpenCode to reload configuration

### Routing decisions unclear

**Problem**: Can't understand why agent chose a particular route

**Solution**:
- Request extra verbosity: "Explain why you chose that agent"
- Check that "Verbosity Control" section emphasizes verbose output
- Verify "Response Format" template is being followed

### Not chaining when expected

**Problem**: Routes directly to `general` instead of `explore` → `general`

**Solution**:
- Review "Context-First Philosophy" in operational constraints
- Strengthen emphasis on chaining in routing rules 8 and 6
- Add more chain examples to "Example Scenarios"

### Doesn't know about custom agents

**Problem**: Orchestrator doesn't route to your custom agents

**Solution**:
- Add agents to "Agent Capability Map" section
- Include trigger keywords for each agent
- Restart OpenCode to reload agent definitions

### Model not Claude Haiku

**Problem**: Using wrong model for orchestrator

**Solution**:
```json
// Add to opencode.json
{
  "agent": {
    "orchestrator": {
      "model": "anthropic/claude-haiku-4-20250514"
    }
  }
}
```

## Performance Considerations

### Context Window Management

The orchestrator uses read-only tools that can consume context:
- Use high-level tools first: `list`, `glob`
- Avoid reading large files unless necessary for routing
- Delegate deep analysis to subagents

### Routing Speed

- **Temperature 0.1** ensures fast, deterministic decisions
- **Claude Haiku** is optimized for speed and cost
- **Clear routing rules** minimize model reasoning time

### Cost Optimization

The orchestrator adds an extra model call (routing) before delegation:
- **Mitigated by**: Using fast, cheap model (Haiku)
- **Offset by**: Better agent selection = fewer retries
- **Benefit**: Correct routing saves tokens in the long run

## Roadmap

### Potential Enhancements

- **Dynamic Agent Discovery**: Auto-detect new agents in `agent/` directory
- **Learning System**: Track routing accuracy and adjust priorities
- **Confidence Thresholds**: Auto-escalate low-confidence routes to user
- **Multi-language Support**: Route based on programming language context
- **Project Context**: Adapt routing based on project type (web, mobile, ML, etc.)
- **History-Aware**: Learn from past routing decisions in the session

### Known Limitations

- **Static Agent Map**: Must manually update when adding agents
- **No Model Fallback**: Fallback chain not enforced in agent file
- **Stateless Subagents**: Must create self-contained prompts each time
- **No Feedback Loop**: Can't learn from routing mistakes

## Contributing

If you improve the orchestrator or discover better routing patterns:

1. Document your changes
2. Update test cases in `ORCHESTRATOR_TESTING.md`
3. Share your configuration with the OpenCode community
4. Consider submitting to the OpenCode examples repository

## Resources

- **OpenCode Docs**: https://opencode.ai/docs
- **Agents Guide**: https://opencode.ai/docs/agents
- **Model Configuration**: https://opencode.ai/docs/models
- **Original Gist**: https://gist.github.com/gc-victor/1d3eeb46ddfda5257c08744972e0fc4c

## Version History

- **v1.0** (2026-01-14): Initial implementation
  - Primary mode orchestrator
  - 10-step priority routing
  - Sequential chaining and parallel execution
  - Verbose output by default
  - 5 custom agents integrated
  - Comprehensive testing guide

## License

This orchestrator implementation is based on the public domain guide by gc-victor and customized for your OpenCode setup.

## Support

For issues or questions:
1. Check `ORCHESTRATOR_TESTING.md` for troubleshooting
2. Review OpenCode documentation
3. Join OpenCode Discord: https://opencode.ai/discord
4. Open an issue on GitHub: https://github.com/anomalyco/opencode

---

**Last Updated**: January 14, 2026  
**OpenCode Version**: Compatible with 1.0+

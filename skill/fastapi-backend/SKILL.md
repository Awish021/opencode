---
name: fastapi-backend
description: Develop FastAPI backends and run local stacks with docker-compose.
---

# FastAPI Backend

## What I do
- Build FastAPI services with clean routing and models
- Shape request/response data with Pydantic
- Coordinate local stacks with docker-compose at a high level

## When to use me
Use when you need FastAPI endpoints or backend scaffolding.
Ask clarifying questions about auth, persistence, and deployment targets.

## Quick checklist
- Prefer Pydantic models for I/O
- Separate routers by domain
- Follow MVC pattern for service structure
- Handle async vs sync correctly
- Add health checks for readiness
- Keep configuration in env variables

## Minimal examples

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    id: int
    name: str

@app.post("/items", response_model=Item)
async def create_item(item: Item) -> Item:
    return item
```

## Output format

```markdown
## FastAPI Update

### Summary
- [What changed]
- [API behavior or reliability gain]

### Code
```python
[FastAPI code]
```

### Notes
- [Assumptions]
- [Next steps]
```

---
name: pytest-tests
description: Create pytest-based unit tests for Python code.
---

# Pytest Tests

## What I do
- Write pytest unit tests for Python code
- Cover behavior, edge cases, and errors
- Use fixtures and mocks to isolate units

## When to use me
Use when you need Python unit tests written or updated in pytest.
Ask clarifying questions when expected behavior is unclear.

## Quick checklist
- Prefer pytest fixtures over setup/teardown
- Use `pytest.raises` for errors
- Mock external calls with `unittest.mock`
- Keep tests independent and fast

## Minimal examples

```python
import pytest
from my_module import MyClass, my_function

class TestMyClass:
    def test_initialization(self):
        obj = MyClass("test")
        assert obj.value == "test"

    def test_rejects_empty(self):
        with pytest.raises(ValueError):
            MyClass("")

def test_my_function_cases():
    assert my_function([1, 2, 3]) == 6
    assert my_function([]) == 0
```

```python
from unittest.mock import patch

@patch("my_module.external_api_call")
def test_calls_api(mock_api):
    mock_api.return_value = {"status": "ok"}
    assert my_function("input") == "ok"
    mock_api.assert_called_once_with("input")
```

## Output format

```markdown
## Unit Tests for [Target]

### Test File: [test_file_name]
```python
[Test code]
```

### Coverage
- [Functionality tested]
- [Edge cases covered]
- [Error conditions tested]
```

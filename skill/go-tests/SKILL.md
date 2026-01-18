---
name: go-tests
description: Create Go unit tests using the standard testing package.
---

# Go Tests

## What I do
- Write Go unit tests for functions, methods, and types
- Cover behavior, edge cases, and errors
- Use testify and gomock when appropriate

## When to use me
Use when you need Go unit tests added or updated.
Ask clarifying questions when expected behavior is unclear.

## Quick checklist
- Use table-driven tests when inputs vary
- Keep tests independent and fast
- Prefer `testing` + `testify` assertions
- Mock interfaces with gomock when needed

## Minimal examples

```go
package mypackage

import (
    "testing"
    "github.com/stretchr/testify/assert"
    "github.com/stretchr/testify/require"
)

func TestMyFunction(t *testing.T) {
    tests := []struct {
        name     string
        input    []int
        expected int
        wantErr  bool
    }{
        {name: "normal", input: []int{1, 2, 3}, expected: 6},
        {name: "empty", input: []int{}, expected: 0},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            result, err := MyFunction(tt.input)
            if tt.wantErr {
                assert.Error(t, err)
            } else {
                require.NoError(t, err)
                assert.Equal(t, tt.expected, result)
            }
        })
    }
}
```

```go
//go:generate mockgen -destination=mocks/mock_interface.go -package=mocks mypackage MyInterface

func TestWithMock(t *testing.T) {
    ctrl := gomock.NewController(t)
    defer ctrl.Finish()

    mockInterface := mocks.NewMockMyInterface(ctrl)
    mockInterface.EXPECT().DoSomething("input").Return("output", nil)

    obj := &MyStruct{Dependency: mockInterface}
    result, err := obj.Process("input")

    require.NoError(t, err)
    assert.Equal(t, "output", result)
}
```

## Output format

```markdown
## Unit Tests for [Target]

### Test File: [test_file_name]
```go
[Test code]
```

### Coverage
- [Functionality tested]
- [Edge cases covered]
- [Error conditions tested]
```

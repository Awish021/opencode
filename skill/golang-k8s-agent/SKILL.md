---
name: golang-k8s-agent
description: Build Go-based Kubernetes agents and controllers.
---

# Go K8s Agent

## What I do
- Build Kubernetes agents and controllers in Go
- Implement reconcile loops with client-go or controller-runtime
- Handle retries, events, and structured logging

## When to use me
Use when you need Go controllers, agents, or reconciler logic.
Ask clarifying questions about CRDs, resync cadence, and failure modes.

## Quick checklist
- Use `context.Context` for all API calls
- Requeue on transient errors with backoff
- Avoid busy loops and tight resyncs
- Ensure informer cache sync before acting
- Use structured logging consistently

## Minimal examples

```go
package controllers

import (
    "context"
    "time"

    "github.com/go-logr/logr"
    apierrors "k8s.io/apimachinery/pkg/api/errors"
    ctrl "sigs.k8s.io/controller-runtime"
    "sigs.k8s.io/controller-runtime/pkg/client"
)

type Reconciler struct {
    client.Client
    Log logr.Logger
}

type Widget struct {
    client.Object
}

func (r *Reconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
    var widget Widget
    if err := r.Get(ctx, req.NamespacedName, &widget); err != nil {
        if apierrors.IsNotFound(err) {
            return ctrl.Result{}, nil
        }
        return ctrl.Result{RequeueAfter: 10 * time.Second}, err
    }

    r.Log.Info("reconciling", "name", req.Name, "namespace", req.Namespace)
    return ctrl.Result{}, nil
}
```

## Output format

```markdown
## K8s Agent Update

### Summary
- [What changed]
- [Controller behavior or reliability gain]

### Code
```go
[Go code]
```

### Notes
- [Assumptions]
- [Next steps]
```

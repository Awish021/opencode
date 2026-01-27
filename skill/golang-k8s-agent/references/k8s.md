# Kubernetes Controllers

> Reference for: Golang K8s Agent
> Load when: Kubernetes controllers, reconcile loops, CRDs, controller-runtime

## What This Covers

- Building Kubernetes agents and controllers in Go
- Implementing reconcile loops with controller-runtime
- Handling retries, events, and structured logging
- Managing finalizers, status, and owner references

## When to Use

Use when you need Go controllers, agents, or reconciler logic. Ask clarifying questions about CRDs, resync cadence, and failure modes.

## Core Components

### Manager and Controller Setup

```go
import (
    "os"

    ctrl "sigs.k8s.io/controller-runtime"
    "sigs.k8s.io/controller-runtime/pkg/healthz"
    "sigs.k8s.io/controller-runtime/pkg/log/zap"
)

func main() {
    ctrl.SetLogger(zap.New(zap.UseDevMode(true)))

    mgr, err := ctrl.NewManager(ctrl.GetConfigOrDie(), ctrl.Options{
        Scheme:                 scheme,
        MetricsBindAddress:     ":8080",
        HealthProbeBindAddress: ":8081",
        LeaderElection:         true,
        LeaderElectionID:       "example-controller",
    })
    if err != nil {
        os.Exit(1)
    }

    if err := mgr.AddHealthzCheck("healthz", healthz.Ping); err != nil {
        os.Exit(1)
    }
    if err := mgr.AddReadyzCheck("readyz", healthz.Ping); err != nil {
        os.Exit(1)
    }

    if err := (&WidgetReconciler{Client: mgr.GetClient(), Scheme: mgr.GetScheme()}).
        SetupWithManager(mgr); err != nil {
        os.Exit(1)
    }

    if err := mgr.Start(ctrl.SetupSignalHandler()); err != nil {
        os.Exit(1)
    }
}
```

### RBAC + Scheme Registration

```go
// +kubebuilder:rbac:groups=example.com,resources=widgets,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=example.com,resources=widgets/status,verbs=get;update;patch
// +kubebuilder:rbac:groups=example.com,resources=widgets/finalizers,verbs=update

import (
    "k8s.io/apimachinery/pkg/runtime"
    clientgoscheme "k8s.io/client-go/kubernetes/scheme"
    myv1 "example.com/api/v1"
)

var scheme = runtime.NewScheme()

func init() {
    _ = clientgoscheme.AddToScheme(scheme)
    _ = myv1.AddToScheme(scheme)
}
```

## Reconcile Patterns

### Read-Create-Update Loop

```go
func (r *WidgetReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
    var widget myv1.Widget
    if err := r.Get(ctx, req.NamespacedName, &widget); err != nil {
        if apierrors.IsNotFound(err) {
            return ctrl.Result{}, nil
        }
        return ctrl.Result{}, err
    }

    if !widget.DeletionTimestamp.IsZero() {
        return r.handleDeletion(ctx, &widget)
    }

    if widget.Spec.Replicas == nil {
        widget.Spec.Replicas = ptr.To[int32](1)
        if err := r.Update(ctx, &widget); err != nil {
            return ctrl.Result{}, err
        }
    }

    return ctrl.Result{}, nil
}
```

### Transient Errors and Backoff

```go
func requeueOnError(err error) (ctrl.Result, error) {
    if err != nil {
        return ctrl.Result{}, err
    }

    return ctrl.Result{}, nil
}

func requeueAfter(delay time.Duration) (ctrl.Result, error) {
    return ctrl.Result{RequeueAfter: delay}, nil
}
```

## Status and Conditions

```go
func (r *WidgetReconciler) updateStatus(ctx context.Context, widget *myv1.Widget, reason string) error {
    patch := client.MergeFrom(widget.DeepCopy())
    meta.SetStatusCondition(&widget.Status.Conditions, metav1.Condition{
        Type:               "Ready",
        Status:             metav1.ConditionTrue,
        Reason:             reason,
        ObservedGeneration: widget.GetGeneration(),
        LastTransitionTime: metav1.Now(),
    })
    return r.Status().Patch(ctx, widget, patch)
}
```

## Finalizers and Deletion

```go
const finalizerName = "example.com/finalizer"

func (r *WidgetReconciler) ensureFinalizer(ctx context.Context, widget *myv1.Widget) error {
    if controllerutil.ContainsFinalizer(widget, finalizerName) {
        return nil
    }
    controllerutil.AddFinalizer(widget, finalizerName)
    return r.Update(ctx, widget)
}

func (r *WidgetReconciler) handleDeletion(ctx context.Context, widget *myv1.Widget) (ctrl.Result, error) {
    if !widget.DeletionTimestamp.IsZero() {
        if controllerutil.ContainsFinalizer(widget, finalizerName) {
            if err := r.cleanupExternalResources(ctx, widget); err != nil {
                return ctrl.Result{}, err
            }
            controllerutil.RemoveFinalizer(widget, finalizerName)
            return ctrl.Result{}, r.Update(ctx, widget)
        }
    }
    return ctrl.Result{}, nil
}
```

## Owner References and Garbage Collection

```go
func (r *WidgetReconciler) ensureOwned(ctx context.Context, widget *myv1.Widget) error {
    deployment := &appsv1.Deployment{
        ObjectMeta: metav1.ObjectMeta{
            Name:      widget.Name,
            Namespace: widget.Namespace,
        },
    }

    _, err := controllerutil.CreateOrUpdate(ctx, r.Client, deployment, func() error {
        return controllerutil.SetControllerReference(widget, deployment, r.Scheme)
    })
    return err
}
```

## Event Filters and Predicates

```go
import "sigs.k8s.io/controller-runtime/pkg/predicate"

func (r *WidgetReconciler) SetupWithManager(mgr ctrl.Manager) error {
    return ctrl.NewControllerManagedBy(mgr).
        For(&myv1.Widget{}).
        WithEventFilter(predicate.GenerationChangedPredicate{}).
        Complete(r)
}
```

## Quick Checklist

- Use `context.Context` for all API calls
- Requeue on transient errors with backoff
- Avoid busy loops and tight resyncs
- Ensure informer cache sync when using a custom cache or bypassing `mgr.Start`
- Use structured logging consistently
- Update status with conditions and `ObservedGeneration`
- Handle finalizers before delete completion

## Testing Patterns

### Fake Client Unit Tests

```go
func TestReconcileCreatesDefaults(t *testing.T) {
    scheme := runtime.NewScheme()
    _ = myv1.AddToScheme(scheme)

    widget := &myv1.Widget{
        ObjectMeta: metav1.ObjectMeta{Name: "example", Namespace: "default"},
    }

    client := fake.NewClientBuilder().WithScheme(scheme).WithObjects(widget).Build()
    reconciler := &WidgetReconciler{Client: client, Scheme: scheme}

    _, err := reconciler.Reconcile(context.Background(), ctrl.Request{
        NamespacedName: types.NamespacedName{Name: "example", Namespace: "default"},
    })
    require.NoError(t, err)
}
```

### envtest Integration Tests

```go
testEnv := &envtest.Environment{
    CRDDirectoryPaths: []string{filepath.Join("..", "config", "crd", "bases")},
}

cfg, err := testEnv.Start()
require.NoError(t, err)

defer func() {
    _ = testEnv.Stop()
}()
```

## Observability and Reliability

- Use `WithValues` for structured logging keys
- Expose metrics via controller-runtime metrics endpoint
- Enable leader election for multi-replica deployments
- Emit Kubernetes events for user-visible changes

## Quick Reference

| Topic | Guidance |
| --- | --- |
| Requeue on error | Return the error and let controller-runtime backoff |
| Deterministic delay | Return `RequeueAfter` with a nil error |
| Deletion handling | Short-circuit reconcile when `DeletionTimestamp` is set |
| Status updates | Prefer `Status().Patch` with `client.MergeFrom` |
| Child resources | Use `CreateOrUpdate` for idempotency |
| Cache sync | Only required with custom cache usage |

## Output Format

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

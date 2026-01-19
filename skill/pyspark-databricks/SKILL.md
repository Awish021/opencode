---
name: pyspark-databricks
description: Build and optimize PySpark pipelines on Databricks.
---

# PySpark Databricks

## What I do
- Build PySpark ETL pipelines on Databricks
- Optimize Spark jobs for performance and cost
- Apply Delta Lake patterns for reliability

## When to use me
Use when you need help authoring or tuning PySpark on Databricks.
Ask clarifying questions about data volume, schema, and SLAs.

## Quick checklist
- Avoid `collect` on large data
- Partition and prune data sources
- Cache judiciously for reuse
- Use Delta Lake tables
- Prefer Spark SQL/DataFrame API

## Minimal examples

```python
from pyspark.sql import functions as F

events = spark.read.format("parquet").load("/mnt/raw/events/")
users = spark.read.option("header", "true").csv("/mnt/raw/users.csv")

result = (
    events.join(users, "user_id")
    .groupBy("country")
    .agg(F.count("*").alias("events"))
)

(result.write.format("delta")
 .mode("overwrite")
 .partitionBy("country")
 .save("/mnt/delta/event_counts"))
```

## Output format

```markdown
## PySpark Pipeline Update

### Summary
- [What changed]
- [Optimization or reliability gain]

### Code
```python
[PySpark code]
```

### Notes
- [Assumptions]
- [Next steps]
```

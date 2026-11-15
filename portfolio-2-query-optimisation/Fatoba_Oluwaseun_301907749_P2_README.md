# Customer Orders and Product Lines — SQL queries

## 1. Show related order, customer, order_line, product records (up to 20).

```sql
SELECT t0."order_id" AS "order_order_id",
       t0."order_number" AS "order_order_number",
       t3."customer_id" AS "customer_customer_id",
       t3."name" AS "customer_name",
       t1."order_line_id" AS "order_line_order_line_id",
       t1."quantity" AS "order_line_quantity",
       t2."product_id" AS "product_product_id",
       t2."sku" AS "product_sku"
FROM portfolio."order" t0
JOIN portfolio."order_line" t1 ON t1."order_id" = t0."order_id"
JOIN portfolio."product" t2 ON t1."product_id" = t2."product_id"
JOIN portfolio."customer" t3 ON t0."customer_id" = t3."customer_id"
ORDER BY t0."order_id", t3."customer_id", t1."order_line_id", t2."product_id"
LIMIT 20;
```

| order_order_id | order_order_number | customer_customer_id | customer_name | order_line_order_line_id | order_line_quantity | product_product_id | product_sku |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 6 | ORD-100 | 1 | Avery Chen | 7 | 2 | 3 | SKU-A |
| 6 | ORD-100 | 1 | Avery Chen | 8 | 3 | 4 | SKU-B |

## 2. Find order records where ordered_at matches "2026-11-15T12:00:00Z" (up to 20).

```sql
SELECT * FROM portfolio."order"
WHERE "ordered_at" IS NOT DISTINCT FROM '2026-11-15T12:00:00Z'
ORDER BY "order_id"
LIMIT 20;
```

| order_id | order_number | customer_id | ordered_at | status |
| --- | --- | --- | --- | --- |
| 6 | ORD-100 | 1 | 2026-11-15T12:00:00+00:00 | placed |

## 3. Count order_line records for each order_id (up to 20 groups).

```sql
SELECT "order_id", count(*) AS record_count
FROM portfolio."order_line"
GROUP BY "order_id"
ORDER BY record_count DESC, "order_id" NULLS LAST
LIMIT 20;
```

| order_id | record_count |
| --- | --- |
| 6 | 2 |


## Index comparison

| Phase | Median (ms) | Three runs (ms) | Plan nodes | Buffer hits |
| --- | --- | --- | --- | --- |
| Before index | 1.043 | 1.578, 1.043, 1.038 | Sort → Seq Scan | 112 |
| After index | 0.174 | 0.169, 0.177, 0.174 | Sort → Bitmap Heap Scan → Bitmap Index Scan | 25 |

The median execution time changed from 1.043 ms to 0.174 ms. The measured plan used p2_filter_idx. The results matched in both phases. An index adds storage and write-maintenance costs; timings depend on the selected lookup and environment.

## Execution plans

### Before index, run 1

```text
Sort (actual time=1.548..1.55 rows=20 loops=1)
  Seq Scan on order (actual time=0.02..1.5 rows=20 loops=1)
Planning Time: 0.459 ms
Execution Time: 1.578 ms
```

### Before index, run 2

```text
Sort (actual time=1.017..1.018 rows=20 loops=1)
  Seq Scan on order (actual time=0.013..0.983 rows=20 loops=1)
Planning Time: 0.303 ms
Execution Time: 1.043 ms
```

### Before index, run 3

```text
Sort (actual time=1.013..1.014 rows=20 loops=1)
  Seq Scan on order (actual time=0.014..0.982 rows=20 loops=1)
Planning Time: 0.306 ms
Execution Time: 1.038 ms
```

### After index, run 1

```text
Sort (actual time=0.118..0.119 rows=20 loops=1)
  Bitmap Heap Scan on order (actual time=0.024..0.085 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.013..0.013 rows=20 loops=1)
Planning Time: 0.491 ms
Execution Time: 0.169 ms
```

### After index, run 2

```text
Sort (actual time=0.124..0.125 rows=20 loops=1)
  Bitmap Heap Scan on order (actual time=0.026..0.089 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.014..0.014 rows=20 loops=1)
Planning Time: 0.526 ms
Execution Time: 0.177 ms
```

### After index, run 3

```text
Sort (actual time=0.121..0.122 rows=20 loops=1)
  Bitmap Heap Scan on order (actual time=0.024..0.087 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.013..0.013 rows=20 loops=1)
Planning Time: 0.498 ms
Execution Time: 0.174 ms
```

## Reproduce

Use a fresh database with the Portfolio 1 schema and sample data. Run Fatoba_Oluwaseun_301907749_P2_Queries.sql, then Fatoba_Oluwaseun_301907749_P2_Optimisation.sql. The optimisation script creates a separate performance table and runs EXPLAIN (ANALYZE, BUFFERS).

[Query screenshot](screenshots/Fatoba_Oluwaseun_301907749_P2_QueryResults.png) · [Index comparison](screenshots/Fatoba_Oluwaseun_301907749_P2_IndexComparison.png)

## References

- [PostgreSQL — EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)


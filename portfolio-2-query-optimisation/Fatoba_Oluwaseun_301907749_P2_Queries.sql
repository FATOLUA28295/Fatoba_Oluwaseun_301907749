-- Show related order, customer, order_line, product records (up to 20).
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

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
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

-- Find order records where ordered_at matches "2026-11-15T12:00:00Z" (up to 20).
SELECT * FROM portfolio."order"
WHERE "ordered_at" IS NOT DISTINCT FROM '2026-11-15T12:00:00Z'
ORDER BY "order_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM portfolio."order"
WHERE "ordered_at" IS NOT DISTINCT FROM '2026-11-15T12:00:00Z'
ORDER BY "order_id"
LIMIT 20;

-- Count order_line records for each order_id (up to 20 groups).
SELECT "order_id", count(*) AS record_count
FROM portfolio."order_line"
GROUP BY "order_id"
ORDER BY record_count DESC, "order_id" NULLS LAST
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT "order_id", count(*) AS record_count
FROM portfolio."order_line"
GROUP BY "order_id"
ORDER BY record_count DESC, "order_id" NULLS LAST
LIMIT 20;

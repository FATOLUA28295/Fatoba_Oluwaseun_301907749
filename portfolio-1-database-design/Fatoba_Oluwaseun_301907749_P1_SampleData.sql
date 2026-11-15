-- Fictional sample records for Customer Orders and Product Lines.
BEGIN;
SET LOCAL standard_conforming_strings = on;
INSERT INTO portfolio."customer" ("customer_id", "name", "email") VALUES (1, 'Avery Chen', 'avery.chen@example.test');
INSERT INTO portfolio."product" ("product_id", "sku", "name", "unit_price") VALUES (3, 'SKU-A', 'Desk Lamp', 24.5);
INSERT INTO portfolio."product" ("product_id", "sku", "name", "unit_price") VALUES (4, 'SKU-B', 'Notebook', 6.25);
INSERT INTO portfolio."product" ("product_id", "sku", "name", "unit_price") VALUES (5, 'SKU-C', 'Pen Set', 8.75);
INSERT INTO portfolio."order" ("order_id", "order_number", "customer_id", "ordered_at", "status") VALUES (6, 'ORD-100', 1, '2026-11-15T12:00:00Z', 'placed');
INSERT INTO portfolio."order_line" ("order_line_id", "order_id", "product_id", "quantity", "unit_price") VALUES (7, 6, 3, 2, 22.5);
INSERT INTO portfolio."order_line" ("order_line_id", "order_id", "product_id", "quantity", "unit_price") VALUES (8, 6, 4, 3, 6.25);
COMMIT;

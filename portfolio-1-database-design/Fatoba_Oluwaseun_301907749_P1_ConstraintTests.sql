-- Run these deliberately invalid statements one at a time, outside a transaction.
-- Each should fail at the named constraint; the sample rows should remain unchanged.

-- 1. customer pk. Expected: pk_customer, SQLSTATE 23505.
INSERT INTO portfolio."customer" ("customer_id", "name", "email")
VALUES (1, 'Different Customer', 'different.customer@example.test');

-- 2. customer email uq. Expected: uq_customer_0, SQLSTATE 23505.
INSERT INTO portfolio."customer" ("customer_id", "name", "email")
VALUES (1001, 'New Customer', 'avery.chen@example.test');

-- 3. customer id nn. Expected: customer_id, SQLSTATE 23502.
INSERT INTO portfolio."customer" ("customer_id", "name", "email")
VALUES (NULL, 'New Customer', 'new.customer.1002@example.test');

-- 4. customer name nn. Expected: name, SQLSTATE 23502.
INSERT INTO portfolio."customer" ("customer_id", "name", "email")
VALUES (1003, NULL, 'new.customer.1003@example.test');

-- 5. customer email nn. Expected: email, SQLSTATE 23502.
INSERT INTO portfolio."customer" ("customer_id", "name", "email")
VALUES (1004, 'New Customer', NULL);

-- 6. product pk. Expected: pk_product, SQLSTATE 23505.
INSERT INTO portfolio."product" ("product_id", "sku", "name", "unit_price")
VALUES (3, 'SKU-X', 'Other Lamp', 11);

-- 7. product sku uq. Expected: uq_product_0, SQLSTATE 23505.
INSERT INTO portfolio."product" ("product_id", "sku", "name", "unit_price")
VALUES (1005, 'SKU-A', 'Other Lamp', 11);

-- 8. product id nn. Expected: product_id, SQLSTATE 23502.
INSERT INTO portfolio."product" ("product_id", "sku", "name", "unit_price")
VALUES (NULL, 'SKU-D', 'Clock', 13);

-- 9. product sku nn. Expected: sku, SQLSTATE 23502.
INSERT INTO portfolio."product" ("product_id", "sku", "name", "unit_price")
VALUES (1006, NULL, 'Clock', 13);

-- 10. product name nn. Expected: name, SQLSTATE 23502.
INSERT INTO portfolio."product" ("product_id", "sku", "name", "unit_price")
VALUES (1007, 'SKU-E', NULL, 13);

-- 11. product price nn. Expected: unit_price, SQLSTATE 23502.
INSERT INTO portfolio."product" ("product_id", "sku", "name", "unit_price")
VALUES (1008, 'SKU-F', 'Clock', NULL);

-- 12. order pk. Expected: pk_order, SQLSTATE 23505.
INSERT INTO portfolio."order" ("order_id", "order_number", "customer_id", "ordered_at", "status")
VALUES (6, 'ORD-101', 1, '2026-11-15T13:00:00Z', 'placed');

-- 13. order number uq. Expected: uq_order_0, SQLSTATE 23505.
INSERT INTO portfolio."order" ("order_id", "order_number", "customer_id", "ordered_at", "status")
VALUES (1009, 'ORD-100', 1, '2026-11-15T13:00:00Z', 'placed');

-- 14. order customer fk. Expected: fk_order_0, SQLSTATE 23503.
INSERT INTO portfolio."order" ("order_id", "order_number", "customer_id", "ordered_at", "status")
VALUES (1010, 'ORD-102', 980001, '2026-11-15T13:00:00Z', 'placed');

-- 15. order id nn. Expected: order_id, SQLSTATE 23502.
INSERT INTO portfolio."order" ("order_id", "order_number", "customer_id", "ordered_at", "status")
VALUES (NULL, 'ORD-103', 1, '2026-11-15T13:00:00Z', 'placed');

-- 16. order number nn. Expected: order_number, SQLSTATE 23502.
INSERT INTO portfolio."order" ("order_id", "order_number", "customer_id", "ordered_at", "status")
VALUES (1011, NULL, 1, '2026-11-15T13:00:00Z', 'placed');

-- 17. order customer nn. Expected: customer_id, SQLSTATE 23502.
INSERT INTO portfolio."order" ("order_id", "order_number", "customer_id", "ordered_at", "status")
VALUES (1012, 'ORD-104', NULL, '2026-11-15T13:00:00Z', 'placed');

-- 18. order time nn. Expected: ordered_at, SQLSTATE 23502.
INSERT INTO portfolio."order" ("order_id", "order_number", "customer_id", "ordered_at", "status")
VALUES (1013, 'ORD-105', 1, NULL, 'placed');

-- 19. order status nn. Expected: status, SQLSTATE 23502.
INSERT INTO portfolio."order" ("order_id", "order_number", "customer_id", "ordered_at", "status")
VALUES (1014, 'ORD-106', 1, '2026-11-15T13:00:00Z', NULL);

-- 20. line pk. Expected: pk_order_line, SQLSTATE 23505.
INSERT INTO portfolio."order_line" ("order_line_id", "order_id", "product_id", "quantity", "unit_price")
VALUES (7, 6, 5, 1, 8.75);

-- 21. line order product uq. Expected: uq_order_line_0, SQLSTATE 23505.
INSERT INTO portfolio."order_line" ("order_line_id", "order_id", "product_id", "quantity", "unit_price")
VALUES (1015, 6, 3, 1, 22.5);

-- 22. line order fk. Expected: fk_order_line_0, SQLSTATE 23503.
INSERT INTO portfolio."order_line" ("order_line_id", "order_id", "product_id", "quantity", "unit_price")
VALUES (1016, 980002, 5, 1, 8.75);

-- 23. line product fk. Expected: fk_order_line_1, SQLSTATE 23503.
INSERT INTO portfolio."order_line" ("order_line_id", "order_id", "product_id", "quantity", "unit_price")
VALUES (1017, 6, 980003, 1, 8.75);

-- 24. line id nn. Expected: order_line_id, SQLSTATE 23502.
INSERT INTO portfolio."order_line" ("order_line_id", "order_id", "product_id", "quantity", "unit_price")
VALUES (NULL, 6, 5, 1, 8.75);

-- 25. line order nn. Expected: order_id, SQLSTATE 23502.
INSERT INTO portfolio."order_line" ("order_line_id", "order_id", "product_id", "quantity", "unit_price")
VALUES (1018, NULL, 5, 1, 8.75);

-- 26. line product nn. Expected: product_id, SQLSTATE 23502.
INSERT INTO portfolio."order_line" ("order_line_id", "order_id", "product_id", "quantity", "unit_price")
VALUES (1019, 6, NULL, 1, 8.75);

-- 27. line quantity nn. Expected: quantity, SQLSTATE 23502.
INSERT INTO portfolio."order_line" ("order_line_id", "order_id", "product_id", "quantity", "unit_price")
VALUES (1020, 6, 5, NULL, 8.75);

-- 28. line price nn. Expected: unit_price, SQLSTATE 23502.
INSERT INTO portfolio."order_line" ("order_line_id", "order_id", "product_id", "quantity", "unit_price")
VALUES (1021, 6, 5, 1, NULL);

-- 29. product price check. Expected: product_price_positive, SQLSTATE 23514.
INSERT INTO portfolio."product" ("product_id", "sku", "name", "unit_price")
VALUES (1022, 'SKU-G', 'Clock', 0);

-- 30. line quantity check. Expected: line_quantity_positive, SQLSTATE 23514.
INSERT INTO portfolio."order_line" ("order_line_id", "order_id", "product_id", "quantity", "unit_price")
VALUES (1023, 6, 5, 0, 8.75);

-- 31. line price check. Expected: line_price_positive, SQLSTATE 23514.
INSERT INTO portfolio."order_line" ("order_line_id", "order_id", "product_id", "quantity", "unit_price")
VALUES (1024, 6, 5, 1, 0);

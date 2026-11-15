# Customer Orders and Product Lines — database design

My case study records customer, product, order, order_line.

## Users

- Sales staff placing customer orders
- Analysts reviewing monthly product sales

## Main operations

- Place an order for a customer with one or more product lines.
- Find order details by order number, including its customer and products.
- Filter orders by a UTC date range.
- Aggregate quantities sold by product and UTC calendar month.
- Benchmark plan: generate 20000 deterministic synthetic orders; compare the monthly date-range query with and without a B-tree index on order.ordered_at; inspect the query plan and compare median elapsed time on the same dataset.

## Entities

| Entity | Information stored |
| --- | --- |
| customer | A customer who can place orders. |
| product | A product available for ordering. |
| order | An order placed by one customer. |
| order_line | A product and quantity belonging to an order, with its sale-time unit price. |

## customer

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| customer_id | BIGINT | PK | Yes |
| name | TEXT |  | Yes |
| email | TEXT | Unique | Yes |
- Unique key: (email).

## product

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| product_id | BIGINT | PK | Yes |
| sku | TEXT | Unique | Yes |
| name | TEXT |  | Yes |
| unit_price | NUMERIC(18,2) |  | Yes |
- Unique key: (sku).

## order

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| order_id | BIGINT | PK | Yes |
| order_number | TEXT | Unique | Yes |
| customer_id | BIGINT | FK | Yes |
| ordered_at | TIMESTAMPTZ |  | Yes |
| status | TEXT |  | Yes |
- customer_id → customer.customer_id
- Unique key: (order_number).

## order_line

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| order_line_id | BIGINT | PK | Yes |
| order_id | BIGINT | FK | Yes |
| product_id | BIGINT | FK | Yes |
| quantity | INTEGER |  | Yes |
| unit_price | NUMERIC(18,2) |  | Yes |
- order_id → order.order_id
- product_id → product.product_id
- Unique key: (order_id, product_id).

## Relationships and business rules

- Each customer email is unique.
- Each product SKU is unique.
- A catalog product price must be greater than zero.
- An order number is globally unique, including when concurrent order attempts use the same number.
- Every order references an existing customer through customer_id.
- Every order line references an existing order through order_id.
- Every order line references an existing product through product_id.
- Each order line quantity must be greater than zero.
- Each sale-time order line price must be greater than zero.
- An order contains at most one line per product.

## Assumptions

- Order numbers are supplied by the placing system and must be globally unique.
- Timestamps are stored in UTC; monthly sales use UTC calendar months.
- Prices use one assumed currency, which is not modeled separately.
- order_line.unit_price records the sale-time price; product.unit_price is the current catalog price.
- Order events are recorded after a successful relational commit, with retries keyed by order_id to avoid duplicate events.
- An order_placed event snapshots the order, customer, and ordered products; an order_cancelled event records cancellation time and reason with an order snapshot.
- All example records and benchmark rows are synthetic.


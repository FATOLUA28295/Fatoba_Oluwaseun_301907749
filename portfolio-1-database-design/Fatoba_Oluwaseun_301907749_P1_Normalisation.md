# Customer Orders and Product Lines — normalisation

The example uses the saved sample records. The full set of fields is in the design and schema.

## Starting grouped records

| order_id | order_line records (list) |
| --- | --- |
| 6 | [7,8] |


The record IDs are grouped in a list. In 1NF, each record has its own row and each cell holds one value.

## 1NF: one value per cell

| order_line.order_line_id | order_line.order_id | order_line.product_id | order.order_id | order.order_number | order.customer_id | customer.customer_id | customer.name |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 7 | 6 | 3 | 6 | ORD-100 | 1 | 1 | Avery Chen |
| 8 | 6 | 4 | 6 | ORD-100 | 1 | 1 | Avery Chen |

Key: order_line_id.

## 2NF: depend on the whole key

order_line: order_id is a proper part of candidate key (order_id, product_id), and determines order details. order_line: product_id is a proper part of candidate key (order_id, product_id), and determines product details.

## order_example

| order.order_id | order.order_number | order.customer_id | customer.customer_id | customer.name |
| --- | --- | --- | --- | --- |
| 6 | ORD-100 | 1 | 1 | Avery Chen |

## order_line_example

| order_line.order_line_id | order_line.order_id | order_line.product_id |
| --- | --- | --- |
| 7 | 6 | 3 |
| 8 | 6 | 4 |

## 3NF: store each entity’s details once

The entity keys determine their own descriptions. Related records keep foreign keys rather than repeating those descriptions.

## customer

| customer_id | name | email |
| --- | --- | --- |
| 1 | Avery Chen | avery.chen@example.test |

## product

| product_id | sku | name | unit_price |
| --- | --- | --- | --- |
| 3 | SKU-A | Desk Lamp | 24.5 |
| 4 | SKU-B | Notebook | 6.25 |
| 5 | SKU-C | Pen Set | 8.75 |

## order

| order_id | order_number | customer_id | ordered_at | status |
| --- | --- | --- | --- | --- |
| 6 | ORD-100 | 1 | 2026-11-15T12:00:00+00:00 | placed |

## order_line

| order_line_id | order_id | product_id | quantity | unit_price |
| --- | --- | --- | --- | --- |
| 7 | 6 | 3 | 2 | 22.5 |
| 8 | 6 | 4 | 3 | 6.25 |

## Dependencies

- customer: (customer_id) → name, email
- product: (product_id) → sku, name, unit_price
- order: (order_id) → order_number, customer_id, ordered_at, status
- order_line: (order_line_id) → order_id, product_id, quantity, unit_price

Joining the decomposed sample tables reproduces the original 2 example rows. The design assumes the declared keys describe the relevant business dependencies.

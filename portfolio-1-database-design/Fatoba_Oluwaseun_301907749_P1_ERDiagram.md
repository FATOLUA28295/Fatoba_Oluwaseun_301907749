# Customer Orders and Product Lines — ER diagram

```mermaid
erDiagram
    direction LR
    customer {
        bigint customer_id PK
        text name
        text email UK
    }
    product {
        bigint product_id PK
        text sku UK
        text name
        numeric unit_price
    }
    order {
        bigint order_id PK
        text order_number UK
        bigint customer_id FK
        timestamptz ordered_at
        text status
    }
    order_line {
        bigint order_line_id PK
        bigint order_id FK
        bigint product_id FK
        integer quantity
        numeric unit_price
    }
    customer ||--o{ order : "customer_id"
    order ||--o{ order_line : "order_id"
    product ||--o{ order_line : "product_id"
```

PK identifies a record; FK links to another table; UK marks a single-field unique value. The relationship ends show exactly one, zero or one, or zero or many records. Composite unique keys and conditional rules are listed in the schema and design.

[Diagram image](../images/Fatoba_Oluwaseun_301907749_ERDiagram.png)

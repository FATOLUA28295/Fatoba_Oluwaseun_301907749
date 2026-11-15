// Run once in mongosh against a fresh exercise database.
// These records are fictional events for the case study.
(async function () {
  db = db.getSiblingDB('portfolio_nosql');
  if ((await db.getCollectionNames()).includes("order_events")) {
    throw new Error('The exercise collection already exists. Use a fresh database.');
  }

  // The validator checks the stable event fields while details can vary.
  await db.createCollection("order_events", {
    validator: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "_id",
            "schemaVersion",
            "simulation",
            "eventType",
            "occurredAt",
            "source",
            "embedded",
            "references",
            "details"
        ],
        "properties": {
            "_id": {
                "bsonType": "string",
                "minLength": 1
            },
            "schemaVersion": {
                "enum": [
                    1
                ]
            },
            "simulation": {
                "enum": [
                    true
                ]
            },
            "eventType": {
                "bsonType": "string",
                "enum": [
                    "order_placed",
                    "order_cancelled"
                ]
            },
            "occurredAt": {
                "bsonType": "date"
            },
            "source": {
                "bsonType": "object",
                "required": [
                    "entity",
                    "key",
                    "snapshot"
                ],
                "properties": {
                    "entity": {
                        "enum": [
                            "order_line"
                        ]
                    },
                    "key": {
                        "bsonType": "object",
                        "required": [
                            "order_line_id"
                        ]
                    },
                    "snapshot": {
                        "bsonType": "object"
                    }
                }
            },
            "embedded": {
                "bsonType": "object"
            },
            "references": {
                "bsonType": "object"
            },
            "details": {
                "bsonType": "object"
            }
        }
    }
},
    validationLevel: 'strict', validationAction: 'error'
  });

  // Insert the four example events and show their IDs.
  printjson(await db.getCollection("order_events").insertMany([
    {
        "_id": "event_000001",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "order_placed",
        "occurredAt": ISODate("2030-01-01T10:00:00Z"),
        "source": {
            "entity": "order_line",
            "key": {
                "order_line_id": 7
            },
            "snapshot": {
                "order_line_id": 7,
                "order_id": 6,
                "product_id": 3,
                "quantity": 2,
                "unit_price": 22.5
            }
        },
        "embedded": {
            "order": [
                {
                    "key": {
                        "order_id": 6
                    },
                    "snapshot": {
                        "order_id": 6,
                        "order_number": "ORD-100",
                        "customer_id": 1,
                        "ordered_at": "2026-11-15T12:00:00Z",
                        "status": "placed"
                    },
                    "via": [
                        "order_line.order_id → order"
                    ]
                }
            ],
            "customer": [
                {
                    "key": {
                        "customer_id": 1
                    },
                    "snapshot": {
                        "customer_id": 1,
                        "name": "Avery Chen",
                        "email": "avery.chen@example.test"
                    },
                    "via": [
                        "order_line.order_id → order.customer_id → customer"
                    ]
                }
            ],
            "product": [
                {
                    "key": {
                        "product_id": 3
                    },
                    "snapshot": {
                        "product_id": 3,
                        "sku": "SKU-A",
                        "name": "Desk Lamp",
                        "unit_price": 24.5
                    },
                    "via": [
                        "order_line.product_id → product"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000002",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "order_cancelled",
        "occurredAt": ISODate("2030-01-01T10:01:00Z"),
        "source": {
            "entity": "order_line",
            "key": {
                "order_line_id": 7
            },
            "snapshot": {
                "order_line_id": 7,
                "order_id": 6,
                "product_id": 3,
                "quantity": 2,
                "unit_price": 22.5
            }
        },
        "embedded": {
            "order": [
                {
                    "key": {
                        "order_id": 6
                    },
                    "snapshot": {
                        "order_id": 6,
                        "order_number": "ORD-100",
                        "customer_id": 1,
                        "ordered_at": "2026-11-15T12:00:00Z",
                        "status": "placed"
                    },
                    "via": [
                        "order_line.order_id → order"
                    ]
                }
            ],
            "customer": [
                {
                    "key": {
                        "customer_id": 1
                    },
                    "snapshot": {
                        "customer_id": 1,
                        "name": "Avery Chen",
                        "email": "avery.chen@example.test"
                    },
                    "via": [
                        "order_line.order_id → order.customer_id → customer"
                    ]
                }
            ],
            "product": [
                {
                    "key": {
                        "product_id": 3
                    },
                    "snapshot": {
                        "product_id": 3,
                        "sku": "SKU-A",
                        "name": "Desk Lamp",
                        "unit_price": 24.5
                    },
                    "via": [
                        "order_line.product_id → product"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "event_metadata": "illustrative event_metadata",
                "product_snapshot": "illustrative product_snapshot",
                "cancellation_reason": "illustrative cancellation_reason"
            }
        }
    },
    {
        "_id": "event_000003",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "order_placed",
        "occurredAt": ISODate("2030-01-01T10:02:00Z"),
        "source": {
            "entity": "order_line",
            "key": {
                "order_line_id": 8
            },
            "snapshot": {
                "order_line_id": 8,
                "order_id": 6,
                "product_id": 4,
                "quantity": 3,
                "unit_price": 6.25
            }
        },
        "embedded": {
            "order": [
                {
                    "key": {
                        "order_id": 6
                    },
                    "snapshot": {
                        "order_id": 6,
                        "order_number": "ORD-100",
                        "customer_id": 1,
                        "ordered_at": "2026-11-15T12:00:00Z",
                        "status": "placed"
                    },
                    "via": [
                        "order_line.order_id → order"
                    ]
                }
            ],
            "customer": [
                {
                    "key": {
                        "customer_id": 1
                    },
                    "snapshot": {
                        "customer_id": 1,
                        "name": "Avery Chen",
                        "email": "avery.chen@example.test"
                    },
                    "via": [
                        "order_line.order_id → order.customer_id → customer"
                    ]
                }
            ],
            "product": [
                {
                    "key": {
                        "product_id": 4
                    },
                    "snapshot": {
                        "product_id": 4,
                        "sku": "SKU-B",
                        "name": "Notebook",
                        "unit_price": 6.25
                    },
                    "via": [
                        "order_line.product_id → product"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000004",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "order_cancelled",
        "occurredAt": ISODate("2030-01-01T10:03:00Z"),
        "source": {
            "entity": "order_line",
            "key": {
                "order_line_id": 8
            },
            "snapshot": {
                "order_line_id": 8,
                "order_id": 6,
                "product_id": 4,
                "quantity": 3,
                "unit_price": 6.25
            }
        },
        "embedded": {
            "order": [
                {
                    "key": {
                        "order_id": 6
                    },
                    "snapshot": {
                        "order_id": 6,
                        "order_number": "ORD-100",
                        "customer_id": 1,
                        "ordered_at": "2026-11-15T12:00:00Z",
                        "status": "placed"
                    },
                    "via": [
                        "order_line.order_id → order"
                    ]
                }
            ],
            "customer": [
                {
                    "key": {
                        "customer_id": 1
                    },
                    "snapshot": {
                        "customer_id": 1,
                        "name": "Avery Chen",
                        "email": "avery.chen@example.test"
                    },
                    "via": [
                        "order_line.order_id → order.customer_id → customer"
                    ]
                }
            ],
            "product": [
                {
                    "key": {
                        "product_id": 4
                    },
                    "snapshot": {
                        "product_id": 4,
                        "sku": "SKU-B",
                        "name": "Notebook",
                        "unit_price": 6.25
                    },
                    "via": [
                        "order_line.product_id → product"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "event_metadata": "illustrative event_metadata",
                "product_snapshot": "illustrative product_snapshot",
                "cancellation_reason": "illustrative cancellation_reason"
            }
        }
    }
]));
  await db.getCollection("order_events").createIndex({eventType: 1, occurredAt: -1}, {name: 'event_type_time'});

  // 1. Find the first sample event type (up to five documents).
  printjson(await db.getCollection("order_events").find({"eventType":"order_placed"}).sort({_id:1}).limit(5).toArray());

  // 2. Find events for the first source record using nested key fields (up to five).
  printjson(await db.getCollection("order_events").find({"source.key.order_line_id":7}).sort({_id:1}).limit(5).toArray());

  // 3. Find events in the sample time range using a MongoDB Date filter (up to five).
  printjson(await db.getCollection("order_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray());

  // 4. Count documents for each event type.
  printjson(await db.getCollection("order_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray());

  // A date stored as text should be rejected by the validator.
  try {
    await db.getCollection("order_events").insertOne({...{
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "order_placed",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "order_line",
        "key": {
            "order_line_id": 7
        },
        "snapshot": {
            "order_line_id": 7,
            "order_id": 6,
            "product_id": 3,
            "quantity": 2,
            "unit_price": 22.5
        }
    },
    "embedded": {
        "order": [
            {
                "key": {
                    "order_id": 6
                },
                "snapshot": {
                    "order_id": 6,
                    "order_number": "ORD-100",
                    "customer_id": 1,
                    "ordered_at": "2026-11-15T12:00:00Z",
                    "status": "placed"
                },
                "via": [
                    "order_line.order_id → order"
                ]
            }
        ],
        "customer": [
            {
                "key": {
                    "customer_id": 1
                },
                "snapshot": {
                    "customer_id": 1,
                    "name": "Avery Chen",
                    "email": "avery.chen@example.test"
                },
                "via": [
                    "order_line.order_id → order.customer_id → customer"
                ]
            }
        ],
        "product": [
            {
                "key": {
                    "product_id": 3
                },
                "snapshot": {
                    "product_id": 3,
                    "sku": "SKU-A",
                    "name": "Desk Lamp",
                    "unit_price": 24.5
                },
                "via": [
                    "order_line.product_id → product"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}, _id: 'invalid_date_example', occurredAt: 'not-a-date'});
  } catch (error) { print('Invalid date error: ' + error.code); }

  // Reusing an event ID should be rejected by the unique _id index.
  try { await db.getCollection("order_events").insertOne({
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "order_placed",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "order_line",
        "key": {
            "order_line_id": 7
        },
        "snapshot": {
            "order_line_id": 7,
            "order_id": 6,
            "product_id": 3,
            "quantity": 2,
            "unit_price": 22.5
        }
    },
    "embedded": {
        "order": [
            {
                "key": {
                    "order_id": 6
                },
                "snapshot": {
                    "order_id": 6,
                    "order_number": "ORD-100",
                    "customer_id": 1,
                    "ordered_at": "2026-11-15T12:00:00Z",
                    "status": "placed"
                },
                "via": [
                    "order_line.order_id → order"
                ]
            }
        ],
        "customer": [
            {
                "key": {
                    "customer_id": 1
                },
                "snapshot": {
                    "customer_id": 1,
                    "name": "Avery Chen",
                    "email": "avery.chen@example.test"
                },
                "via": [
                    "order_line.order_id → order.customer_id → customer"
                ]
            }
        ],
        "product": [
            {
                "key": {
                    "product_id": 3
                },
                "snapshot": {
                    "product_id": 3,
                    "sku": "SKU-A",
                    "name": "Desk Lamp",
                    "unit_price": 24.5
                },
                "via": [
                    "order_line.product_id → product"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}); }
  catch (error) { print('Duplicate ID error: ' + error.code); }

  print('Document count: ' + await db.getCollection("order_events").countDocuments());
})().catch(error => { print(error.stack || String(error)); quit(1); });

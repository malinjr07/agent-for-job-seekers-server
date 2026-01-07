This page gives an overview of the features which are provided by the databases that Prisma ORM supports. Additionally, it explains how each of these features can be used in Prisma ORM with pointers to further documentation.

## Relational database features[](https://www.prisma.io/docs/orm/reference/database-features#relational-database-features "Direct link to Relational database features")

This section describes which database features exist on the relational databases that are currently supported by Prisma ORM. The **Prisma schema** column indicates how a certain feature can be represented in the [Prisma schema](https://www.prisma.io/docs/orm/prisma-schema) and links to its documentation. Note that database features can be used in **Prisma Client** even though they might not yet be representable in the Prisma schema.

note

These features are _only_ for relational databases. Supported features for NoSQL databases, like MongoDB, can [be found below](https://www.prisma.io/docs/orm/reference/database-features#nosql-database-features).

### Constraints[](https://www.prisma.io/docs/orm/reference/database-features#constraints "Direct link to Constraints")

> \* [Caveats apply when using the `UNIQUE` constraint with Microsoft SQL Server](https://www.prisma.io/docs/orm/overview/databases/sql-server#data-model-limitations) † Only supported in MySQL in [version 8 and higher](https://dev.mysql.com/doc/refman/8.0/en/create-table-check-constraints.html). ‡ Only supported in PostgreSQL.

### Referential Actions (Delete and Update behaviors for foreign key references)[](https://www.prisma.io/docs/orm/reference/database-features#referential-actions-delete-and-update-behaviors-for-foreign-key-references "Direct link to Referential Actions (Delete and Update behaviors for foreign key references)")

| Deletion behavior | Supported | Prisma schema | Prisma Client | Prisma Migrate |
|-------------------|-----------|---------------|---------------|----------------|
|      `CASCADE`      |    ✔️     |      ✔️       |      ✔️       |       ✔️       |
|     `RESTRICT`      |   ✔️\*    |      ✔️       |      ✔️       |       ✔️       |
|     `NO ACTION`     |    ✔️     |      ✔️       |      ✔️       |       ✔️       |
|    `SET DEFAULT`    |    ✔️     |      ✔️       |      ✔️       |       ✔️       |
|     `SET NULL`      |    ✔️     |      ✔️       |      ✔️       |       ✔️       |

> \* `RESTRICT` is not supported in Microsoft SQL Server.

### Indexes[](https://www.prisma.io/docs/orm/reference/database-features#indexes "Direct link to Indexes")

|    Index     |                Supported                 |    Prisma schema     | Prisma Client | Prisma Migrate |
|--------------|------------------------------------------|----------------------|---------------|----------------|
|    `UNIQUE`    |                    ✔️                    | `@unique` and `@@unique` |      ✔️       |       ✔️       |
|    `USING`     |             PostgreSQL only              |         `type`         |      ✔️       |       ✔️       |
|    `WHERE`     |                    ✔️                    |       Not yet        |      ✔️       |    Not yet     |
| `(expression)` |                    ✔️                    |       Not yet        |      ✔️       |    Not yet     |
|   `INCLUDE`    | PostgreSQL and Microsoft SQL Server only |       Not yet        |      ✔️       |    Not yet     |

Algorithm specified via `USING`:

| Index type (Algorithm) | Supported | Prisma schema | Prisma Client | Prisma Migrate |
|------------------------|-----------|---------------|---------------|----------------|
|         B-tree         |    ✔️     |      ✔️†      |      ✔️       |    Not yet     |
|          Hash          |    ✔️     |      ✔️†      |      ✔️       |    Not yet     |
|          GiST          |   ✔️\*    |      ✔️†      |     ✔️\*      |    Not yet     |
|          GIN           |   ✔️\*    |      ✔️†      |     ✔️\*      |    Not yet     |
|          BRIN          |   ✔️\*    |      ✔️†      |     ✔️\*      |    Not yet     |
|        SP-GiST         |   ✔️\*    |      ✔️†      |     ✔️\*      |    Not yet     |

-   \* Not supported for MySQL and SQLite
-   † Available with the PostgreSQL connector only in Prisma ORM versions `4.0.0` and later.

### Misc[](https://www.prisma.io/docs/orm/reference/database-features#misc "Direct link to Misc")

|              Feature              |                Supported                 |  Prisma schema  | Prisma Client | Prisma Migrate |
|-----------------------------------|------------------------------------------|-----------------|---------------|----------------|
|       Autoincrementing IDs        |                    ✔️                    | `autoincrement()` |      ✔️       |       ✔️       |
|              Arrays               |             PostgreSQL only              |       `[]`        |      ✔️       |       ✔️       |
|               Enums               |                  ✔️\*†                   |      `enum`       |      ✔️       |       ✔️       |
|       Native database types       |                    ✔️                    |       ✔️        |      ✔️       |    Not yet     |
|             SQL Views             |                    ✔️                    |     Not yet     |    Not yet    |    Not yet     |
|           JSON support            |                   ✔️†                    |       ✔️        |      ✔️       |       ✔️       |
|   Fuzzy/Phrase full text search   |                   ✔️‡                    |     Not yet     |    Not yet    |    Not yet     |
|         Table inheritance         | PostgreSQL and Microsoft SQL Server only |     Not yet     |      ✔️       |    Not yet     |
| Authorization and user management |                   ✔️‡                    |     Not yet     |    Not yet    |    Not yet     |

-   \* Not supported by Microsoft SQL Server
-   † JSON and Enum types are supported in SQLite as of Prisma ORM 6.2.0.
-   ‡ Not supported by SQLite

## NoSQL database features[](https://www.prisma.io/docs/orm/reference/database-features#nosql-database-features "Direct link to NoSQL database features")

This section describes which database features exist on the NoSQL databases that are currently supported by Prisma ORM.

### MongoDB[](https://www.prisma.io/docs/orm/reference/database-features#mongodb "Direct link to MongoDB")

The following table lists common MongoDB features and describes the level of support offered by Prisma ORM:

|                  Feature                  | Supported by Prisma ORM |                                          Notes                                           |
|-------------------------------------------|-------------------------|------------------------------------------------------------------------------------------|
|            Embedded documents             |           ✔️            |                                                                                          |
|               Transactions                |           ✔️            |                                                                                          |
|                  Indexes                  |     ✔️ with caveats     | Indexes can only be introspected if the field they refer to includes at least some data. |
|           Autoincrementing IDs            |           No            |                                                                                          |
|               Compound IDs                |           No            |                      MongoDB does not support composite IDs (`@@id`)                       |
|            Generated `ObjectId`             |           ✔️            |                              See: Defining IDs for MongoDB                               |
|                  Arrays                   |           ✔️            |                                                                                          |
|                   Enums                   |           ✔️            |                             Implemented at Prisma ORM level                              |
|           Native database types           |           ✔️            |                               See: Field mapping reference                               |
|               JSON support                |           ✔️            |                   Advanced `Json` field filtering is not yet supported.                    |
|                  DBrefs                   |           No            |                                                                                          |
|              Change streams               |           No            |                                                                                          |
| Direct access to the aggregation pipeline |           No            |                                                                                          |
## Prisma Client API reference

Use Prisma ORM without Rust binaries

If Prisma ORM's Rust engine binaries cause large bundle sizes, slow builds, or deployment issues (for example, in serverless or edge environments), you can use it without them using this configuration of your `generator` block:

```lua
generator client {  provider   = "prisma-client"  output     = "./generated"  engineType = "client"}
```

Prisma ORM without Rust binaries has been [Generally Available](https://www.prisma.io/docs/orm/more/releases#generally-available-ga) since [v6.16.0](https://pris.ly/release/6.16.0).

Note that you need to use a [driver adapter](https://www.prisma.io/docs/orm/overview/databases/database-drivers#driver-adapters) in this case.

When using this architecture:

-   No Rust query engine binary is downloaded or shipped.
-   The database connection pool is maintained by the native JS database driver you install (e.g., `@prisma/adapter-pg` for PostgreSQL).

This setup can simplify deployments in serverless or edge runtimes. Learn more in the [docs here](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/no-rust-engine).

Curious why we moved away from the Rust engine? Take a look at why we transitioned from Rust binary engines to an all-TypeScript approach for a faster, lighter Prisma ORM in this [blog post](https://www.prisma.io/blog/prisma-orm-without-rust-latest-performance-benchmarks).

The Prisma Client API reference documentation is based on the following schema:

```kotlin
model User {  id           Int              @id @default(autoincrement())  name         String?  email        String           @unique  profileViews Int              @default(0)  role         Role             @default(USER)  coinflips    Boolean[]  posts        Post[]  city         String  country      String  profile      ExtendedProfile?  pets         Json}model ExtendedProfile {  id     Int     @id @default(autoincrement())  userId Int?    @unique  bio    String?  User   User?   @relation(fields: [userId], references: [id])}model Post {  id        Int     @id @default(autoincrement())  title     String  published Boolean @default(true)  author    User    @relation(fields: [authorId], references: [id])  authorId  Int  comments  Json  views     Int     @default(0)  likes     Int     @default(0)}enum Role {  USER  ADMIN}
```

All example generated types (such as `UserSelect` and `UserWhereUniqueInput`) are based on the `User` model.

## `PrismaClient`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#prismaclient "Direct link to prismaclient")

This section describes the `PrismaClient` constructor and its parameters.

-   Parameters are validated at runtime.

### `datasources`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#datasources "Direct link to datasources")

Programmatically overrides properties of the `datasource` block in the `schema.prisma` file - for example, as part of an integration test. See also: [Data sources](https://www.prisma.io/docs/orm/prisma-schema/overview/data-sources)

From version 5.2.0 and upwards, you can also use the [`datasourceUrl`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#datasourceurl) property to programmatically override the database connection string.

#### Properties[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#properties "Direct link to Properties")

| Example property |        Example value        |         Description          |
|------------------|-----------------------------|------------------------------|
|        `db`        | `{ url: 'file:./dev_qa.db' }` | The database connection URL. |

-   You must re-generate Prisma Client each time you add or rename a data source. Datasource names are included in the generated client.
-   If you named your `datasource` block something else in the schema, replace `db` with the name of your `datasource` block.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples "Direct link to Examples")

##### Programmatically override a datasource `url`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#programmatically-override-a-datasource-url "Direct link to programmatically-override-a-datasource-url")

```javascript
import { PrismaClient } from '../prisma/generated/client';const prisma = new PrismaClient({  datasources: {    db: {      url: 'file:./dev_qa.db',    },  },});
```

Based on the following `datasource` block:

```bash
datasource db {  provider = "sqlite"}
```

### `datasourceUrl`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#datasourceurl "Direct link to datasourceurl")

Programmatically overrides the [`datasource`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#datasources) block in the `schema.prisma` file.

#### Property[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#property "Direct link to Property")

|           Option           |   Example value    |         Description          |
|----------------------------|--------------------|------------------------------|
| Database connection string | `'file:./dev_qa.db'` | The database connection URL. |

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-1 "Direct link to Examples")

```javascript
import { PrismaClient } from '../prisma/generated/client';const prisma = new PrismaClient({  datasourceUrl: 'postgresql://johndoe:randompassword@localhost:5432/mydb',});
```

### `log`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#log "Direct link to log")

Determines the type and level of logging. See also: [Logging](https://www.prisma.io/docs/orm/prisma-client/observability-and-logging/logging)

#### Options[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#options "Direct link to Options")

|          Option          |                                Example                                 |
|--------------------------|------------------------------------------------------------------------|
|   Array of log levels    |                          `[ "info", "query" ]`                           |
| Array of log definitions | `[ { level: "info", emit: "event" }, { level: "warn", emit: "stdout" }]` |

##### Log levels[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#log-levels "Direct link to Log levels")

| Name  |                                                                                                                                                                                                                                                                                  Example                                                                                                                                                                                                                                                                                  |
|-------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `query` | Logs all queries run by Prisma.

For relational databases this logs all SQL queries. Example:  
`prisma:query SELECT "public"."User"."id", "public"."User"."email" FROM "public"."User" WHERE ("public"."User"."id") IN (SELECT "t0"."id" FROM "public"."User" AS "t0" INNER JOIN "public"."Post" AS "j0" ON ("j0"."authorId") = ("t0"."id") WHERE ("j0"."views" > $1 AND "t0"."id" IS NOT NULL)) OFFSET $2`

For MongoDB this logs queries using the `mongosh` shell format. Example:  
`prisma:query db.User.deleteMany({ _id: ( $in: [ “6221ce49f756b0721fc00542”, ], }, })` |
| `info`  | Example:  
`prisma:info Started http server on http://127.0.0.1:58471` |
| `warn`  |                                                                                                                                                                                                                                                                                 Warnings.                                                                                                                                                                                                                                                                                 |
| `error` |                                                                                                                                                                                                                                                                                  Errors.                                                                                                                                                                                                                                                                                  |

##### Emit formats[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#emit-formats "Direct link to Emit formats")

|  Name  |                Description                 |
|--------|--------------------------------------------|
| `stdout` |                See: stdout                 |
| `event`  | Raises an event that you can subscribe to. |

##### Event types[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#event-types "Direct link to Event types")

The `query` event type:

index.d.ts

```typescript
export type QueryEvent = {  timestamp: Date;  query: string; // Query sent to the database  params: string; // Query parameters  duration: number; // Time elapsed (in milliseconds) between client issuing query and database responding - not only time taken to run query  target: string;};
```

Note that for MongoDB, the `params` and `duration` fields will be undefined.

All other log level event types:

index.d.ts

```typescript
export type LogEvent = {  timestamp: Date;  message: string;  target: string;};
```

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-2 "Direct link to Examples")

##### Log `query` and `info` to `stdout`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#log-query-and-info-to-stdout "Direct link to log-query-and-info-to-stdout")

```csharp
import { PrismaClient } from '../prisma/generated/client';const prisma = new PrismaClient({ log: ['query', 'info'] });async function main() {  const countUsers = await prisma.user.count({});}main()  .then(async () => {    await prisma.$disconnect();  })  .catch(async (e) => {    console.error(e);    await prisma.$disconnect();    process.exit(1);  });
```

##### Log a `query` event to console[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#log-a-query-event-to-console "Direct link to log-a-query-event-to-console")

```javascript
import { PrismaClient } from '../prisma/generated/client';const prisma = new PrismaClient({  log: [{ level: 'query', emit: 'event' }],});prisma.$on('query', (e) => {  console.log(e);});async function main() {  const countUsers = await prisma.user.count({});}main()  .then(async () => {    await prisma.$disconnect();  })  .catch(async (e) => {    console.error(e);    await prisma.$disconnect();    process.exit(1);  });
```

##### Log `info`, `warn`, and `error` events to console[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#log-info-warn-and-error-events-to-console "Direct link to log-info-warn-and-error-events-to-console")

```javascript
import { PrismaClient } from '../prisma/generated/client';const prisma = new PrismaClient({  log: [    { level: 'warn', emit: 'event' },    { level: 'info', emit: 'event' },    { level: 'error', emit: 'event' },  ],});prisma.$on('warn', (e) => {  console.log(e);});prisma.$on('info', (e) => {  console.log(e);});prisma.$on('error', (e) => {  console.log(e);});async function main() {  const countUsers = await prisma.user.count({});}main()  .then(async () => {    await prisma.$disconnect();  })  .catch(async (e) => {    console.error(e);    await prisma.$disconnect();    process.exit(1);  });
```

### `errorFormat`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#errorformat "Direct link to errorformat")

Determines the level and formatting of errors returned by Prisma Client.

#### Error formats[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#error-formats "Direct link to Error formats")

|        Name         |                  Description                   |
|---------------------|------------------------------------------------|
|      `undefined`      | If it's not defined, the default is colorless. |
|       `pretty`        |        Enables pretty error formatting.        |
| `colorless` (default) |      Enables colorless error formatting.       |
|       `minimal`       |       Enables minimal error formatting.        |

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-3 "Direct link to Examples")

##### No error formatting[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#no-error-formatting "Direct link to No error formatting")

```cpp
const prisma = new PrismaClient({  // Defaults to colorless});
```

##### `pretty` error formatting[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#pretty-error-formatting "Direct link to pretty-error-formatting")

```csharp
const prisma = new PrismaClient({  errorFormat: 'pretty',});
```

##### `colorless` error formatting[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#colorless-error-formatting "Direct link to colorless-error-formatting")

```csharp
const prisma = new PrismaClient({  errorFormat: 'colorless',});
```

##### `minimal` error formatting[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#minimal-error-formatting "Direct link to minimal-error-formatting")

```csharp
const prisma = new PrismaClient({  errorFormat: 'minimal',});
```

### `adapter`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#adapter "Direct link to adapter")

Defines an instance of a [driver adapter](https://www.prisma.io/docs/orm/overview/databases/database-drivers#driver-adapters). See also [Database drivers](https://www.prisma.io/docs/orm/overview/databases/database-drivers) .

info

This is available from version 5.4.0 and newer as a Preview feature behind the `driverAdapters` feature flag. It has been Generally Available since 6.16.0.

#### Example[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#example "Direct link to Example")

The example below uses the [Neon driver adapter](https://www.prisma.io/docs/orm/overview/databases/neon#how-to-use-neons-serverless-driver-with-prisma-orm)

```javascript
import { PrismaNeon } from '@prisma/adapter-neon';import { PrismaClient } from '../prisma/generated/client';import dotenv from 'dotenv';dotenv.config();const connectionString = `${process.env.DATABASE_URL}`;const adapter = new PrismaNeon({ connectionString });const prisma = new PrismaClient({ adapter });
```

### `rejectOnNotFound`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#rejectonnotfound "Direct link to rejectonnotfound")

info

`rejectOnNotFound` was removed in v5.0.0.

**Deprecated:** `rejectOnNotFound` is deprecated in v4.0.0. From v4.0.0, use the queries [`findUniqueOrThrow`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#finduniqueorthrow) or [`findFirstOrThrow`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#findfirstorthrow).

Use the `rejectOnNotFound` parameter to configure `findUnique()` and/or `findFirst` to throw an error if the record was not found. By default, both operations return `null` if the record is not found.

-   You can configure `rejectOnNotFound` on a per-request level for both [`findUnique()`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#findunique) and [`findFirst`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#findfirst)

#### Options[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#options-1 "Direct link to Options")

|       Option       |                                      Description                                      |
|--------------------|---------------------------------------------------------------------------------------|
|  `RejectOnNotFound`  |                Enable globally (`true` / `false`) _or_ throw a custom error.                |
| `RejectPerOperation` | Enable per operation (`true` / `false`) _or_ throw a custom error per operation, per model. |

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-4 "Direct link to Examples")

##### Enable globally for `findUnique()` and `findFirst`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#enable-globally-for-findunique-and-findfirst "Direct link to enable-globally-for-findunique-and-findfirst")

```cpp
const prisma = new PrismaClient({  rejectOnNotFound: true,});
```

##### Enable globally for a specific operation[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#enable-globally-for-a-specific-operation "Direct link to Enable globally for a specific operation")

```cpp
const prisma = new PrismaClient({  rejectOnNotFound: {    findUnique: true,  },});
```

##### Throw a custom error per model and operation if record is not found[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#throw-a-custom-error-per-model-and-operation-if-record-is-not-found "Direct link to Throw a custom error per model and operation if record is not found")

```javascript
const prisma = new PrismaClient({  rejectOnNotFound: {    findFirst: {      User: (err) => new Error('User error'),      Post: (err) => new Error('Post error!'),    },    findUnique: {      User: (err) => new Error('User error'),      Post: (err) => new Error('Post error!'),    },  },});
```

### `transactionOptions`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#transactionoptions "Direct link to transactionoptions")

info

`transactionOptions` was introduced in v5.10.0.

Allows to set [transaction options](https://www.prisma.io/docs/orm/prisma-client/queries/transactions#transaction-options) globally on the constructor level.

-   The transaction levels can be overridden on a per-transaction level.

#### Options[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#options-2 "Direct link to Options")

|     Option     |                                                                                Description                                                                                 |
|----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    `maxWait`     |                       The maximum amount of time Prisma Client will wait to acquire a transaction from the database. The default value is 2 seconds.                       |
|    `timeout`     |                   The maximum amount of time the interactive transaction can run before being canceled and rolled back. The default value is 5 seconds.                    |
| `isolationLevel` | Sets the transaction isolation level. By default this is set to the value currently configured in your database. The available can vary depending on the database you use. |

#### Example[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#example-1 "Direct link to Example")

```yaml
const prisma = new PrismaClient({  transactionOptions: {    isolationLevel: Prisma.TransactionIsolationLevel.Serializable,    maxWait: 5000, // default: 2000    timeout: 10000, // default: 5000  },});
```

## Model queries[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#model-queries "Direct link to Model queries")

Use model queries to perform CRUD operations on your models. See also: [CRUD](https://www.prisma.io/docs/orm/prisma-client/queries/crud)

> **Note**: It's a best practice to always validate and sanitize any untrusted user data before passing it into Prisma queries. Failure to do so can lead to SQL injection or other injection vulnerabilities if the type checks are bypassed. Make sure user-supplied values cannot inadvertently bypass critical checks. We strongly recommend performing type checking and input validation at the application layer. For more details, see [Custom Validation](https://www.prisma.io/docs/orm/prisma-client/queries/custom-validation) section.

### `findUnique()`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#findunique "Direct link to findunique")

`findUnique()` query lets you retrieve a single database record:

-   By _ID_
-   By a _unique_ attribute

`findUnique()` replaced `findOne` in version [2.12.0](https://github.com/prisma/prisma/releases/tag/2.12.0).

-   Prisma Client's dataloader [automatically batches `findUnique()` queries](https://www.prisma.io/docs/orm/prisma-client/queries/query-optimization-performance#solving-n1-in-graphql-with-findunique-and-prisma-clients-dataloader) with the same `select` and `where` parameters.
-   If you want the query to throw an error if the record is not found, then consider using [`findUniqueOrThrow`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#finduniqueorthrow) instead.
-   You cannot use [filter conditions](https://www.prisma.io/docs/orm/reference/prisma-client-reference#filter-conditions-and-operators) (e.g. `equals`, `contains`, `not`) to filter fields of the [JSON](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#json) data type. Using filter conditions will likely result in a `null` response for that field.

#### Options[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#options-3 "Direct link to Options")

|         Name         |  Example type (`User`)   | Required |                                                                              Description                                                                              |
|----------------------|------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|        `where`         |  `UserWhereUniqueInput`  |   **Yes**    | Wraps all fields of a model so that a record can be selected (learn more).  
Before version 4.5.0, this type only wraps _unique_ fields of a model. |
|        `select`        | `XOR<UserSelect, null>`  |    No    |                                                     Specifies which properties to include on the returned object.                                                     |
|       `include`        | `XOR<UserInclude, null>` |    No    |                                              Specifies which relations should be eagerly loaded on the returned object.                                               |
|         `omit`         |  `XOR<UserOmit, null>`   |    No    |                                         Specifies which properties to exclude on the returned object. In Preview since 5.13.0                                         |
| `relationLoadStrategy` |   `'join'` or `'query'`    |    No    | **Default: `join`**. Specifies the load strategy for a relation query. Only available in combination with `include` (or `select` on a relation field). In Preview since 5.9.0. |

#### Return type[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#return-type "Direct link to Return type")

|        Return type        |         Example          |                         Description                         |
|---------------------------|--------------------------|-------------------------------------------------------------|
| JavaScript object (typed) |           `User`           |                                                             |
| JavaScript object (plain) | `{ title: "Hello world" }` | Use `select` and `include` to determine which fields to return. |
|           `null`            |           `null`           |                      Record not found                       |

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-5 "Direct link to Examples")

##### Get the `User` record with an `id` of `42`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-the-user-record-with-an-id-of-42 "Direct link to get-the-user-record-with-an-id-of-42")

```csharp
const result = await prisma.user.findUnique({  where: {    id: 42,  },});
```

##### Get the `User` record with an `email` of `alice@prisma.io`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-the-user-record-with-an-email-of-aliceprismaio "Direct link to get-the-user-record-with-an-email-of-aliceprismaio")

```csharp
const result = await prisma.user.findUnique({  where: {    email: 'alice@prisma.io',  },});
```

##### Get the `User` record with `firstName` of `Alice` and `lastName` of `Smith` (`@@unique`)[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-the-user-record-with-firstname-of-alice-and-lastname-of-smith-unique "Direct link to get-the-user-record-with-firstname-of-alice-and-lastname-of-smith-unique")

Expand for example User model with a @@unique block

```php
const result = await prisma.user.findUnique({  where: {    fullname: {      // name property of @@unique attribute - default is firstname_lastname      firstName: 'Alice',      lastName: 'Smith',    },  },});
```

##### Get the `User` record with `firstName` of `Alice` and `lastName` of `Smith` (`@@id`)[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-the-user-record-with-firstname-of-alice-and-lastname-of-smith-id "Direct link to get-the-user-record-with-firstname-of-alice-and-lastname-of-smith-id")

Expand for example User model with an @@id block

```php
const result = await prisma.user.findUnique({  where: {    firstName_lastName: {      firstName: 'Alice',      lastName: 'Smith',    },  },});
```

### `findUniqueOrThrow()`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#finduniqueorthrow "Direct link to finduniqueorthrow")

`findUniqueOrThrow()` retrieves a single record in the same way as [`findUnique()`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#findunique). However, if the query does not find the requested record, it throws a `PrismaClientKnownRequestError`.

Note that [before Prisma v6](https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-6#removed-notfounderror), it would throw a `NotFoundError: No User found error`.

Here’s an example of its usage:

```bash
await prisma.user.findUniqueOrThrow({  where: { id: 1 },});
```

`findUniqueOrThrow()` differs from `findUnique()` as follows:

-   Its return type is non-nullable. For example, `post.findUnique()` can return `post` or `null`, but `post.findUniqueOrThrow()` always returns `post`.
    
-   It is not compatible with sequential operations in the [`$transaction` API](https://www.prisma.io/docs/orm/prisma-client/queries/transactions#the-transaction-api). If the query throws a `PrismaClientKnownRequestError`, then the API will not roll back any operations in the array of calls. As a workaround, you can use interactive transactions with the `$transaction` API, as follows:
    
    ```swift
    $transaction(async (prisma) => {   await prisma.model.create({ data: { ... });   await prisma.model.findUniqueOrThrow(); })
    ```
    

### `findFirst()`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#findfirst "Direct link to findfirst")

`findFirst` returns the first record in a list that matches your criteria.

-   If you want the query to throw an error if the record is not found, then consider using [`findFirstOrThrow`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#findfirstorthrow) instead.

#### Options[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#options-4 "Direct link to Options")

|         Name         |                 Example type (`User`)                 | Required |                                                                              Description                                                                              |
|----------------------|-----------------------------------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|        `select`        |                `XOR<UserSelect, null>`                |    No    |                                                     Specifies which properties to include on the returned object.                                                     |
|       `include`        |               `XOR<UserInclude, null>`                |    No    |                                              Specifies which relations should be eagerly loaded on the returned object.                                               |
|         `omit`         |                 `XOR<UserOmit, null>`                 |    No    |                                        Specifies which properties to exclude on the returned object. In Preview since 5.13.0.                                         |
| `relationLoadStrategy` |                  `'join'` or `'query'`                  |    No    | **Default: `join`**. Specifies the load strategy for a relation query. Only available in combination with `include` (or `select` on a relation field). In Preview since 5.9.0. |
|        `where`         |                   `UserWhereInput`                    |    No    |                                          Wraps _all_ model fields in a type so that the list can be filtered by any property.                                           |
|       `orderBy`        | `XOR<Enumerable<UserOrderByInput>, UserOrderByInput>` |    No    |                                                           Lets you order the returned list by any property.                                                           |

#### Return type[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#return-type-1 "Direct link to Return type")

|        Return type        |         Example          |                          Description                          |
|---------------------------|--------------------------|---------------------------------------------------------------|
| JavaScript object (typed) |           `User`           | Specifies which properties to include on the returned object. |
| JavaScript object (plain) | `{ title: "Hello world" }` |  Use `select` and `include` to determine which fields to return.  |
|           `null`            |           `null`           |                       Record not found                        |

-   `findFirst` calls `findMany` behind the scenes and accepts the same query options.
-   Passing in a negative `take` value when you use a `findFirst` query reverses the order of the list.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-6 "Direct link to Examples")

See [Filter conditions and operators](https://www.prisma.io/docs/orm/reference/prisma-client-reference#filter-conditions-and-operators) for examples of how to filter results.

##### Get the first `User` record where the `name` is `Alice`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-the-first-user-record-where-the-name-is-alice "Direct link to get-the-first-user-record-where-the-name-is-alice")

```csharp
const user = await prisma.user.findFirst({  where: { name: 'Alice' },});
```

##### Get the first `Post` record where the `title` starts with `A test`, reverse the list with `take`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-the-first-post-record-where-the-title-starts-with-a-test-reverse-the-list-with-take "Direct link to get-the-first-post-record-where-the-title-starts-with-a-test-reverse-the-list-with-take")

```php
import { PrismaClient } from '../prisma/generated/client';const prisma = new PrismaClient({});async function main() {  const a = await prisma.post.create({    data: {      title: 'A test 1',    },  });  const b = await prisma.post.create({    data: {      title: 'A test 2',    },  });  const c = await prisma.post.findFirst({    where: {      title: {        startsWith: 'A test',      },    },    orderBy: {      title: 'asc',    },    take: -1, // Reverse the list  });}main();
```

### `findFirstOrThrow()`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#findfirstorthrow "Direct link to findfirstorthrow")

`findFirstOrThrow()` retrieves a single data record in the same way as [`findFirst()`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#findfirst). However, if the query does not find a record, it throws a `PrismaClientKnownRequestError`.

Note that [before Prisma v6](https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-6#removed-notfounderror), it would throw a `NotFoundError: No User found error`.

`findFirstOrThrow()` differs from `findFirst()` as follows:

-   Its return type is non-nullable. For example, `post.findFirst()` can return `post` or `null`, but `post.findFirstOrThrow` always returns `post`.
    
-   It is not compatible with sequential operations in the [`$transaction` API](https://www.prisma.io/docs/orm/prisma-client/queries/transactions#the-transaction-api). If the query returns `PrismaClientKnownRequestError`, then the API will not roll back any operations in the array of calls. As a workaround, you can use interactive transactions with the `$transaction` API, as follows:
    
    ```swift
    prisma.$transaction(async (tx) => {  await tx.model.create({ data: { ... });  await tx.model.findFirstOrThrow();})
    ```
    

### `findMany()`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#findmany "Direct link to findmany")

`findMany` returns a list of records.

#### Options[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#options-5 "Direct link to Options")

|         Name         |                          Type                          | Required |                                                                                         Description                                                                                         |
|----------------------|--------------------------------------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|        `select`        |                 `XOR<PostSelect, null>`                  |    No    |                                                                Specifies which properties to include on the returned object.                                                                |
|       `include`        |                 `XOR<PostInclude, null>`                 |    No    |                                                         Specifies which relations should be eagerly loaded on the returned object.                                                          |
|         `omit`         |                  `XOR<PostOmit, null>`                   |    No    |                                                    Specifies which properties to exclude on the returned object. In Preview since 5.13.0                                                    |
| `relationLoadStrategy` |                   `'join'` or `'query'`                    |    No    |            **Default: `join`**. Specifies the load strategy for a relation query. Only available in combination with `include` (or `select` on a relation field). In Preview since 5.9.0.            |
|        `where`         |                     `UserWhereInput`                     |    No    |                                                     Wraps _all_ model fields in a type so that the list can be filtered by any property.                                                      |
|       `orderBy`        | `XOR<Enumerable<PostOrder`  
`ByInput>, PostOrderByInput>` |    No    |                                                                      Lets you order the returned list by any property.                                                                      |
|        `cursor`        |                  `UserWhereUniqueInput`                  |    No    |                                             Specifies the position for the list (the value typically specifies an `id` or another unique value).                                              |
|         `take`         |                         `number`                         |    No    | Specifies how many objects should be returned in the list (as seen from the _beginning_ (positive value) or _end_ (negative value) **either** of the list **or** from the `cursor` position if mentioned) |
|         `skip`         |                         `number`                         |    No    |                                                          Specifies how many of the returned objects in the list should be skipped.                                                          |
|       `distinct`       |           `Enumerable<UserDistinctFieldEnum>`            |    No    |                                           Lets you filter out duplicate rows by a specific field - for example, return only distinct `Post` titles.                                           |

#### Return type[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#return-type-2 "Direct link to Return type")

|           Return type           |          Example           |                         Description                         |
|---------------------------------|----------------------------|-------------------------------------------------------------|
| JavaScript array object (typed) |           `User[]`           |                                                             |
| JavaScript array object (plain) | `[{ title: "Hello world" }]` | Use `select` and `include` to determine which fields to return. |
|           Empty array           |             `[]`             |                 No matching records found.                  |

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-7 "Direct link to Examples")

See [Filter conditions and operators](https://www.prisma.io/docs/orm/reference/prisma-client-reference#filter-conditions-and-operators) for examples of how to filter results.

##### Get all `User` records where the `name` is `Alice`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-all-user-records-where-the-name-is-alice "Direct link to get-all-user-records-where-the-name-is-alice")

```csharp
const user = await prisma.user.findMany({  where: { name: 'Alice' },});
```

### `create()`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#create "Direct link to create")

`create` creates a new database record.

#### Options[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#options-6 "Direct link to Options")

|         Name         |                       Type                       | Required |                                                                                                                                  Description                                                                                                                                  |
|----------------------|--------------------------------------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|         `data`         | `XOR<UserCreateInput,`  
`UserUncheckedCreateInput>` |   **Yes**    | Wraps all the model fields in a type so that they can be provided when creating new records. It also includes relation fields which lets you perform (transactional) nested inserts. Fields that are marked as optional or have default values in the datamodel are optional. |
|        `select`        |              `XOR<UserSelect, null>`               |    No    |                                                                                                         Specifies which properties to include on the returned object.                                                                                                         |
|       `include`        |              `XOR<UserInclude, null>`              |    No    |                                                                                                  Specifies which relations should be eagerly loaded on the returned object.                                                                                                   |
|         `omit`         |               `XOR<UserOmit, null>`                |    No    |                                                                                             Specifies which properties to exclude on the returned object. In Preview since 5.13.0                                                                                             |
| `relationLoadStrategy` |                `'join'` or `'query'`                 |    No    |                                                     **Default: `join`**. Specifies the load strategy for a relation query. Only available in combination with `include` (or `select` on a relation field). In Preview since 5.9.0.                                                     |

#### Return type[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#return-type-3 "Direct link to Return type")

|        Return type        |           Example            |                         Description                         |
|---------------------------|------------------------------|-------------------------------------------------------------|
| JavaScript object (typed) |             `User`             |                                                             |
| JavaScript object (plain) | `{ name: "Alice Wonderland" }` | Use `select` and `include` to determine which fields to return. |

-   You can also perform a nested [`create`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#create) - for example, add a `User` and two `Post` records at the same time.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-8 "Direct link to Examples")

##### Create a single new record with the only required field `email`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#create-a-single-new-record-with-the-only-required-field-email "Direct link to create-a-single-new-record-with-the-only-required-field-email")

```php
const user = await prisma.user.create({  data: { email: 'alice@prisma.io' },});
```

##### Create multiple new records[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#create-multiple-new-records "Direct link to Create multiple new records")

In most cases, you can carry out batch inserts with the [`createMany()`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#createmany) or [`createManyAndReturn()`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#createmanyandreturn) queries. However, [there are scenarios where `create()` is the best option to insert multiple records](https://www.prisma.io/docs/orm/reference/prisma-client-reference#remarks-11).

The following example results in **two** `INSERT` statements:

```csharp
import { Prisma, PrismaClient } from '../prisma/generated/client';const prisma = new PrismaClient({ log: ['query'] });async function main() {  let users: Prisma.UserCreateInput[] = [    {      email: 'ariana@prisma.io',      name: 'Ari',      profileViews: 20,      coinflips: [true, false, false],      role: 'ADMIN',    },    {      email: 'elsa@prisma.io',      name: 'Elsa',      profileViews: 20,      coinflips: [true, false, false],      role: 'ADMIN',    },  ];  await Promise.all(    users.map(async (user) => {      await prisma.user.create({        data: user,      });    })  );}main()  .then(async () => {    await prisma.$disconnect();  })  .catch(async (e) => {    console.error(e);    await prisma.$disconnect();    process.exit(1);  });
```

Show CLI results

```ruby
prisma:query BEGINprisma:query INSERT INTO "public"."User" ("name","email","profileViews","role","coinflips") VALUES ($1,$2,$3,$4,$5) RETURNING "public"."User"."id"prisma:query SELECT "public"."User"."id", "public"."User"."name", "public"."User"."email", "public"."User"."profileViews", "public"."User"."role", "public"."User"."coinflips" FROM "public"."User" WHERE "public"."User"."id" = $1 LIMIT $2 OFFSET $3prisma:query INSERT INTO "public"."User" ("name","email","profileViews","role","coinflips") VALUES ($1,$2,$3,$4,$5) RETURNING "public"."User"."id"prisma:query COMMITprisma:query SELECT "public"."User"."id", "public"."User"."name", "public"."User"."email", "public"."User"."profileViews", "public"."User"."role", "public"."User"."coinflips" FROM "public"."User" WHERE "public"."User"."id" = $1 LIMIT $2 OFFSET $3prisma:query COMMIT
```

### `update()`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update "Direct link to update")

`update` updates an existing database record.

#### Options[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#options-7 "Direct link to Options")

|         Name         |                      Type                       | Required |                                                                                        Description                                                                                        |
|----------------------|-------------------------------------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|         `data`         | `XOR<UserUpdateInput`  
`UserUncheckedUpdateInput>` |   **Yes**    | Wraps all the fields of the model so that they can be provided when updating an existing record. Fields that are marked as optional or have default values in the datamodel are optional. |
|        `where`         |              `UserWhereUniqueInput`               |   **Yes**    | Wraps all fields of a model so that a record can be selected (learn more).  
Before version 4.5.0, this type only wraps _unique_ fields of a model. |
|        `select`        |              `XOR<UserSelect, null>`              |    No    |                                                               Specifies which properties to include on the returned object.                                                               |
|       `include`        |             `XOR<UserInclude, null>`              |    No    |                                                        Specifies which relations should be eagerly loaded on the returned object.                                                         |
|         `omit`         |               `XOR<UserOmit, null>`               |    No    |                                                  Specifies which properties to exclude on the returned object. In Preview since 5.13.0.                                                   |
| `relationLoadStrategy` |                `'join'` or `'query'`                |    No    |           **Default: `join`**. Specifies the load strategy for a relation query. Only available in combination with `include` (or `select` on a relation field). In Preview since 5.9.0.           |

#### Return type[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#return-type-4 "Direct link to Return type")

|                Return type                 |           Example            |                            Description                             |
|--------------------------------------------|------------------------------|--------------------------------------------------------------------|
|         JavaScript object (typed)          |             `User`             |                                                                    |
|         JavaScript object (plain)          | `{ name: "Alice Wonderland" }` |    Use `select` and `include` to determine which fields to return.     |
| `PrismaClientKnownRequestError` (code `P2025`) |                              | Thrown if the record to update does not exist. See Error reference |

-   To perform arithmetic operations on update (add, subtract, multiply, divide), use [atomic updates](https://www.prisma.io/docs/orm/reference/prisma-client-reference#atomic-number-operations) to prevent race conditions.
-   You can also perform a nested [`update`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-1) - for example, update a user and that user's posts at the same time.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-9 "Direct link to Examples")

##### Update the `email` of the `User` record with `id` of `1` to `alice@prisma.io`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-the-email-of-the-user-record-with-id-of-1-to-aliceprismaio "Direct link to update-the-email-of-the-user-record-with-id-of-1-to-aliceprismaio")

```php
const user = await prisma.user.update({  where: { id: 1 },  data: { email: 'alice@prisma.io' },});
```

### `upsert()`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#upsert "Direct link to upsert")

info

This section covers the usage of the `upsert()` operation. To learn about using [nested upsert queries](https://www.prisma.io/docs/orm/reference/prisma-client-reference#upsert-1) within `update()`, reference the linked documentation.

`upsert` does the following:

-   If an existing database record satisfies the `where` condition, it updates that record
-   If no database record satisfies the `where` condition, it creates a new database record

#### Options[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#options-8 "Direct link to Options")

|         Name         |                       Type                       | Required |                                                                                                                                Description                                                                                                                                 |
|----------------------|--------------------------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|        `create`        | `XOR<UserCreateInput,`  
`UserUncheckedCreateInput>` |   **Yes**    | Wraps all the fields of the model so that they can be provided when creating new records. It also includes relation fields which lets you perform (transactional) nested inserts. Fields that are marked as optional or have default values in the datamodel are optional. |
|        `update`        | `XOR<UserUpdateInput,`  
`UserUncheckedUpdateInput>` |   **Yes**    |                                         Wraps all the fields of the model so that they can be provided when updating an existing record. Fields that are marked as optional or have default values in the datamodel are optional.                                          |
|        `where`         |               `UserWhereUniqueInput`               |   **Yes**    | Wraps all fields of a model so that a record can be selected (learn more).  
Before version 4.5.0, this type only wraps _unique_ fields of a model. |
|        `select`        |              `XOR<UserSelect, null>`               |    No    |                                                                                                       Specifies which properties to include on the returned object.                                                                                                        |
|       `include`        |              `XOR<UserInclude, null>`              |    No    |                                                                                                 Specifies which relations should be eagerly loaded on the returned object.                                                                                                 |
|         `omit`         |               `XOR<UserOmit, null>`                |    No    |                                                                                           Specifies which properties to exclude on the returned object. In Preview since 5.13.0                                                                                            |
| `relationLoadStrategy` |                `'join'` or `'query'`                 |    No    |                                                   **Default: `join`**. Specifies the load strategy for a relation query. Only available in combination with `include` (or `select` on a relation field). In Preview since 5.9.0.                                                    |

#### Return type[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#return-type-5 "Direct link to Return type")

|        Return type        |           Example            |                         Description                         |
|---------------------------|------------------------------|-------------------------------------------------------------|
| JavaScript object (typed) |             `User`             |                                                             |
| JavaScript object (plain) | `{ name: "Alice Wonderland" }` | Use `select` and `include` to determine which fields to return. |

-   To perform arithmetic operations on update (add, subtract, multiply, divide), use [atomic updates](https://www.prisma.io/docs/orm/reference/prisma-client-reference#atomic-number-operations) to prevent race conditions.
-   If two or more upsert operations happen at the same time and the record doesn't already exist, then a race condition might happen. As a result, one or more of the upsert operations might throw a unique key constraint error. Your application code can catch this error and retry the operation. [Learn more](https://www.prisma.io/docs/orm/reference/prisma-client-reference#unique-key-constraint-errors-on-upserts).
-   From version 4.6.0, Prisma ORM hands over upsert queries to the database where possible. [Learn more](https://www.prisma.io/docs/orm/reference/prisma-client-reference#database-upserts).

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-10 "Direct link to Examples")

##### Update (if exists) or create a new `User` record with an `email` of `alice@prisma.io`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-if-exists-or-create-a-new-user-record-with-an-email-of-aliceprismaio "Direct link to update-if-exists-or-create-a-new-user-record-with-an-email-of-aliceprismaio")

```php
const user = await prisma.user.upsert({  where: { id: 1 },  update: { email: 'alice@prisma.io' },  create: { email: 'alice@prisma.io' },});
```

#### Unique key constraint errors on upserts[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#unique-key-constraint-errors-on-upserts "Direct link to Unique key constraint errors on upserts")

##### Problem[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#problem "Direct link to Problem")

If multiple upsert operations happen at the same time and the record doesn't already exist, then one or more of the operations might return a [unique key constraint error](https://www.prisma.io/docs/orm/reference/error-reference#p2002).

##### Cause[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#cause "Direct link to Cause")

When Prisma Client does an upsert, it first checks whether that record already exists in the database. To make this check, Prisma Client performs a read operation with the `where` clause from the upsert operation. This has two possible outcomes, as follows:

-   If the record does not exist, then Prisma Client creates that record.
-   If the record exists, then Prisma Client updates it.

When your application tries to perform two or more concurrent upsert operations, then a race condition might happen where two or more operations do not find the record and therefore try to create that record. In this situation, one of the operations successfully creates the new record but the other operations fail and return a unique key constraint error.

##### Solution[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#solution "Direct link to Solution")

Handle the P2002 error in your application code. When it occurs, retry the upsert operation to update the row.

#### Database upserts[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#database-upserts "Direct link to Database upserts")

Where possible, Prisma Client hands over an `upsert` query to the database. This is called a _database upsert_.

Database upserts have the following advantages:

-   They are faster than upserts handled by Prisma Client
-   [Unique key constraint errors](https://www.prisma.io/docs/orm/reference/prisma-client-reference#unique-key-constraint-errors-on-upserts) cannot happen

Prisma Client uses a database upsert automatically when [specific criteria](https://www.prisma.io/docs/orm/reference/prisma-client-reference#database-upsert-query-criteria) are met. When these criteria are not met, Prisma Client handles the `upsert`.

To use a database upsert, Prisma Client sends the SQL construction [`INSERT ... ON CONFLICT SET .. WHERE`](https://www.prisma.io/dataguide/postgresql/inserting-and-modifying-data/insert-on-conflict) to the database.

##### Database upsert prerequisites[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#database-upsert-prerequisites "Direct link to Database upsert prerequisites")

Prisma Client can use database upserts if your stack meets the following criteria:

-   You use Prisma ORM version 4.6.0 or later
-   Your application uses a CockroachDB, PostgreSQL, or SQLite data source

##### Database upsert query criteria[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#database-upsert-query-criteria "Direct link to Database upsert query criteria")

Prisma Client uses a database upsert for an `upsert` query when the query meets the following criteria:

-   There are no nested queries in the `upsert`'s `create` and `update` [options](https://www.prisma.io/docs/orm/reference/prisma-client-reference#options-7)
-   The query does _not_ include a selection that uses a [nested read](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries#nested-reads)
-   The query modifies only one model
-   There is only one unique field in the `upsert`'s `where` option
-   The unique field in the `where` option and the unique field in the `create` option have the same value

If your query does not meet these criteria, then Prisma Client handles the upsert itself.

##### Database upsert examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#database-upsert-examples "Direct link to Database upsert examples")

The following examples use this schema:

```kotlin
model User {  id           Int    @id  profileViews Int  userName     String @unique  email        String  @@unique([id, profileViews])}
```

The following `upsert` query meets all of the criteria, so Prisma Client uses a database upsert.

```php
prisma.user.upsert({  where: {    userName: 'Alice',  },  create: {    id: 1,    profileViews: 1,    userName: 'Alice',    email: 'alice@prisma.io',  },  update: {    email: 'updated@example.com',  },});
```

In this situation, Prisma uses the following SQL query:

```bash
INSERT INTO "public"."User" ("id","profileViews","userName","email") VALUES ($1,$2,$3,$4)ON CONFLICT ("userName") DO UPDATESET "email" = $5 WHERE ("public"."User"."userName" = $6 AND 1=1) RETURNING "public"."User"."id", "public"."User"."profileViews", "public"."User"."userName", "public"."User"."email"
```

The following query has multiple unique values in the `where` clause, so Prisma Client does _not_ use a database upsert:

```php
prisma.User.upsert({  where: {    userName: 'Alice',    profileViews: 1,    id: 1,  },  create: {    id: 1,    profileViews: 1,    userName: 'Alice',    email: 'alice@prisma.io',  },  update: {    email: 'updated@example.com',  },});
```

In the following query, the values for `userName` in the `where` and `create` options are different, so Prisma Client does _not_ use a database upsert.

```php
prisma.User.upsert({  where: {    userName: 'Alice',  },  create: {    id: 1,    profileViews: 1,    userName: 'AliceS',    email: 'alice@prisma.io',  },  update: {    email: 'updated@example.com',  },});
```

In the following query, the selection on the `title` field in `posts` is a nested read, so Prisma Client does _not_ use a database upsert.

```php
prisma.user.upsert({  select: {    email: true,    id: true,    posts: {      select: {        title: true,      },    },  },  where: {    userName: 'Alice',  },  create: {    id: 1,    profileViews: 1,    userName: 'Alice',    email: 'alice@prisma.io',  },  update: {    email: 'updated@example.com',  },});
```

### `delete()`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#delete "Direct link to delete")

`delete` deletes an existing database record. You can delete a record:

-   By _ID_
-   By a _unique_ attribute

To delete records that match a certain criteria, use [`deleteMany`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#deletemany) with a filter.

#### Options[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#options-9 "Direct link to Options")

|         Name         |          Type          | Required |                                                                              Description                                                                              |
|----------------------|------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|        `where`         |  `UserWhereUniqueInput`  |   **Yes**    | Wraps all fields of a model so that a record can be selected (learn more).  
Before version 4.5.0, this type only wraps _unique_ fields of a model. |
|        `select`        | `XOR<UserSelect, null>`  |    No    |                                                     Specifies which properties to include on the returned object.                                                     |
|       `include`        | `XOR<UserInclude, null>` |    No    |                                              Specifies which relations should be eagerly loaded on the returned object.                                               |
|         `omit`         |  `XOR<UserOmit, null>`   |    No    |                                         Specifies which properties to exclude on the returned object. In Preview since 5.13.0                                         |
| `relationLoadStrategy` |   `'join'` or `'query'`    |    No    | **Default: `join`**. Specifies the load strategy for a relation query. Only available in combination with `include` (or `select` on a relation field). In Preview since 5.9.0. |

#### Return type[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#return-type-6 "Direct link to Return type")

|                Return type                 |           Example            |                                               Description                                               |
|--------------------------------------------|------------------------------|---------------------------------------------------------------------------------------------------------|
|         JavaScript object (typed)          |             `User`             |                                    The `User` record that was deleted.                                    |
|         JavaScript object (plain)          | `{ name: "Alice Wonderland" }` | Data from the `User` record that was deleted. Use `select` and `include` to determine which fields to return. |
| `PrismaClientKnownRequestError` (code `P2025`) |                              |                   Thrown if the record to delete does not exist. See Error reference                    |

-   To delete multiple records based on some criteria (for example, all `User` records with a `prisma.io` email address, use `deleteMany`)

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-11 "Direct link to Examples")

##### Delete the `User` record with an `id` of `1`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#delete-the-user-record-with-an-id-of-1 "Direct link to delete-the-user-record-with-an-id-of-1")

```csharp
const user = await prisma.user.delete({  where: { id: 1 },});
```

##### Delete the `User` record where `email` equals `elsa@prisma.io`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#delete-the-user-record-where-email-equals-elsaprismaio "Direct link to delete-the-user-record-where-email-equals-elsaprismaio")

The following query deletes a specific user record and uses `select` to return the `name` and `email` of the deleted user:

```php
const deleteUser = await prisma.user.delete({  where: {    email: 'elsa@prisma.io',  },  select: {    email: true,    name: true,  },});
```

Show CLI results

```perl
{ "email": "elsa@prisma.io", "name": "Elsa" }
```

### `createMany()`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#createmany "Direct link to createmany")

`createMany` creates multiple records in a transaction.

#### Options[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#options-10 "Direct link to Options")

|      Name       |              Type               | Required |                                                                                      Description                                                                                      |
|-----------------|---------------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|      `data`       | `Enumerable<UserCreateManyInput>` |   **Yes**    | Wraps all the model fields in a type so that they can be provided when creating new records. Fields that are marked as optional or have default values in the datamodel are optional. |
| `skipDuplicates?` |             `boolean`             |    No    |    Do not insert records with unique fields or ID fields that already exist. Only supported by databases that support `ON CONFLICT DO NOTHING`. This excludes MongoDB and SQLServer     |

#### Return type[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#return-type-7 "Direct link to Return type")

| Return type  |   Example    |                Description                |
|--------------|--------------|-------------------------------------------|
| `BatchPayload` | `{ count: 3 }` | A count of the number of records created. |

-   As of Prisma ORM version 5.12.0, `createMany()` is now supported by SQLite.
-   The `skipDuplicates` option is not supported by MongoDB, SQLServer, or SQLite.
-   You **cannot** create or connect relations by using nested `create`, `createMany`, `connect`, `connectOrCreate` queries inside a top-level `createMany()` query. See here for a [workaround](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries#using-nested-createmany).
-   You can use a nested [`createMany`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#createmany-1) query inside an [`update()`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update) or [`create()`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#create) query - for example, add a `User` and two `Post` records with a nested `createMany` at the same time.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-12 "Direct link to Examples")

##### Create several new users[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#create-several-new-users "Direct link to Create several new users")

```php
const users = await prisma.user.createMany({  data: [    { name: 'Sonali', email: 'sonali@prisma.io' },    { name: 'Alex', email: 'alex@prisma.io' },  ],});
```

### `createManyAndReturn()`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#createmanyandreturn "Direct link to createmanyandreturn")

`createManyAndReturn` creates multiple records and returns the resulting objects.

info

This feature is available in Prisma ORM version 5.14.0 and later for PostgreSQL, CockroachDB and SQLite.

#### Options[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#options-11 "Direct link to Options")

|      Name       |              Type               | Required |                                                                                      Description                                                                                      |
|-----------------|---------------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|      `data`       | `Enumerable<UserCreateManyInput>` |   **Yes**    | Wraps all the model fields in a type so that they can be provided when creating new records. Fields that are marked as optional or have default values in the datamodel are optional. |
|     `select`      |      `XOR<UserSelect, null>`      |    No    |                                                            Specifies which properties to include on the returned objects.                                                             |
|      `omit`       |       `XOR<UserOmit, null>`       |    No    |                                Specifies which properties to exclude on the returned objects. In Preview since 5.13.0. Mutually exclusive with `select`.                                |
|     `include`     |     `XOR<UserInclude, null>`      |    No    |                                                      Specifies which relations should be eagerly loaded on the returned objects.                                                      |
| `skipDuplicates?` |             `boolean`             |    No    |    Do not insert records with unique fields or ID fields that already exist. Only supported by databases that support `ON CONFLICT DO NOTHING`. This excludes MongoDB and SQLServer     |

-   The `skipDuplicates` option is not supported by SQLite.
-   Note that the order of elements returned by `createManyAndReturn` is not guaranteed.
-   You **cannot** create or connect relations by using nested `create`, `createMany`, `connect`, `connectOrCreate` queries inside a top-level `createManyAndReturn()` query. See here for a [workaround](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries#using-nested-createmany).
-   When relations are included via `include`, a separate query is generated per relation.
-   `relationLoadStrategy: join` is not supported.

#### Return type[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#return-type-8 "Direct link to Return type")

|           Return type           |       Example        |                            Description                            |
|---------------------------------|----------------------|-------------------------------------------------------------------|
| JavaScript array object (typed) |        `User[]`        |                                                                   |
| JavaScript array object (plain) | `[{ name: "Sonali" }]` | Use `select`, `omit` and `include` to determine which fields to return. |

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-13 "Direct link to Examples")

##### Create and return several new users[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#create-and-return-several-new-users "Direct link to Create and return several new users")

```php
const users = await prisma.user.createManyAndReturn({  data: [    { name: 'Sonali', email: 'sonali@prisma.io' },    { name: 'Alex', email: 'alex@prisma.io' },  ],})
```

Show CLI results

```perl
[  { "id": 0, "name": "Sonali", "email": "sonali@prisma.io", "profileViews": 0 },  { "id": 1, "name": "Alex", "email": "alex@prisma.io", "profileViews": 0  }]
```

### `updateMany()`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#updatemany "Direct link to updatemany")

`updateMany` updates a batch of existing database records in bulk and returns the number of updated records.

#### Options[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#options-12 "Direct link to Options")

| Name  |                               Type                               | Required |                                                                                            Description                                                                                            |
|-------|------------------------------------------------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `data`  | `XOR<UserUpdateManyMutationInput,`  
`UserUncheckedUpdateManyInput>` |   **Yes**    | Wraps all the fields of the model so that they can be provided when updating an existing record. Fields that are marked as optional or have default values in the datamodel are optional on `data`. |
| `where` |                          `UserWhereInput`                          |    No    |                             Wraps _all_ fields of a model so that the list can be filtered by any property. If you do not filter the list, all records will be updated.                             |
| `limit` |                              `number`                              |    No    |                                                                              Limits the number of records to update.                                                                              |

#### Return type[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#return-type-9 "Direct link to Return type")

| Return type  |   Example    |          Description          |
|--------------|--------------|-------------------------------|
| `BatchPayload` | `{ count: 4 }` | The count of updated records. |

```typescript
export type BatchPayload = {  count: number;};
```

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-14 "Direct link to Examples")

##### Update all `User` records where the `name` is `Alice` to `ALICE`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-all-user-records-where-the-name-is-alice-to-alice "Direct link to update-all-user-records-where-the-name-is-alice-to-alice")

```php
const updatedUserCount = await prisma.user.updateMany({  where: { name: 'Alice' },  data: { name: 'ALICE' },});
```

##### Update all `User` records where the `email` contains `prisma.io` and at least one related `Post` has more than 10 likes[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-all-user-records-where-the-email-contains-prismaio-and-at-least-one-related-post-has-more-than-10-likes "Direct link to update-all-user-records-where-the-email-contains-prismaio-and-at-least-one-related-post-has-more-than-10-likes")

```php
const updatedUserCount = await prisma.user.updateMany({  where: {    email: {      contains: 'prisma.io',    },    posts: {      some: {        likes: {          gt: 10,        },      },    },  },  data: {    role: 'USER',  },});
```

##### Update `User` records where the `email` contains `prisma.io`, but limit to 5 records updated.[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-user-records-where-the-email-contains-prismaio-but-limit-to-5-records-updated "Direct link to update-user-records-where-the-email-contains-prismaio-but-limit-to-5-records-updated")

```php
const updatedUserCount = await prisma.user.updateMany({  where: {    email: {      contains: 'prisma.io',    },  },  data: {    role: 'USER',  },  limit: 5,});
```

### `updateManyAndReturn()`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#updatemanyandreturn "Direct link to updatemanyandreturn")

info

This feature is available in Prisma ORM version 6.2.0 and later for PostgreSQL, CockroachDB and SQLite.

`updateManyAndReturn` updates multiple records and returns the resulting objects.

#### Options[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#options-13 "Direct link to Options")

| Name  |                               Type                               | Required |                                                                                            Description                                                                                            |
|-------|------------------------------------------------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `data`  | `XOR<UserUpdateManyMutationInput,`  
`UserUncheckedUpdateManyInput>` |   **Yes**    | Wraps all the fields of the model so that they can be provided when updating an existing record. Fields that are marked as optional or have default values in the datamodel are optional on `data`. |
| `where` |                          `UserWhereInput`                          |    No    |                             Wraps _all_ fields of a model so that the list can be filtered by any property. If you do not filter the list, all records will be updated.                             |

#### Return type[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#return-type-10 "Direct link to Return type")

|           Return type           |       Example        |                            Description                            |
|---------------------------------|----------------------|-------------------------------------------------------------------|
| JavaScript array object (typed) |        `User[]`        |                                                                   |
| JavaScript array object (plain) | `[{ name: "Sonali" }]` | Use `select`, `omit` and `include` to determine which fields to return. |

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-15 "Direct link to Examples")

##### Update and return multiple users[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-and-return-multiple-users "Direct link to Update and return multiple users")

```php
const users = await prisma.user.updateManyAndReturn({  where: {    email: {      contains: 'prisma.io',    }  },  data: {    role: 'ADMIN'  },})
```

Show CLI results

```perl
[  { "id": 0, "name": "Sonali", "email": "sonali@prisma.io", "role": "ADMIN", "profileViews": 0 },  { "id": 1, "name": "Alex", "email": "alex@prisma.io", "role": "ADMIN", "profileViews": 0  }]
```

### `deleteMany()`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#deletemany "Direct link to deletemany")

`deleteMany` deletes multiple records in a transaction.

#### Options[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#options-14 "Direct link to Options")

| Name  |      Type      | Required |                                Description                                 |
|-------|----------------|----------|----------------------------------------------------------------------------|
| `where` | `UserWhereInput` |    No    | Wraps _all_ fields of a model so that the list can be filtered by any field. |
| `limit` |      `Int`       |    No    |                   Limits the number of records deleted.                    |

#### Return type[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#return-type-11 "Direct link to Return type")

| Return type  |   Example    |          Description          |
|--------------|--------------|-------------------------------|
| `BatchPayload` | `{ count: 4 }` | The count of deleted records. |

```typescript
export type BatchPayload = {  count: number;};
```

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-16 "Direct link to Examples")

##### Delete all `User` records[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#delete-all-user-records "Direct link to delete-all-user-records")

```csharp
const deletedUserCount = await prisma.user.deleteMany({});
```

##### Delete all `User` records where the `name` is `Alice`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#delete-all-user-records-where-the-name-is-alice "Direct link to delete-all-user-records-where-the-name-is-alice")

```csharp
const deletedUserCount = await prisma.user.deleteMany({  where: { name: 'Alice' },});
```

##### Delete all `User` records where the `email` contains `prisma.io`, but limit to 5 records deleted.[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#delete-all-user-records-where-the-email-contains-prismaio-but-limit-to-5-records-deleted "Direct link to delete-all-user-records-where-the-email-contains-prismaio-but-limit-to-5-records-deleted")

```php
const deletedUserCount = await prisma.user.deleteMany({  where: {    email: {      contains: 'prisma.io',    },  },  limit: 5,});
```

See [Filter conditions and operators](https://www.prisma.io/docs/orm/reference/prisma-client-reference#filter-conditions-and-operators) for examples of how to filter the records to delete.

### `count()`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#count "Direct link to count")

#### Options[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#options-15 "Direct link to Options")

|  Name   |                          Type                          | Required |                                                                                         Description                                                                                         |
|---------|--------------------------------------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|  `where`  |                     `UserWhereInput`                     |    No    |                                                     Wraps _all_ model fields in a type so that the list can be filtered by any property.                                                      |
| `orderBy` | `XOR<Enumerable<PostOrder`  
`ByInput>, PostOrderByInput>` |    No    |                                                                      Lets you order the returned list by any property.                                                                      |
| `cursor`  |                  `UserWhereUniqueInput`                  |    No    |                                             Specifies the position for the list (the value typically specifies an `id` or another unique value).                                              |
|  `take`   |                         `number`                         |    No    | Specifies how many objects should be returned in the list (as seen from the _beginning_ (positive value) or _end_ (negative value) **either** of the list **or** from the `cursor` position if mentioned) |
|  `skip`   |                         `number`                         |    No    |                                                          Specifies how many of the returned objects in the list should be skipped.                                                          |

#### Return type[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#return-type-12 "Direct link to Return type")

|         Return type          |        Example         |         Description         |
|------------------------------|------------------------|-----------------------------|
|            `number`            |           `29`           |    The count of records.    |
| `UserCountAggregateOutputType` | `{ _all: 27, name: 10 }` | Returned if `select` is used. |

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-17 "Direct link to Examples")

##### Count all `User` records[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#count-all-user-records "Direct link to count-all-user-records")

```csharp
const result = await prisma.user.count();
```

##### Count all `User` records with at least one published `Post`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#count-all-user-records-with-at-least-one-published-post "Direct link to count-all-user-records-with-at-least-one-published-post")

```php
const result = await prisma.user.count({  where: {    post: {      some: {        published: true,      },    },  },});
```

##### Use `select` to perform three separate counts[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#use-select-to-perform-three-separate-counts "Direct link to use-select-to-perform-three-separate-counts")

The following query returns:

-   A count of all records (`_all`)
-   A count of all records with non-`null` `name` fields
-   A count of all records with non-`null` `city` fields

```php
const c = await prisma.user.count({  select: {    _all: true,    city: true,    name: true,  },});
```

### `aggregate()`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#aggregate "Direct link to aggregate")

See also: [Aggregation, grouping, and summarizing](https://www.prisma.io/docs/orm/prisma-client/queries/aggregation-grouping-summarizing#aggregate)

#### Options[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#options-16 "Direct link to Options")

|  Name   |                         Type                          | Required |                                                                                         Description                                                                                         |
|---------|-------------------------------------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|  `where`  |                    `UserWhereInput`                     |    No    |                                                     Wraps _all_ model fields in a type so that the list can be filtered by any property.                                                      |
| `orderBy` | `XOR<Enumerable<UserOrderByInput>,`  
`UserOrderByInput>` |    No    |                                                                      Lets you order the returned list by any property.                                                                      |
| `cursor`  |                 `UserWhereUniqueInput`                  |    No    |                                             Specifies the position for the list (the value typically specifies an `id` or another unique value).                                              |
|  `take`   |                        `number`                         |    No    | Specifies how many objects should be returned in the list (as seen from the _beginning_ (positive value) or _end_ (negative value) **either** of the list **or** from the `cursor` position if mentioned) |
|  `skip`   |                        `number`                         |    No    |                                                          Specifies how many of the returned objects in the list should be skipped.                                                          |
|  `_count`  |                         `true`                          |    No    |                                                                   Returns a count of matching records or non-`null` fields.                                                                   |
|   `_avg`   |               `UserAvgAggregateInputType`               |    No    |                                                                  Returns an average of all values of the specified field.                                                                   |
|   `_sum`   |               `UserSumAggregateInputType`               |    No    |                                                                    Returns the sum of all values of the specified field.                                                                    |
|   `_min`   |               `UserMinAggregateInputType`               |    No    |                                                                Returns the smallest available value of the specified field.                                                                 |
|   `_max`   |               `UserMaxAggregateInputType`               |    No    |                                                                 Returns the largest available value of the specified field.                                                                 |

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-18 "Direct link to Examples")

##### Return `_min`, `_max`, and `_count` of `profileViews` of all `User` records[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#return-_min-_max-and-_count-of-profileviews-of-all-user-records "Direct link to return-_min-_max-and-_count-of-profileviews-of-all-user-records")

```php
const minMaxAge = await prisma.user.aggregate({  _count: {    _all: true,  },  _max: {    profileViews: true,  },  _min: {    profileViews: true,  },});
```

##### Return `_sum` of all `profileViews` for all `User` records[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#return-_sum-of-all-profileviews-for-all-user-records "Direct link to return-_sum-of-all-profileviews-for-all-user-records")

```php
const setValue = await prisma.user.aggregate({  _sum: {    profileViews: true,  },});
```

### `groupBy()`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#groupby "Direct link to groupby")

See also: [Aggregation, grouping, and summarizing](https://www.prisma.io/docs/orm/prisma-client/queries/aggregation-grouping-summarizing#group-by)

#### Options[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#options-17 "Direct link to Options")

|  Name   |                         Type                          | Required |                                                                                         Description                                                                                         |
|---------|-------------------------------------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|  `where`  |                    `UserWhereInput`                     |    No    |                                                     Wraps _all_ model fields in a type so that the list can be filtered by any property.                                                      |
| `orderBy` | `XOR<Enumerable<UserOrderByInput>,`  
`UserOrderByInput>` |    No    |                                                        Lets you order the returned list by any property that is also present in `by`.                                                         |
|   `by`    |          `Array<UserScalarFieldEnum>` | `string`          |    No    |                                                              Specifies the field or combination of fields to group records by.                                                              |
| `having`  |          `UserScalarWhereWithAggregatesInput`           |    No    |                                   Allows you to filter groups by an aggregate value - for example, only return groups _having_ an average age less than 50.                                   |
|  `take`   |                        `number`                         |    No    | Specifies how many objects should be returned in the list (as seen from the _beginning_ (positive value) or _end_ (negative value) **either** of the list **or** from the `cursor` position if mentioned) |
|  `skip`   |                        `number`                         |    No    |                                                          Specifies how many of the returned objects in the list should be skipped.                                                          |
|  `_count`  |          `true` | `UserCountAggregateInputType`           |    No    |                                                                   Returns a count of matching records or non-`null` fields.                                                                   |
|   `_avg`   |               `UserAvgAggregateInputType`               |    No    |                                                                  Returns an average of all values of the specified field.                                                                   |
|   `_sum`   |               `UserSumAggregateInputType`               |    No    |                                                                    Returns the sum of all values of the specified field.                                                                    |
|   `_min`   |               `UserMinAggregateInputType`               |    No    |                                                                Returns the smallest available value of the specified field.                                                                 |
|   `_max`   |               `UserMaxAggregateInputType`               |    No    |                                                                 Returns the largest available value of the specified field.                                                                 |

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-19 "Direct link to Examples")

##### Group by `country`/`city` where the average `profileViews` is greater than `200`, and return the `_sum` of `profileViews` for each group[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#group-by-countrycity-where-the-average-profileviews-is-greater-than-200-and-return-the-_sum-of-profileviews-for-each-group "Direct link to group-by-countrycity-where-the-average-profileviews-is-greater-than-200-and-return-the-_sum-of-profileviews-for-each-group")

The query also returns a count of `_all` records in each group, and all records with non-`null` `city` field values in each group.

```php
const groupUsers = await prisma.user.groupBy({  by: ['country', 'city'],  _count: {    _all: true,    city: true,  },  _sum: {    profileViews: true,  },  orderBy: {    country: 'desc',  },  having: {    profileViews: {      _avg: {        gt: 200,      },    },  },});
```

Show CLI results

```yaml
[  {    country: 'Denmark',    city: 'Copenhagen',    _sum: { profileViews: 490 },    _count: {      _all: 70,      city: 8,    },  },  {    country: 'Sweden',    city: 'Stockholm',    _sum: { profileViews: 500 },    _count: {      _all: 50,      city: 3,    },  },];
```

### `findRaw()`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#findraw "Direct link to findraw")

See: [Using Raw SQL (`findRaw()`)](https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/raw-queries#findraw).

### `aggregateRaw()`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#aggregateraw "Direct link to aggregateraw")

See: [Using Raw SQL (`aggregateRaw()`)](https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/raw-queries#aggregateraw).

## Model query options[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#model-query-options "Direct link to Model query options")

### `select`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#select "Direct link to select")

`select` defines which fields are included in the object that Prisma Client returns. See: [Select fields and include relations](https://www.prisma.io/docs/orm/prisma-client/queries/select-fields) .

-   You cannot combine `select` and `include` on the same level.
-   In [3.0.1](https://github.com/prisma/prisma/releases/3.0.1) and later, you can [select a `_count` of relations](https://www.prisma.io/docs/orm/reference/prisma-client-reference#select-a-_count-of-relations).

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-20 "Direct link to Examples")

##### Select the `name` and `profileViews` fields of a single `User` record[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#select-the-name-and-profileviews-fields-of-a-single-user-record "Direct link to select-the-name-and-profileviews-fields-of-a-single-user-record")

```php
const result = await prisma.user.findUnique({  where: { id: 1 },  select: {    name: true,    profileViews: true,  },});
```

##### Select the `email` and `role` fields of a multiple `User` records[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#select-the-email-and-role-fields-of-a-multiple-user-records "Direct link to select-the-email-and-role-fields-of-a-multiple-user-records")

```php
const result = await prisma.user.findMany({  select: {    email: true,    role: true,  },});
```

##### Select a `_count` of relations[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#select-a-_count-of-relations "Direct link to select-a-_count-of-relations")

```php
const usersWithCount = await prisma.user.findMany({  select: {    _count: {      select: { posts: true },    },  },});
```

##### Select the 'id' and 'title' fields of related `Post` records[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#select-the-id-and-title-fields-of-related-post-records "Direct link to select-the-id-and-title-fields-of-related-post-records")

```php
const result = await prisma.user.findMany({  select: {    id: true,    name: true,    posts: {      select: {        id: true,        title: true,      },    },  },});
```

##### `include` inside `select`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#include-inside-select "Direct link to include-inside-select")

```php
const result = await prisma.user.findMany({  select: {    id: true,    name: true,    posts: {      include: {        author: true,      },    },  },});
```

#### Generated types for `select`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#generated-types-for-select "Direct link to generated-types-for-select")

The following example demonstrates how to use the [`validator`](https://www.prisma.io/docs/orm/prisma-client/type-safety/prisma-validator) with `select`:

```yaml
const selectNameEmailNotPosts = Prisma.validator<Prisma.UserSelect>()({  name: true,  email: true,  posts: false,});
```

### `include`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#include "Direct link to include")

`include` defines which relations are included in the result that Prisma Client returns. See: [Select fields and include relations](https://www.prisma.io/docs/orm/prisma-client/queries/select-fields) .

-   In [3.0.1](https://github.com/prisma/prisma/releases/3.0.1) and later, you can [`include` a `_count` of relations](https://www.prisma.io/docs/orm/reference/prisma-client-reference#include-a-_count-of-relations)

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-21 "Direct link to Examples")

##### Include the `posts` and `profile` relation when loading `User` records[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#include-the-posts-and-profile-relation-when-loading-user-records "Direct link to include-the-posts-and-profile-relation-when-loading-user-records")

```csharp
const users = await prisma.user.findMany({  include: {    posts: true, // Returns all fields for all posts    profile: true, // Returns all Profile fields  },});
```

##### Include the `posts` relation on the returned objects when creating a new `User` record with two `Post` records[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#include-the-posts-relation-on-the-returned-objects-when-creating-a-new-user-record-with-two-post-records "Direct link to include-the-posts-relation-on-the-returned-objects-when-creating-a-new-user-record-with-two-post-records")

```php
const user = await prisma.user.create({  data: {    email: 'alice@prisma.io',    posts: {      create: [{ title: 'This is my first post' }, { title: 'Here comes a second post' }],    },  },  include: { posts: true }, // Returns all fields for all posts});
```

#### Generated types for `include`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#generated-types-for-include "Direct link to generated-types-for-include")

The following example demonstrates how to use the [`validator`](https://www.prisma.io/docs/orm/prisma-client/type-safety/prisma-validator) with `include`:

```cpp
const includePosts = Prisma.validator<Prisma.UserInclude>()({  posts: true,});
```

##### Include a `_count` of relations[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#include-a-_count-of-relations "Direct link to include-a-_count-of-relations")

```php
const usersWithCount = await prisma.user.findMany({  include: {    _count: {      select: { posts: true },    },  },});
```

### `omit`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#omit "Direct link to omit")

`omit` defines which fields are excluded in the object that Prisma Client returns.

-   You cannot combine `omit` and `select` since they serve opposite purposes
-   `omit` was released into General Availability with Prisma ORM 6.2.0. It was available via the `omitApi` [Preview feature](https://www.prisma.io/docs/orm/reference/preview-features/client-preview-features) in Prisma ORM versions `5.13.0` through `6.1.0`.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-22 "Direct link to Examples")

##### Omit the `password` field from all `User` records[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#omit-the-password-field-from-all-user-records "Direct link to omit-the-password-field-from-all-user-records")

```php
const result = await prisma.user.findMany({  omit: {    password: true,  },});
```

##### Omit the `title` fields from all `User`'s `posts` relation[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#omit-the-title-fields-from-all-users-posts-relation "Direct link to omit-the-title-fields-from-all-users-posts-relation")

```php
const results = await prisma.user.findMany({  omit: {    password: true,  },  include: {    posts: {      omit: {        title: true,      },    },  },});
```

#### Generated types for `omit`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#generated-types-for-omit "Direct link to generated-types-for-omit")

The following example demonstrates how to use the [`validator`](https://www.prisma.io/docs/orm/prisma-client/type-safety/prisma-validator) with `omit`:

```cpp
const omitPassword = Prisma.validator<Prisma.UserOmit>()({  password: true,});
```

### `relationLoadStrategy` (Preview)[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#relationloadstrategy-preview "Direct link to relationloadstrategy-preview")

`relationLoadStrategy` specifies how a relation should be loaded from the database. It has two possible values:

-   `join` (default): Uses a database-level `LATERAL JOIN` (PostgreSQL) or correlated subqueries (MySQL) and fetches all data with a single query to the database.
-   `query`: Sends multiple queries to the database (one per table) and joins them on the application level.

> **Note**: Once `relationLoadStrategy` moves from [Preview](https://www.prisma.io/docs/orm/more/releases#preview) into [General Availability](https://www.prisma.io/docs/orm/more/releases#generally-available-ga), `join` will universally become the default for all relation queries.

You can learn more about join strategies [here](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries#relation-load-strategies-preview).

Because the `relationLoadStrategy` option is currently in Preview, you need to enable it via the `relationJoins` preview feature flag in your Prisma schema file:

```lua
generator client {  provider        = "prisma-client"  output          = "./generated"  previewFeatures = ["relationJoins"]}
```

After adding this flag, you need to run `prisma generate` again to re-generate Prisma Client. The `relationJoins` feature is currently available on PostgreSQL, CockroachDB and MySQL.

-   In most situations, the default `join` strategy will be more effective. Use `query` if you want to save resources on your database server or if you profiling shows that the application-level join is more performant.
-   You can only specify the `relationLoadStrategy` on the top-level in your query. The top-level choice will affect all nested sub-queries.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-23 "Direct link to Examples")

##### Load the `posts` relation via a database-level JOIN when using `include`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#load-the-posts-relation-via-a-database-level-join-when-using-include "Direct link to load-the-posts-relation-via-a-database-level-join-when-using-include")

```php
const users = await prisma.user.findMany({  relationLoadStrategy: 'join',  include: {    posts: true,  },});
```

##### Load the `posts` relation via a database-level JOIN when using `select`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#load-the-posts-relation-via-a-database-level-join-when-using-select "Direct link to load-the-posts-relation-via-a-database-level-join-when-using-select")

```php
const users = await prisma.user.findMany({  relationLoadStrategy: 'join',  select: {    posts: true,  },});
```

### `where`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#where "Direct link to where")

`where` defines one or more [filters](https://www.prisma.io/docs/orm/reference/prisma-client-reference#filter-conditions-and-operators), and can be used to filter on record properties (like a user's email address) or related record properties (like a user's top 10 most recent post titles).

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-24 "Direct link to Examples")

```php
const results = await prisma.user.findMany({  where: {    email: {      endsWith: 'prisma.io',    },  },});
```

#### Generated types for `where`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#generated-types-for-where "Direct link to generated-types-for-where")

The following examples demonstrate how to use the [`validator`](https://www.prisma.io/docs/orm/prisma-client/type-safety/prisma-validator) with `where`:

-   `UserWhereInput`
    
    ```yaml
    // UserWhereInputconst whereNameIs = Prisma.validator<Prisma.UserWhereInput>()({  name: 'Rich',});// It can be combined with conditional operators tooconst whereNameIs = Prisma.validator<Prisma.UserWhereInput>()({  name: 'Rich',  AND: [    {      email: {        contains: 'rich@boop.com',      },    },  ],});
    ```
    
-   `UserWhereUniqueInput` This type works by exposing any unique fields on the model. A field assigned `@id` is considered unique, as is one assigned `@unique`.
    
    From version 4.5.0, this type exposes all fields on the model. This means that when you filter for a single record based on a unique field, you can check additional non-unique and unique fields at the same time. [Learn more](https://www.prisma.io/docs/orm/reference/prisma-client-reference#filter-on-non-unique-fields-with-userwhereuniqueinput).
    
    ```bash
    // UserWhereUniqueInputconst whereEmailIsUnique = Prisma.validator<Prisma.UserWhereUniqueInput>()({  email: 'rich@boop.com',})
    ```
    
-   `PostScalarWhereInput`
    
    ```csharp
    const whereScalarTitleIs = Prisma.validator<Prisma.PostScalarWhereInput>()({  title: 'boop',});
    ```
    
-   `PostUpdateWithWhereUniqueWithoutAuthorInput` - This type accepts a unique `where` field (an `@id` or another assigned `@unique`) and updates any field on the `Post` model except the `Author`. The `Author` is the scalar field on the `Post` model.
    
    ```yaml
    const updatePostByIdWithoutAuthor =  Prisma.validator<Prisma.PostUpdateWithWhereUniqueWithoutAuthorInput>()({    where: {      id: 1,    },    data: {      content: 'This is some updated content',      published: true,      title: 'This is a new title',    },  });
    ```
    
-   `PostUpsertWithWhereUniqueWithoutAuthorInput` - This type will update the `Post` records title field where the id matches, if it doesn't exist it will create it instead.
    
    ```yaml
    const updatePostTitleOrCreateIfNotExist =  Prisma.validator<Prisma.PostUpsertWithWhereUniqueWithoutAuthorInput>()({    where: {      id: 1,    },    update: {      title: 'This is a new title',    },    create: {      id: 1,      title: 'If the title doesnt exist, then create one with this text',    },  });
    ```
    
-   `PostUpdateManyWithWhereWithoutAuthorInput` - This type will update all `Post` records where published is set to false.
    
    ```yaml
    const publishAllPosts = Prisma.validator<Prisma.PostUpdateManyWithWhereWithoutAuthorInput>()({  where: {    published: {      equals: false,    },  },  data: {    published: true,  },});
    ```
    

### `orderBy`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#orderby "Direct link to orderby")

Sorts a list of records. See also: [Sorting](https://www.prisma.io/docs/orm/prisma-client/queries/filtering-and-sorting)

-   In [2.16.0](https://github.com/prisma/prisma/releases/2.16.0) and later, you can [order by relation fields](https://www.prisma.io/docs/orm/reference/prisma-client-reference#sort-post-by-the-related-user-records-name) - for example, order posts by the author's name.
    
-   In [3.5.0](https://github.com/prisma/prisma/releases/3.5.0) and later, in PostgreSQL you can [order by relevance](https://www.prisma.io/docs/orm/reference/prisma-client-reference#sort-post-by-relevance-of-the-title). For details, see [Sort by relevance](https://www.prisma.io/docs/orm/prisma-client/queries/filtering-and-sorting#sort-by-relevance-postgresql-and-mysql).
    
-   In [4.1.0](https://github.com/prisma/prisma/releases/4.1.0) and later, you can [sort `null` records first or last](https://www.prisma.io/docs/orm/reference/prisma-client-reference#sort-post-by-the-related-user-records-name-with-null-records-first). For details, see [Sort with nulls first or last](https://www.prisma.io/docs/orm/prisma-client/queries/filtering-and-sorting#sort-with-null-records-first-or-last).
    

#### Inputs for `sort` argument[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#inputs-for-sort-argument "Direct link to inputs-for-sort-argument")

| Name |       Description       |
|------|-------------------------|
| `asc`  | Sort ascending (A → Z)  |
| `desc` | Sort descending (Z → A) |

#### Inputs for `nulls` argument[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#inputs-for-nulls-argument "Direct link to inputs-for-nulls-argument")

Note:

-   This argument is optional.
-   It is for use on optional [scalar](https://www.prisma.io/docs/orm/prisma-schema/data-model/models#scalar-fields) fields only. If you try to sort by nulls on a required or [relation](https://www.prisma.io/docs/orm/prisma-schema/data-model/models#relation-fields) field, Prisma Client throws a [P2009 error](https://www.prisma.io/docs/orm/reference/error-reference#p2009).
-   It is available in version 4.1.0 and later, as a preview feature. See [sort with nulls first or last](https://www.prisma.io/docs/orm/prisma-client/queries/filtering-and-sorting#sort-with-null-records-first-or-last) for details of how to enable the feature.

| Name  |         Description          |
|-------|------------------------------|
| `first` | Sort with `null` values first. |
| `last`  | Sort with `null` values last.  |

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-25 "Direct link to Examples")

##### Sort `User` by `email` field[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#sort-user-by-email-field "Direct link to sort-user-by-email-field")

The following example returns all `User` records sorted by `email` ascending:

```php
const users = await prisma.user.findMany({  orderBy: {    email: 'asc',  },});
```

The following example returns all `User` records sorted by `email` descending:

```php
const users = await prisma.user.findMany({  orderBy: {    email: 'desc',  },});
```

The following query orders posts by user name:

```php
const posts = await prisma.post.findMany({  orderBy: {    author: {      name: 'asc',    },  },});
```

The following query orders posts by user name, with `null` records first:

```php
const posts = await prisma.post.findMany({  orderBy: {    author: {      name: { sort: 'asc', nulls: 'first' },    },  },});
```

#### Sort `Post` by relevance of the title[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#sort-post-by-relevance-of-the-title "Direct link to sort-post-by-relevance-of-the-title")

The following query orders posts by relevance of the search term `'database'` to the title:

```php
const posts = await prisma.post.findMany({  orderBy: {    _relevance: {      fields: ['title'],      search: 'database',      sort: 'asc'    },})
```

#### Sort `User` by the `posts` count[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#sort-user-by-the-posts-count "Direct link to sort-user-by-the-posts-count")

The following query orders users by post count:

```php
const getActiveusers = await prisma.user.findMany({  orderBy: {    posts: {      count: 'desc',    },  },});
```

##### Sort `User` by multiple fields - `email` _and_ `role`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#sort-user-by-multiple-fields---email-and-role "Direct link to sort-user-by-multiple-fields---email-and-role")

The following example sorts users by two fields - first `email`, then `role`:

```php
const users = await prisma.user.findMany({  select: {    email: true,    role: true,  },  orderBy: [    {      email: 'desc',    },    {      role: 'desc',    },  ],});
```

The order of sorting parameters matters - the following query sorts by `role`, then `email`. Note the difference in the results:

```php
const users = await prisma.user.findMany({  select: {    email: true,    role: true,  },  orderBy: [    {      role: 'desc',    },    {      email: 'desc',    },  ],});
```

##### Sort `User` by `email`, select `name` and `email`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#sort-user-by-email-select-name-and-email "Direct link to sort-user-by-email-select-name-and-email")

The following example returns all the `name` and `email` fields of all `User` records, sorted by `email`:

```php
const users3 = await prisma.user.findMany({  orderBy: {    email: 'asc',  },  select: {    name: true,    email: true,  },});
```

##### Sort `User` records by `email` and sort nested `Post` records by `title`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#sort-user-records-by-email-and-sort-nested-post-records-by-title "Direct link to sort-user-records-by-email-and-sort-nested-post-records-by-title")

The following example:

-   Returns all `User` records sorted by `email`
-   For each `User` record, returns the `title` field of all nested `Post` records sorted by `title`

```php
const usersWithPosts = await prisma.user.findMany({  orderBy: {    email: 'asc',  },  include: {    posts: {      select: {        title: true,      },      orderBy: {        title: 'asc',      },    },  },});
```

##### Sort one user's nested list of `Post` records[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#sort-one-users-nested-list-of-post-records "Direct link to sort-one-users-nested-list-of-post-records")

The following example retrieves a single `User` record by ID, as well as a list of nested `Post` records sorted by `title`:

```php
const userWithPosts = await prisma.user.findUnique({  where: {    id: 1,  },  include: {    posts: {      orderBy: {        title: 'desc',      },      select: {        title: true,        published: true,      },    },  },});
```

##### Sort by `enum`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#sort-by-enum "Direct link to sort-by-enum")

The following sorts all `User` records by `role` (an `enum`):

```php
const sort = await prisma.user.findMany({  orderBy: {    role: 'desc',  },  select: {    email: true,    role: true,  },});
```

#### Generated types for `orderBy`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#generated-types-for-orderby "Direct link to generated-types-for-orderby")

The following examples demonstrate how to use the [`validator`](https://www.prisma.io/docs/orm/prisma-client/type-safety/prisma-validator) with `orderBy`:

-   `UserOrderByInput`
    
    ```csharp
    const orderEmailsByDescending = Prisma.validator<Prisma.UserOrderByInput>()({  email: 'desc',});
    ```
    

### `distinct`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#distinct "Direct link to distinct")

Deduplicate a list of records from [`findMany`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#findmany) or [`findFirst`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#findfirst). See also: [Aggregation, grouping, and summarizing](https://www.prisma.io/docs/orm/prisma-client/queries/aggregation-grouping-summarizing#select-distinct)

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-26 "Direct link to Examples")

##### Select distinct on a single field[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#select-distinct-on-a-single-field "Direct link to Select distinct on a single field")

The following example returns all distinct `city` fields, and selects only the `city` and `country` fields:

```php
const distinctCities = await prisma.user.findMany({  select: {    city: true,    country: true,  },  distinct: ['city'],});
```

Show CLI results

```css
[  { city: 'Paris', country: 'France' },  { city: 'Lyon', country: 'France' },];
```

##### Select distinct on multiple fields[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#select-distinct-on-multiple-fields "Direct link to Select distinct on multiple fields")

The following example returns all distinct `city` _and_ `country` field combinations, and selects only the `city` and `country` fields:

```php
const distinctCitiesAndCountries = await prisma.user.findMany({  select: {    city: true,    country: true,  },  distinct: ['city', 'country'],});
```

Show CLI results

```css
[  { city: 'Paris', country: 'France' },  { city: 'Paris', country: 'Denmark' },  { city: 'Lyon', country: 'France' },];
```

Note that there is now a "Paris, Denmark" in addition to "Paris, France":

##### Select distinct in combination with a filter[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#select-distinct-in-combination-with-a-filter "Direct link to Select distinct in combination with a filter")

The following example returns all distinct `city` _and_ `country` field combinations where the user's email contains `"prisma.io"`, and selects only the `city` and `country` fields:

```php
const distinctCitiesAndCountries = await prisma.user.findMany({  where: {    email: {      contains: 'prisma.io',    },  },  select: {    city: true,    country: true,  },  distinct: ['city', 'country'],});
```

## `nativeDistinct`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#nativedistinct "Direct link to nativedistinct")

Enabling `nativeDistinct` in your Prisma schema pushes the `distinct` operation to the database layer (where supported). This can significantly improve performance. However, note that:

-   Some databases may not fully support DISTINCT on certain field combinations.
-   Behavior can differ among providers.

To enable `nativeDistinct`:

```lua
generator client {  provider        = "prisma-client"  output          = "./generated"  previewFeatures = ["nativeDistinct"]}
```

```less
See [Preview Features](/orm/reference/preview-features/client-preview-features#preview-features-promoted-to-general-availability) for more details.## Nested queries### `create`A nested `create` query adds a new related record or set of records to a parent record. See: [Working with relations](/orm/prisma-client/queries/relation-queries)#### Remarks- `create` is available as a nested query when you `create()` (`prisma.user.create(...)`) a new parent record or `update()` (`prisma.user.update(...)`) an existing parent record.- You can use a nested `create` _or_ a nested [`createMany`](#createmany-1) to create multiple related records. If you require the [`skipDuplicates` query option](#nested-createmany-options) you should use `createMany`.#### Examples##### Create a new `User` record with a new `Profile` record```ts highlight=5;normalconst user = await prisma.user.create({  data: {    email: 'alice@prisma.io',    profile: {      create: { bio: 'Hello World' },    },  },});
```

##### Create a new `Profile` record with a new `User` record[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#create-a-new-profile-record-with-a-new-user-record "Direct link to create-a-new-profile-record-with-a-new-user-record")

```php
const user = await prisma.profile.create({  data: {    bio: 'Hello World',    user: {      create: { email: 'alice@prisma.io' },    },  },})
```

##### Create a new `User` record with a new `Post` record[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#create-a-new-user-record-with-a-new-post-record "Direct link to create-a-new-user-record-with-a-new-post-record")

```php
const user = await prisma.user.create({  data: {    email: 'alice@prisma.io',    posts: {      create: { title: 'Hello World' },    },  },});
```

##### Create a new `User` record with two new `Post` records[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#create-a-new-user-record-with-two-new-post-records "Direct link to create-a-new-user-record-with-two-new-post-records")

Because it's a one-to-many relation, you can also create multiple `Post` records at once by passing an array to `create`:

```php
const user = await prisma.user.create({  data: {    email: 'alice@prisma.io',    posts: {      create: [        {          title: 'This is my first post',        },        {          title: 'Here comes a second post',        },      ],    },  },});
```

Note: You can also use a nested [`createMany`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#createmany-1) to achieve the same result.

##### Update an existing `User` record by creating a new `Profile` record[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-an-existing-user-record-by-creating-a-new-profile-record "Direct link to update-an-existing-user-record-by-creating-a-new-profile-record")

```php
const user = await prisma.user.update({  where: { email: 'alice@prisma.io' },  data: {    profile: {      create: { bio: 'Hello World' },    },  },});
```

##### Update an existing `User` record by creating a new `Post` record[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-an-existing-user-record-by-creating-a-new-post-record "Direct link to update-an-existing-user-record-by-creating-a-new-post-record")

```php
const user = await prisma.user.update({  where: { email: 'alice@prisma.io' },  data: {    posts: {      create: { title: 'Hello World' },    },  },})
```

### `createMany`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#createmany-1 "Direct link to createmany-1")

A nested `createMany` query adds a new set of records to a parent record. See: [Working with relations](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries)

-   `createMany` is available as a nested query when you `create()` (`prisma.user.create(...)`) a new parent record or `update()` (`prisma.user.update(...)`) an existing parent record.
    -   Available in the context of a one-to-many relation — for example, you can `prisma.user.create(...)` a user and use a nested `createMany` to create multiple posts (posts have one user).
    -   **Not** available in the context of a many-to-many relation — for example, you **cannot** `prisma.post.create(...)` a post and use a nested `createMany` to create categories (many posts have many categories).
-   You cannot nest an additional `create` or `createMany`.
-   Allows setting foreign keys directly — for example, setting the `categoryId` on a post.
-   As of Prisma ORM version 5.12.0, nested `createMany` is supported by SQLite.
-   You can use a nested `create` _or_ a nested `createMany` to create multiple related records - [if you do not need the `skipDuplicates` query option, you should probably use `create`](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries#create-a-single-record-and-multiple-related-records).

#### Options[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#nested-createmany-options "Direct link to Options")

|      Name       |              Type               | Required |                                                                                      Description                                                                                      |
|-----------------|---------------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|      `data`       | `Enumerable<UserCreateManyInput>` |   **Yes**    | Wraps all the model fields in a type so that they can be provided when creating new records. Fields that are marked as optional or have default values in the datamodel are optional. |
| `skipDuplicates?` |             `boolean`             |    No    |    Do not insert records with unique fields or ID fields that already exist. Only supported by databases that support `ON CONFLICT DO NOTHING`. This excludes MongoDB and SQLServer     |

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-27 "Direct link to Examples")

##### Update a `User` and multiple new related `Post` records[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-a-user-and-multiple-new-related-post-records "Direct link to update-a-user-and-multiple-new-related-post-records")

```php
const user = await prisma.user.update({  where: {    id: 9,  },  data: {    name: 'Elliott',    posts: {      createMany: {        data: [{ title: 'My first post' }, { title: 'My second post' }],      },    },  },});
```

### `set`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#set "Direct link to set")

`set` overwrites the value of a relation - for example, replacing a list of `Post` records with a different list. See: [Working with relations](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries)

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-28 "Direct link to Examples")

##### Update an existing `User` record by disconnecting any previous `Post` records and connecting two other existing ones[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-an-existing-user-record-by-disconnecting-any-previous-post-records-and-connecting-two-other-existing-ones "Direct link to update-an-existing-user-record-by-disconnecting-any-previous-post-records-and-connecting-two-other-existing-ones")

```php
const user = await prisma.user.update({  where: { email: 'alice@prisma.io' },  data: {    posts: {      set: [{ id: 32 }, { id: 42 }],    },  },});
```

### `connect`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#connect "Direct link to connect")

A nested `connect` query connects a record to an existing related record by specifying an ID or unique identifier. See: [Working with relations](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries)

-   `connect` is available as a nested query when you create a new parent record or update an existing parent record.
    
-   If the related record does not exist, Prisma Client throws an exception:
    
    ```csharp
    The required connected records were not found. Expected 1 records to be connected, found 0.
    ```
    
-   When using `set` and `connect` together, the order in which they are applied significantly impacts the result. If `set` is used before `connect`, the connected records will only reflect the final state established by the `connect` operation, as `set` clears all existing connections before `connect` establishes new ones. Conversely, if `connect` is applied before `set`, the `set` operation will override the `connect` action by clearing all connected records and replacing them with its own specified state.
    

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-29 "Direct link to Examples")

##### Create a new `Profile` record and connect it to an existing `User` record via unique field[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#create-a-new-profile-record-and-connect-it-to-an-existing-user-record-via-unique-field "Direct link to create-a-new-profile-record-and-connect-it-to-an-existing-user-record-via-unique-field")

```php
const user = await prisma.profile.create({  data: {    bio: 'Hello World',    user: {      connect: { email: 'alice@prisma.io' },    },  },});
```

##### Create a new `Profile` record and connect it to an existing `User` record via an ID field[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#create-a-new-profile-record-and-connect-it-to-an-existing-user-record-via-an-id-field "Direct link to create-a-new-profile-record-and-connect-it-to-an-existing-user-record-via-an-id-field")

```php
const user = await prisma.profile.create({  data: {    bio: 'Hello World',    user: {      connect: { id: 42 }, // sets userId of Profile record    },  },});
```

In [2.11.0](https://github.com/prisma/prisma/releases/2.11.0) and later, you can set the foreign key directly:

```php
const user = await prisma.profile.create({  data: {    bio: 'Hello World',    userId: 42,  },});
```

However, you can't use both the direct approach and the `connect` approach in the same query. See [this issue comment](https://github.com/prisma/prisma/issues/4322#issuecomment-737976117) for details.

##### Create a new `Post` record and connect it to an existing `User` record[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#create-a-new-post-record-and-connect-it-to-an-existing-user-record "Direct link to create-a-new-post-record-and-connect-it-to-an-existing-user-record")

```php
const user = await prisma.post.create({  data: {    title: 'Hello World',    author: {      connect: { email: 'alice@prisma.io' },    },  },});
```

##### Update an existing `User` record by connecting it to an existing `Profile` record[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-an-existing-user-record-by-connecting-it-to-an-existing-profile-record "Direct link to update-an-existing-user-record-by-connecting-it-to-an-existing-profile-record")

```php
const user = await prisma.user.update({  where: { email: 'alice@prisma.io' },  data: {    profile: {      connect: { id: 24 },    },  },});
```

##### Update an existing `User` record by connecting it to two existing `Post` records[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-an-existing-user-record-by-connecting-it-to-two-existing-post-records "Direct link to update-an-existing-user-record-by-connecting-it-to-two-existing-post-records")

```php
const user = await prisma.user.update({  where: { email: 'alice@prisma.io' },  data: {    posts: {      connect: [{ id: 24 }, { id: 42 }],    },  },});
```

### `connectOrCreate`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#connectorcreate "Direct link to connectorcreate")

`connectOrCreate` _either_ connects a record to an existing related record by ID or unique identifier _or_ creates a new related record if the record does not exist. See: [Working with relations](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries)

-   Multiple `connectOrCreate` queries that run _as concurrent transactions_ can result in a **race condition**. Consider the following example, where two queries attempt to `connectOrCreate` a blog post tag named `computing` at the same time (tag names must be unique):
    
    -   Query A
    -   Query B
    
    ```php
    const createPost = await prisma.post.create({  data: {    title: 'How to create a compiler',    content: '...',    author: {      connect: {        id: 9,      },    },    tags: {      connectOrCreate: {        create: {          name: 'computing',        },        where: {          name: 'computing',        },      },    },  },})
    ```
    
    If query A and query B overlap in the following way, query A results in an exception:
    
    |                       Query A (Fail ❌)                       |                     Query B (Success ✅)                      |
    |--------------------------------------------------------------|--------------------------------------------------------------|
    |           Query hits server, starts transaction A            |           Query hits server, starts transaction B            |
    |                                                              | Find record where `tagName` equals `computing`, record not found |
    | Find record where `tagName` equals `computing`, record not found |                                                              |
    |                                                              |   Create record where `tagName` equals `computing` and connect   |
    |         Create record where `tagName` equals `computing`         |                                                              |
    |  Unique violation, record already created by transaction B   |                                                              |
    
    To work around this scenario, we recommend catching the unique violation exception (`PrismaClientKnownRequestError`, error `P2002`) and retrying failed queries.
    

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-30 "Direct link to Examples")

##### Create a new `Profile` record, then connect it to an existing `User` record _or_ create a new `User`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#create-a-new-profile-record-then-connect-it-to-an-existing-user-record-or-create-a-new-user "Direct link to create-a-new-profile-record-then-connect-it-to-an-existing-user-record-or-create-a-new-user")

The following example:

1.  Creates a `Profile`
2.  Attempts to connect the profile to a `User` where the email address is `alice@prisma.io`
3.  Creates a new user if a matching user does not exist

```php
const user = await prisma.profile.create({  data: {    bio: 'The coolest Alice on the planet',    user: {      connectOrCreate: {        where:  { email: 'alice@prisma.io' },        create: { email: 'alice@prisma.io'}    },  },})
```

##### Create a new `Post` record and connect it to an existing `User` record, _or_ create a new `User`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#create-a-new-post-record-and-connect-it-to-an-existing-user-record-or-create-a-new-user "Direct link to create-a-new-post-record-and-connect-it-to-an-existing-user-record-or-create-a-new-user")

```php
const user = await prisma.post.create({  data: {    title: 'Hello World',    author: {      connectOrCreate: {        where: { email: 'alice@prisma.io' },        create: { email: 'alice@prisma.io' },      },    },  },});
```

##### Update an existing `User` record by connecting it to an existing `Profile` record, _or_ creating a new `Profile` record[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-an-existing-user-record-by-connecting-it-to-an-existing-profile-record-or-creating-a-new-profile-record "Direct link to update-an-existing-user-record-by-connecting-it-to-an-existing-profile-record-or-creating-a-new-profile-record")

The following example:

1.  Attempts to connect the user to a `Profile` with an `id` of `20`
2.  Creates a new profile if a matching profile does not exist

```php
const updateUser = await prisma.user.update({  where: { email: 'alice@prisma.io' },  data: {    profile: {      connectOrCreate: {        where: { id: 20 },        create: {          bio: 'The coolest Alice in town',        },      },    },  },});
```

##### Update an existing `User` record by connect it to two existing `Post` records, or creating two new `Post` records[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-an-existing-user-record-by-connect-it-to-two-existing-post-records-or-creating-two-new-post-records "Direct link to update-an-existing-user-record-by-connect-it-to-two-existing-post-records-or-creating-two-new-post-records")

```php
const user = await prisma.user.update({  where: { email: 'alice@prisma.io' },  data: {    posts: {      connectOrCreate: [        {          where: { id: 32 },          create: { title: 'This is my first post' },        },        {          where: { id: 19 },          create: { title: 'This is my second post' },        },      ],    },  },});
```

### `disconnect`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#disconnect "Direct link to disconnect")

A nested `disconnect` query breaks the connection between a parent record and a related record, but does not delete either record. See: [Working with relations](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries)

-   `disconnect` is only available if the relation is optional.
    
-   If the relationship you are attempting to disconnect does not exist:
    
    -   ([In 2.21.0 and later](https://github.com/prisma/prisma/releases/tag/2.21.0)), the operation does nothing
        
    -   (Before [2.21.0](https://github.com/prisma/prisma/releases/tag/2.21.0)) Prisma Client throws an exception if the provided ID or unique identifier is not connected:
        
        ```go
        The records for relation `PostToUser` between the `User` and `Post` models are not connected.
        ```
        

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-31 "Direct link to Examples")

##### Update an existing `User` record by disconnecting the `Profile` record it's connected to[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-an-existing-user-record-by-disconnecting-the-profile-record-its-connected-to "Direct link to update-an-existing-user-record-by-disconnecting-the-profile-record-its-connected-to")

```php
const user = await prisma.user.update({  where: { email: 'bob@prisma.io' },  data: {    profile: {      disconnect: true,    },  },});
```

##### Update an existing `User` record by disconnecting two `Post` records it's connected to[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-an-existing-user-record-by-disconnecting-two-post-records-its-connected-to "Direct link to update-an-existing-user-record-by-disconnecting-two-post-records-its-connected-to")

```php
const user = await prisma.user.update({  where: { email: 'alice@prisma.io' },  data: {    posts: {      disconnect: [{ id: 44 }, { id: 46 }],    },  },});
```

### `update`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-1 "Direct link to update-1")

A nested `update` query updates one or more related records where the parent record's ID is `n`. See: [Working with relations](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries#update-a-specific-related-record)

-   Nested `update` queries are only available in the context of a top-level `update` query (for example, `prisma.user.update(...)`).
    
-   If the parent record does not exist, Prisma Client throws an exception:
    
    ```css
    AssertionError("Expected a valid parent ID to be present for nested update to-one case.")
    ```
    
-   If the related record that you want to update does not exist, Prisma Client throws an exception:
    
    ```css
    AssertionError("Expected a valid parent ID to be present for nested update to-one case.")
    ```
    

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-32 "Direct link to Examples")

##### Update an existing `User` record by updating the `Profile` record it's connected to[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-an-existing-user-record-by-updating-the-profile-record-its-connected-to "Direct link to update-an-existing-user-record-by-updating-the-profile-record-its-connected-to")

```php
const user = await prisma.user.update({  where: { email: 'alice@prisma.io' },  data: {    profile: {      update: { bio: 'Hello World' },    },  },});
```

##### Update an existing `User` record by updating two `Post` records it's connected to[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-an-existing-user-record-by-updating-two-post-records-its-connected-to "Direct link to update-an-existing-user-record-by-updating-two-post-records-its-connected-to")

```php
const user = await prisma.user.update({  where: { email: 'alice@prisma.io' },  data: {    posts: {      update: [        {          data: { published: true },          where: { id: 32 },        },        {          data: { published: true },          where: { id: 23 },        },      ],    },  },});
```

### `upsert`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#upsert-1 "Direct link to upsert-1")

info

This section covers the usage of nested upsert within `update()`. To learn about the [`upsert()`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#upsert) operation, reference the linked documentation.

A nested `upsert` query updates a related record if it exists, or creates a new related record.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-33 "Direct link to Examples")

##### Update an existing `User` record by updating the `Profile` record it's connected to or creating a new one (_upsert_)[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-an-existing-user-record-by-updating-the-profile-record-its-connected-to-or-creating-a-new-one-upsert "Direct link to update-an-existing-user-record-by-updating-the-profile-record-its-connected-to-or-creating-a-new-one-upsert")

```php
const user = await prisma.user.update({  where: { email: 'alice@prisma.io' },  data: {    profile: {      upsert: {        create: { bio: 'Hello World' },        update: { bio: 'Hello World' },      },    },  },});
```

##### Update an existing `User` record by updating two `Post` record it's connected to or creating new ones (_upsert_)[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-an-existing-user-record-by-updating-two-post-record-its-connected-to-or-creating-new-ones-upsert "Direct link to update-an-existing-user-record-by-updating-two-post-record-its-connected-to-or-creating-new-ones-upsert")

```php
const user = await prisma.user.update({  where: { email: 'alice@prisma.io' },  data: {    posts: {      upsert: [        {          create: { title: 'This is my first post' },          update: { title: 'This is my first post' },          where: { id: 32 },        },        {          create: { title: 'This is my second post' },          update: { title: 'This is my second post' },          where: { id: 23 },        },      ],    },  },});
```

### `delete`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#delete-1 "Direct link to delete-1")

A nested `delete` query deletes a related record. The parent record is not deleted.

-   `delete` is only available if the relation is optional.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-34 "Direct link to Examples")

##### Update an existing `User` record by deleting the `Profile` record it's connected to[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-an-existing-user-record-by-deleting-the-profile-record-its-connected-to "Direct link to update-an-existing-user-record-by-deleting-the-profile-record-its-connected-to")

```php
const user = await prisma.user.update({  where: { email: 'alice@prisma.io' },  data: {    profile: {      delete: true,    },  },});
```

##### Update an existing `User` record by deleting two `Post` records it's connected to[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-an-existing-user-record-by-deleting-two-post-records-its-connected-to "Direct link to update-an-existing-user-record-by-deleting-two-post-records-its-connected-to")

```php
const user = await prisma.user.update({  where: { email: 'alice@prisma.io' },  data: {    posts: {      delete: [{ id: 34 }, { id: 36 }],    },  },});
```

### `updateMany`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#updatemany-1 "Direct link to updatemany-1")

A nested `updateMany` updates a list of related records and supports filtering - for example, you can update a user's unpublished posts.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-35 "Direct link to Examples")

##### Update all unpublished posts belonging to a specific user[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-all-unpublished-posts-belonging-to-a-specific-user "Direct link to Update all unpublished posts belonging to a specific user")

```php
const result = await prisma.user.update({  where: {    id: 2,  },  data: {    posts: {      updateMany: {        where: {          published: false,        },        data: {          likes: 0,        },      },    },  },});
```

### `deleteMany`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#deletemany-1 "Direct link to deletemany-1")

A nested `deleteMany` deletes related records and supports filtering. For example, you can delete a user's posts while updating other properties of that user.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-36 "Direct link to Examples")

##### Delete all posts belonging to a specific user as part of an update[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#delete-all-posts-belonging-to-a-specific-user-as-part-of-an-update "Direct link to Delete all posts belonging to a specific user as part of an update")

```php
const result = await prisma.user.update({  where: {    id: 2,  },  data: {    name: 'Updated name',    posts: {      deleteMany: {},    },  },});
```

## Filter conditions and operators[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#filter-conditions-and-operators "Direct link to Filter conditions and operators")

### `equals`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#equals "Direct link to equals")

Value equals `n`.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-37 "Direct link to Examples")

**Return all users where `name` equals `"Eleanor"`**

```csharp
const result = await prisma.user.findMany({  where: {    name: {      equals: 'Eleanor',    },  },});
```

You can also exclude the `equals`:

```csharp
const result = await prisma.user.findMany({  where: {    name: 'Eleanor',  },});
```

**Return all products with a quantity lower than the "warn quantity" threshold**

This example compares fields of the same model which is available as of version 4.3.0.

```php
const productsWithLowQuantity = await prisma.product.findMany({  where: {    quantity: {      lte: prisma.product.fields.warnQuantity    },  },});
```

**Return all users that have blue and green as their favorite colors**

This example finds users that have set their `favoriteColors` field to `['blue', 'green']`.

Note that when using `equals`, order of elements matters. That is to say `['blue', 'green']` is **not** equal to `['green', 'blue']`

```csharp
const favoriteColorFriends = await prisma.user.findMany({  where: {    favoriteColors: {      equals: ['blue', 'green'],    },  },});
```

### `not`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#not "Direct link to not")

Value does not equal `n`.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-38 "Direct link to Examples")

##### Return all users where `name` does **not** equal `"Eleanor"`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#return-all-users-where-name-does-not-equal-eleanor "Direct link to return-all-users-where-name-does-not-equal-eleanor")

```php
const result = await prisma.user.findMany({  where: {    name: {      not: 'Eleanor',    },  },});
```

warning

`not` will return all items that do not match a given value. However, if the column is nullable, `NULL` values will not be returned. If you require null values to be returned, use an [`OR`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#or) operator to include `NULL` values.

##### Return all users where `name` does **not** equal `"Eleanor"` **including** users where `name` is `NULL`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#return-all-users-where-name-does-not-equal-eleanor-including-users-where-name-is-null "Direct link to return-all-users-where-name-does-not-equal-eleanor-including-users-where-name-is-null")

```php
await prisma.user.findMany({  where: {    OR: [      { name: { not: 'Eleanor' } },      { name: null }    ]  }})
```

### `in`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#in "Direct link to in")

Value `n` exists in list.

note

`null` values are not returned. For example, if you combine `in` and `NOT` to return a user whose name is _not_ in the list, users with `null` value names are not returned.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-39 "Direct link to Examples")

##### Get `User` records where the `id` can be found in the following list: `[22, 91, 14, 2, 5]`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-user-records-where-the-id-can-be-found-in-the-following-list-22-91-14-2-5 "Direct link to get-user-records-where-the-id-can-be-found-in-the-following-list-22-91-14-2-5")

```php
const getUser = await prisma.user.findMany({  where: {    id: { in: [22, 91, 14, 2, 5] },  },});
```

##### Get `User` records where the `name` can be found in the following list: `['Saqui', 'Clementine', 'Bob']`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-user-records-where-the-name-can-be-found-in-the-following-list-saqui-clementine-bob "Direct link to get-user-records-where-the-name-can-be-found-in-the-following-list-saqui-clementine-bob")

```php
const getUser = await prisma.user.findMany({  where: {    name: { in: ['Saqui', 'Clementine', 'Bob'] },  },});
```

##### Get `User` records where `name` is **not** present in the list[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-user-records-where-name-is-not-present-in-the-list "Direct link to get-user-records-where-name-is-not-present-in-the-list")

The following example combines `in` and [`NOT`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#not). You can also use [`notIn`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#notin).

```php
const getUser = await prisma.user.findMany({  where: {    NOT: {      name: { in: ['Saqui', 'Clementine', 'Bob'] },    },  },});
```

##### Get a `User` record where at least one `Post` has at least one specified `Category`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-a-user-record-where-at-least-one-post-has-at-least-one-specified-category "Direct link to get-a-user-record-where-at-least-one-post-has-at-least-one-specified-category")

```php
const getUser = await prisma.user.findMany({  where: {    // Find users where..    posts: {      some: {        // ..at least one (some) posts..        categories: {          some: {            // .. have at least one category ..            name: {              in: ['Food', 'Introductions'], // .. with a name that matches one of the following.            },          },        },      },    },  },});
```

### `notIn`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#notin "Direct link to notin")

Value `n` does not exist in list.

-   `null` values are not returned.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-40 "Direct link to Examples")

##### Get `User` records where the `id` can **not** be found in the following list: `[22, 91, 14, 2, 5]`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-user-records-where-the-id-can-not-be-found-in-the-following-list-22-91-14-2-5 "Direct link to get-user-records-where-the-id-can-not-be-found-in-the-following-list-22-91-14-2-5")

```php
const getUser = await prisma.user.findMany({  where: {    id: { notIn: [22, 91, 14, 2, 5] },  },});
```

### `lt`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#lt "Direct link to lt")

Value `n` is less than `x`.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-41 "Direct link to Examples")

##### Get all `Post` records where `likes` is less than `9`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-all-post-records-where-likes-is-less-than-9 "Direct link to get-all-post-records-where-likes-is-less-than-9")

```php
const getPosts = await prisma.post.findMany({  where: {    likes: {      lt: 9,    },  },});
```

### `lte`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#lte "Direct link to lte")

Value `n` is less than _or_ equal to `x`.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-42 "Direct link to Examples")

##### Get all `Post` records where `likes` is less or equal to `9`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-all-post-records-where-likes-is-less-or-equal-to-9 "Direct link to get-all-post-records-where-likes-is-less-or-equal-to-9")

```php
const getPosts = await prisma.post.findMany({  where: {    likes: {      lte: 9,    },  },});
```

### `gt`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#gt "Direct link to gt")

Value `n` is greater than `x`.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-43 "Direct link to Examples")

##### Get all `Post` records where `likes` is greater than `9`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-all-post-records-where-likes-is-greater-than-9 "Direct link to get-all-post-records-where-likes-is-greater-than-9")

```php
const getPosts = await prisma.post.findMany({  where: {    likes: {      gt: 9,    },  },});
```

### `gte`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#gte "Direct link to gte")

Value `n` is greater than _or_ equal to `x`.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-44 "Direct link to Examples")

##### Get all `Post` records where `likes` is greater than or equal to `9`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-all-post-records-where-likes-is-greater-than-or-equal-to-9 "Direct link to get-all-post-records-where-likes-is-greater-than-or-equal-to-9")

```php
const getPosts = await prisma.post.findMany({  where: {    likes: {      gte: 9,    },  },});
```

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-45 "Direct link to Examples")

##### Get all `Post` records where `date_created` is greater than March 19th, 2020[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-all-post-records-where-date_created-is-greater-than-march-19th-2020 "Direct link to get-all-post-records-where-date_created-is-greater-than-march-19th-2020")

```php
const result = await prisma.post.findMany({  where: {    date_created: {      gte: new Date('2020-03-19T14:21:00+0200') /* Includes time offset for UTC */,    },  },});
```

### `contains`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#contains "Direct link to contains")

Value `n` contains `x`.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-46 "Direct link to Examples")

##### Count all `Post` records where `content` contains `databases`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#count-all-post-records-where-content-contains-databases "Direct link to count-all-post-records-where-content-contains-databases")

```php
const result = await prisma.post.count({  where: {    content: {      contains: 'databases',    },  },});
```

##### Count all `Post` records where `content` **does not** contain `databases`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#count-all-post-records-where-content-does-not-contain-databases "Direct link to count-all-post-records-where-content-does-not-contain-databases")

```php
const result = await prisma.post.count({  where: {    NOT: {      content: {        contains: 'databases',      },    },  },});
```

### `search`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#search "Direct link to search")

Use [Full-Text Search](https://www.prisma.io/docs/orm/prisma-client/queries/full-text-search) to search within a `String` field.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-47 "Direct link to Examples")

##### Find all posts with a title that contains `cat` or `dog`.[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#find-all-posts-with-a-title-that-contains-cat-or-dog "Direct link to find-all-posts-with-a-title-that-contains-cat-or-dog")

```php
const result = await prisma.post.findMany({  where: {    title: {      search: 'cat | dog',    },  },});
```

##### Find all posts with a title that contains `cat` and `dog`.[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#find-all-posts-with-a-title-that-contains-cat-and-dog "Direct link to find-all-posts-with-a-title-that-contains-cat-and-dog")

```php
const result = await prisma.post.findMany({  where: {    title: {      search: 'cat & dog',    },  },});
```

##### Find all posts with a title that doesn't contain `cat`.[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#find-all-posts-with-a-title-that-doesnt-contain-cat "Direct link to find-all-posts-with-a-title-that-doesnt-contain-cat")

```php
const result = await prisma.post.findMany({  where: {    title: {      search: '!cat',    },  },});
```

### `mode`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#mode "Direct link to mode")

-   Supported by the PostgreSQL and MongoDB connectors only

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-48 "Direct link to Examples")

##### Get all `Post` records where `title` contains `prisma`, in a case insensitive way[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-all-post-records-where-title-contains-prisma-in-a-case-insensitive-way "Direct link to get-all-post-records-where-title-contains-prisma-in-a-case-insensitive-way")

```php
const result = await prisma.post.findMany({  where: {    title: {      contains: 'prisma',      mode: 'insensitive',    },  },});
```

### `startsWith`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#startswith "Direct link to startswith")

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-49 "Direct link to Examples")

##### Get all `Post` records where `title` starts with `Pr` (such as `Prisma`)[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-all-post-records-where-title-starts-with-pr-such-as-prisma "Direct link to get-all-post-records-where-title-starts-with-pr-such-as-prisma")

```php
const result = await prisma.post.findMany({  where: {    title: {      startsWith: 'Pr',    },  },});
```

### `endsWith`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#endswith "Direct link to endswith")

#### Get all `User` records where `email` ends with `prisma.io`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-all-user-records-where-email-ends-with-prismaio "Direct link to get-all-user-records-where-email-ends-with-prismaio")

```php
const result = await prisma.user.findMany({  where: {    email: {      endsWith: 'prisma.io',    },  },});
```

### `AND`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#and "Direct link to and")

All conditions must return `true`. Alternatively, pass a list of objects into the `where` clause - the [`AND` operator is not required](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-all-post-records-where-the-content-field-contains-prisma-and-published-is-false-no-and).

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-50 "Direct link to Examples")

##### Get all `Post` records where the `content` field contains `Prisma` and `published` is `false`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-all-post-records-where-the-content-field-contains-prisma-and-published-is-false "Direct link to get-all-post-records-where-the-content-field-contains-prisma-and-published-is-false")

```php
const result = await prisma.post.findMany({  where: {    AND: [      {        content: {          contains: 'Prisma',        },      },      {        published: {          equals: false,        },      },    ],  },});
```

##### Get all `Post` records where the `content` field contains `Prisma` and `published` is `false` (no `AND`)[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-all-post-records-where-the-content-field-contains-prisma-and-published-is-false-no-and "Direct link to get-all-post-records-where-the-content-field-contains-prisma-and-published-is-false-no-and")

The following format returns the same results as the previous example **without** the `AND` operator:

```php
const result = await prisma.post.findMany({  where: {    content: {      contains: 'Prisma',    },    published: {      equals: false,    },  },});
```

##### Get all `Post` records where the `title` field contains `Prisma` or `databases`, and `published` is `false`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-all-post-records-where-the-title-field-contains-prisma-or-databases-and-published-is-false "Direct link to get-all-post-records-where-the-title-field-contains-prisma-or-databases-and-published-is-false")

The following example combines `OR` and `AND`:

```php
const result = await prisma.post.findMany({  where: {    OR: [      {        title: {          contains: 'Prisma',        },      },      {        title: {          contains: 'databases',        },      },    ],    AND: {      published: false,    },  },});
```

### `OR`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#or "Direct link to or")

One or more conditions must return `true`.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-51 "Direct link to Examples")

##### Get all `Post` records where the `title` field contains `Prisma` or `databases`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-all-post-records-where-the-title-field-contains-prisma-or-databases "Direct link to get-all-post-records-where-the-title-field-contains-prisma-or-databases")

```php
const result = await prisma.post.findMany({  where: {    OR: [      {        title: {          contains: 'Prisma',        },      },      {        title: {          contains: 'databases',        },      },    ],  },});
```

##### Get all `Post` records where the `title` field contains `Prisma` or `databases`, but not `SQL`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-all-post-records-where-the-title-field-contains-prisma-or-databases-but-not-sql "Direct link to get-all-post-records-where-the-title-field-contains-prisma-or-databases-but-not-sql")

The following example combines `OR` and `NOT`:

```php
const result = await prisma.post.findMany({  where: {    OR: [      {        title: {          contains: 'Prisma',        },      },      {        title: {          contains: 'databases',        },      },    ],    NOT: {      title: {        contains: 'SQL',      },    },  },});
```

##### Get all `Post` records where the `title` field contains `Prisma` or `databases`, and `published` is `false`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-all-post-records-where-the-title-field-contains-prisma-or-databases-and-published-is-false-1 "Direct link to get-all-post-records-where-the-title-field-contains-prisma-or-databases-and-published-is-false-1")

The following example combines `OR` and `AND`:

```php
const result = await prisma.post.findMany({  where: {    OR: [      {        title: {          contains: 'Prisma',        },      },      {        title: {          contains: 'databases',        },      },    ],    AND: {      published: false,    },  },});
```

### `NOT`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#not-1 "Direct link to not-1")

All conditions must return `false`.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-52 "Direct link to Examples")

##### Get all `Post` records where the `title` does not contain `SQL`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-all-post-records-where-the-title-does-not-contain-sql "Direct link to get-all-post-records-where-the-title-does-not-contain-sql")

```php
const result = await prisma.post.findMany({  where: {    NOT: {      title: {        contains: 'SQL',      },    },  },});
```

##### Get all `Post` records where the `title` field contains `Prisma` or `databases`, but not `SQL`, and the related `User` record' email address does not contain `sarah`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-all-post-records-where-the-title-field-contains-prisma-or-databases-but-not-sql-and-the-related-user-record-email-address-does-not-contain-sarah "Direct link to get-all-post-records-where-the-title-field-contains-prisma-or-databases-but-not-sql-and-the-related-user-record-email-address-does-not-contain-sarah")

```php
const result = await prisma.post.findMany({  where: {    OR: [      {        title: {          contains: 'Prisma',        },      },      {        title: {          contains: 'databases',        },      },    ],    NOT: {      title: {        contains: 'SQL',      },    },    user: {      NOT: {        email: {          contains: 'sarah',        },      },    },  },  include: {    user: true,  },});
```

## Relation filters[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#relation-filters "Direct link to Relation filters")

### `some`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#some "Direct link to some")

Returns all records where **one or more** ("some") _related_ records match filtering criteria.

-   You can use `some` without parameters to return all records with at least one relation

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-53 "Direct link to Examples")

##### Get all `User` records where _some_ posts mention `Prisma`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-all-user-records-where-some-posts-mention-prisma "Direct link to get-all-user-records-where-some-posts-mention-prisma")

```php
const result = await prisma.user.findMany({  where: {    post: {      some: {        content: {          contains: "Prisma"        }      }    }  }}
```

### `every`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#every "Direct link to every")

Returns all records where **all** ("every") _related_ records match filtering criteria.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-54 "Direct link to Examples")

##### Get all `User` records where _all_ posts are published[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-all-user-records-where-all-posts-are-published "Direct link to get-all-user-records-where-all-posts-are-published")

```php
const result = await prisma.user.findMany({  where: {    post: {      every: {        published: true      },    }  }}
```

### `none`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#none "Direct link to none")

Returns all records where **zero** _related_ records match filtering criteria.

-   You can use `none` without parameters to [return all records with no relations](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-all-user-records-with-zero-posts)

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-55 "Direct link to Examples")

##### Get all `User` records with zero posts[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-all-user-records-with-zero-posts "Direct link to get-all-user-records-with-zero-posts")

```csharp
const result = await prisma.user.findMany({  where: {    post: {        none: {} // User has no posts    }  }}
```

##### Get all `User` records with zero published posts[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-all-user-records-with-zero-published-posts "Direct link to get-all-user-records-with-zero-published-posts")

```php
const result = await prisma.user.findMany({  where: {    post: {        none: {          published: true        }    }  }}
```

### `is`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#is "Direct link to is")

Returns all records where related record matches filtering criteria (for example, user's name `is` Bob).

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-56 "Direct link to Examples")

##### Get all `Post` records where user's name is `"Bob"`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-all-post-records-where-users-name-is-bob "Direct link to get-all-post-records-where-users-name-is-bob")

```php
const result = await prisma.post.findMany({  where: {    user: {        is: {          name: "Bob"        },    }  }}
```

### `isNot`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#isnot "Direct link to isnot")

Returns all records where the related record does not match the filtering criteria (for example, user's name `isNot` Bob).

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-57 "Direct link to Examples")

##### Get all `Post` records where user's name is NOT `"Bob"`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#get-all-post-records-where-users-name-is-not-bob "Direct link to get-all-post-records-where-users-name-is-not-bob")

```php
const result = await prisma.post.findMany({  where: {    user: {        isNot: {          name: "Bob"        },    }  }}
```

## Scalar list methods[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#scalar-list-methods "Direct link to Scalar list methods")

### `set`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#set-1 "Direct link to set-1")

Use `set` to overwrite the value of a scalar list field.

-   `set` is optional - you can set the value directly:
    
    ```css
    tags: ['computers', 'books'];
    ```
    

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-58 "Direct link to Examples")

##### Set the value of `tags` to a list of string values[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#set-the-value-of-tags-to-a-list-of-string-values "Direct link to set-the-value-of-tags-to-a-list-of-string-values")

```php
const setTags = await prisma.post.update({  where: {    id: 9,  },  data: {    tags: {      set: ['computing', 'books'],    },  },});
```

##### Set `tags` to a list of values _without_ using the `set` keyword[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#set-tags-to-a-list-of-values-without-using-the-set-keyword "Direct link to set-tags-to-a-list-of-values-without-using-the-set-keyword")

```php
const setTags = await prisma.post.update({  where: {    id: 9,  },  data: {    tags: ['computing', 'books'],  },});
```

#### Set the value of `tags` to a single string value[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#set-the-value-of-tags-to-a-single-string-value "Direct link to set-the-value-of-tags-to-a-single-string-value")

```php
const setTags = await prisma.post.update({  where: {    id: 9,  },  data: {    tags: {      set: 'computing',    },  },});
```

### `push`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#push "Direct link to push")

`push` is available in version [2.20.0](https://github.com/prisma/prisma/releases/2.20.0) and later. Use `push` to add _one_ value or _multiple_ values to a scalar list field.

-   Available for PostgreSQL and MongoDB only.
-   You can push a list of values or only a single value.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-59 "Direct link to Examples")

##### Add a `computing` item to the `tags` list[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#add-a-computing-item-to-the-tags-list "Direct link to add-a-computing-item-to-the-tags-list")

```php
const addTag = await prisma.post.update({  where: {    id: 9,  },  data: {    tags: {      push: 'computing',    },  },});
```

```php
const addTag = await prisma.post.update({  where: {    id: 9,  },  data: {    tags: {      push: ['computing', 'genetics'],    },  },});
```

### `unset`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#unset "Direct link to unset")

warning

This method is available on MongoDB only in versions [3.11.1](https://github.com/prisma/prisma/releases/tag/3.11.1) and later.

Use `unset` to unset the value of a scalar list. Unlike `set: null`, `unset` removes the list entirely.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-60 "Direct link to Examples")

##### Unset the value of `tags`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#unset-the-value-of-tags "Direct link to unset-the-value-of-tags")

```php
const setTags = await prisma.post.update({  where: {    id: 9,  },  data: {    tags: {      unset: true,    },  },});
```

## Scalar list filters[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#scalar-list-filters "Direct link to Scalar list filters")

Scalar list filters allow you to filter by the contents of a list / array field.

warning

Available for:

-   PostgreSQL in versions [2.15.0](https://github.com/prisma/prisma/releases/tag/2.15.0) and later
-   CockroachDB in versions [3.9.0](https://github.com/prisma/prisma/releases/tag/3.9.0) and later
-   MongoDB in versions [3.11.0](https://github.com/prisma/prisma/releases/tag/3.11.0) and later

-   Scalar list / array filters [ignore `NULL` values](https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/working-with-scalar-lists-arrays#null-values-in-arrays) . Using `isEmpty` or `NOT` does not return records with `NULL` value lists / arrays, and `{ equals: null }` results in an error.

### `has`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#has "Direct link to has")

The given value exists in the list.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-61 "Direct link to Examples")

The following query returns all `Post` records where the `tags` list includes `"databases"`:

```php
const posts = await client.post.findMany({  where: {    tags: {      has: 'databases',    },  },});
```

The following query returns all `Post` records where the `tags` list **does not** include `"databases"`:

```php
const posts = await client.post.findMany({  where: {    NOT: {      tags: {        has: 'databases',      },    },  },});
```

### `hasEvery`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#hasevery "Direct link to hasevery")

Every value exists in the list.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-62 "Direct link to Examples")

The following query returns all `Post` records where the `tags` list includes _at least_ `"databases"` _and_ `"typescript"`:

```php
const posts = await prisma.post.findMany({  where: {    tags: {      hasEvery: ['databases', 'typescript'],    },  },});
```

### `hasSome`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#hassome "Direct link to hassome")

At least one value exists in the list.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-63 "Direct link to Examples")

The following query returns all `Post` records where the `tags` list includes `"databases"` _or_ `"typescript"`:

```php
const posts = await prisma.post.findMany({  where: {    tags: {      hasSome: ['databases', 'typescript'],    },  },});
```

### `isEmpty`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#isempty "Direct link to isempty")

The list is empty.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-64 "Direct link to Examples")

The following query returns all `Post` records that have no tags:

```php
const posts = await prisma.post.findMany({  where: {    tags: {      isEmpty: true,    },  },});
```

### `isSet`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#isset "Direct link to isset")

warning

This filter is available on MongoDB only in versions [3.11.1](https://github.com/prisma/prisma/releases/tag/3.11.1) and later.

Filter lists to include only results that have been set (either set to a value, or explicitly set to `null`). Setting this filter to `true` will exclude undefined results that are not set at all.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-65 "Direct link to Examples")

The following query returns all `Post` records where the `tags` have been set to either `null` or a value:

```php
const posts = await prisma.post.findMany({  where: {    tags: {      isSet: true,    },  },});
```

### `equals`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#equals-1 "Direct link to equals-1")

The list matches the given value exactly.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-66 "Direct link to Examples")

The following query returns all `Post` records where the `tags` list includes `"databases"` and `"typescript"` only:

```csharp
const posts = await prisma.post.findMany({  where: {    tags: {      equals: ['databases', 'typescript'],    },  },});
```

## Composite type methods[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#composite-type-methods "Direct link to Composite type methods")

warning

Available for MongoDB only in Prisma `3.10.0` and later.

Composite type methods allow you to create, update and delete [composite types](https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/composite-types).

### `set`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#set-2 "Direct link to set-2")

Use `set` to overwrite the value of a composite type.

-   The `set` keyword is optional - you can set the value directly:
    
    ```less
    photos: [  { height: 100, width: 200, url: '1.jpg' },  { height: 100, width: 200, url: '2.jpg' },];
    ```
    

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-67 "Direct link to Examples")

##### Set the `shippingAddress` composite type within a new `order`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#set-the-shippingaddress-composite-type-within-a-new-order "Direct link to set-the-shippingaddress-composite-type-within-a-new-order")

```php
const order = await prisma.order.create({  data: {    // Normal relation    product: { connect: { id: 'some-object-id' } },    color: 'Red',    size: 'Large',    // Composite type    shippingAddress: {      set: {        street: '1084 Candycane Lane',        city: 'Silverlake',        zip: '84323',      },    },  },});
```

##### Set an optional composite type to `null`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#set-an-optional-composite-type-to-null "Direct link to set-an-optional-composite-type-to-null")

```php
const order = await prisma.order.create({  data: {    // Embedded optional type, set to null    billingAddress: {      set: null,    },  },});
```

### `unset`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#unset-1 "Direct link to unset-1")

Use `unset` to unset the value of a composite type. Unlike `set: null`, this removes the field entirely from the MongoDB document.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-68 "Direct link to Examples")

##### Remove the `billingAddress` from an `order`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#remove-the-billingaddress-from-an-order "Direct link to remove-the-billingaddress-from-an-order")

```php
const order = await prisma.order.update({  where: {    id: 'some-object-id',  },  data: {    billingAddress: {      // Unset the billing address      // Removes "billingAddress" field from order      unset: true,    },  },});
```

### `update`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-2 "Direct link to update-2")

Use `update` to update fields within a required composite type.

The `update` method cannot be used on optional types. Instead, use [upsert](https://www.prisma.io/docs/orm/reference/prisma-client-reference#upsert-2)

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-69 "Direct link to Examples")

##### Update the zip field of a `shippingAddress` composite type[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-the-zip-field-of-a-shippingaddress-composite-type "Direct link to update-the-zip-field-of-a-shippingaddress-composite-type")

```php
const order = await prisma.order.update({  where: {    id: 'some-object-id',  },  data: {    shippingAddress: {      // Update just the zip field      update: {        zip: '41232',      },    },  },});
```

### `upsert`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#upsert-2 "Direct link to upsert-2")

Use `upsert` to update an existing optional composite type if it exists, and otherwise set the composite type.

The `upsert` method cannot be used on required types. Instead, use [update](https://www.prisma.io/docs/orm/reference/prisma-client-reference#update-2)

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-70 "Direct link to Examples")

##### Create a new `billingAddress` if it doesn't exist, and otherwise update it[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#create-a-new-billingaddress-if-it-doesnt-exist-and-otherwise-update-it "Direct link to create-a-new-billingaddress-if-it-doesnt-exist-and-otherwise-update-it")

```yaml
const order = await prisma.order.update({  where: {    id: 'some-object-id',  },  data: {    billingAddress: {      // Create the address if it doesn't exist,      // otherwise update it      upsert: {        set: {          street: '1084 Candycane Lane',          city: 'Silverlake',          zip: '84323',        },        update: {          zip: '84323',        },      },    },  },});
```

### `push`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#push-1 "Direct link to push-1")

Use `push` to push values to the end of a list of composite types.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-71 "Direct link to Examples")

##### Add a new photo to the `photos` list[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#add-a-new-photo-to-the-photos-list "Direct link to add-a-new-photo-to-the-photos-list")

```php
const product = prisma.product.update({  where: {    id: 10,  },  data: {    photos: {      // Push a photo to the end of the photos list      push: [{ height: 100, width: 200, url: '1.jpg' }],    },  },});
```

## Composite type filters[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#composite-type-filters "Direct link to Composite type filters")

warning

Available for MongoDB only in Prisma `3.11.0` and later.

Composite type filters allow you to filter the contents of [composite types](https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/composite-types).

### `equals`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#equals-2 "Direct link to equals-2")

Use `equals` to filter results by matching a composite type or a list of composite types. Requires all required fields of the composite type to match.

When matching optional fields, you need to distinguish between undefined (missing) fields of the document, and fields that have been explicitly set to `null`:

-   If you omit an optional field, it will match undefined fields, but not fields that have been set to `null`
-   If you filter for `null` values of an optional field with `equals: { ... exampleField: null ... }`, then it will match only documents where the field has been set to `null`, and not undefined fields

The ordering of fields and lists matters when using `equals`:

-   For fields, `{ "a": "1", "b": "2" }` and `{ "b": "2", "a": "1" }` are not considered equal
-   For lists, `[ { "a": 1 }, { "a": 2 } ]` and `[ { "a": 2 }, { "a": 1 } ]` are not considered equal

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-72 "Direct link to Examples")

##### Find orders that exactly match the given `shippingAddress`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#find-orders-that-exactly-match-the-given-shippingaddress "Direct link to find-orders-that-exactly-match-the-given-shippingaddress")

```php
const orders = await prisma.order.findMany({  where: {    shippingAddress: {      equals: {        street: '555 Candy Cane Lane',        city: 'Wonderland',        zip: '52337',      },    },  },});
```

##### Find products with photos that match all of a list of `url`s[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#find-products-with-photos-that-match-all-of-a-list-of-urls "Direct link to find-products-with-photos-that-match-all-of-a-list-of-urls")

```php
const product = prisma.product.findMany({  where: {    equals: {      photos: [{ url: '1.jpg' }, { url: '2.jpg' }],    },  },});
```

### `is`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#is-1 "Direct link to is-1")

Use `is` to filter results by matching specific fields within composite types.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-73 "Direct link to Examples")

##### Find orders with a `shippingAddress` that matches the given street name[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#find-orders-with-a-shippingaddress-that-matches-the-given-street-name "Direct link to find-orders-with-a-shippingaddress-that-matches-the-given-street-name")

```php
const orders = await prisma.order.findMany({  where: {    shippingAddress: {      is: {        street: '555 Candy Cane Lane',      },    },  },});
```

### `isNot`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#isnot-1 "Direct link to isnot-1")

Use `isNot` to filter results for composite type fields that do not match.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-74 "Direct link to Examples")

##### Find orders with a `shippingAddress` that does not match the given zip code[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#find-orders-with-a-shippingaddress-that-does-not-match-the-given-zip-code "Direct link to find-orders-with-a-shippingaddress-that-does-not-match-the-given-zip-code")

```php
const orders = await prisma.order.findMany({  where: {    shippingAddress: {      isNot: {        zip: '52337',      },    },  },});
```

### `isEmpty`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#isempty-1 "Direct link to isempty-1")

Use `isEmpty` to filter results for an empty list of composite types.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-75 "Direct link to Examples")

##### Find products with no photos[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#find-products-with-no-photos "Direct link to Find products with no photos")

```php
const product = prisma.product.findMany({  where: {    photos: {      isEmpty: true,    },  },});
```

### `every`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#every-1 "Direct link to every-1")

Use `every` to filter for lists of composite types where every item in the list matches the condition

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-76 "Direct link to Examples")

##### Find the first product where every photo has a `height` of `200`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#find-the-first-product-where-every-photo-has-a-height-of-200 "Direct link to find-the-first-product-where-every-photo-has-a-height-of-200")

```php
const product = await prisma.product.findFirst({  where: {    photos: {      every: {        height: 200,      }    }  },})
```

### `some`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#some-1 "Direct link to some-1")

Use `some` to filter for lists of composite types where one or more items in the list match the condition.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-77 "Direct link to Examples")

##### Find the first product where one or more photos have a `url` of `2.jpg`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#find-the-first-product-where-one-or-more-photos-have-a-url-of-2jpg "Direct link to find-the-first-product-where-one-or-more-photos-have-a-url-of-2jpg")

```php
const product = await prisma.product.findFirst({  where: {    photos: {      some: {         url: "2.jpg",      }    }  },})
```

### `none`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#none-1 "Direct link to none-1")

Use `none` to filter for lists of composite types where no items in the list match the condition.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-78 "Direct link to Examples")

##### Find the first product where no photos have a `url` of `2.jpg`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#find-the-first-product-where-no-photos-have-a-url-of-2jpg "Direct link to find-the-first-product-where-no-photos-have-a-url-of-2jpg")

```php
const product = await prisma.product.findFirst({  where: {    photos: {      none: {         url: "2.jpg",      }    }  },})
```

## Atomic number operations[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#atomic-number-operations "Direct link to Atomic number operations")

Atomic operations on update is available for number field types (`Float` and `Int`). This feature allows you to update a field based on its **current** value (such as _subtracting_ or _dividing_) without risking a race condition.

Overview: Race conditions

### Operators[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#operators "Direct link to Operators")

|  Option   |                         Description                         |
|-----------|-------------------------------------------------------------|
| `increment` |                Adds `n` to the current value.                 |
| `decrement` |             Subtacts `n` from the current value.              |
| `multiply`  |             Multiplies the current value by `n`.              |
|  `divide`   |               Divides the current value by `n`.               |
|    `set`    | Sets the current field value. Identical to `{ myField : n }`. |

-   You can only perform **one** atomic update per field, per query.
-   If a field is `null`, it will not be updated by `increment`, `decrement`, `multiply`, or `divide`.

### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-79 "Direct link to Examples")

#### Increment all `view` and `likes` fields of all `Post` records by `1`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#increment-all-view-and-likes-fields-of-all-post-records-by-1 "Direct link to increment-all-view-and-likes-fields-of-all-post-records-by-1")

```php
const updatePosts = await prisma.post.updateMany({  data: {    views: {      increment: 1,    },    likes: {      increment: 1,    },  },});
```

#### Set all `views` fields of all `Post` records to `0`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#set-all-views-fields-of-all-post-records-to-0 "Direct link to set-all-views-fields-of-all-post-records-to-0")

```php
const updatePosts = await prisma.post.updateMany({  data: {    views: {      set: 0,    },  },});
```

Can also be written as:

```php
const updatePosts = await prisma.post.updateMany({  data: {    views: 0,  },});
```

## `Json` filters[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#json-filters "Direct link to json-filters")

For use cases and advanced examples, see: [Working with `Json` fields](https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/working-with-json-fields).

warning

Supported by [PostgreSQL](https://www.prisma.io/docs/orm/overview/databases/postgresql) and [MySQL](https://www.prisma.io/docs/orm/overview/databases/mysql) with different syntaxes for the `path` option. PostgreSQL does not support filtering on object key values in arrays.

The examples in this section assumes that the value of the `pet` field is:

```json
{  "favorites": {    "catBreed": "Turkish van",    "dogBreed": "Rottweiler",    "sanctuaries": ["RSPCA", "Alley Cat Allies"],    "treats": [      { "name": "Dreamies", "manufacturer": "Mars Inc" },      { "name": "Treatos", "manufacturer": "The Dog People" }    ]  },  "fostered": {    "cats": ["Bob", "Alice", "Svetlana the Magnificent", "Queenie"]  },  "owned": {    "cats": ["Elliott"]  }}
```

-   The implementation of `Json` filtering [differs between database connectors](https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/working-with-json-fields)
-   Filtering is case sensitive in PostgreSQL and does not yet support `mode`

### `path`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#path "Direct link to path")

`path` represents the location of a specific key. The following query returns all users where the nested `favourites` > `dogBreed` key equals `"Rottweiler"`.

-   PostgreSQL
-   MySQL

```php
const getUsers = await prisma.user.findMany({  where: {    pets: {      path: ['favorites', 'dogBreed'],      equals: 'Rottweiler',    },  },});
```

The following query returns all users where the nested `owned` > `cats` array contains `"Elliott"`.

-   PostgreSQL
-   MySQL

```php
const getUsers = await prisma.user.findMany({  where: {    pets: {      path: ['owned', 'cats'],      array_contains: ['Elliott'],    },  },});
```

warning

Filtering by the key values of objects inside an array (below) is only supported by the MySQL connector.

The following query returns all users where the nested `favorites` > `treats` array contains an object where the `name` value is `"Dreamies"`:

```php
const getUsers = await prisma.user.findMany({  where: {    pets: {      path: '$.favorites.treats[*].name',      array_contains: 'Dreamies',    },  },});
```

### `string_contains`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#string_contains "Direct link to string_contains")

The following query returns all users where the nested `favorites` > `catBreed` key value contains `"Van"`:

-   PostgreSQL
-   MySQL

```php
const getUsers = await prisma.user.findMany({  where: {    pets: {      path: ['favorites', 'catBreed'],      string_contains: 'Van',    },  },});
```

### `string_starts_with`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#string_starts_with "Direct link to string_starts_with")

The following query returns all users where the nested `favorites` > `catBreed` key value starts with `"Turkish"`:

-   PostgreSQL
-   MySQL

```php
const getUsers = await prisma.user.findMany({  where: {    pets: {      path: ['favorites', 'catBreed'],      string_starts_with: 'Turkish',    },  },});
```

### `string_ends_with`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#string_ends_with "Direct link to string_ends_with")

The following query returns all users where the nested `favorites` > `catBreed` key value ends with `"Van"`:

-   PostgreSQL
-   MySQL

```php
const getUsers = await prisma.user.findMany({  where: {    pets: {      path: ['favorites', 'catBreed'],      string_ends_with: 'Van',    },  },});
```

### `mode`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#mode-1 "Direct link to mode-1")

Specify whether the the string filtering should be case sensitive (default) or case insensitive.

The following query returns all users where the nested `favorites` > `catBreed` key value contains `"Van"` or `"van"`:

-   PostgreSQL
-   MySQL

```php
const getUsers = await prisma.user.findMany({  where: {    pets: {      path: ['favorites', 'catBreed'],      string_contains: 'Van',      mode: "insensitive",    },  },});
```

### `array_contains`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#array_contains "Direct link to array_contains")

The following query returns all users where the `sanctuaries` array contains the value `"RSPCA"`:

-   PostgreSQL
-   MySQL

```php
const getUsers = await prisma.user.findMany({  where: {    pets: {      path: ['sanctuaries'],      array_contains: ['RSPCA'],    },  },});
```

info

In PostgreSQL, the value of `array_contains` must be an array and not a string, even if the array only contains a single value.

The following query returns all users where the `sanctuaries` array contains _all_ the values in the given array:

-   PostgreSQL
-   MySQL

```php
const getUsers = await prisma.user.findMany({  where: {    pets: {      path: ['sanctuaries'],      array_contains: ['RSPCA', 'Alley Cat Allies'],    },  },});
```

### `array_starts_with`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#array_starts_with "Direct link to array_starts_with")

The following query returns all users where the `sanctuaries` array starts with the value `"RSPCA"`:

-   PostgreSQL
-   MySQL

```php
const getUsers = await prisma.user.findMany({  where: {    pets: {      path: ['sanctuaries'],      array_starts_with: 'RSPCA',    },  },});
```

### `array_ends_with`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#array_ends_with "Direct link to array_ends_with")

The following query returns all users where the `sanctuaries` array ends with the value `"Alley Cat Allies"`:

-   PostgreSQL
-   MySQL

```php
const getUsers = await prisma.user.findMany({  where: {    pets: {      path: ['sanctuaries'],      array_ends_with: 'Alley Cat Allies',    },  },});
```

## Client methods[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#client-methods "Direct link to Client methods")

**Note:** Client-level methods are prefixed by `$`.

-   `$on` and `$use` client methods do not exist on extended client instances which are extended using [`$extends`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#extends)

warning

In [extended clients](https://www.prisma.io/docs/orm/prisma-client/client-extensions), Client methods do not necessarily exist. If you are extending your client, make sure to check for existence before using Client methods like `$transaction` or `$connect`.

In addition, if you are using `$on` or `$use`, you will need to use these client methods before extending your client as these methods do not exist on extended clients. For `$use` specifically we recommend transitioning [to use query extensions](https://www.prisma.io/docs/orm/prisma-client/client-extensions/query).

### `$disconnect()`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#disconnect-1 "Direct link to disconnect-1")

The `$disconnect()` method closes the database connections that were established when `$connect` was called and stops the process that was running Prisma ORM's query engine. See [Connection management](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections/connection-management) for an overview of `$connect()` and `$disconnect()`.

-   `$disconnect()` returns a `Promise`, so you should call it inside an `async` function with the `await` keyword.

### `$connect()`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#connect-1 "Direct link to connect-1")

The `$connect()` method establishes a physical connection to the database via Prisma ORM's query engine. See [Connection management](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections/connection-management) for an overview of `$connect()` and `$disconnect()`.

-   `$connect()` returns a `Promise`, so you should call it inside an `async` function with the `await` keyword.

### `$on()`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#on "Direct link to on")

warning

`$on` is not available in [extended clients](https://www.prisma.io/docs/orm/prisma-client/client-extensions). Please either migrate to client extensions or use the `$on` method prior to extending your client.

The `$on()` method allows you to subscribe to [logging events](https://www.prisma.io/docs/orm/reference/prisma-client-reference#log) or the [exit hook](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections/connection-management#exit-hooks).

### `$queryRawTyped`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#queryrawtyped "Direct link to queryrawtyped")

See: [Using Raw SQL (`$queryRawTyped`)](https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/typedsql).

### `$queryRaw`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#queryraw "Direct link to queryraw")

See: [Using Raw SQL (`$queryRaw`)](https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/raw-queries#queryraw).

### `$queryRawUnsafe()`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#queryrawunsafe "Direct link to queryrawunsafe")

See: [Using Raw SQL (`$queryRawUnsafe()`)](https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/raw-queries#queryrawunsafe).

### `$executeRaw`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#executeraw "Direct link to executeraw")

See: [Using Raw SQL (`$executeRaw`)](https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/raw-queries#executeraw).

### `$executeRawUnsafe()`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#executerawunsafe "Direct link to executerawunsafe")

See: [Using Raw SQL (`$executeRawUnsafe()`)](https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/raw-queries#executerawunsafe).

### `$runCommandRaw()`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#runcommandraw "Direct link to runcommandraw")

See: [Using Raw SQL (`$runCommandRaw()`)](https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/raw-queries#runcommandraw).

### `$transaction()`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#transaction "Direct link to transaction")

See: [Transactions](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).

### `$extends`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#extends "Direct link to extends")

With `$extends`, you can create and use Prisma Client extensions to add functionality to Prisma Client in the following ways:

-   `model`: add custom methods to your models
-   `client`: add custom methods to your client
-   `query`: create custom Prisma Client queries
-   `result`: add custom fields to your query results

Learn more: [Prisma Client extensions](https://www.prisma.io/docs/orm/prisma-client/client-extensions).

## Utility types[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#utility-types "Direct link to Utility types")

Utility types are helper functions and types that live on the `Prisma` namespace. They are useful for keeping your application type safe.

### `Prisma.validator`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#prismavalidator "Direct link to prismavalidator")

The `validator` helps you create re-usable query parameters based on your schema models while making sure that the objects you create are valid. See also: [Using `Prisma.validator`](https://www.prisma.io/docs/orm/prisma-client/type-safety/prisma-validator)

There are two ways you can use the `validator`:

#### Using generated Prisma Client types[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#using-generated-prisma-client-types "Direct link to Using generated Prisma Client types")

Using types provides a type-level approach to validate data:

```csharp
Prisma.validator<GeneratedType>({ args });
```

#### Using a "selector"[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#using-a-selector "Direct link to Using a "selector"")

When using the selector pattern, you use an existing Prisma Client instance to create a validator. This pattern allows you to select the model, operation, and query option to validate against.

You can also use an instance of Prisma Client that has been extended using a [Prisma Client extension](https://www.prisma.io/docs/orm/prisma-client/client-extensions).

```csharp
Prisma.validator(PrismaClientInstance, '<model>', '<operation>', '<query option>')({ args });
```

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#examples-80 "Direct link to Examples")

The following example shows how you can extract and validate the input for the `create` operation you can reuse within your app:

```javascript
import { Prisma } from '../prisma/generated/client';const validateUserAndPostInput = (name, email, postTitle) => {  return Prisma.validator<Prisma.UserCreateInput>()({    name,    email,    posts: {      create: {        title: postTitle,      },    },  });};
```

Here is an alternative syntax for the same operation:

```javascript
import { Prisma } from '../prisma/generated/client';import prisma from './prisma';const validateUserAndPostInput = (name, email, postTitle) => {  return Prisma.validator(    prisma,    'user',    'create',    'data'  )({    name,    email,    posts: {      create: {        title: postTitle,      },    },  });};
```

## Compare columns in the same table[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#compare-columns-in-the-same-table "Direct link to Compare columns in the same table")

You can compare columns in the same table directly, for non-unique filters.

This feature was moved to general availability in version 5.0.0 and was available via the `fieldReference` Preview feature from Prisma ORM versions 4.3.0 to 4.16.2.

info

In the following situations, you must [use raw queries to compare columns in the same table](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/comparing-columns-through-raw-queries):

-   If you use a version earlier than 4.3.0
-   If you want to use a unique filter, such as [`findUnique`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#findunique) or [`findUniqueOrThrow`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#finduniqueorthrow)
-   If you want to compare a field with a [unique constraint](https://www.prisma.io/docs/orm/prisma-schema/data-model/models#defining-a-unique-field)
-   If you want to use one of the following operators to compare a [JSON field](https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/working-with-json-fields) in MySQL or MariaDB with another field: [`gt`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#gt), [`gte`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#gte), [`lt`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#lt), or [`lte`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#lte). Note that you can use these operators to compare the JSON field with a scalar value. This limitation applies only if you try to compare a JSON field with another field.

To compare columns in the same table, use the `<model>.fields` property. In the following example, the query returns all records where the value in the `prisma.product.quantity` field is less than or equal to the value in the `prisma.product.warnQuantity` field.

```css
prisma.product.findMany({  where: { quantity: { lte: prisma.product.fields.warnQuantity } },});
```

info

`fields` is a special property of every model. It contains the list of fields for that model.

### Considerations[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#considerations "Direct link to Considerations")

#### Fields must be of the same type[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#fields-must-be-of-the-same-type "Direct link to Fields must be of the same type")

You can only make comparisons on fields of the same type. For example, the following causes an error:

```php
await prisma.order.findMany({  where: {    id: { equals: prisma.order.fields.due },    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^    // Type error: id is a string, while amountDue is an integer  },});
```

#### Fields must be in the same model[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#fields-must-be-in-the-same-model "Direct link to Fields must be in the same model")

You can only make comparisons with the `fields` property on fields in the same model. The following example does not work:

```csharp
await prisma.order.findMany({  where: {    id: { equals: prisma.user.fields.name },    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^    // Type error: name is a field on the User model, not Order  },});
```

However, you can compare fields in separate models with [standard queries](https://www.prisma.io/docs/orm/reference/prisma-client-reference#model-queries).

#### In `groupBy` model queries, put your referenced fields in the `by` argument[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#in-groupby-model-queries-put-your-referenced-fields-in-the-by-argument "Direct link to in-groupby-model-queries-put-your-referenced-fields-in-the-by-argument")

If you use the [groupBy](https://www.prisma.io/docs/orm/reference/prisma-client-reference#groupby) model query with the `having` option, then you must put your referenced fields in the `by` argument.

The following example works:

```php
prisma.user.groupBy({  by: ['id', 'name'],  having: { id: { equals: prisma.user.fields.name } },});
```

The following example does not work, because `name` is not in the `by` argument:

```php
prisma.user.groupBy({  by: ['id'],  having: { id: { equals: prisma.user.fields.name } },  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  // name is not in the 'by' argument});
```

#### Search for fields in scalar lists[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#search-for-fields-in-scalar-lists "Direct link to Search for fields in scalar lists")

If your data source supports scalar lists (for example in PostgreSQL), then you can search for all records where a specific field is in a list of fields. To do so, reference the scalar list with the [`in`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#in) and [`notIn`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#notin) filters. For example:

```csharp
await prisma.user.findMany({  where: {    // find all users where 'name' is in a list of tags    name: { in: prisma.user.fields.tags },  },});
```

## Filter on non-unique fields with `UserWhereUniqueInput`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#filter-on-non-unique-fields-with-userwhereuniqueinput "Direct link to filter-on-non-unique-fields-with-userwhereuniqueinput")

From version 5.0.0, the generated type `UserWhereUniqueInput` on [`where`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#where) exposes all fields on the model, not just unique fields. This was available under the [`extendedWhereUnique` Preview flag](https://www.prisma.io/docs/orm/reference/preview-features/client-preview-features#preview-features-promoted-to-general-availability) between versions 4.5.0 to 4.16.2

You must specify at least one unique field in your `where` statement [outside of boolean operators](https://www.prisma.io/docs/orm/reference/prisma-client-reference#boolean-operators-with-userwhereuniqueinput), and you can specify any number of additional unique and non-unique fields. You can use this to add filters to any operation that returns a single record. For example, you can use this feature for the following:

-   [Optimistic concurrency control on updates](https://www.prisma.io/docs/orm/reference/prisma-client-reference#optimistic-concurrency-control-on-updates)
-   [Permission checks](https://www.prisma.io/docs/orm/reference/prisma-client-reference#permission-checks)
-   [Soft deletes](https://www.prisma.io/docs/orm/reference/prisma-client-reference#soft-deletes)

From version 4.6.0, you can use this feature to filter on optional [one-to-one nested reads](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries#nested-reads).

### Optimistic concurrency control on updates[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#optimistic-concurrency-control-on-updates "Direct link to Optimistic concurrency control on updates")

You can filter on non-unique fields to perform [optimistic concurrency control](https://www.prisma.io/docs/orm/prisma-client/queries/transactions#optimistic-concurrency-control) on `update` operations.

To perform optimistic concurrency control, we recommend that you use a `version` field to check whether the data in a record or related record has changed while your code executes. Before version 4.5.0, you could not evaluate the `version` field in an `update` operation, because the field is non-unique. From version 4.5.0, you can evaluate the `version` field.

In the following example, `updateOne` and `updateTwo` first read the same record and then attempt to update it. The database only executes these updates if the value in `version` is the same as the value when it did the initial read. When the database executes the first of these updates (which might be `updateOne` or `updateTwo`, depending on timing), it increments the value in `version`. This means that the database does not execute the second update because the value in `version` has changed.

```kotlin
model User {  id      Int    @id @default(autoincrement())  email   String @unique  city    String  version Int}
```

```php
function updateOne() {  const user = await prisma.user.findUnique({ id: 1 });  await prisma.user.update({    where: { id: user.id, version: user.version },    data: { city: 'Berlin', version: { increment: 1 } },  });}function updateTwo() {  const user = await prisma.user.findUnique({ id: 1 });  await prisma.user.update({    where: { id: user.id, version: user.version },    data: { city: 'New York', version: { increment: 1 } },  });}function main() {  await Promise.allSettled([updateOne(), updateTwo()]);}
```

### Permission checks[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#permission-checks "Direct link to Permission checks")

You can filter on non-unique fields to check permissions during an update.

In the following example, a user wants to update a post title. The `where` statement checks the value in `authorId` to confirm that the user is the author of the post. The application only updates the post title if the user is the post author.

```php
await prisma.post.update({  where: { id: 1, authorId: 1 },  data: { title: 'Updated post title' },});
```

### Soft deletes[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#soft-deletes "Direct link to Soft deletes")

You can filter on non-unique fields to handle soft deletes.

In the following example, we do not want to return a post if it is soft-deleted. The operation only returns the post if the value in `isDeleted` is `false`.

```php
prisma.Post.findUnique({ where: { id: postId, isDeleted: false } });
```

### `UserWhereUniqueInput` considerations[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#userwhereuniqueinput-considerations "Direct link to userwhereuniqueinput-considerations")

#### Boolean operators with `UserWhereUniqueInput`[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#boolean-operators-with-userwhereuniqueinput "Direct link to boolean-operators-with-userwhereuniqueinput")

With `UserWhereUniqueInput`, you must specify at least one unique field outside of the boolean operators `AND`, `OR`, `NOT`. You can still use these boolean operators in conjunction with any other unique fields or non-unique fields in your filter.

In the following example, we test `id`, a unique field, in conjunction with `email`. This is valid.

```perl
await prisma.user.update({  where: { id: 1, OR: [{ email: "bob@prisma.io" }, { email: "alice@prisma.io" }] },        // ^^^ Valid: the expression specifies a unique field (`id`) outside of any boolean operators  data: { ... }})// SQL equivalent:// WHERE id = 1 AND (email = "bob@prisma.io" OR email = "alice@prisma.io")
```

The following example is not valid, because there is no unique field outside of any boolean operators:

```php
await prisma.user.update({  where: { OR: [{ email: "bob@prisma.io" }, { email: "alice@prisma.io" }] },        // ^^^ Invalid: the expressions does not contain a unique field outside of boolean operators  data: { ... }})
```

#### One-to-one relations[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#one-to-one-relations "Direct link to One-to-one relations")

From version 4.5.0, you can filter on non-unique fields in the following operations on [one-to-one relations](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/one-to-one-relations):

-   Nested update
-   Nested upsert
-   Nested disconnect
-   Nested delete

Prisma Client automatically uses a unique filter to select the appropriate related record. As a result, you do not need to specify a unique filter in your `where` statement with a `WhereUniqueInput` [generated type](https://www.prisma.io/docs/orm/reference/prisma-client-reference#generated-types-for-where). Instead, the `where` statement has a `WhereInput` generated type. You can use this to filter without the restrictions of `WhereUniqueInput`.

##### Nested update example[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#nested-update-example "Direct link to Nested update example")

```php
await prisma.user.update({  where: { id: 1, },  data: {    to_one: {      // Before Prisma version 4.5.0      update: { field: "updated" }      // From Prisma version 4.5.0, you can also do the following:      update: { where: { /*WhereInput*/ }, data: { field: "updated" } } }    }  }})
```

##### Nested upsert example[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#nested-upsert-example "Direct link to Nested upsert example")

```php
await prisma.user.update({  where: { id: 1, },  data: {    to_one: {      upsert: {        where: { /* WhereInput */ } // new argument from Prisma 4.5.0        create: { /* CreateInput */ },        update: { /* CreateInput */ },      }    }  }})
```

##### Nested disconnect example[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#nested-disconnect-example "Direct link to Nested disconnect example")

```php
await prisma.user.update({  where: { id: 1, },  data: {    to_one: {      // Before Prisma version 4.5.0      disconnect: true      // From Prisma version 4.5.0, you can also do the following:      disconnect: { /* WhereInput */ }    }  }})
```

##### Nested delete example[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#nested-delete-example "Direct link to Nested delete example")

```php
await prisma.user.update({  where: { id: 1, },  data: {    to_one: {      // Before Prisma version 4.5.0      delete: true      // From Prisma version 4.5.0, you can also do the following:      delete: { /* WhereInput */ }    }  }})
```

## `PrismaPromise` behavior[](https://www.prisma.io/docs/orm/reference/prisma-client-reference#prismapromise-behavior "Direct link to prismapromise-behavior")

All Prisma Client queries return an instance of `PrismaPromise`. This is a ["thenable"](https://masteringjs.io/tutorials/fundamentals/thenable), meaning a `PrismaPromise` only executes when you call `await` or `.then()` or `.catch()`. This behavior is different from a regular JavaScript [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), which starts executing immediately.

For example:

```cpp
const findPostOperation = prisma.post.findMany({}); // Query not yet executedfindPostOperation.then(); // Prisma Client now executes the query// orawait findPostOperation; // Prisma Client now executes the query
```

When using the [`$transaction` API](https://www.prisma.io/docs/orm/prisma-client/queries/transactions#the-transaction-api), this behavior makes it possible for Prisma Client to pass all the queries on to the query engine as a single transaction.
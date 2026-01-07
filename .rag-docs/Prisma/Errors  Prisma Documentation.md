## Error message reference

For more information about how to work with exceptions and error codes, see [Handling exceptions and errors](https://www.prisma.io/docs/orm/prisma-client/debugging-and-troubleshooting/handling-exceptions-and-errors).

## Prisma Client error types[](https://www.prisma.io/docs/orm/reference/error-reference#prisma-client-error-types "Direct link to Prisma Client error types")

Prisma Client throws different kinds of errors. The following lists the exception types, and their documented data fields:

### `PrismaClientKnownRequestError`[](https://www.prisma.io/docs/orm/reference/error-reference#prismaclientknownrequesterror "Direct link to prismaclientknownrequesterror")

Prisma Client throws a `PrismaClientKnownRequestError` exception if the query engine returns a known error related to the request - for example, a unique constraint violation.

|   **Property**    |                                                  **Description**                                                   |
|---------------|----------------------------------------------------------------------------------------------------------------|
|     `code`      |                                         A Prisma-specific error code.                                          |
|     `meta`      | Additional information about the error - for example, the field that caused the error: `{ target: [ 'email' ] }` |
|    `message`    |                                   Error message associated with error code.                                    |
| `clientVersion` |                                 Version of Prisma Client (for example, `2.19.0`)                                 |

### `PrismaClientUnknownRequestError`[](https://www.prisma.io/docs/orm/reference/error-reference#prismaclientunknownrequesterror "Direct link to prismaclientunknownrequesterror")

Prisma Client throws a `PrismaClientUnknownRequestError` exception if the query engine returns an error related to a request that does not have an error code.

|   **Property**    |                  **Description**                   |
|---------------|------------------------------------------------|
|    `message`    |   Error message associated with error code.    |
| `clientVersion` | Version of Prisma Client (for example, `2.19.0`) |

### `PrismaClientRustPanicError`[](https://www.prisma.io/docs/orm/reference/error-reference#prismaclientrustpanicerror "Direct link to prismaclientrustpanicerror")

Prisma Client throws a `PrismaClientRustPanicError` exception if the underlying engine crashes and exits with a non-zero exit code. In this case, Prisma Client or the whole Node process must be restarted.

|   **Property**    |                  **Description**                   |
|---------------|------------------------------------------------|
|    `message`    |   Error message associated with error code.    |
| `clientVersion` | Version of Prisma Client (for example, `2.19.0`) |

### `PrismaClientInitializationError`[](https://www.prisma.io/docs/orm/reference/error-reference#prismaclientinitializationerror "Direct link to prismaclientinitializationerror")

Prisma Client throws a `PrismaClientInitializationError` exception if something goes wrong when the query engine is started and the connection to the database is created. This happens either:

-   When `prisma.$connect()` is called OR
-   When the first query is executed

Errors that can occur include:

-   The provided credentials for the database are invalid
-   There is no database server running under the provided hostname and port
-   The port that the query engine HTTP server wants to bind to is already taken
-   A missing or inaccessible environment variable
-   The query engine binary for the current platform could not be found (`generator` block)

|   **Property**    |                  **Description**                   |
|---------------|------------------------------------------------|
|   `errorCode`   |         A Prisma-specific error code.          |
|    `message`    |   Error message associated with error code.    |
| `clientVersion` | Version of Prisma Client (for example, `2.19.0`) |

### `PrismaClientValidationError`[](https://www.prisma.io/docs/orm/reference/error-reference#prismaclientvalidationerror "Direct link to prismaclientvalidationerror")

Prisma Client throws a `PrismaClientValidationError` exception if validation fails - for example:

-   Missing field - for example, an empty `data: {}` property when creating a new record
-   Incorrect field type provided (for example, setting a `Boolean` field to `"Hello, I like cheese and gold!"`)

|   **Property**    |                  **Description**                   |
|---------------|------------------------------------------------|
|    `message`    |                 Error message.                 |
| `clientVersion` | Version of Prisma Client (for example, `2.19.0`) |

## Error codes[](https://www.prisma.io/docs/orm/reference/error-reference#error-codes "Direct link to Error codes")

### Common[](https://www.prisma.io/docs/orm/reference/error-reference#common "Direct link to Common")

#### `P1000`[](https://www.prisma.io/docs/orm/reference/error-reference#p1000 "Direct link to p1000")

"Authentication failed against database server at `{database_host}`, the provided database credentials for `{database_user}` are not valid. Please make sure to provide valid database credentials for the database server at `{database_host}`."

#### `P1001`[](https://www.prisma.io/docs/orm/reference/error-reference#p1001 "Direct link to p1001")

"Can't reach database server at `{database_host}`:`{database_port}` Please make sure your database server is running at `{database_host}`:`{database_port}`."

#### `P1002`[](https://www.prisma.io/docs/orm/reference/error-reference#p1002 "Direct link to p1002")

"The database server at `{database_host}`:`{database_port}` was reached but timed out. Please try again. Please make sure your database server is running at `{database_host}`:`{database_port}`. "

#### `P1003`[](https://www.prisma.io/docs/orm/reference/error-reference#p1003 "Direct link to p1003")

"Database {database\_file\_name} does not exist at {database\_file\_path}"

"Database `{database_name}.{database_schema_name}` does not exist on the database server at `{database_host}:{database_port}`."

"Database `{database_name}` does not exist on the database server at `{database_host}:{database_port}`."

#### `P1008`[](https://www.prisma.io/docs/orm/reference/error-reference#p1008 "Direct link to p1008")

"Operations timed out after `{time}`"

#### `P1009`[](https://www.prisma.io/docs/orm/reference/error-reference#p1009 "Direct link to p1009")

"Database `{database_name}` already exists on the database server at `{database_host}:{database_port}`"

#### `P1010`[](https://www.prisma.io/docs/orm/reference/error-reference#p1010 "Direct link to p1010")

"User `{database_user}` was denied access on the database `{database_name}`"

#### `P1011`[](https://www.prisma.io/docs/orm/reference/error-reference#p1011 "Direct link to p1011")

"Error opening a TLS connection: {message}"

#### `P1012`[](https://www.prisma.io/docs/orm/reference/error-reference#p1012 "Direct link to p1012")

**Note:** If you get error code P1012 after you upgrade Prisma ORM to version 4.0.0 or later, see the [version 4.0.0 upgrade guide](https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-4#upgrade-your-prisma-schema). A schema that was valid before version 4.0.0 might be invalid in version 4.0.0 and later. The upgrade guide explains how to update your schema to make it valid.

"{full\_error}"

Possible P1012 error messages:

-   "Argument `{}` is missing."
-   "Function `{}` takes arguments, but received ."
-   "Argument `{}` is missing in attribute `@{}`."
-   "Argument `{}` is missing in data source block `{}`."
-   "Argument `{}` is missing in generator block `{}`."
-   "Error parsing attribute `@{}`: "
-   "Attribute `@{}` is defined twice."
-   "The model with database name `{}` could not be defined because another model with this name exists: `{}`"
-   "`{}` is a reserved scalar type name and can not be used."
-   "The `{}` cannot be defined because a with that name already exists."
-   "Key `{}` is already defined in ."
-   "Argument `{}` is already specified as unnamed argument."
-   "Argument `{}` is already specified."
-   "No such argument.""
-   "Field `{}` is already defined on model `{}`."
-   "Field `{}` in model `{}` can't be a list. The current connector does not support lists of primitive types."
-   "The index name `{}` is declared multiple times. With the current connector index names have to be globally unique."
-   "Value `{}` is already defined on enum `{}`."
-   "Attribute not known: `@{}`."
-   "Function not known: `{}`."
-   "Datasource provider not known: `{}`."
-   "shadowDatabaseUrl is the same as url for datasource `{}`. Please specify a different database as shadow database."
-   "The preview feature `{}` is not known. Expected one of: "
-   "`{}` is not a valid value for ."
-   "Type `{}` is neither a built-in type, nor refers to another model, custom type, or enum."
-   "Type `{}` is not a built-in type."
-   "Unexpected token. Expected one of: "
-   "Environment variable not found: ."
-   "Expected a value, but received value `{}`."
-   "Expected a value, but failed while parsing `{}`: ."
-   "Error validating model `{}`: "
-   "Error validating field `{}` in model `{}`: "
-   "Error validating datasource `{datasource}`: {message}"
-   "Error validating enum `{}`: "
-   "Error validating: "

#### `P1013`[](https://www.prisma.io/docs/orm/reference/error-reference#p1013 "Direct link to p1013")

"The provided database string is invalid. {details}"

#### `P1014`[](https://www.prisma.io/docs/orm/reference/error-reference#p1014 "Direct link to p1014")

"The underlying {kind} for model `{model}` does not exist."

#### `P1015`[](https://www.prisma.io/docs/orm/reference/error-reference#p1015 "Direct link to p1015")

"Your Prisma schema is using features that are not supported for the version of the database.  
Database version: {database\_version}  
Errors:  
{errors}"

#### `P1016`[](https://www.prisma.io/docs/orm/reference/error-reference#p1016 "Direct link to p1016")

"Your raw query had an incorrect number of parameters. Expected: `{expected}`, actual: `{actual}`."

#### `P1017`[](https://www.prisma.io/docs/orm/reference/error-reference#p1017 "Direct link to p1017")

"Server has closed the connection."

### Prisma Client (Query Engine)[](https://www.prisma.io/docs/orm/reference/error-reference#prisma-client-query-engine "Direct link to Prisma Client (Query Engine)")

#### `P2000`[](https://www.prisma.io/docs/orm/reference/error-reference#p2000 "Direct link to p2000")

"The provided value for the column is too long for the column's type. Column: {column\_name}"

#### `P2001`[](https://www.prisma.io/docs/orm/reference/error-reference#p2001 "Direct link to p2001")

"The record searched for in the where condition (`{model_name}.{argument_name} = {argument_value}`) does not exist"

#### `P2002`[](https://www.prisma.io/docs/orm/reference/error-reference#p2002 "Direct link to p2002")

"Unique constraint failed on the {constraint}"

#### `P2003`[](https://www.prisma.io/docs/orm/reference/error-reference#p2003 "Direct link to p2003")

"Foreign key constraint failed on the field: `{field_name}`"

#### `P2004`[](https://www.prisma.io/docs/orm/reference/error-reference#p2004 "Direct link to p2004")

"A constraint failed on the database: `{database_error}`"

#### `P2005`[](https://www.prisma.io/docs/orm/reference/error-reference#p2005 "Direct link to p2005")

"The value `{field_value}` stored in the database for the field `{field_name}` is invalid for the field's type"

#### `P2006`[](https://www.prisma.io/docs/orm/reference/error-reference#p2006 "Direct link to p2006")

"The provided value `{field_value}` for `{model_name}` field `{field_name}` is not valid"

#### `P2007`[](https://www.prisma.io/docs/orm/reference/error-reference#p2007 "Direct link to p2007")

"Data validation error `{database_error}`"

#### `P2008`[](https://www.prisma.io/docs/orm/reference/error-reference#p2008 "Direct link to p2008")

"Failed to parse the query `{query_parsing_error}` at `{query_position}`"

#### `P2009`[](https://www.prisma.io/docs/orm/reference/error-reference#p2009 "Direct link to p2009")

"Failed to validate the query: `{query_validation_error}` at `{query_position}`"

#### `P2010`[](https://www.prisma.io/docs/orm/reference/error-reference#p2010 "Direct link to p2010")

"Raw query failed. Code: `{code}`. Message: `{message}`"

#### `P2011`[](https://www.prisma.io/docs/orm/reference/error-reference#p2011 "Direct link to p2011")

"Null constraint violation on the {constraint}"

#### `P2012`[](https://www.prisma.io/docs/orm/reference/error-reference#p2012 "Direct link to p2012")

"Missing a required value at `{path}`"

#### `P2013`[](https://www.prisma.io/docs/orm/reference/error-reference#p2013 "Direct link to p2013")

"Missing the required argument `{argument_name}` for field `{field_name}` on `{object_name}`."

#### `P2014`[](https://www.prisma.io/docs/orm/reference/error-reference#p2014 "Direct link to p2014")

"The change you are trying to make would violate the required relation '{relation\_name}' between the `{model_a_name}` and `{model_b_name}` models."

#### `P2015`[](https://www.prisma.io/docs/orm/reference/error-reference#p2015 "Direct link to p2015")

"A related record could not be found. {details}"

#### `P2016`[](https://www.prisma.io/docs/orm/reference/error-reference#p2016 "Direct link to p2016")

"Query interpretation error. {details}"

#### `P2017`[](https://www.prisma.io/docs/orm/reference/error-reference#p2017 "Direct link to p2017")

"The records for relation `{relation_name}` between the `{parent_name}` and `{child_name}` models are not connected."

#### `P2018`[](https://www.prisma.io/docs/orm/reference/error-reference#p2018 "Direct link to p2018")

"The required connected records were not found. {details}"

#### `P2019`[](https://www.prisma.io/docs/orm/reference/error-reference#p2019 "Direct link to p2019")

"Input error. {details}"

#### `P2020`[](https://www.prisma.io/docs/orm/reference/error-reference#p2020 "Direct link to p2020")

"Value out of range for the type. {details}"

#### `P2021`[](https://www.prisma.io/docs/orm/reference/error-reference#p2021 "Direct link to p2021")

"The table `{table}` does not exist in the current database."

#### `P2022`[](https://www.prisma.io/docs/orm/reference/error-reference#p2022 "Direct link to p2022")

"The column `{column}` does not exist in the current database."

#### `P2023`[](https://www.prisma.io/docs/orm/reference/error-reference#p2023 "Direct link to p2023")

"Inconsistent column data: {message}"

#### `P2024`[](https://www.prisma.io/docs/orm/reference/error-reference#p2024 "Direct link to p2024")

"Timed out fetching a new connection from the connection pool. (More info: [http://pris.ly/d/connection-pool](https://www.prisma.io/docs/reference/errors/connection-pool) (Current connection pool timeout: {timeout}, connection limit: {connection\_limit})"

#### `P2025`[](https://www.prisma.io/docs/orm/reference/error-reference#p2025 "Direct link to p2025")

"An operation failed because it depends on one or more records that were required but not found. {cause}"

#### `P2026`[](https://www.prisma.io/docs/orm/reference/error-reference#p2026 "Direct link to p2026")

"The current database provider doesn't support a feature that the query used: {feature}"

#### `P2027`[](https://www.prisma.io/docs/orm/reference/error-reference#p2027 "Direct link to p2027")

"Multiple errors occurred on the database during query execution: {errors}"

#### `P2028`[](https://www.prisma.io/docs/orm/reference/error-reference#p2028 "Direct link to p2028")

"Transaction API error: {error}"

#### `P2029`[](https://www.prisma.io/docs/orm/reference/error-reference#p2029 "Direct link to p2029")

"Query parameter limit exceeded error: {message}"

#### `P2030`[](https://www.prisma.io/docs/orm/reference/error-reference#p2030 "Direct link to p2030")

"Cannot find a fulltext index to use for the search, try adding a @@fulltext(\[Fields...\]) to your schema"

#### `P2031`[](https://www.prisma.io/docs/orm/reference/error-reference#p2031 "Direct link to p2031")

"Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set. See details: [https://pris.ly/d/mongodb-replica-set](https://www.prisma.io/docs/reference/errors/mongodb-replica-set)"

#### `P2033`[](https://www.prisma.io/docs/orm/reference/error-reference#p2033 "Direct link to p2033")

"A number used in the query does not fit into a 64 bit signed integer. Consider using `BigInt` as field type if you're trying to store large integers"

#### `P2034`[](https://www.prisma.io/docs/orm/reference/error-reference#p2034 "Direct link to p2034")

"Transaction failed due to a write conflict or a deadlock. Please retry your transaction"

#### `P2035`[](https://www.prisma.io/docs/orm/reference/error-reference#p2035 "Direct link to p2035")

"Assertion violation on the database: {database\_error}"

#### `P2036`[](https://www.prisma.io/docs/orm/reference/error-reference#p2036 "Direct link to p2036")

"Error in external connector (id {id})"

#### `P2037`[](https://www.prisma.io/docs/orm/reference/error-reference#p2037 "Direct link to p2037")

"Too many database connections opened: {message}"

### Prisma Migrate (Schema Engine)[](https://www.prisma.io/docs/orm/reference/error-reference#prisma-migrate-schema-engine "Direct link to Prisma Migrate (Schema Engine)")

warning

The Schema Engine was previously called Migration Engine. This change was introduced in version [5.0.0](https://github.com/prisma/prisma/releases/tag/5.0.0).

#### `P3000`[](https://www.prisma.io/docs/orm/reference/error-reference#p3000 "Direct link to p3000")

"Failed to create database: {database\_error}"

#### `P3001`[](https://www.prisma.io/docs/orm/reference/error-reference#p3001 "Direct link to p3001")

"Migration possible with destructive changes and possible data loss: {migration\_engine\_destructive\_details}"

#### `P3002`[](https://www.prisma.io/docs/orm/reference/error-reference#p3002 "Direct link to p3002")

"The attempted migration was rolled back: {database\_error}"

#### `P3003`[](https://www.prisma.io/docs/orm/reference/error-reference#p3003 "Direct link to p3003")

"The format of migrations changed, the saved migrations are no longer valid. To solve this problem, please follow the steps at: [https://pris.ly/d/migrate](https://www.prisma.io/docs/reference/errors/migrate)"

#### `P3004`[](https://www.prisma.io/docs/orm/reference/error-reference#p3004 "Direct link to p3004")

"The `{database_name}` database is a system database, it should not be altered with prisma migrate. Please connect to another database."

#### `P3005`[](https://www.prisma.io/docs/orm/reference/error-reference#p3005 "Direct link to p3005")

"The database schema is not empty. Read more about how to baseline an existing production database: [https://pris.ly/d/migrate-baseline](https://www.prisma.io/docs/reference/errors/migrate-baseline)"

#### `P3006`[](https://www.prisma.io/docs/orm/reference/error-reference#p3006 "Direct link to p3006")

"Migration `{migration_name}` failed to apply cleanly to the shadow database.  
{error\_code}Error:  
{inner\_error}"

#### `P3007`[](https://www.prisma.io/docs/orm/reference/error-reference#p3007 "Direct link to p3007")

"Some of the requested preview features are not yet allowed in schema engine. Please remove them from your data model before using migrations. (blocked: {list\_of\_blocked\_features})"

#### `P3008`[](https://www.prisma.io/docs/orm/reference/error-reference#p3008 "Direct link to p3008")

"The migration `{migration_name}` is already recorded as applied in the database."

#### `P3009`[](https://www.prisma.io/docs/orm/reference/error-reference#p3009 "Direct link to p3009")

"migrate found failed migrations in the target database, new migrations will not be applied. Read more about how to resolve migration issues in a production database: [https://pris.ly/d/migrate-resolve](https://www.prisma.io/docs/reference/errors/migrate-resolve)  
{details}"

#### `P3010`[](https://www.prisma.io/docs/orm/reference/error-reference#p3010 "Direct link to p3010")

"The name of the migration is too long. It must not be longer than 200 characters (bytes)."

#### `P3011`[](https://www.prisma.io/docs/orm/reference/error-reference#p3011 "Direct link to p3011")

"Migration `{migration_name}` cannot be rolled back because it was never applied to the database. Hint: did you pass in the whole migration name? (example: "20201207184859\_initial\_migration")"

#### `P3012`[](https://www.prisma.io/docs/orm/reference/error-reference#p3012 "Direct link to p3012")

"Migration `{migration_name}` cannot be rolled back because it is not in a failed state."

#### `P3013`[](https://www.prisma.io/docs/orm/reference/error-reference#p3013 "Direct link to p3013")

"Datasource provider arrays are no longer supported in migrate. Please change your datasource to use a single provider. Read more at [https://pris.ly/multi-provider-deprecation](https://pris.ly/multi-provider-deprecation)"

#### `P3014`[](https://www.prisma.io/docs/orm/reference/error-reference#p3014 "Direct link to p3014")

"Prisma Migrate could not create the shadow database. Please make sure the database user has permission to create databases. Read more about the shadow database (and workarounds) at [https://pris.ly/d/migrate-shadow](https://www.prisma.io/docs/reference/errors/migrate-shadow).

Original error: {error\_code}  
{inner\_error}"

#### `P3015`[](https://www.prisma.io/docs/orm/reference/error-reference#p3015 "Direct link to p3015")

"Could not find the migration file at {migration\_file\_path}. Please delete the directory or restore the migration file."

#### `P3016`[](https://www.prisma.io/docs/orm/reference/error-reference#p3016 "Direct link to p3016")

"The fallback method for database resets failed, meaning Migrate could not clean up the database entirely. Original error: {error\_code}  
{inner\_error}"

#### `P3017`[](https://www.prisma.io/docs/orm/reference/error-reference#p3017 "Direct link to p3017")

"The migration {migration\_name} could not be found. Please make sure that the migration exists, and that you included the whole name of the directory. (example: "20201207184859\_initial\_migration")"

#### `P3018`[](https://www.prisma.io/docs/orm/reference/error-reference#p3018 "Direct link to p3018")

"A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: [https://pris.ly/d/migrate-resolve](https://www.prisma.io/docs/reference/errors/migrate-resolve)"

Migration name: {migration\_name}

Database error code: {database\_error\_code}

Database error:  
{database\_error} "

#### `P3019`[](https://www.prisma.io/docs/orm/reference/error-reference#p3019 "Direct link to p3019")

"The datasource provider `{provider}` specified in your schema does not match the one specified in the migration\_lock.toml, `{expected_provider}`. Please remove your current migration directory and start a new migration history with prisma migrate dev. Read more: [https://pris.ly/d/migrate-provider-switch](https://www.prisma.io/docs/reference/errors/migrate-provider-switch)"

#### `P3020`[](https://www.prisma.io/docs/orm/reference/error-reference#p3020 "Direct link to p3020")

"The automatic creation of shadow databases is disabled on Azure SQL. Please set up a shadow database using the `shadowDatabaseUrl` datasource attribute.  
Read the docs page for more details: [https://pris.ly/d/migrate-shadow](https://www.prisma.io/docs/reference/errors/migrate-shadow)"

#### `P3021`[](https://www.prisma.io/docs/orm/reference/error-reference#p3021 "Direct link to p3021")

"Foreign keys cannot be created on this database. Learn more how to handle this: [https://pris.ly/d/migrate-no-foreign-keys](https://www.prisma.io/docs/reference/errors/migrate-no-foreign-keys)"

#### `P3022`[](https://www.prisma.io/docs/orm/reference/error-reference#p3022 "Direct link to p3022")

"Direct execution of DDL (Data Definition Language) SQL statements is disabled on this database. Please read more here about how to handle this: [https://pris.ly/d/migrate-no-direct-ddl](https://www.prisma.io/docs/reference/errors/migrate-no-direct-ddl)"

#### `P3023`[](https://www.prisma.io/docs/orm/reference/error-reference#p3023 "Direct link to p3023")

"For the current database, `externalTables` & `externalEnums` in your prisma config must contain only fully qualified identifiers (e.g. `schema_name.table_name`)."

#### `P3024`[](https://www.prisma.io/docs/orm/reference/error-reference#p3024 "Direct link to p3024")

"For the current database, `externalTables` & `externalEnums` in your prisma config must contain only simple identifiers without a schema name."

### `prisma db pull`[](https://www.prisma.io/docs/orm/reference/error-reference#prisma-db-pull "Direct link to prisma-db-pull")

#### `P4000`[](https://www.prisma.io/docs/orm/reference/error-reference#p4000 "Direct link to p4000")

"Introspection operation failed to produce a schema file: {introspection\_error}"

#### `P4001`[](https://www.prisma.io/docs/orm/reference/error-reference#p4001 "Direct link to p4001")

"The introspected database was empty."

#### `P4002`[](https://www.prisma.io/docs/orm/reference/error-reference#p4002 "Direct link to p4002")

"The schema of the introspected database was inconsistent: {explanation}"

### Prisma Accelerate[](https://www.prisma.io/docs/orm/reference/error-reference#prisma-accelerate "Direct link to Prisma Accelerate")

Prisma Accelerate-related errors start with `P6xxx` except for [`P5011`](https://www.prisma.io/docs/orm/reference/error-reference#p5011-too-many-requests).

#### `P6000` (`ServerError`)[](https://www.prisma.io/docs/orm/reference/error-reference#p6000-servererror "Direct link to p6000-servererror")

Generic error to catch all other errors.

#### `P6001` (`InvalidDataSource`)[](https://www.prisma.io/docs/orm/reference/error-reference#p6001-invaliddatasource "Direct link to p6001-invaliddatasource")

The URL is malformed; for instance, it does not use the `prisma://` protocol.

The API Key in the connection string is invalid.

#### `P6003` (`PlanLimitReached`)[](https://www.prisma.io/docs/orm/reference/error-reference#p6003-planlimitreached "Direct link to p6003-planlimitreached")

The included usage of the current plan has been exceeded. This can only occur on the [free plan](https://www.prisma.io/pricing).

#### `P6004` (`QueryTimeout`)[](https://www.prisma.io/docs/orm/reference/error-reference#p6004-querytimeout "Direct link to p6004-querytimeout")

The global timeout of Accelerate has been exceeded. You can find the limit [here](https://www.prisma.io/docs/postgres/database/connection-pooling#query-timeout-limit).

> Also see the [troubleshooting guide](https://www.prisma.io/docs/accelerate/troubleshoot#p6004-querytimeout) for more information.

#### `P6005` (`InvalidParameters`)[](https://www.prisma.io/docs/orm/reference/error-reference#p6005-invalidparameters "Direct link to p6005-invalidparameters")

The user supplied invalid parameters. Currently only relevant for transaction methods. For example, setting a timeout that is too high. You can find the limit [here](https://www.prisma.io/docs/postgres/database/connection-pooling#interactive-transactions-query-timeout-limit).

#### `P6006` (`VersionNotSupported`)[](https://www.prisma.io/docs/orm/reference/error-reference#p6006-versionnotsupported "Direct link to p6006-versionnotsupported")

The chosen Prisma version is not compatible with Accelerate. This may occur when a user uses an unstable development version that we occasionally prune.

#### `P6008` (`ConnectionError|EngineStartError`)[](https://www.prisma.io/docs/orm/reference/error-reference#p6008-connectionerrorenginestarterror "Direct link to p6008-connectionerrorenginestarterror")

The engine failed to start. For example, it couldn't establish a connection to the database.

> Also see the [troubleshooting guide](https://www.prisma.io/docs/accelerate/troubleshoot#p6008-connectionerrorenginestarterror) for more information.

#### `P6009` (`ResponseSizeLimitExceeded`)[](https://www.prisma.io/docs/orm/reference/error-reference#p6009-responsesizelimitexceeded "Direct link to p6009-responsesizelimitexceeded")

The global response size limit of Accelerate has been exceeded. You can find the limit [here](https://www.prisma.io/docs/postgres/database/connection-pooling#response-size-limit).

> Also see the [troubleshooting guide](https://www.prisma.io/docs/accelerate/troubleshoot#p6009-responsesizelimitexceeded) for more information.

#### `P6010` (`ProjectDisabledError`)[](https://www.prisma.io/docs/orm/reference/error-reference#p6010-projectdisablederror "Direct link to p6010-projectdisablederror")

Your accelerate project is disabled. Please [enable](https://www.prisma.io/docs/accelerate/getting-started#1-enable-accelerate) it again to use it.

#### `P5011` (`Too Many Requests`)[](https://www.prisma.io/docs/orm/reference/error-reference#p5011-too-many-requests "Direct link to p5011-too-many-requests")

This error indicates that the request volume exceeded. Implement a back-off strategy and try again later. For assistance with expected high workloads, contact [support](https://www.prisma.io/docs/platform/support).
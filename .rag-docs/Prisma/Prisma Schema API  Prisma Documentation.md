## Prisma schema reference

## `datasource`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#datasource "Direct link to datasource")

Defines a [data source](https://www.prisma.io/docs/orm/prisma-schema/overview/data-sources) in the Prisma schema.

### Fields[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#fields "Direct link to Fields")

A `datasource` block accepts the following fields:

|       Name        | Required |                                Type                                 |                                                                                                                              Description                                                                                                                              |
|-------------------|----------|---------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|     `provider`      |   **Yes**    | String (`postgresql`, `mysql`, `sqlite`, `sqlserver`, `mongodb`, `cockroachdb`) |                                                                                                            Describes which data source connectors to use.                                                                                                             |
|        `url`        |   **Yes**    |                            String (URL)                             |                                          **Deprecated in Prisma ORM v7.** Configure the connection URL in Prisma Config instead: see `datasource.url`. Existing schemas continue to work, but you should migrate to Prisma Config.                                          |
| `shadowDatabaseUrl` |    No    |                            String (URL)                             |                                                                      **Deprecated in Prisma ORM v7.** Configure the shadow database URL in Prisma Config instead: see `datasource.shadowDatabaseUrl`.                                                                       |
|     `directUrl`     |    No    |                            String (URL)                             |                                                                         **Deprecated in Prisma ORM v7.** Configure the direct connection URL in Prisma Config instead: see `datasource.directUrl`.                                                                          |
|   `relationMode`    |    No    |                    String (`foreignKeys`, `prisma`)                     | Sets whether referential integrity is enforced by foreign keys in the database or emulated in the Prisma Client.

In preview in versions 3.1.1 and later. The field is named `relationMode` in versions 4.5.0 and later, and was previously named `referentialIntegrity`. |
|    `extensions`     |    No    |            List of strings (PostgreSQL extension names)             |                                                            Allows you to represent PostgreSQL extensions in your schema. Available in preview for PostgreSQL only in Prisma ORM versions 4.5.0 and later.                                                             |

note

As of Prisma ORM v7, the `url`, `directUrl`, and `shadowDatabaseUrl` fields in the Prisma schema `datasource` block are deprecated. Configure these fields in [Prisma Config](https://www.prisma.io/docs/orm/reference/prisma-config-reference) instead.

The following providers are available:

-   [`sqlite`](https://www.prisma.io/docs/orm/overview/databases/sqlite)
-   [`postgresql`](https://www.prisma.io/docs/orm/overview/databases/postgresql)
-   [`mysql`](https://www.prisma.io/docs/orm/overview/databases/mysql)
-   [`sqlserver`](https://www.prisma.io/docs/orm/overview/databases/sql-server)
-   [`mongodb`](https://www.prisma.io/docs/orm/overview/databases/mongodb)
-   [`cockroachdb`](https://www.prisma.io/docs/orm/overview/databases/cockroachdb)

-   You can only have **one** `datasource` block in a schema.
-   `datasource db` is convention - however, you can give your data source any name - for example, `datasource mysql` or `datasource data`.

### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples "Direct link to Examples")

#### Specify a PostgreSQL data source[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#specify-a-postgresql-data-source "Direct link to Specify a PostgreSQL data source")

In this example, the target database is available with the following credentials:

-   User: `johndoe`
-   Password: `mypassword`
-   Host: `localhost`
-   Port: `5432`
-   Database name: `mydb`
-   Schema name: `public`

```perl
datasource db {  provider = "postgresql"  url      = "postgresql://johndoe:mypassword@localhost:5432/mydb?schema=public"}
```

Learn more about PostgreSQL connection strings [here](https://www.prisma.io/docs/orm/overview/databases/postgresql).

#### Specify a PostgreSQL data source via an environment variable[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#specify-a-postgresql-data-source-via-an-environment-variable "Direct link to Specify a PostgreSQL data source via an environment variable")

In this example, the target database is available with the following credentials:

-   User: `johndoe`
-   Password: `mypassword`
-   Host: `localhost`
-   Port: `5432`
-   Database name: `mydb`
-   Schema name: `public`

```bash
datasource db {  provider = "postgresql"}
```

When running a Prisma CLI command that needs the database connection URL (e.g. `prisma generate`), you need to make sure that the `DATABASE_URL` environment variable is set.

One way to do so is by creating a [`.env`](https://github.com/motdotla/dotenv) file with the following contents. Note that the file must be in the same directory as your `schema.prisma` file to automatically picked up the Prisma CLI.

```bash
DATABASE_URL=postgresql://johndoe:mypassword@localhost:5432/mydb?schema=public
```

#### Specify a MySQL data source[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#specify-a-mysql-data-source "Direct link to Specify a MySQL data source")

In this example, the target database is available with the following credentials:

-   User: `johndoe`
-   Password: `mypassword`
-   Host: `localhost`
-   Port: `3306`
-   Database name: `mydb`

```perl
datasource db {  provider = "mysql"  url      = "mysql://johndoe:mypassword@localhost:3306/mydb"}
```

Learn more about MySQL connection strings [here](https://www.prisma.io/docs/orm/overview/databases/mysql).

#### Specify a MongoDB data source[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#specify-a-mongodb-data-source "Direct link to Specify a MongoDB data source")

-   User: `root`
-   Password: `password`
-   Host: `cluster1.test1.mongodb.net`
-   Port: N/A
-   Database name: `testing`

```perl
datasource db {  provider = "mongodb"  url      = "mongodb+srv://root:password@cluster1.test1.mongodb.net/testing?retryWrites=true&w=majority"}
```

Learn more about MongoDB connection strings [here](https://www.prisma.io/docs/orm/overview/databases/mongodb).

#### Specify a SQLite data source[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#specify-a-sqlite-data-source "Direct link to Specify a SQLite data source")

In this example, the target database is located in a file called `dev.db`:

```bash
datasource db {  provider = "sqlite"  url      = "file:./dev.db"}
```

Learn more about SQLite connection strings [here](https://www.prisma.io/docs/orm/overview/databases/sqlite).

#### Specify a CockroachDB data source[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#specify-a-cockroachdb-data-source "Direct link to Specify a CockroachDB data source")

In this example, the target database is available with the following credentials:

-   User: `johndoe`
-   Password: `mypassword`
-   Host: `localhost`
-   Port: `26257`
-   Database name: `mydb`
-   Schema name: `public`

```perl
datasource db {  provider = "cockroachdb"  url      = "postgresql://johndoe:mypassword@localhost:26257/mydb?schema=public"}
```

The format for connection strings is the same as for PostgreSQL. Learn more about PostgreSQL connection strings [here](https://www.prisma.io/docs/orm/overview/databases/postgresql).

## `generator`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#generator "Direct link to generator")

Defines a [generator](https://www.prisma.io/docs/orm/prisma-schema/overview/generators) in the Prisma schema.

### Fields for `prisma-client-js` provider[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#fields-for-prisma-client-js-provider "Direct link to fields-for-prisma-client-js-provider")

This is the default generator for Prisma ORM 6.x and earlier versions. Learn more about [generators](https://www.prisma.io/docs/orm/prisma-schema/overview/generators#prisma-client-js-deprecated).

A `generator` block accepts the following fields:

|      Name       | Required |           Type            |                                                           Description                                                            |
|-----------------|----------|---------------------------|----------------------------------------------------------------------------------------------------------------------------------|
|    `provider`     |   **Yes**    |     `prisma-client-js`      | Describes which generator to use. This can point to a file that implements a generator or specify a built-in generator directly. |
|     `output`      |    No    |    String (file path)     |                Determines the location for the generated client, learn more. **Default**: `node_modules/.prisma/client`                |
| `previewFeatures` |    No    |       List of Enums       |      Use intellisense to see list of currently available Preview features (`Ctrl+Space` in Visual Studio Code) **Default**: none       |
|   `engineType`    |    No    | Enum (`library` or `binary`)  |                               Defines the query engine type to download and use. **Default**: `library`                                |
|  `binaryTargets`  |    No    | List of Enums (see below) |         Specify the OS on which the Prisma Client will run to ensure compatibility of the query engine. **Default**: `native`          |
|  `moduleFormat`   |    No    |     Enum (`cjs` or `esm`)     |       Defines the module format of the generated Prisma Client. This field is available only with `prisma-client` generator.       |

important

We recommend defining a custom output path, adding the path to `.gitignore`, and then making sure to run `prisma generate` via a custom build script or postinstall hook.

### Fields for `prisma-client` provider[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#fields-for-prisma-client-provider "Direct link to fields-for-prisma-client-provider")

The ESM-first client generator that offers greater control and flexibility across different JavaScript environments. It generates plain TypeScript code into a custom directory, providing full visibility over the generated code. Learn more about the new [`prisma-client`](https://www.prisma.io/docs/orm/prisma-schema/overview/generators#prisma-client) generator.

note

The `prisma-client` generator will be the default generator in Prisma ORM 7.0 and we recommend migrating to it as soon as possible. It has been Generally Available since [v6.16.0](https://pris.ly/release/6.16.0).

A `generator` block accepts the following fields:

|          Name          | Required |                                                Type                                                |                                                                                                   Description                                                                                                   |
|------------------------|----------|----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|        `provider`        |   **Yes**    |                                           `prisma-client`                                            |                                        Describes which generator to use. This can point to a file that implements a generator or specify a built-in generator directly.                                         |
|         `output`         |   **Yes**    |                                         String (file path)                                         |                                                                          Determines the location for the generated client, learn more.                                                                          |
|    `previewFeatures`     |    No    |                                           List of Enums                                            |                                              Use intellisense to see list of currently available Preview features (`Ctrl+Space` in Visual Studio Code) **Default**: none                                              |
|        `runtime`         |    No    | Enum (`nodejs`, `deno`, `bun`, `workerd` (alias `cloudflare`), `vercel-edge` (alias `edge-light`), `react-native`) |                                                                                   Target runtime environment. **Default**: `nodejs`                                                                                   |
|      `moduleFormat`      |    No    |                                         Enum (`esm` or `cjs`)                                          | Determines whether the generated code supports ESM (uses `import`) or CommonJS (uses `require(...)`) modules. We always recommend `esm` unless you have a good reason to use `cjs`. **Default**: Inferred from environment. |
| `generatedFileExtension` |    No    |                                      Enum (`ts` or `mts` or `cts`)                                       |                                                                           File extension for generated TypeScript files. **Default**: `ts`                                                                            |
|  `importFileExtension`   |    No    |                       Enum (`ts`,`mts`,`cts`,`js`,`mjs`,`cjs`, empty (for bare imports))                       |                                                                  File extension used in import statements **Default**: Inferred from environment.                                                                   |

#### `binaryTargets` options[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#binarytargets-options "Direct link to binarytargets-options")

The following tables list all supported operating systems with the name of platform to specify in [`binaryTargets`](https://www.prisma.io/docs/orm/prisma-schema/overview/generators#binary-targets).

Unless specified otherwise, the default supported CPU architecture is x86\_64.

##### macOS[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#macos "Direct link to macOS")

|      Build OS       | Prisma engine build name |
|---------------------|--------------------------|
| macOS Intel x86\_64 |          `darwin`          |
|     macOS ARM64     |       `darwin-arm64`       |

##### Windows[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#windows "Direct link to Windows")

| Build OS | Prisma engine build name |
|----------|--------------------------|
| Windows  |         `windows`          |

##### Linux (Alpine on x86\_64 architectures)[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#linux-alpine-on-x86_64-architectures "Direct link to Linux (Alpine on x86_64 architectures)")

|        Build OS         |  Prisma engine build name  | OpenSSL |
|-------------------------|----------------------------|---------|
| Alpine (3.17 and newer) | `linux-musl-openssl-3.0.x`\* |  3.0.x  |
| Alpine (3.16 and older) |         `linux-musl`         |  1.1.x  |

\* Available in Prisma ORM versions 4.8.0 and later.

##### Linux (Alpine on ARM64 architectures)[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#linux-alpine-on-arm64-architectures "Direct link to Linux (Alpine on ARM64 architectures)")

|        Build OS         |     Prisma engine build name     | OpenSSL |
|-------------------------|----------------------------------|---------|
| Alpine (3.17 and newer) | `linux-musl-arm64-openssl-3.0.x`\* |  3.0.x  |
| Alpine (3.16 and older) | `linux-musl-arm64-openssl-1.1.x`\* |  1.1.x  |

\* Available in Prisma ORM versions 4.10.0 and later.

##### Linux (Debian), x86\_64[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#linux-debian-x86_64 "Direct link to Linux (Debian), x86_64")

|       Build OS       | Prisma engine build name | OpenSSL |
|----------------------|--------------------------|---------|
|  Debian 8 (Jessie)   |   `debian-openssl-1.0.x`   |  1.0.x  |
|  Debian 9 (Stretch)  |   `debian-openssl-1.1.x`   |  1.1.x  |
|  Debian 10 (Buster)  |   `debian-openssl-1.1.x`   |  1.1.x  |
| Debian 11 (Bullseye) |   `debian-openssl-1.1.x`   |  1.1.x  |
| Debian 12 (Bookworm) |   `debian-openssl-3.0.x`   |  3.0.x  |

##### Linux (Ubuntu), x86\_64[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#linux-ubuntu-x86_64 "Direct link to Linux (Ubuntu), x86_64")

|        Build OS        | Prisma engine build name | OpenSSL |
|------------------------|--------------------------|---------|
| Ubuntu 14.04 (trusty)  |   `debian-openssl-1.0.x`   |  1.0.x  |
| Ubuntu 16.04 (xenial)  |   `debian-openssl-1.0.x`   |  1.0.x  |
| Ubuntu 18.04 (bionic)  |   `debian-openssl-1.1.x`   |  1.1.x  |
|  Ubuntu 19.04 (disco)  |   `debian-openssl-1.1.x`   |  1.1.x  |
|  Ubuntu 20.04 (focal)  |   `debian-openssl-1.1.x`   |  1.1.x  |
| Ubuntu 21.04 (hirsute) |   `debian-openssl-1.1.x`   |  1.1.x  |
|  Ubuntu 22.04 (jammy)  |   `debian-openssl-3.0.x`   |  3.0.x  |
|  Ubuntu 23.04 (lunar)  |   `debian-openssl-3.0.x`   |  3.0.x  |

##### Linux (CentOS), x86\_64[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#linux-centos-x86_64 "Direct link to Linux (CentOS), x86_64")

| Build OS | Prisma engine build name | OpenSSL |
|----------|--------------------------|---------|
| CentOS 7 |    `rhel-openssl-1.0.x`    |  1.0.x  |
| CentOS 8 |    `rhel-openssl-1.1.x`    |  1.1.x  |

##### Linux (Fedora), x86\_64[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#linux-fedora-x86_64 "Direct link to Linux (Fedora), x86_64")

| Build OS  | Prisma engine build name | OpenSSL |
|-----------|--------------------------|---------|
| Fedora 28 |    `rhel-openssl-1.1.x`    |  1.1.x  |
| Fedora 29 |    `rhel-openssl-1.1.x`    |  1.1.x  |
| Fedora 30 |    `rhel-openssl-1.1.x`    |  1.1.x  |
| Fedora 36 |    `rhel-openssl-3.0.x`    |  3.0.x  |
| Fedora 37 |    `rhel-openssl-3.0.x`    |  3.0.x  |
| Fedora 38 |    `rhel-openssl-3.0.x`    |  3.0.x  |

##### Linux (Linux Mint), x86\_64[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#linux-linux-mint-x86_64 "Direct link to Linux (Linux Mint), x86_64")

|   Build OS    | Prisma engine build name | OpenSSL |
|---------------|--------------------------|---------|
| Linux Mint 18 |   `debian-openssl-1.0.x`   |  1.0.x  |
| Linux Mint 19 |   `debian-openssl-1.1.x`   |  1.1.x  |
| Linux Mint 20 |   `debian-openssl-1.1.x`   |  1.1.x  |
| Linux Mint 21 |   `debian-openssl-3.0.x`   |  3.0.x  |

##### Linux (Arch Linux), x86\_64[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#linux-arch-linux-x86_64 "Direct link to Linux (Arch Linux), x86_64")

|       Build OS        | Prisma engine build name | OpenSSL |
|-----------------------|--------------------------|---------|
| Arch Linux 2019.09.01 |   `debian-openssl-1.1.x`   |  1.1.x  |
| Arch Linux 2023.04.23 |   `debian-openssl-3.0.x`   |  3.0.x  |

##### Linux ARM64 (all major distros but Alpine)[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#linux-arm64-all-major-distros-but-alpine "Direct link to Linux ARM64 (all major distros but Alpine)")

|            Build OS            | Prisma engine build name  | OpenSSL |
|--------------------------------|---------------------------|---------|
| Linux ARM64 glibc-based distro | `linux-arm64-openssl-1.0.x` |  1.0.x  |
| Linux ARM64 glibc-based distro | `linux-arm64-openssl-1.1.x` |  1.1.x  |
| Linux ARM64 glibc-based distro | `linux-arm64-openssl-3.0.x` |  3.0.x  |

### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-1 "Direct link to Examples")

#### Specify the `prisma-client-js` generator with the default `output`, `previewFeatures`, `engineType` and `binaryTargets`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#specify-the-prisma-client-js-generator-with-the-default-output-previewfeatures-enginetype-and-binarytargets "Direct link to specify-the-prisma-client-js-generator-with-the-default-output-previewfeatures-enginetype-and-binarytargets")

```bash
generator client {  provider = "prisma-client-js"}
```

Note that the above `generator` definition is **equivalent** to the following because it uses the default values for `output`, `engineType` and `binaryTargets` (and implicitly `previewFeatures`):

```lua
generator client {  provider      = "prisma-client-js"  output        = "node_modules/.prisma/client"  engineType    = "library"  binaryTargets = ["native"]}
```

#### Specify a custom `output` location for Prisma Client[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#specify-a-custom-output-location-for-prisma-client "Direct link to specify-a-custom-output-location-for-prisma-client")

This example shows how to define a custom `output` location of the generated asset to override the default one.

```lua
generator client {  provider = "prisma-client-js"  output   = "../src/generated/client"}
```

#### Specify custom `binaryTargets` to ensure compatibility with the OS[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#specify-custom-binarytargets-to-ensure-compatibility-with-the-os "Direct link to specify-custom-binarytargets-to-ensure-compatibility-with-the-os")

This example shows how to configure Prisma Client to run on `Ubuntu 19.04 (disco)` based on the table [above](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#linux-ubuntu-x86_64).

```bash
generator client {  provider      = "prisma-client-js"  binaryTargets = ["debian-openssl-1.1.x"]}
```

#### Specify a `provider` pointing to some custom generator implementation[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#specify-a-provider-pointing-to-some-custom-generator-implementation "Direct link to specify-a-provider-pointing-to-some-custom-generator-implementation")

This example shows how to use a custom generator that's located in a directory called `my-generator`.

```bash
generator client {  provider = "./my-generator"}
```

## `model`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#model "Direct link to model")

Defines a Prisma [model](https://www.prisma.io/docs/orm/prisma-schema/data-model/models#defining-models) .

-   Every record of a model must be _uniquely_ identifiable. You must define _at least_ one of the following attributes per model:
    -   [`@unique`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#unique)
    -   [`@@unique`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#unique-1)
    -   [`@id`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#id)
    -   [`@@id`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#id-1)

#### Naming conventions[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#naming-conventions "Direct link to Naming conventions")

-   Model names must adhere to the following regular expression: `[A-Za-z][A-Za-z0-9_]*`
-   Model names must start with a letter and are typically spelled in [PascalCase](https://wiki.c2.com/?PascalCase)
-   Model names should use the singular form (for example, `User` instead of `user`, `users` or `Users`)
-   Prisma ORM has a number of **reserved words** that are being used by Prisma ORM internally and therefore cannot be used as a model name. You can find the reserved words [here](https://github.com/prisma/prisma/blob/6.5.0/packages/client/src/generation/generateClient.ts#L556-L605) and [here](https://github.com/prisma/prisma-engines/blob/main/psl/parser-database/src/names/reserved_model_names.rs#L44).

> **Note**: You can use the [`@@map` attribute](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#map-1) to map a model (for example, `User`) to a table with a different name that does not match model naming conventions (for example, `users`).

#### Order of fields[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#order-of-fields "Direct link to Order of fields")

-   In version 2.3.0 and later, introspection lists model fields in the same order as the corresponding columns in the database. Relation fields are listed after scalar fields.

### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-2 "Direct link to Examples")

#### A model named `User` with two scalar fields[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#a-model-named-user-with-two-scalar-fields "Direct link to a-model-named-user-with-two-scalar-fields")

-   Relational databases
-   MongoDB

```typescript
model User {  email String  @unique // `email` can not be optional because it's the only unique field on the model  name  String?}
```

## `model` fields[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#model-fields "Direct link to model-fields")

[Fields](https://www.prisma.io/docs/orm/prisma-schema/data-model/models#defining-fields) are properties of models.

#### Naming conventions[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#naming-conventions-1 "Direct link to Naming conventions")

-   Must start with a letter
-   Typically spelled in camelCase
-   Must adhere to the following regular expression: `[A-Za-z][A-Za-z0-9_]*`

> **Note**: You can use the [`@map` attribute](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#map) to [map a field name to a column](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/custom-model-and-field-names) with a different name that does not match field naming conventions: e.g. `myField @map("my_field")`.

## `model` field scalar types[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#model-field-scalar-types "Direct link to model-field-scalar-types")

The _data source connector_ determines what _native database type_ each of Prisma ORM scalar type maps to. Similarly, the _generator_ determines what _type in the target programming language_ each of these types map to.

Prisma models also have [model field types](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations) that define relations between models.

### `String`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#string "Direct link to string")

Variable length text.

#### Default type mappings[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#default-type-mappings "Direct link to Default type mappings")

|  Connector  | Default mapping |
|-------------|-----------------|
| PostgreSQL  |      `text`       |
| SQL Server  | `nvarchar(1000)`  |
|    MySQL    |  `varchar(191)`   |
|   MongoDB   |     `String`      |
|   SQLite    |      `TEXT`       |
| CockroachDB |     `STRING`      |

#### PostgreSQL[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#postgresql "Direct link to PostgreSQL")

| Native database type | Native database type attribute |                     Notes                      |
|----------------------|--------------------------------|------------------------------------------------|
|         `text`         |            `@db.Text`            |                                                |
|       `char(x)`        |          `@db.Char(x)`           |                                                |
|      `varchar(x)`      |         `@db.VarChar(x)`         |                                                |
|        `bit(x)`        |           `@db.Bit(x)`           |                                                |
|        `varbit`        |           `@db.VarBit`           |                                                |
|         `uuid`         |            `@db.Uuid`            |                                                |
|         `xml`          |            `@db.Xml`             |                                                |
|         `inet`         |            `@db.Inet`            |                                                |
|        `citext`        |           `@db.Citext`           | Only available if Citext extension is enabled. |

#### MySQL[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mysql "Direct link to MySQL")

| Native database type | Native database type attribute |
|----------------------|--------------------------------|
|      `VARCHAR(x)`      |         `@db.VarChar(x)`         |
|         `TEXT`         |            `@db.Text`            |
|       `CHAR(x)`        |          `@db.Char(x)`           |
|       `TINYTEXT`       |          `@db.TinyText`          |
|      `MEDIUMTEXT`      |         `@db.MediumText`         |
|       `LONGTEXT`       |          `@db.LongText`          |

You can use Prisma Migrate to map `@db.Bit(1)` to `String`:

```typescript
model Model {  /* ... */  myField String @db.Bit(1)}
```

#### MongoDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mongodb "Direct link to MongoDB")

`String`

| Native database type attribute |                                      Notes                                      |
|--------------------------------|---------------------------------------------------------------------------------|
|           `@db.String`           |                                                                                 |
|          `@db.ObjectId`          | Required if the underlying BSON type is `OBJECT_ID` (ID fields, relation scalars) |

#### Microsoft SQL Server[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#microsoft-sql-server "Direct link to Microsoft SQL Server")

| Native database type | Native database type attribute |
|----------------------|--------------------------------|
|       `char(x)`        |          `@db.Char(x)`           |
|       `nchar(x)`       |          `@db.NChar(x)`          |
|      `varchar(x)`      |         `@db.VarChar(x)`         |
|     `nvarchar(x)`      |        `@db.NVarChar(x)`         |
|         `text`         |            `@db.Text`            |
|        `ntext`         |           `@db.NText`            |
|         `xml`          |            `@db.Xml`             |
|   `uniqueidentifier`   |      `@db.UniqueIdentifier`      |

#### SQLite[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#sqlite "Direct link to SQLite")

`TEXT`

#### CockroachDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#cockroachdb "Direct link to CockroachDB")

|       Native database type       | Native database type attribute | Notes |
|----------------------------------|--------------------------------|-------|
| `STRING(x)` | `TEXT(x)` | `VARCHAR(x)` |         `@db.String(x)`          |       |
|             `CHAR(x)`              |          `@db.Char(x)`           |       |
|              `"char"`              |     `@db.CatalogSingleChar`      |       |
|              `BIT(x)`              |           `@db.Bit(x)`           |       |
|              `VARBIT`              |           `@db.VarBit`           |       |
|               `UUID`               |            `@db.Uuid`            |       |
|               `INET`               |            `@db.Inet`            |       |

Note that the `xml` and `citext` types supported in PostgreSQL are not currently supported in CockroachDB.

#### Clients[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#clients "Direct link to Clients")

### `Boolean`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#boolean "Direct link to boolean")

True or false value.

#### Default type mappings[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#default-type-mappings-1 "Direct link to Default type mappings")

|  Connector  | Default mapping |
|-------------|-----------------|
| PostgreSQL  |     `boolean`     |
| SQL Server  |       `bit`       |
|    MySQL    |   `TINYINT(1)`    |
|   MongoDB   |      `Bool`       |
|   SQLite    |     `INTEGER`     |
| CockroachDB |      `BOOL`       |

#### PostgreSQL[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#postgresql-1 "Direct link to PostgreSQL")

| Native database types | Native database type attribute | Notes |
|-----------------------|--------------------------------|-------|
|        `boolean`        |          `@db.Boolean`           |       |

#### MySQL[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mysql-1 "Direct link to MySQL")

| Native database types | Native database type attribute |                                                                    Notes                                                                    |
|-----------------------|--------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
|      `TINYINT(1)`       |         `@db.TinyInt(1)`         | `TINYINT` maps to `Int` if the max length is greater than 1 (for example, `TINYINT(2)`) _or_ the default value is anything other than `1`, `0`, or `NULL` |
|        `BIT(1)`         |            `@db.Bit`             |                                                                                                                                             |

#### MongoDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mongodb-1 "Direct link to MongoDB")

`Bool`

#### Microsoft SQL Server[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#microsoft-sql-server-1 "Direct link to Microsoft SQL Server")

| Native database types | Native database type attribute | Notes |
|-----------------------|--------------------------------|-------|
|          `bit`          |            `@db.Bit`             |       |

#### SQLite[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#sqlite-1 "Direct link to SQLite")

`INTEGER`

#### CockroachDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#cockroachdb-1 "Direct link to CockroachDB")

| Native database types | Native database type attribute | Notes |
|-----------------------|--------------------------------|-------|
|         `BOOL`          |            `@db.Bool`            |       |

#### Clients[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#clients-1 "Direct link to Clients")

### `Int`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#int "Direct link to int")

#### Default type mappings[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#default-type-mappings-2 "Direct link to Default type mappings")

|  Connector  | Default mapping |
|-------------|-----------------|
| PostgreSQL  |     `integer`     |
| SQL Server  |       `int`       |
|    MySQL    |       `INT`       |
|   MongoDB   |       `Int`       |
|   SQLite    |     `INTEGER`     |
| CockroachDB |       `INT`       |

#### PostgreSQL[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#postgresql-2 "Direct link to PostgreSQL")

| Native database types |     Native database type attribute     | Notes |
|-----------------------|----------------------------------------|-------|
|  `integer` | `int`, `int4`  |              `@db.Integer`               |       |
|    `smallint` | `int2`    |              `@db.SmallInt`              |       |
| `smallserial` | `serial2` | `@db.SmallInt @default(autoincrement())` |       |
|   `serial` | `serial4`    |   `@db.Int @default(autoincrement())`    |       |
|          `oid`          |                `@db.Oid`                 |       |

#### MySQL[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mysql-2 "Direct link to MySQL")

| Native database types | Native database type attribute |                                                                                  Notes                                                                                   |
|-----------------------|--------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|          `INT`          |            `@db.Int`             |                                                                                                                                                                          |
|     `INT UNSIGNED`      |        `@db.UnsignedInt`         |                                                                                                                                                                          |
|       `SMALLINT`        |          `@db.SmallInt`          |                                                                                                                                                                          |
|   `SMALLINT UNSIGNED`   |      `@db.UnsignedSmallInt`      |                                                                                                                                                                          |
|       `MEDIUMINT`       |         `@db.MediumInt`          |                                                                                                                                                                          |
|  `MEDIUMINT UNSIGNED`   |     `@db.UnsignedMediumInt`      |                                                                                                                                                                          |
|        `TINYINT`        |          `@db.TinyInt`           | `TINYINT` maps to `Int` if the max length is greater than 1 (for example, `TINYINT(2)`) _or_ the default value is anything other than `1`, `0`, or `NULL`. `TINYINT(1)` maps to `Boolean`. |
|   `TINYINT UNSIGNED`    |      `@db.UnsignedTinyInt`       |                                                               `TINYINT(1) UNSIGNED` maps to `Int`, not `Boolean`                                                               |
|         `YEAR`          |            `@db.Year`            |                                                                                                                                                                          |

#### MongoDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mongodb-2 "Direct link to MongoDB")

`Int`

| Native database type attribute | Notes |
|--------------------------------|-------|
|            `@db.Int`             |       |
|            `@db.Long`            |       |

#### Microsoft SQL Server[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#microsoft-sql-server-2 "Direct link to Microsoft SQL Server")

| Native database types | Native database type attribute | Notes |
|-----------------------|--------------------------------|-------|
|          `int`          |            `@db.Int`             |       |
|       `smallint`        |          `@db.SmallInt`          |       |
|        `tinyint`        |          `@db.TinyInt`           |       |
|          `bit`          |            `@db.Bit`             |       |

#### SQLite[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#sqlite-2 "Direct link to SQLite")

`INTEGER`

#### CockroachDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#cockroachdb-2 "Direct link to CockroachDB")

| Native database types |   Native database type attribute   |                                                   Notes                                                   |
|-----------------------|------------------------------------|-----------------------------------------------------------------------------------------------------------|
| `INTEGER` | `INT` | `INT8`  |              `@db.Int8`              | Note that this differs from PostgreSQL, where `integer` and `int` are aliases for `int4` and map to `@db.Integer` |
|         `INT4`          |              `@db.Int4`              |                                                                                                           |
|    `INT2` | `SMALLINT`    |              `@db.Int2`              |                                                                                                           |
| `SMALLSERIAL` | `SERIAL2` | `@db.Int2 @default(autoincrement())` |                                                                                                           |
|   `SERIAL` | `SERIAL4`    | `@db.Int4 @default(autoincrement())` |                                                                                                           |
|  `SERIAL8` | `BIGSERIAL`  | `@db.Int8 @default(autoincrement())` |                                                                                                           |

#### Clients[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#clients-2 "Direct link to Clients")

### `BigInt`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#bigint "Direct link to bigint")

`BigInt` is available in version [2.17.0](https://github.com/prisma/prisma/releases/tag/2.17.0) and later.

#### Default type mappings[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#default-type-mappings-3 "Direct link to Default type mappings")

|  Connector  | Default mapping |
|-------------|-----------------|
| PostgreSQL  |     `bigint`      |
| SQL Server  |       `int`       |
|    MySQL    |     `BIGINT`      |
|   MongoDB   |      `Long`       |
|   SQLite    |     `INTEGER`     |
| CockroachDB |     `INTEGER`     |

#### PostgreSQL[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#postgresql-3 "Direct link to PostgreSQL")

| Native database types |    Native database type attribute    | Notes |
|-----------------------|--------------------------------------|-------|
|     `bigint` | `int8`     |              `@db.BigInt`              |       |
|  `bigserial` | `serial8`  | `@db.BigInt @default(autoincrement())` |       |

#### MySQL[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mysql-3 "Direct link to MySQL")

| Native database types |        Native database type attribute        | Notes |
|-----------------------|----------------------------------------------|-------|
|        `BIGINT`         |                  `@db.BigInt`                  |       |
|        `SERIAL`         | `@db.UnsignedBigInt @default(autoincrement())` |       |

#### MongoDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mongodb-3 "Direct link to MongoDB")

`Long`

#### Microsoft SQL Server[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#microsoft-sql-server-3 "Direct link to Microsoft SQL Server")

| Native database types | Native database type attribute | Notes |
|-----------------------|--------------------------------|-------|
|        `bigint`         |           `@db.BigInt`           |       |

#### SQLite[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#sqlite-3 "Direct link to SQLite")

`INTEGER`

#### CockroachDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#cockroachdb-3 "Direct link to CockroachDB")

| Native database types |   Native database type attribute   |                                 Notes                                  |
|-----------------------|------------------------------------|------------------------------------------------------------------------|
|  `BIGINT` | `INT` | `INT8`  |              `@db.Int8`              | Note that this differs from PostgreSQL, where `int` is an alias for `int4` |
|  `bigserial` | `serial8`  | `@db.Int8 @default(autoincrement())` |                                                                        |

#### Clients[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#clients-3 "Direct link to Clients")

### `Float`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#float "Direct link to float")

Floating point number.

> `Float` maps to `Double` in [2.17.0](https://github.com/prisma/prisma/releases/tag/2.17.0) and later - see [release notes](https://github.com/prisma/prisma/releases/tag/2.17.0) and [Video: Changes to the default mapping of Float in Prisma ORM 2.17.0](https://www.youtube.com/watch?v=OsuGP_xNHco&amp%3Bab_channel=Prisma) for more information about this change.

#### Default type mappings[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#default-type-mappings-4 "Direct link to Default type mappings")

|  Connector  | Default mapping  |
|-------------|------------------|
| PostgreSQL  | `double precision` |
| SQL Server  |    `float(53)`     |
|    MySQL    |      `DOUBLE`      |
|   MongoDB   |      `Double`      |
|   SQLite    |       `REAL`       |
| CockroachDB | `DOUBLE PRECISION` |

#### PostgreSQL[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#postgresql-4 "Direct link to PostgreSQL")

| Native database types | Native database type attribute | Notes |
|-----------------------|--------------------------------|-------|
|   `double precision`    |      `@db.DoublePrecision`       |       |
|         `real`          |            `@db.Real`            |       |

#### MySQL[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mysql-4 "Direct link to MySQL")

| Native database types | Native database type attribute | Notes |
|-----------------------|--------------------------------|-------|
|         `FLOAT`         |           `@db.Float`            |       |
|        `DOUBLE`         |           `@db.Double`           |       |

#### MongoDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mongodb-4 "Direct link to MongoDB")

`Double`

#### Microsoft SQL Server[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#microsoft-sql-server-4 "Direct link to Microsoft SQL Server")

| Native database types | Native database type attribute |
|-----------------------|--------------------------------|
|         `float`         |           `@db.Float`            |
|         `money`         |           `@db.Money`            |
|      `smallmoney`       |         `@db.SmallMoney`         |
|         `real`          |            `@db.Real`            |

#### SQLite connector[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#sqlite-connector "Direct link to SQLite connector")

`REAL`

#### CockroachDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#cockroachdb-4 "Direct link to CockroachDB")

|   Native database types   | Native database type attribute | Notes |
|---------------------------|--------------------------------|-------|
| `DOUBLE PRECISION` | `FLOAT8` |           `@db.Float8`           |       |
|   `REAL` | `FLOAT4` | `FLOAT`   |           `@db.Float4`           |       |

#### Clients[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#clients-4 "Direct link to Clients")

### `Decimal`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#decimal "Direct link to decimal")

#### Default type mappings[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#default-type-mappings-5 "Direct link to Default type mappings")

|  Connector  | Default mapping |
|-------------|-----------------|
| PostgreSQL  | `decimal(65,30)`  |
| SQL Server  | `decimal(32,16)`  |
|    MySQL    | `DECIMAL(65,30)`  |
|   MongoDB   |  Not supported  |
|   SQLite    |     `DECIMAL`     |
| CockroachDB |     `DECIMAL`     |

#### PostgreSQL[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#postgresql-5 "Direct link to PostgreSQL")

| Native database types | Native database type attribute | Notes |
|-----------------------|--------------------------------|-------|
|   `decimal` | `numeric`   |       `@db.Decimal(p, s)`†       |       |
|         `money`         |           `@db.Money`            |       |

-   † `p` (precision), the maximum total number of decimal digits to be stored. `s` (scale), the number of decimal digits that are stored to the right of the decimal point.

#### MySQL[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mysql-5 "Direct link to MySQL")

| Native database types | Native database type attribute | Notes |
|-----------------------|--------------------------------|-------|
|   `DECIMAL` | `NUMERIC`   |       `@db.Decimal(p, s)`†       |       |

-   † `p` (precision), the maximum total number of decimal digits to be stored. `s` (scale), the number of decimal digits that are stored to the right of the decimal point.

#### MongoDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mongodb-5 "Direct link to MongoDB")

[Not supported](https://github.com/prisma/prisma/issues/12637).

#### Microsoft SQL Server[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#microsoft-sql-server-5 "Direct link to Microsoft SQL Server")

| Native database types | Native database type attribute | Notes |
|-----------------------|--------------------------------|-------|
|   `decimal` | `numeric`   |       `@db.Decimal(p, s)`†       |       |

-   † `p` (precision), the maximum total number of decimal digits to be stored. `s` (scale), the number of decimal digits that are stored to the right of the decimal point.

#### SQLite[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#sqlite-4 "Direct link to SQLite")

`DECIMAL` (changed from `REAL` in 2.17.0)

#### CockroachDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#cockroachdb-5 "Direct link to CockroachDB")

|  Native database types  | Native database type attribute |                            Notes                            |
|-------------------------|--------------------------------|-------------------------------------------------------------|
| `DECIMAL` | `DEC` | `NUMERIC` |       `@db.Decimal(p, s)`†       |                                                             |
|          `money`          |            Not yet             | PostgreSQL's `money` type is not yet supported by CockroachDB |

-   † `p` (precision), the maximum total number of decimal digits to be stored. `s` (scale), the number of decimal digits that are stored to the right of the decimal point.

#### Clients[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#clients-5 "Direct link to Clients")

### `DateTime`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#datetime "Direct link to datetime")

-   Prisma Client returns all `DateTime` as native [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) objects.
-   Currently, Prisma ORM [does not support](https://github.com/prisma/prisma/issues/5006) [zero dates](https://dev.mysql.com/doc/refman/8.3/en/date-and-time-types.html#:~:text=The%20following%20table%20shows%20the%20format%20of%20the%20%E2%80%9Czero%E2%80%9D%20value%20for%20each%20type) (`0000-00-00 00:00:00`, `0000-00-00`, `00:00:00`) in MySQL.
-   There currently is a [bug](https://github.com/prisma/prisma/issues/9516) that doesn't allow you to pass in `DateTime` values as strings and produces a runtime error when you do. `DateTime` values need to be passed as [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) objects (i.e. `new Date('2024-12-04')` instead of `'2024-12-04'`).

You can find more info and examples in this section: [Working with `DateTime`](https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types#working-with-datetime).

#### Default type mappings[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#default-type-mappings-6 "Direct link to Default type mappings")

|  Connector  | Default mapping |
|-------------|-----------------|
| PostgreSQL  |  `timestamp(3)`   |
| SQL Server  |    `datetime2`    |
|    MySQL    |   `DATETIME(3)`   |
|   MongoDB   |    `Timestamp`    |
|   SQLite    |     `NUMERIC`     |
| CockroachDB |    `TIMESTAMP`    |

#### PostgreSQL[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#postgresql-6 "Direct link to PostgreSQL")

| Native database types | Native database type attribute | Notes |
|-----------------------|--------------------------------|-------|
|     `timestamp(x)`      |        `@db.Timestamp(x)`        |       |
|    `timestamptz(x)`     |       `@db.Timestamptz(x)`       |       |
|         `date`          |            `@db.Date`            |       |
|        `time(x)`        |          `@db.Time(x)`           |       |
|       `timetz(x)`       |         `@db.Timetz(x)`          |       |

#### MySQL[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mysql-6 "Direct link to MySQL")

| Native database types | Native database type attribute | Notes |
|-----------------------|--------------------------------|-------|
|      `DATETIME(x)`      |        `@db.DateTime(x)`         |       |
|        `DATE(x)`        |          `@db.Date(x)`           |       |
|        `TIME(x)`        |          `@db.Time(x)`           |       |
|     `TIMESTAMP(x)`      |        `@db.Timestamp(x)`        |       |

You can also use MySQL's `YEAR` type with `Int`:

#### MongoDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mongodb-6 "Direct link to MongoDB")

`Timestamp`

#### Microsoft SQL Server[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#microsoft-sql-server-6 "Direct link to Microsoft SQL Server")

| Native database types | Native database type attribute | Notes |
|-----------------------|--------------------------------|-------|
|         `date`          |            `@db.Date`            |       |
|         `time`          |            `@db.Time`            |       |
|       `datetime`        |          `@db.DateTime`          |       |
|       `datetime2`       |         `@db.DateTime2`          |       |
|     `smalldatetime`     |       `@db.SmallDateTime`        |       |
|    `datetimeoffset`     |       `@db.DateTimeOffset`       |       |

#### SQLite[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#sqlite-5 "Direct link to SQLite")

`NUMERIC` or `STRING`. If the underlying data type is `STRING`, you must use one of the following formats:

-   [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) (`1996-12-19T16:39:57-08:00`)
-   [RFC 2822](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3) (`Tue, 1 Jul 2003 10:52:37 +0200`)

#### CockroachDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#cockroachdb-6 "Direct link to CockroachDB")

| Native database types | Native database type attribute | Notes |
|-----------------------|--------------------------------|-------|
|     `TIMESTAMP(x)`      |        `@db.Timestamp(x)`        |       |
|    `TIMESTAMPTZ(x)`     |       `@db.Timestamptz(x)`       |       |
|         `DATE`          |            `@db.Date`            |       |
|        `TIME(x)`        |          `@db.Time(x)`           |       |
|       `TIMETZ(x)`       |         `@db.Timetz(x)`          |       |

#### Clients[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#clients-6 "Direct link to Clients")

### `Json`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#json "Direct link to json")

A JSON object.

#### Default type mappings[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#default-type-mappings-7 "Direct link to Default type mappings")

#### PostgreSQL[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#postgresql-7 "Direct link to PostgreSQL")

| Native database types | Native database type attribute | Notes |
|-----------------------|--------------------------------|-------|
|         `json`          |            `@db.Json`            |       |
|         `jsonb`         |           `@db.JsonB`            |       |

#### MySQL[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mysql-7 "Direct link to MySQL")

| Native database types | Native database type attribute | Notes |
|-----------------------|--------------------------------|-------|
|         `JSON`          |            `@db.Json`            |       |

#### MongoDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mongodb-7 "Direct link to MongoDB")

[A valid `BSON` object (Relaxed mode)](https://www.mongodb.com/docs/manual/reference/mongodb-extended-json/)

#### Microsoft SQL Server[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#microsoft-sql-server-7 "Direct link to Microsoft SQL Server")

Microsoft SQL Server does not have a specific data type for JSON. However, there are a number of [built-in functions for reading and modifying JSON](https://learn.microsoft.com/en-us/sql/relational-databases/json/json-data-sql-server?view=sql-server-ver15#extract-values-from-json-text-and-use-them-in-queries).

#### SQLite[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#sqlite-6 "Direct link to SQLite")

Not supported

#### CockroachDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#cockroachdb-7 "Direct link to CockroachDB")

| Native database types | Native database type attribute | Notes |
|-----------------------|--------------------------------|-------|
|     `JSON` | `JSONB`      |           `@db.JsonB`            |       |

#### Clients[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#clients-7 "Direct link to Clients")

### `Bytes`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#bytes "Direct link to bytes")

`Bytes` is available in version [2.17.0](https://github.com/prisma/prisma/releases/tag/2.17.0) and later.

#### Default type mappings[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#default-type-mappings-8 "Direct link to Default type mappings")

|  Connector  | Default mapping |
|-------------|-----------------|
| PostgreSQL  |      `bytea`      |
| SQL Server  |    `varbinary`    |
|    MySQL    |    `LONGBLOB`     |
|   MongoDB   |     `BinData`     |
|   SQLite    |      `BLOB`       |
| CockroachDB |      `BYTES`      |

#### PostgreSQL[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#postgresql-8 "Direct link to PostgreSQL")

| Native database types | Native database type attribute |
|-----------------------|--------------------------------|
|         `bytea`         |           `@db.ByteA`            |

#### MySQL[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mysql-8 "Direct link to MySQL")

| Native database types | Native database type attribute | Notes |
|-----------------------|--------------------------------|-------|
|       `LONGBLOB`        |          `@db.LongBlob`          |       |
|        `BINARY`         |           `@db.Binary`           |       |
|       `VARBINARY`       |         `@db.VarBinary`          |       |
|       `TINYBLOB`        |          `@db.TinyBlob`          |       |
|         `BLOB`          |            `@db.Blob`            |       |
|      `MEDIUMBLOB`       |         `@db.MediumBlob`         |       |
|          `BIT`          |            `@db.Bit`             |       |

#### MongoDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mongodb-8 "Direct link to MongoDB")

`BinData`

| Native database type attribute |                                      Notes                                      |
|--------------------------------|---------------------------------------------------------------------------------|
|          `@db.ObjectId`          | Required if the underlying BSON type is `OBJECT_ID` (ID fields, relation scalars) |
|          `@db.BinData`           |                                                                                 |

#### Microsoft SQL Server[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#microsoft-sql-server-8 "Direct link to Microsoft SQL Server")

| Native database types | Native database type attribute | Notes |
|-----------------------|--------------------------------|-------|
|        `binary`         |           `@db.Binary`           |       |
|       `varbinary`       |         `@db.VarBinary`          |       |
|         `image`         |           `@db.Image`            |       |

#### SQLite[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#sqlite-7 "Direct link to SQLite")

`BLOB`

#### CockroachDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#cockroachdb-8 "Direct link to CockroachDB")

| Native database types | Native database type attribute |
|-----------------------|--------------------------------|
| `BYTES` | `BYTEA` | `BLOB`  |           `@db.Bytes`            |

#### Clients[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#clients-8 "Direct link to Clients")

### `Unsupported`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#unsupported "Direct link to unsupported")

warning

**Not supported by MongoDB**  
The [MongoDB connector](https://www.prisma.io/docs/orm/overview/databases/mongodb) does not support the `Unsupported` type.

The `Unsupported` type was introduced in [2.17.0](https://github.com/prisma/prisma/releases/tag/2.17.0) and allows you to represent data types in the Prisma schema that are not supported by Prisma Client. Fields of type `Unsupported` can be created during Introspection with `prisma db pull` or written by hand, and created in the database with Prisma Migrate or `db push`.

-   Fields with `Unsupported` types are not available in the generated client.
    
-   If a model contains a **required** `Unsupported` type, `prisma.model.create(..)`, `prisma.model.update(...)` and `prisma.model.upsert(...)` are not available in Prisma Client.
    
-   When you introspect a database that contains unsupported types, Prisma ORM will provide the following warning:
    
    ```kotlin
    *** WARNING ***These fields are not supported by Prisma Client, because Prisma does not currently support their types.* Model "Post", field: "circle", original data type: "circle"
    ```
    

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-3 "Direct link to Examples")

```java
model Star {  id       Int                    @id @default(autoincrement())  position Unsupported("circle")?  example1 Unsupported("circle")  circle   Unsupported("circle")? @default(dbgenerated("'<(10,4),11>'::circle"))}
```

## `model` field type modifiers[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#model-field-type-modifiers "Direct link to model-field-type-modifiers")

### `[]` modifier[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#-modifier "Direct link to -modifier")

Makes a field a list.

-   Cannot be optional (for example `Post[]?`).

##### Relational databases[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#relational-databases "Direct link to Relational databases")

-   Scalar lists (arrays) are only supported in the data model if your database natively supports them. Currently, scalar lists are therefore only supported when using PostgreSQL or CockroachDB (since MySQL and SQLite don't natively support scalar lists).

##### MongoDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mongodb-9 "Direct link to MongoDB")

-   Scalar lists are supported

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-4 "Direct link to Examples")

##### Define a scalar list[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#define-a-scalar-list "Direct link to Define a scalar list")

-   Relational databases
-   MongoDB

```kotlin
model User {  id             Int      @id @default(autoincrement())  favoriteColors String[]}
```

##### Define a scalar list with a default value[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#define-a-scalar-list-with-a-default-value "Direct link to Define a scalar list with a default value")

Available in version 4.0.0 and later.

-   Relational databases
-   MongoDB

```kotlin
model User {  id             Int      @id @default(autoincrement())  favoriteColors String[] @default(["red", "blue", "green"])}
```

### `?` modifier[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#-modifier-1 "Direct link to -modifier-1")

Makes a field optional.

-   Cannot be used with a list field (for example, `Posts[]`)

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-5 "Direct link to Examples")

##### Optional `name` field[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#optional-name-field "Direct link to optional-name-field")

```kotlin
model User {  id   Int     @id @default(autoincrement())  name String?}
```

## Attributes[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#attributes "Direct link to Attributes")

Attributes modify the behavior of a [field](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#model-fields) or block (e.g. [models](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#model)). There are two ways to add attributes to your data model:

-   _Field_ attributes are prefixed with `@`
-   _Block_ attributes are prefixed with `@@`

Some attributes take arguments. Arguments in attributes are always named, but in most cases the argument _name_ can be omitted.

> **Note**: The leading underscore in a signature means the _argument name_ can be omitted.

### `@id`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#id "Direct link to id")

Defines a single-field ID on the model.

##### General[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#general "Direct link to General")

-   Cannot be defined on a relation field
-   Cannot be optional

##### Relational databases[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#relational-databases-1 "Direct link to Relational databases")

-   Corresponding database construct: `PRIMARY KEY`
    
-   Can be annotated with a [`@default`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#default) attribute that uses [functions](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#attribute-functions) to auto-generate an ID:
    
    -   [`autoincrement()`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#autoincrement)
    -   [`cuid()`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#cuid)
    -   [`uuid()`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#uuid)
    -   [`ulid()`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#ulid)
-   Can be defined on any scalar field (`String`, `Int`, `enum`)
    

##### MongoDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mongodb-10 "Direct link to MongoDB")

-   Corresponding database construct: [Any valid BSON type, except arrays](https://www.mongodb.com/docs/manual/core/document/#the-_id-field)
    
-   Every model must define an `@id` field
    
-   The [underlying ID field name is always `_id`](https://www.mongodb.com/docs/manual/core/document/#the-_id-field), and must be mapped with `@map("_id")`
    
-   Can be defined on any scalar field (`String`, `Int`, `enum`) unless you want to use `ObjectId` in your database
    
-   To use an [`ObjectId`](https://www.mongodb.com/docs/manual/reference/method/ObjectId/) as your ID, you must:
    
    -   Use the `String` or `Bytes` field type
        
    -   Annotate your field with `@db.ObjectId`:
        
        ```kotlin
        id   String  @db.ObjectId  @map("_id")
        ```
        
    -   Optionally, annotate your field with a [`@default`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#default) attribute that uses [the `auto()` function](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#auto) to auto-generate an `ObjectId`
        
        ```kotlin
        id   String  @db.ObjectId  @map("_id") @default(auto())
        ```
        
-   [`cuid()`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#cuid), [`uuid()`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#uuid) and [`ulid()`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#ulid) are supported but do not generate a valid `ObjectId` - use `auto()` instead for `@id`
    
-   `autoincrement()` is **not supported**
    

#### Arguments[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#arguments "Direct link to Arguments")

|   Name    | Required |  Type   |                                                                                                                   Description                                                                                                                    |
|-----------|----------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    `map`    |    **No**    | `String`  | The name of the underlying primary key constraint in the database.

Not supported for MySQL or MongoDB. |
|  `length`   |    **No**    | `number`  | Allows you to specify a maximum length for the subpart of the value to be indexed.

MySQL only. In preview in versions 3.5.0 and later, and in general availability in versions 4.0.0 and later. |
|   `sort`    |    **No**    | `String`  | Allows you to specify in what order the entries of the ID are stored in the database. The available options are `Asc` and `Desc`.

SQL Server only. In preview in versions 3.5.0 and later, and in general availability in versions 4.0.0 and later. |
| `clustered` |    **No**    | `Boolean` | Defines whether the ID is clustered or non-clustered. Defaults to `true`.

SQL Server only. In preview in versions 3.13.0 and later, and in general availability in versions 4.0.0 and later. |

#### Signature[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#signature "Direct link to Signature")

```less
@id(map: String?, length: number?, sort: String?, clustered: Boolean?)
```

> **Note**: Before version 4.0.0, or 3.5.0 with the `extendedIndexes` Preview feature enabled, the signature was:

> **Note**: Before version 3.0.0, the signature was:

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-6 "Direct link to Examples")

In most cases, you want your database to create the ID. To do this, annotate the ID field with the `@default` attribute and initialize the field with a [function](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#attribute-functions).

##### Generate autoincrementing integers as IDs (Relational databases only)[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#generate-autoincrementing-integers-as-ids-relational-databases-only "Direct link to Generate autoincrementing integers as IDs (Relational databases only)")

```kotlin
model User {  id   Int    @id @default(autoincrement())  name String}
```

##### Generate `ObjectId` as IDs (MongoDB only)[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#generate-objectid-as-ids-mongodb-only "Direct link to generate-objectid-as-ids-mongodb-only")

```kotlin
model User {  id   String @id @default(auto()) @map("_id") @db.ObjectId  name String}
```

##### Generate `cuid()` values as IDs[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#generate-cuid-values-as-ids "Direct link to generate-cuid-values-as-ids")

-   Relational databases
-   MongoDB

```java
model User {  id   String @id @default(cuid())  name String}
```

##### Generate `uuid()` values as IDs[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#generate-uuid-values-as-ids "Direct link to generate-uuid-values-as-ids")

-   Relational databases
-   MongoDB

```java
model User {  id   String @id @default(uuid())  name String}
```

##### Generate `ulid()` values as IDs[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#generate-ulid-values-as-ids "Direct link to generate-ulid-values-as-ids")

-   Relational databases
-   MongoDB

```java
model User {  id   String @id @default(ulid())  name String}
```

##### Single-field IDs _without_ default values[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#single-field-ids-without-default-values "Direct link to single-field-ids-without-default-values")

In the following example, `id` does not have a default value:

-   Relational databases
-   MongoDB

```typescript
model User {  id   String @id  name String}
```

Note that in the above case, you _must_ provide your own ID values when creating new records for the `User` model using Prisma Client, e.g.:

```php
const newUser = await prisma.user.create({  data: {    id: 1,    name: "Alice",  },});
```

###### Specify an ID on relation scalar field without a default value[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#specify-an-id-on-relation-scalar-field-without-a-default-value "Direct link to Specify an ID on relation scalar field without a default value")

In the following example, `authorId` is a both a relation scalar and the ID of `Profile`:

-   Relational databases
-   MongoDB

```kotlin
model Profile {  authorId Int    @id  author   User   @relation(fields: [authorId], references: [id])  bio      String}model User {  id      Int      @id  email   String   @unique  name    String?  profile Profile?}
```

In this scenario, you cannot create a `Profile` only - you must use Prisma Client's [nested writes](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries#nested-writes) create a `User` **or** connect the profile to an existing user.

The following example creates a user and a profile:

```php
const userWithProfile = await prisma.user.create({  data: {    id: 3,    email: "bob@prisma.io",    name: "Bob Prismo",    profile: {      create: {        bio: "Hello, I'm Bob Prismo and I love apples, blue nail varnish, and the sound of buzzing mosquitoes.",      },    },  },});
```

The following example connects a new profile to a user:

```php
const profileWithUser = await prisma.profile.create({  data: {    bio: "Hello, I'm Bob and I like nothing at all. Just nothing.",    author: {      connect: {        id: 22,      },    },  },});
```

### `@@id`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#id-1 "Direct link to id-1")

warning

**Not supported by MongoDB**  
The [MongoDB connector](https://www.prisma.io/docs/orm/overview/databases/mongodb) does not support composite IDs.

Defines a multi-field ID (composite ID) on the model.

-   Corresponding database type: `PRIMARY KEY`
-   Can be annotated with a [`@default`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#default) attribute that uses [functions](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#attribute-functions) to auto-generate an ID
-   Cannot be optional
-   Can be defined on any scalar field (`String`, `Int`, `enum`)
-   Cannot be defined on a relation field
-   The name of the composite ID field in Prisma Client has the following pattern: `field1_field2_field3`

#### Arguments[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#arguments-1 "Direct link to Arguments")

|   Name    | Required |       Type       |                                                                                                                   Description                                                                                                                    |
|-----------|----------|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|  `fields`   |   **Yes**    | `FieldReference[]` |                                                                                          A list of field names - for example, `["firstname", "lastname"]`                                                                                          |
|   `name`    |    **No**    |      `String`      |                                                 The name that Prisma Client will expose for the argument covering all fields, e.g. `fullName` in `fullName: { firstName: "First", lastName: "Last"}`                                                 |
|    `map`    |    **No**    |      `String`      | The name of the underlying primary key constraint in the database.

Not supported for MySQL. |
|  `length`   |    **No**    |      `number`      | Allows you to specify a maximum length for the subpart of the value to be indexed.

MySQL only. In preview in versions 3.5.0 and later, and in general availability in versions 4.0.0 and later. |
|   `sort`    |    **No**    |      `String`      | Allows you to specify in what order the entries of the ID are stored in the database. The available options are `Asc` and `Desc`.

SQL Server only. In preview in versions 3.5.0 and later, and in general availability in versions 4.0.0 and later. |
| `clustered` |    **No**    |     `Boolean`      | Defines whether the ID is clustered or non-clustered. Defaults to `true`.

SQL Server only. In preview in versions 3.13.0 and later, and in general availability in versions 4.0.0 and later. |

The name of the `fields` argument on the `@@id` attribute can be omitted:

```less
@@id(fields: [title, author])@@id([title, author])
```

#### Signature[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#signature-1 "Direct link to Signature")

```css
@@id(_ fields: FieldReference[], name: String?, map: String?)
```

> **Note**: Until version 3.0.0, the signature was:
> 
> ```css
> @@id(_ fields: FieldReference[])
> ```

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-7 "Direct link to Examples")

##### Specify a multi-field ID on two `String` fields (Relational databases only)[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#specify-a-multi-field-id-on-two-string-fields-relational-databases-only "Direct link to specify-a-multi-field-id-on-two-string-fields-relational-databases-only")

```typescript
model User {  firstName String  lastName  String  email     String  @unique  isAdmin   Boolean @default(false)  @@id([firstName, lastName])}
```

When you create a user, you must provide a unique combination of `firstName` and `lastName`:

```php
const user = await prisma.user.create({  data: {    firstName: "Alice",    lastName: "Smith",  },});
```

To retrieve a user, use the generated composite ID field (`firstName_lastName`):

```php
const user = await prisma.user.findUnique({  where: {    firstName_lastName: {      firstName: "Alice",      lastName: "Smith",    },  },});
```

##### Specify a multi-field ID on two `String` fields and one `Boolean` field (Relational databases only)[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#specify-a-multi-field-id-on-two-string-fields-and-one-boolean-field-relational-databases-only "Direct link to specify-a-multi-field-id-on-two-string-fields-and-one-boolean-field-relational-databases-only")

```typescript
model User {  firstName String  lastName  String  email     String  @unique  isAdmin   Boolean @default(false)  @@id([firstName, lastName, isAdmin])}
```

When creating new `User` records, you now must provide a unique combination of values for `firstName`, `lastName` and `isAdmin`:

```php
const user = await prisma.user.create({  data: {    firstName: "Alice",    lastName: "Smith",    isAdmin: true,  },});
```

##### Specify a multi-field ID that includes a relation field (Relational databases only)[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#specify-a-multi-field-id-that-includes-a-relation-field-relational-databases-only "Direct link to Specify a multi-field ID that includes a relation field (Relational databases only)")

```kotlin
model Post {  title     String  published Boolean @default(false)  author    User    @relation(fields: [authorId], references: [id])  authorId  Int  @@id([authorId, title])}model User {  id    Int     @default(autoincrement())  email String  @unique  name  String?  posts Post[]}
```

When creating new `Post` records, you now must provide a unique combination of values for `authorId` (foreign key) and `title`:

```php
const post = await prisma.post.create({  data: {    title: "Hello World",    author: {      connect: {        email: "alice@prisma.io",      },    },  },});
```

### `@default`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#default "Direct link to default")

Defines a [default value for a field](https://www.prisma.io/docs/orm/prisma-schema/data-model/models#defining-a-default-value).

-   Default values that cannot yet be represented in the Prisma schema are represented by the [`dbgenerated()` function](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#dbgenerated) when you use [introspection](https://www.prisma.io/docs/orm/prisma-schema/introspection).
-   Default values are not allowed on relation fields in the Prisma schema. Note however that you can still define default values on the fields backing a relation (the ones listed in the `fields` argument in the `@relation` attribute). A default value on the field backing a relation will mean that relation is populated automatically for you.
-   Default values can be used with [scalar lists](https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/working-with-scalar-lists-arrays) in databases that natively support them.

##### Relational databases[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#relational-databases-2 "Direct link to Relational databases")

-   Corresponding database construct: `DEFAULT`
-   Default values can be a static value (`4`, `"hello"`) or one of the following [functions](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#attribute-functions):
    -   [`autoincrement()`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#autoincrement)
    -   [`sequence()`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#sequence) (CockroachDB only)
    -   [`dbgenerated(...)`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#dbgenerated)
    -   [`cuid()`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#cuid)
    -   [`cuid(2)`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#cuid)
    -   [`uuid()`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#uuid)
    -   [`uuid(4)`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#uuid)
    -   [`uuid(7)`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#uuid)
    -   [`ulid()`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#ulid)
    -   [`nanoid()`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#nanoid)
    -   [`now()`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#now)
-   Default values that cannot yet be represented in the Prisma schema are represented by the [`dbgenerated(...)` function](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#dbgenerated) when you use [introspection](https://www.prisma.io/docs/orm/prisma-schema/introspection).
-   Default values are not allowed on relation fields in the Prisma schema. Note however that you can still define default values on the fields backing a relation (the ones listed in the `fields` argument in the `@relation` attribute). A default value on the field backing a relation will mean that relation is populated automatically for you.
-   Default values can be used with [scalar lists](https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/working-with-scalar-lists-arrays) in databases that natively support them.
-   JSON data. Note that JSON needs to be enclosed with double-quotes inside the `@default` attribute, e.g.: `@default("[]")`. If you want to provide a JSON object, you need to enclose it with double-quotes and then escape any internal double quotes using a backslash, e.g.: `@default("{ \"hello\": \"world\" }")`.

##### MongoDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mongodb-11 "Direct link to MongoDB")

-   Default values can be a static value (`4`, `"hello"`) or one of the following [functions](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#attribute-functions):
    -   [`auto()`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#auto) (can only be used with `@db.ObjectId` to generate an `ObjectId` in MongoDB)
    -   [`cuid()`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#cuid)
    -   [`uuid()`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#uuid)
    -   [`ulid()`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#ulid)
    -   [`now()`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#now)

#### Arguments[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#arguments-2 "Direct link to Arguments")

| Name  | Required |                Type                 |   Description    |
|-------|----------|-------------------------------------|------------------|
| `value` |   **Yes**    | An expression (e.g. `5`, `true`, `now()`) |                  |
|  `map`  |    **No**    |               String                | **SQL Server only.** |

The name of the `value` argument on the `@default` attribute can be omitted:

```kotlin
id Int @id @default(value: autoincrement())id Int @id @default(autoincrement())
```

#### Signature[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#signature-2 "Direct link to Signature")

```css
@default(_ value: Expression, map: String?)
```

> **Note**: Until version 3.0.0, the signature was:
> 
> ```css
> @default(_ value: Expression)
> ```

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-8 "Direct link to Examples")

##### Default value for an `Int`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#default-value-for-an-int "Direct link to default-value-for-an-int")

-   Relational databases
-   MongoDB

```kotlin
model User {  email        String @unique  profileViews Int    @default(0)}
```

##### Default value for a `Float`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#default-value-for-a-float "Direct link to default-value-for-a-float")

-   Relational databases
-   MongoDB

```kotlin
model User {  email  String @unique  number Float  @default(1.1)}
```

##### Default value for `Decimal`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#default-value-for-decimal "Direct link to default-value-for-decimal")

-   Relational databases
-   MongoDB

```typescript
model User {  email  String  @unique  number Decimal @default(22.99)}
```

##### Default value for `BigInt`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#default-value-for-bigint "Direct link to default-value-for-bigint")

-   Relational databases
-   MongoDB

```typescript
model User {  email  String @unique  number BigInt @default(34534535435353)}
```

##### Default value for a `String`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#default-value-for-a-string "Direct link to default-value-for-a-string")

-   Relational databases
-   MongoDB

```typescript
model User {  email String @unique  name  String @default("")}
```

##### Default value for a `Boolean`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#default-value-for-a-boolean "Direct link to default-value-for-a-boolean")

-   Relational databases
-   MongoDB

```typescript
model User {  email   String  @unique  isAdmin Boolean @default(false)}
```

##### Default value for a `DateTime`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#default-value-for-a-datetime "Direct link to default-value-for-a-datetime")

Note that static default values for `DateTime` are based on the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) standard.

-   Relational databases
-   MongoDB

```kotlin
model User {  email String   @unique  data  DateTime @default("2020-03-19T14:21:00+02:00")}
```

##### Default value for a `Bytes`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#default-value-for-a-bytes "Direct link to default-value-for-a-bytes")

-   Relational databases
-   MongoDB

```kotlin
model User {  email  String @unique  secret Bytes  @default("SGVsbG8gd29ybGQ=")}
```

##### Default value for an `enum`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#default-value-for-an-enum "Direct link to default-value-for-an-enum")

-   Relational databases
-   MongoDB

```kotlin
model User {  id      Int      @id @default(autoincrement())  email   String   @unique  name    String?  role    Role     @default(USER)  posts   Post[]  profile Profile?}
```

##### Default values for scalar lists[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#default-values-for-scalar-lists "Direct link to Default values for scalar lists")

-   Relational databases
-   MongoDB

```kotlin
model User {  id             Int      @id @default(autoincrement())  posts          Post[]  favoriteColors String[] @default(["red", "yellow", "purple"])  roles          Role[]   @default([USER, DEVELOPER])}enum Role {  USER  DEVELOPER  ADMIN}
```

### `@unique`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#unique "Direct link to unique")

Defines a unique constraint for this field.

##### General[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#general-1 "Direct link to General")

-   A field annotated with `@unique` can be optional or required
-   A field annotated with `@unique` _must_ be required if it represents the only unique constraint on a model without an `@id` / `@@id`
-   A model can have any number of unique constraints
-   Can be defined on any scalar field
-   **Cannot** be defined on a relation field

##### Relational databases[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#relational-databases-3 "Direct link to Relational databases")

-   Corresponding database construct: `UNIQUE`
-   `NULL` values are considered to be distinct (multiple rows with `NULL` values in the same column are allowed)
-   Adding a unique constraint automatically adds a corresponding _unique index_ to the specified column(s).

##### MongoDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mongodb-12 "Direct link to MongoDB")

-   Enforced by a [unique index in MongoDB](https://www.mongodb.com/docs/manual/core/index-unique/)

#### Arguments[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#arguments-3 "Direct link to Arguments")

|   Name    | Required |  Type   |                                                                                                               Description                                                                                                               |
|-----------|----------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    `map`    |    **No**    | `String`  |                                                                                                                                                                                                                                         |
|  `length`   |    **No**    | `number`  | Allows you to specify a maximum length for the subpart of the value to be indexed.

MySQL only. In preview in versions 3.5.0 and later, and in general availability in versions 4.0.0 and later. |
|   `sort`    |    **No**    | `String`  | Allows you to specify in what order the entries of the constraint are stored in the database. The available options are `Asc` and `Desc`.

In preview in versions 3.5.0 and later, and in general availability in versions 4.0.0 and later. |
| `clustered` |    **No**    | `Boolean` | Defines whether the constraint is clustered or non-clustered. Defaults to `false`.

SQL Server only. In preview in versions 3.13.0 and later, and in general availability in versions 4.0.0 and later. |

-   ¹ Can be required by some of the index and field types.

#### Signature[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#signature-3 "Direct link to Signature")

```less
@unique(map: String?, length: number?, sort: String?)
```

> **Note**: Before version 4.0.0, or 3.5.0 with the `extendedIndexes` Preview feature enabled, the signature was:

> **Note**: Before version 3.0.0, the signature was:

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-9 "Direct link to Examples")

##### Specify a unique attribute on a required `String` field[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#specify-a-unique-attribute-on-a-required-string-field "Direct link to specify-a-unique-attribute-on-a-required-string-field")

-   Relational databases
-   MongoDB

```typescript
model User {  email String @unique  name  String}
```

##### Specify a unique attribute on an optional `String` field[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#specify-a-unique-attribute-on-an-optional-string-field "Direct link to specify-a-unique-attribute-on-an-optional-string-field")

-   Relational databases
-   MongoDB

```kotlin
model User {  id    Int     @id @default(autoincrement())  email String? @unique  name  String}
```

-   Relational databases
-   MongoDB

```kotlin
model Post {  author    User    @relation(fields: [authorId], references: [id])  authorId  Int     @unique  title     String  published Boolean @default(false)}model User {  id    Int     @id @default(autoincrement())  email String? @unique  name  String  Post  Post[]}
```

##### Specify a unique attribute with `cuid()` values as default values[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#specify-a-unique-attribute-with-cuid-values-as-default-values "Direct link to specify-a-unique-attribute-with-cuid-values-as-default-values")

-   Relational databases
-   MongoDB

```java
model User {  token String @unique @default(cuid())  name  String}
```

### `@@unique`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#unique-1 "Direct link to unique-1")

Defines a compound [unique constraint](https://www.prisma.io/docs/orm/prisma-schema/data-model/models#defining-a-unique-field) for the specified fields.

##### General[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#general-2 "Direct link to General")

-   All fields that make up the unique constraint **must** be mandatory fields. The following model is **not** valid because `id` could be `null`:
    
    ```kotlin
    model User {  firstname Int  lastname  Int  id        Int?  @@unique([firstname, lastname, id])}
    ```
    
    The reason for this behavior is that all connectors consider `null` values to be distinct, which means that two rows that _look_ identical are considered unique:
    
    ```csharp
    firstname  | lastname | id -----------+----------+------ John       | Smith    | null John       | Smith    | null
    ```
    
-   A model can have any number of `@@unique` blocks
    

##### Relational databases[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#relational-databases-4 "Direct link to Relational databases")

-   Corresponding database construct: `UNIQUE`
-   A `@@unique` block is required if it represents the only unique constraint on a model without an `@id` / `@@id`
-   Adding a unique constraint automatically adds a corresponding _unique index_ to the specified column(s)

##### MongoDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mongodb-13 "Direct link to MongoDB")

-   Enforced by a [compound index in MongoDB](https://www.mongodb.com/docs/manual/core/index-compound/)
-   A `@@unique` block cannot be used as the only unique identifier for a model - MongoDB requires an `@id` field

#### Arguments[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#arguments-4 "Direct link to Arguments")

|   Name    | Required |       Type       |                                                                                                               Description                                                                                                               |
|-----------|----------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|  `fields`   |   **Yes**    | `FieldReference[]` |                                                                 A list of field names - for example, `["firstname", "lastname"]`. Fields must be mandatory - see remarks.                                                                 |
|   `name`    |    **No**    |      `String`      |                                                                        The name of the unique combination of fields - defaults to `fieldName1_fieldName2_fieldName3`                                                                        |
|    `map`    |    **No**    |      `String`      |                                                                                                                                                                                                                                         |
|  `length`   |    **No**    |      `number`      | Allows you to specify a maximum length for the subpart of the value to be indexed.

MySQL only. In preview in versions 3.5.0 and later, and in general availability in versions 4.0.0 and later. |
|   `sort`    |    **No**    |      `String`      | Allows you to specify in what order the entries of the constraint are stored in the database. The available options are `Asc` and `Desc`.

In preview in versions 3.5.0 and later, and in general availability in versions 4.0.0 and later. |
| `clustered` |    **No**    |     `Boolean`      | Defines whether the constraint is clustered or non-clustered. Defaults to `false`.

SQL Server only. In preview in versions 3.13.0 and later, and in general availability in versions 4.0.0 and later. |

The name of the `fields` argument on the `@@unique` attribute can be omitted:

```less
@@unique(fields: [title, author])@@unique([title, author])@@unique(fields: [title, author], name: "titleAuthor")
```

The `length` and `sort` arguments are added to the relevant field names:

```less
@@unique(fields: [title(length:10), author])@@unique([title(sort: Desc), author(sort: Asc)])
```

#### Signature[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#signature-4 "Direct link to Signature")

> ```css
> @@unique(_ fields: FieldReference[], name: String?, map: String?)
> ```

> **Note**: Before version 4.0.0, or before version 3.5.0 with the `extendedIndexes` Preview feature enabled, the signature was:
> 
> ```css
> @@unique(_ fields: FieldReference[], name: String?, map: String?)
> ```

> **Note**: Before version 3.0.0, the signature was:
> 
> ```css
> @@unique(_ fields: FieldReference[], name: String?)
> ```

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-10 "Direct link to Examples")

##### Specify a multi-field unique attribute on two `String` fields[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#specify-a-multi-field-unique-attribute-on-two-string-fields "Direct link to specify-a-multi-field-unique-attribute-on-two-string-fields")

-   Relational databases
-   MongoDB

```kotlin
model User {  id        Int     @default(autoincrement())  firstName String  lastName  String  isAdmin   Boolean @default(false)  @@unique([firstName, lastName])}
```

To retrieve a user, use the generated field name (`firstname_lastname`):

```php
const user = await prisma.user.findUnique({  where: {    firstName_lastName: {      firstName: "Alice",      lastName: "Smith",      isAdmin: true,    },  },});
```

##### Specify a multi-field unique attribute on two `String` fields and one `Boolean` field[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#specify-a-multi-field-unique-attribute-on-two-string-fields-and-one-boolean-field "Direct link to specify-a-multi-field-unique-attribute-on-two-string-fields-and-one-boolean-field")

-   Relational databases
-   MongoDB

```kotlin
model User {  id        Int     @default(autoincrement())  firstName String  lastName  String  isAdmin   Boolean @default(false)  @@unique([firstName, lastName, isAdmin])}
```

##### Specify a multi-field unique attribute that includes a relation field[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#specify-a-multi-field-unique-attribute-that-includes-a-relation-field "Direct link to Specify a multi-field unique attribute that includes a relation field")

-   Relational databases
-   MongoDB

```kotlin
model Post {  id        Int     @default(autoincrement())  author    User    @relation(fields: [authorId], references: [id])  authorId  Int  title     String  published Boolean @default(false)  @@unique([authorId, title])}model User {  id    Int    @id @default(autoincrement())  email String @unique  posts Post[]}
```

##### Specify a custom `name` for a multi-field unique attribute[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#specify-a-custom-name-for-a-multi-field-unique-attribute "Direct link to specify-a-custom-name-for-a-multi-field-unique-attribute")

-   Relational databases
-   MongoDB

```kotlin
model User {  id        Int     @default(autoincrement())  firstName String  lastName  String  isAdmin   Boolean @default(false)  @@unique(fields: [firstName, lastName, isAdmin], name: "admin_identifier")}
```

To retrieve a user, use the custom field name (`admin_identifier`):

```php
const user = await prisma.user.findUnique({  where: {    admin_identifier: {      firstName: "Alice",      lastName: "Smith",      isAdmin: true,    },  },});
```

### `@@index`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#index "Direct link to index")

Defines an index in the database.

##### Relational databases[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#relational-databases-5 "Direct link to Relational databases")

-   Corresponding database construct: `INDEX`
-   There are some additional index configuration options that cannot be provided via the Prisma schema yet. These include:
    -   PostgreSQL and CockroachDB:
        -   Define index fields as expressions (e.g. `CREATE INDEX title ON public."Post"((lower(title)) text_ops);`)
        -   Define partial indexes with `WHERE`
        -   Create indexes concurrently with `CONCURRENTLY`

info

While you cannot configure these option in your Prisma schema, you can still configure them on the database-level directly.

##### MongoDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mongodb-14 "Direct link to MongoDB")

-   In version `3.12.0` and later, you can define an index on a field of a [composite type](https://www.prisma.io/docs/orm/prisma-schema/data-model/models#defining-composite-types) using the syntax `@@index([compositeType.field])`. See [Defining composite type indexes](https://www.prisma.io/docs/orm/prisma-schema/data-model/models#defining-composite-type-indexes) for more details.

#### Arguments[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#arguments-5 "Direct link to Arguments")

|   Name    | Required |           Type           |                                                                                                                                            Description                                                                                                                                             |
|-----------|----------|--------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|  `fields`   |   **Yes**    |     `FieldReference[]`     |                                                                                                                   A list of field names - for example, `["firstname", "lastname"]`                                                                                                                   |
|   `name`    |    **No**    |          `String`          |                                                                          The name that Prisma Client will expose for the argument covering all fields, e.g. `fullName` in `fullName: { firstName: "First", lastName: "Last"}`                                                                          |
|    `map`    |    **No**    |           `map`            |                              The name of the index in the underlying database (Prisma generates an index name that respects identifier length limits if you do not specify a name. Prisma uses the following naming convention: `tablename.field1_field2_field3_unique`)                               |
|  `length`   |    **No**    |          `number`          | Allows you to specify a maximum length for the subpart of the value to be indexed.

MySQL only. In preview in versions 3.5.0 and later, and in general availability in versions 4.0.0 and later. |
|   `sort`    |    **No**    |          `String`          | Allows you to specify in what order the entries of the index or constraint are stored in the database. The available options are `asc` and `desc`.

In preview in versions 3.5.0 and later, and in general availability in versions 4.0.0 and later. |
| `clustered` |    **No**    |         `Boolean`          | Defines whether the index is clustered or non-clustered. Defaults to `false`.

SQL Server only. In preview in versions 3.5.0 and later, and in general availability in versions 4.0.0 and later. |
|   `type`    |    **No**    |        `identifier`        | Allows you to specify an index access method. Defaults to `BTree`.

PostgreSQL and CockroachDB only. In preview with the `Hash` index access method in versions 3.6.0 and later, and with the `Gist`, `Gin`, `SpGist` and `Brin` methods added in 3.14.0. In general availability in versions 4.0.0 and later. |
|    `ops`    |    **No**    | `identifier` or a `function` | Allows you to define the index operators for certain index types.

PostgreSQL only. In preview in versions 3.14.0 and later, and in general availability in versions 4.0.0 and later. |

The _name_ of the `fields` argument on the `@@index` attribute can be omitted:

```less
@@index(fields: [title, author])@@index([title, author])
```

The `length` and `sort` arguments are added to the relevant field names:

```less
@@index(fields: [title(length:10), author])@@index([title(sort: Asc), author(sort: Desc)])
```

#### Signature[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#signature-5 "Direct link to Signature")

```css
@@index(_ fields: FieldReference[], map: String?)
```

> **Note**: Until version 3.0.0, the signature was:
> 
> ```css
> @@index(_ fields: FieldReference[], name: String?)
> ```
> 
> The old `name` argument will still be accepted to avoid a breaking change.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-11 "Direct link to Examples")

Assume you want to add an index for the `title` field of the `Post` model

##### Define a single-column index (Relational databases only)[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#define-a-single-column-index-relational-databases-only "Direct link to Define a single-column index (Relational databases only)")

```kotlin
model Post {  id      Int     @id @default(autoincrement())  title   String  content String?  @@index([title])}
```

##### Define a multi-column index (Relational databases only)[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#define-a-multi-column-index-relational-databases-only "Direct link to Define a multi-column index (Relational databases only)")

```kotlin
model Post {  id      Int     @id @default(autoincrement())  title   String  content String?  @@index([title, content])}
```

##### Define an index with a name (Relational databases only)[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#define-an-index-with-a-name-relational-databases-only "Direct link to Define an index with a name (Relational databases only)")

```kotlin
model Post {  id      Int     @id @default(autoincrement())  title   String  content String?  @@index(fields: [title, content], name: "main_index")}
```

##### Define an index on a composite type field (Relational databases only)[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#define-an-index-on-a-composite-type-field-relational-databases-only "Direct link to Define an index on a composite type field (Relational databases only)")

```typescript
type Address {  street String  number Int}model User {  id      Int     @id  email   String  address Address  @@index([address.number])}
```

### `@relation`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#relation "Direct link to relation")

Defines meta information about the relation. [Learn more](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations#the-relation-attribute).

##### Relational databases[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#relational-databases-6 "Direct link to Relational databases")

-   Corresponding database constructs: `FOREIGN KEY` / `REFERENCES`

##### MongoDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mongodb-15 "Direct link to MongoDB")

-   If your model's primary key is of type `ObjectId` in the underlying database, both the primary key _and_ the foreign key must have the `@db.ObjectId` attribute

#### Arguments[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#arguments-6 "Direct link to Arguments")

|    Name    |                        Type                        |                  Required                   |                                                       Description                                                       |                      Example                      |
|------------|----------------------------------------------------|---------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------|
|    `name`    |                       `String`                       | Sometimes (e.g. to disambiguate a relation) | Defines the name of the relationship. In an m-n-relation, it also determines the name of the underlying relation table. |          `"CategoryOnPost"`, `"MyRelation"`           |
|   `fields`   |                  `FieldReference[]`                  |        On annotated relation fields         |                                          A list of fields of the _current_ model                                          | `["authorId"]`, `["authorFirstName, authorLastName"]` |
| `references` |                  `FieldReference[]`                  |        On annotated relation fields         |                             A list of fields of the model on _the other side of the relation_                             |          `["id"]`, `["firstName, lastName"]`          |
|    `map`     |                       `String`                       |                     No                      |                               Defines a custom name for the foreign key in the database.                                |          `["id"]`, `["firstName, lastName"]`          |
|  `onUpdate`  | Enum. See Types of referential actions for values. |                     No                      |       Defines the referential action to perform when a referenced entry in the referenced model is being updated.       |                 `Cascade`, `NoAction`                 |
|  `onDelete`  | Enum. See Types of referential actions for values. |                     No                      |       Defines the referential action to perform when a referenced entry in the referenced model is being deleted.       |                 `Cascade`, `NoAction`                 |

The name of the `name` argument on the `@relation` attribute can be omitted (`references` is required):

```less
@relation(name: "UserOnPost", references: [id])@relation("UserOnPost", references: [id])// or@relation(name: "UserOnPost")@relation("UserOnPost")
```

#### Signature[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#signature-6 "Direct link to Signature")

```css
@relation(_ name: String?, fields: FieldReference[]?, references: FieldReference[]?, onDelete: ReferentialAction?, onUpdate: ReferentialAction?, map: String?)
```

With SQLite, the signature changes to:

```css
@relation(_ name: String?, fields: FieldReference[]?, references: FieldReference[]?, onDelete: ReferentialAction?, onUpdate: ReferentialAction?)
```

> **Note**: Until version 3.0.0, the signature was:
> 
> ```css
> @relation(_ name: String?, fields: FieldReference[]?, references: FieldReference[]?)
> ```

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-12 "Direct link to Examples")

See: [The `@relation` attribute](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations#the-relation-attribute).

### `@map`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#map "Direct link to map")

Maps a field name or enum value from the Prisma schema to a column or document field with a different name in the database. If you do not use `@map`, the Prisma field name matches the column name or document field name exactly.

> See [Using custom model and field names](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/custom-model-and-field-names) to see how `@map` and `@@map` changes the generated Prisma Client.

##### General[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#general-3 "Direct link to General")

-   `@map` **does not** rename the columns / fields in the database
-   `@map` **does** [change the field names in the generated client](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#map-the-firstname-field-to-a-column-called-first_name)

##### MongoDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mongodb-16 "Direct link to MongoDB")

Your `@id` field must include `@map("_id")`. For example:

```kotlin
model User {  id String @default(auto()) @map("_id") @db.ObjectId}
```

#### Arguments[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#arguments-7 "Direct link to Arguments")

| Name |  Type  | Required |                                 Description                                  |           Example           |
|------|--------|----------|------------------------------------------------------------------------------|-----------------------------|
| `name` | `String` |   **Yes**    | The database column (relational databases) or document field (MongoDB) name. | `"comments"`, `"someFieldName"` |

The name of the `name` argument on the `@map` attribute can be omitted:

```less
@map(name: "is_admin")@map("users")
```

#### Signature[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#signature-7 "Direct link to Signature")

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-13 "Direct link to Examples")

##### Map the `firstName` field to a column called `first_name`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#map-the-firstname-field-to-a-column-called-first_name "Direct link to map-the-firstname-field-to-a-column-called-first_name")

-   Relational databases
-   MongoDB

```kotlin
model User {  id        Int    @id @default(autoincrement())  firstName String @map("first_name")}
```

The generated client:

```csharp
await prisma.user.create({  data: {    firstName: "Yewande", // first_name --> firstName  },});
```

##### Map an enum named `ADMIN` to a database enum named `admin`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#map-an-enum-named-admin-to-a-database-enum-named-admin "Direct link to map-an-enum-named-admin-to-a-database-enum-named-admin")

```kotlin
enum Role {  ADMIN    @map("admin")  CUSTOMER}
```

### `@@map`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#map-1 "Direct link to map-1")

Maps the Prisma schema model name to a table (relational databases) or collection (MongoDB) with a different name, or an enum name to a different underlying enum in the database. If you do not use `@@map`, the model name matches the table (relational databases) or collection (MongoDB) name exactly.

> See [Using custom model and field names](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/custom-model-and-field-names) to see how `@map` and `@@map` changes the generated Prisma Client.

#### Arguments[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#arguments-8 "Direct link to Arguments")

| Name |  Type  | Required |                               Description                               |                 Example                 |
|------|--------|----------|-------------------------------------------------------------------------|-----------------------------------------|
| `name` | `String` |   **Yes**    | The database table (relational databases) or collection (MongoDB) name. | `"comments"`, `"someTableOrCollectionName"` |

The name of the `name` argument on the `@@map` attribute can be omitted

```less
@@map(name: "users")@@map("users")
```

#### Signature[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#signature-8 "Direct link to Signature")

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-14 "Direct link to Examples")

##### Map the `User` model to a database table/collection named `users`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#map-the-user-model-to-a-database-tablecollection-named-users "Direct link to map-the-user-model-to-a-database-tablecollection-named-users")

-   Relational databases
-   MongoDB

```kotlin
model User {  id   Int    @id @default(autoincrement())  name String  @@map("users")}
```

The generated client:

```css
await prisma.user.create({  // users --> user  data: {    name: "Yewande",  },});
```

##### Map the `Role` enum to a native enum in the database named `_Role` its values to lowercase values in the database[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#map-the-role-enum-to-a-native-enum-in-the-database-named-_role-its-values-to-lowercase-values-in-the-database "Direct link to map-the-role-enum-to-a-native-enum-in-the-database-named-_role-its-values-to-lowercase-values-in-the-database")

```kotlin
enum Role {  ADMIN    @map("admin")  CUSTOMER @map("customer")  @@map("_Role")}
```

### `@updatedAt`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#updatedat "Direct link to updatedat")

Automatically stores the time when a record was last updated. If you do not supply a time yourself, Prisma Client will automatically set the value for fields with this attribute.

-   Compatible with [`DateTime`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#datetime) fields
-   Implemented at Prisma ORM level

warning

In versions before [4.4.0](https://github.com/prisma/prisma/releases/tag/4.4.0), if you're also using [`now()`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#now), the time might differ from the `@updatedAt` values if your database and app have different time zones. This happens because `@updatedAt` operates at the Prisma ORM level, while `now()` operates at the database level.

note

If you pass an empty update clause, the @updatedAt value will remain unchanged. For example:

```csharp
await prisma.user.update({  where: {    id: 1,  },  data: {}, //<- Empty update clause});
```

#### Arguments[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#arguments-9 "Direct link to Arguments")

N/A

#### Signature[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#signature-9 "Direct link to Signature")

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-15 "Direct link to Examples")

-   Relational databases
-   MongoDB

```typescript
model Post {  id        String   @id  updatedAt DateTime @updatedAt}
```

### `@ignore`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#ignore "Direct link to ignore")

Add `@ignore` to a field that you want to exclude from Prisma Client (for example, a field that you do not want Prisma Client users to update). Ignored fields are excluded from the generated Prisma Client. The model's `create` method is disabled when doing this for _required_ fields with no `@default` (because the database cannot create an entry without that data).

-   In [2.17.0](https://github.com/prisma/prisma/releases/tag/2.17.0) and later, Prisma ORM automatically adds `@ignore` to fields that _refer to_ invalid models when you introspect.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-16 "Direct link to Examples")

The following example demonstrates manually adding `@ignore` to exclude the `email` field from Prisma Client:

schema.prisma

```typescript
model User {  id    Int    @id  name  String  email String @ignore // this field will be excluded}
```

### `@@ignore`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#ignore-1 "Direct link to ignore-1")

Add `@@ignore` to a model that you want to exclude from Prisma Client (for example, a model that you do not want Prisma users to update). Ignored models are excluded from the generated Prisma Client.

-   In [2.17.0](https://github.com/prisma/prisma/releases/tag/2.17.0) and later, Prisma ORM adds `@@ignore` to an invalid model. (It also adds [`@ignore`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#ignore) to relations pointing to such a model)

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-17 "Direct link to Examples")

In the following example, the `Post` model is invalid because it does not have a unique identifier. Use `@@ignore` to exclude it from the generated Prisma Client API:

schema.prisma

```css
/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.model Post {  id       Int  @default(autoincrement()) // no unique identifier  author   User @relation(fields: [authorId], references: [id])  authorId Int  @@ignore}
```

In the following example, the `Post` model is invalid because it does not have a unique identifier, and the `posts` relation field on `User` is invalid because it refers to the invalid `Post` model. Use `@@ignore` on the `Post` model and `@ignore` on the `posts` relation field in `User` to exclude both the model and the relation field from the generated Prisma Client API:

schema.prisma

```css
/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.model Post {  id       Int  @default(autoincrement()) // no unique identifier  author   User @relation(fields: [authorId], references: [id])  authorId Int  @@ignore}model User {  id    Int     @id @default(autoincrement())  name  String?  posts Post[]  @ignore}
```

### `@@schema`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#schema "Direct link to schema")

Add `@@schema` to a model to specify which schema in your database should contain the table associated with that model. Learn more about [adding multiple schema's here](https://www.prisma.io/docs/orm/prisma-schema/data-model/multi-schema).

#### Arguments[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#arguments-10 "Direct link to Arguments")

| Name |  Type  | Required |           Description            |    Example     |
|------|--------|----------|----------------------------------|----------------|
| `name` | `String` |   **Yes**    | The name of the database schema. | `"base"`, `"auth"` |

The name of the `name` argument on the `@@schema` attribute can be omitted

```less
@@schema(name: "auth")@@schema("auth")
```

#### Signature[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#signature-10 "Direct link to Signature")

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-18 "Direct link to Examples")

##### Map the `User` model to a database schema named `auth`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#map-the-user-model-to-a-database-schema-named-auth "Direct link to map-the-user-model-to-a-database-schema-named-auth")

```kotlin
generator client {  provider        = "prisma-client"  output          = "./generated"}datasource db {  provider = "postgresql"  schemas  = ["auth"]}model User {  id   Int    @id @default(autoincrement())  name String  @@schema("auth")}
```

info

For more information about using the `multiSchema` feature, refer to [this guide](https://www.prisma.io/docs/orm/prisma-schema/data-model/multi-schema).

### `@shardKey`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#shardkey "Direct link to shardkey")

note

This features requires the `shardKeys` Preview feature flag on your `generator`:

```lua
generator client {  provider = "prisma-client"  output = "../generated/prisma"  previewFeatures = ["shardKeys"]}
```

The `@shardKey` attribute is only compatible with [PlanetScale](http://planetscale.com/) databases. It enables you define a [shard key](https://planetscale.com/docs/vitess/sharding) on a field of your model:

```java
model User {  id     String @default(uuid())  region String @shardKey}
```

### `@@shardKey`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#shardkey-1 "Direct link to shardkey-1")

note

This features requires the `shardKeys` Preview feature flag on your `generator`:

```lua
generator client {  provider = "prisma-client"  output = "../generated/prisma"  previewFeatures = ["shardKeys"]}
```

The `@shardKey` attribute is only compatible with [PlanetScale](http://planetscale.com/) databases. It enables you define a [shard key](https://planetscale.com/docs/vitess/sharding) on multiple fields of your model:

```java
model User {  id         String @default(uuid())  country    String  customerId String  @@shardKey([country, customerId])}
```

## Attribute functions[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#attribute-functions "Direct link to Attribute functions")

### `auto()`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#auto "Direct link to auto")

warning

This function is available on MongoDB only.

Represents **default values** that are automatically generated by the database.

##### MongoDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mongodb-17 "Direct link to MongoDB")

Used to generate an `ObjectId` for `@id` fields:

```kotlin
id  String  @map("_id") @db.ObjectId @default(auto())
```

##### Relational databases[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#relational-databases-7 "Direct link to Relational databases")

The `auto()` function is not available on relational databases.

#### Example[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#example "Direct link to Example")

##### Generate `ObjectId` (MongoDB only)[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#generate-objectid-mongodb-only "Direct link to generate-objectid-mongodb-only")

```kotlin
model User {  id   String  @id @default(auto()) @map("_id") @db.ObjectId  name String?}
```

### `autoincrement()`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#autoincrement "Direct link to autoincrement")

warning

**Not supported by MongoDB**  
The [MongoDB connector](https://www.prisma.io/docs/orm/overview/databases/mongodb) does not support the `autoincrement()` function.

Create a sequence of integers in the underlying database and assign the incremented values to the ID values of the created records based on the sequence.

-   Compatible with `Int` on most databases (`BigInt` on CockroachDB)
    
-   Implemented on the database-level, meaning that it manifests in the database schema and can be recognized through introspection. Database implementations:
    

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-19 "Direct link to Examples")

##### Generate autoincrementing integers as IDs (Relational databases only)[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#generate-autoincrementing-integers-as-ids-relational-databases-only-1 "Direct link to Generate autoincrementing integers as IDs (Relational databases only)")

```kotlin
model User {  id   Int    @id @default(autoincrement())  name String}
```

### `sequence()`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#sequence "Direct link to sequence")

Create a sequence of integers in the underlying database and assign the incremented values to the values of the created records based on the sequence.

#### Optional arguments[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#optional-arguments "Direct link to Optional arguments")

| Argument  |                                                                                                   Example                                                                                                   |
|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|  `virtual`  | `@default(sequence(virtual))`  
Virtual sequences are sequences that do not generate monotonically increasing values and instead produce values like those generated by the built-in function `unique_rowid()`. |
|   `cache`   | `@default(sequence(cache: 20))`  
The number of sequence values to cache in memory for reuse in the session. A cache size of `1` means that there is no cache, and cache sizes of less than `1` are not valid. |
| `increment` | `@default(sequence(increment: 4))`  
The new value by which the sequence is incremented. A negative number creates a descending sequence. A positive number creates an ascending sequence. |
| `minValue`  | `@default(sequence(minValue: 10))`  
The new minimum value of the sequence. |
| `maxValue`  | `@default(sequence(maxValue: 3030303))`  
The new maximum value of the sequence. |
|   `start`   | `@default(sequence(start: 2))`  
The value the sequence starts at, if it's restarted or if the sequence hits the `maxValue`. |

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-20 "Direct link to Examples")

##### Generate sequencing integers as IDs[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#generate-sequencing-integers-as-ids "Direct link to Generate sequencing integers as IDs")

```kotlin
model User {  id   Int    @id @default(sequence(maxValue: 4294967295))  name String}
```

### `cuid()`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#cuid "Direct link to cuid")

Generate a globally unique identifier based on the [`cuid`](https://github.com/ericelliott/cuid) spec.

If you'd like to use [`cuid2`](https://github.com/paralleldrive/cuid2) values, you can pass `2` as an argument to the `cuid` function: `cuid(2)`.

-   Compatible with `String`.
-   Implemented by Prisma ORM and therefore not "visible" in the underlying database schema. You can still use `cuid()` when using [introspection](https://www.prisma.io/docs/orm/prisma-schema/introspection) by [manually changing your Prisma schema](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/custom-model-and-field-names) and [generating Prisma Client](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/generating-prisma-client), in that case the values will be generated by Prisma's [query engine](https://www.prisma.io/docs/orm/more/under-the-hood/engines).
-   Since the length of `cuid()` output is undefined per the cuid creator, a safe field size is 30 characters, in order to allow for enough characters for very large values. If you set the field size as less than 30, and then a larger value is generated by `cuid()`, you might see Prisma Client errors such as `Error: The provided value for the column is too long for the column's type.`
-   For **MongoDB**: `cuid()` does not generate a valid `ObjectId`. You can use [`@db.ObjectId` syntax](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#generate-objectid-as-ids-mongodb-only) if you want to use `ObjectId` in the underlying database. However, you can still use `cuid()` if your `_id` field is not of type `ObjectId`.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-21 "Direct link to Examples")

##### Generate `cuid()` values as IDs[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#generate-cuid-values-as-ids-1 "Direct link to generate-cuid-values-as-ids-1")

-   Relational databases
-   MongoDB

```java
model User {  id   String @id @default(cuid())  name String}
```

##### Generate `cuid(2)` values as IDs based on the `cuid2` spec[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#generate-cuid2-values-as-ids-based-on-the-cuid2-spec "Direct link to generate-cuid2-values-as-ids-based-on-the-cuid2-spec")

-   Relational databases
-   MongoDB

```java
model User {  id   String @id @default(cuid(2))  name String}
```

### `uuid()`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#uuid "Direct link to uuid")

Generate a globally unique identifier based on the [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) spec. Prisma ORM supports versions 4 (default) and 7.

-   Compatible with `String`.
-   Implemented by Prisma ORM and therefore not "visible" in the underlying database schema. You can still use `uuid()` when using [introspection](https://www.prisma.io/docs/orm/prisma-schema/introspection) by [manually changing your Prisma schema](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/custom-model-and-field-names) and [generating Prisma Client](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/generating-prisma-client), in that case the values will be generated by Prisma ORM's [query engine](https://www.prisma.io/docs/orm/more/under-the-hood/engines).
-   For **relational databases**: If you do not want to use Prisma ORM's `uuid()` function, you can use [the native database function with `dbgenerated`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#override-default-value-behavior-for-supported-types).
-   For **MongoDB**: `uuid()` does not generate a valid `ObjectId`. You can use [`@db.ObjectId` syntax](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#generate-objectid-as-ids-mongodb-only) if you want to use `ObjectId` in the underlying database. However, you can still use `uuid()` if your `_id` field is not of type `ObjectId`.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-22 "Direct link to Examples")

##### Generate `uuid()` values as IDs using UUID v4[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#generate-uuid-values-as-ids-using-uuid-v4 "Direct link to generate-uuid-values-as-ids-using-uuid-v4")

-   Relational databases
-   MongoDB

```java
model User {  id   String @id @default(uuid())  name String}
```

##### Generate `uuid(7)` values as IDs using UUID v7[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#generate-uuid7-values-as-ids-using-uuid-v7 "Direct link to generate-uuid7-values-as-ids-using-uuid-v7")

-   Relational databases
-   MongoDB

```java
model User {  id   String @id @default(uuid(7))  name String}
```

### `ulid()`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#ulid "Direct link to ulid")

Generate a universally unique lexicographically sortable identifier based on the [ULID](https://github.com/ulid/spec) spec.

-   `ulid()` will produce 128-bit random identifier represented as a 26-character long alphanumeric string, e.g.: `01ARZ3NDEKTSV4RRFFQ69G5FAV`

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-23 "Direct link to Examples")

##### Generate `ulid()` values as IDs[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#generate-ulid-values-as-ids-1 "Direct link to generate-ulid-values-as-ids-1")

-   Relational databases
-   MongoDB

```java
model User {  id   String @id @default(ulid())  name String}
```

### `nanoid()`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#nanoid "Direct link to nanoid")

Generated values based on the [Nano ID](https://github.com/ai/nanoid) spec. `nanoid()` accepts an integer value between 2 and 255 that specifies the _length_ of the generate ID value, e.g. `nanoid(16)` will generated ID with 16 characters. If you don't provide a value to the nanoid() function, the default value is 21.

info

Nano ID is quite comparable to UUID v4 (random-based). It has a similar number of random bits in the ID (126 in Nano ID and 122 in UUID), so it has a similar collision probability:

For there to be a one in a billion chance of duplication, 103 trillion version 4 IDs must be generated.

There are two main differences between Nano ID and UUID v4:

-   Nano ID uses a bigger alphabet, so a similar number of random bits are packed in just 21 symbols instead of 36.
-   Nano ID code is 4 times smaller than uuid/v4 package: 130 bytes instead of 423.

-   Compatible with `String`.
-   Implemented by Prisma ORM and therefore not "visible" in the underlying database schema. You can still use `uuid()` when using [introspection](https://www.prisma.io/docs/orm/prisma-schema/introspection) by [manually changing your Prisma schema](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/custom-model-and-field-names) and [generating Prisma Client](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/generating-prisma-client), in that case the values will be generated by Prisma ORM's [query engine](https://www.prisma.io/docs/orm/more/under-the-hood/engines).
-   For **MongoDB**: `nanoid()` does not generate a valid `ObjectId`. You can use [`@db.ObjectId` syntax](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#generate-objectid-as-ids-mongodb-only) if you want to use `ObjectId` in the underlying database. However, you can still use `nanoid()` if your `_id` field is not of type `ObjectId`.

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-24 "Direct link to Examples")

##### Generate `nanoid()` values with 21 characters as IDs[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#generate-nanoid-values-with-21-characters-as-ids "Direct link to generate-nanoid-values-with-21-characters-as-ids")

-   Relational databases
-   MongoDB

```java
model User {  id   String @id @default(nanoid())  name String}
```

##### Generate `nanoid()` values with 16 characters as IDs[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#generate-nanoid-values-with-16-characters-as-ids "Direct link to generate-nanoid-values-with-16-characters-as-ids")

-   Relational databases
-   MongoDB

```java
model User {  id   String @id @default(nanoid(16))  name String}
```

### `now()`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#now "Direct link to now")

Set a timestamp of the time when a record is created.

##### General[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#general-4 "Direct link to General")

-   Compatible with [`DateTime`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#datetime)

warning

In versions before [4.4.0](https://github.com/prisma/prisma/releases/tag/4.4.0), if you're also using [`@updatedAt`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#updatedat), the time might differ from the `now()` values if your database and app have different time zones. This happens because `@updatedAt` operates at the Prisma ORM level, while `now()` operates at the database level.

##### Relational databases[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#relational-databases-8 "Direct link to Relational databases")

-   Implemented on the database-level, meaning that it manifests in the database schema and can be recognized through introspection. Database implementations:
    

##### MongoDB[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mongodb-18 "Direct link to MongoDB")

-   Implemented at Prisma ORM level

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-25 "Direct link to Examples")

##### Set current timestamp value when a record is created[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#set-current-timestamp-value-when-a-record-is-created "Direct link to Set current timestamp value when a record is created")

-   Relational databases
-   MongoDB

```java
model User {  id        String   @id  createdAt DateTime @default(now())}
```

### `dbgenerated(...)`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#dbgenerated "Direct link to dbgenerated")

Represents **default values** that cannot be expressed in the Prisma schema (such as `random()`).

##### Relational databases[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#relational-databases-9 "Direct link to Relational databases")

-   Compatible with any scalar type
    
-   Can not be an empty string `dbgenerated("")` in [2.21.0](https://github.com/prisma/prisma/releases/tag/2.21.0) and later
    
-   Accepts a `String` value in [2.17.0](https://github.com/prisma/prisma/releases/tag/2.17.0) and later, which allows you to:
    
    -   [Set default values for `Unsupported` types](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#set-default-value-for-unsupported-type)
    -   [Override default value behavior for supported types](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#override-default-value-behavior-for-supported-types)
-   String values in `dbgenerated(...)` might not match what the DB returns as the default value, because values such as strings may be explicitly cast (e.g. `'hello'::STRING`). When a mismatch is present, Prisma Migrate indicates a migration is still needed. You can use `prisma db pull` to infer the correct value to resolve the discrepancy. ([Related issue](https://github.com/prisma/prisma/issues/14917))
    

#### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-26 "Direct link to Examples")

##### Set default value for `Unsupported` type[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#set-default-value-for-unsupported-type "Direct link to set-default-value-for-unsupported-type")

```java
circle     Unsupported("circle")?   @default(dbgenerated("'<(10,4),11>'::circle"))
```

##### Override default value behavior for supported types[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#override-default-value-behavior-for-supported-types "Direct link to Override default value behavior for supported types")

You can also use `dbgenerated(...)` to set the default value for supported types. For example, in PostgreSQL you can generate UUIDs at the database level rather than rely on Prisma ORM's `uuid()`:

```java
model User {  id   String  @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid  id   String  @id @default(uuid()) @db.Uuid  test String?}
```

## Attribute argument types[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#attribute-argument-types "Direct link to Attribute argument types")

### `FieldReference[]`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#fieldreference "Direct link to fieldreference")

An array of [field](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#model-fields) names: `[id]`, `[firstName, lastName]`

### `String`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#string-1 "Direct link to string-1")

A variable length text in double quotes: `""`, `"Hello World"`, `"Alice"`

### `Expression`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#expression "Direct link to expression")

An expression that can be evaluated by Prisma ORM: `42.0`, `""`, `Bob`, `now()`, `cuid()`

## `enum`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#enum "Direct link to enum")

Defines an [enum](https://www.prisma.io/docs/orm/prisma-schema/data-model/models#defining-enums) .

-   Enums are natively supported by [PostgreSQL](https://www.postgresql.org/docs/current/datatype-enum.html) and [MySQL](https://dev.mysql.com/doc/refman/8.0/en/enum.html)
-   Enums are implemented and enforced at Prisma ORM level in SQLite and MongoDB

### Naming conventions[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#naming-conventions-2 "Direct link to Naming conventions")

-   Enum names must start with a letter (they are typically spelled in [PascalCase](http://wiki.c2.com/?PascalCase))
-   Enums must use the singular form (e.g. `Role` instead of `role`, `roles` or `Roles`).
-   Must adhere to the following regular expression: `[A-Za-z][A-Za-z0-9_]*`

### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-27 "Direct link to Examples")

#### Specify an `enum` with two possible values[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#specify-an-enum-with-two-possible-values "Direct link to specify-an-enum-with-two-possible-values")

-   Relational databases
-   MongoDB

```kotlin
enum Role {  USER  ADMIN}model User {  id   Int  @id @default(autoincrement())  role Role}
```

#### Specify an `enum` with two possible values and set a default value[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#specify-an-enum-with-two-possible-values-and-set-a-default-value "Direct link to specify-an-enum-with-two-possible-values-and-set-a-default-value")

-   Relational databases
-   MongoDB

```kotlin
enum Role {  USER  ADMIN}model User {  id   Int  @id @default(autoincrement())  role Role @default(USER)}
```

## `type`[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#type "Direct link to type")

warning

Composite types are available **for MongoDB only**.

info

Composite types are available in versions 3.12.0 and later, and in versions 3.10.0 and later if you enable the `mongodb` Preview feature flag.

Defines a [composite type](https://www.prisma.io/docs/orm/prisma-schema/data-model/models#defining-composite-types) .

### Naming conventions[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#naming-conventions-3 "Direct link to Naming conventions")

Type names must:

-   start with a letter (they are typically spelled in [PascalCase](http://wiki.c2.com/?PascalCase))
-   adhere to the following regular expression: `[A-Za-z][A-Za-z0-9_]*`

### Examples[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#examples-28 "Direct link to Examples")

#### Define a `Product` model with a list of `Photo` composite types[](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#define-a-product-model-with-a-list-of-photo-composite-types "Direct link to define-a-product-model-with-a-list-of-photo-composite-types")

```kotlin
model Product {  id     String  @id @default(auto()) @map("_id") @db.ObjectId  name   String  photos Photo[]}type Photo {  height Int  width  Int  url    String}
```
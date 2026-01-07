## Overview[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#overview "Direct link to Overview")

The Prisma Config file configures the Prisma CLI, including subcommands like `migrate` and `studio`, using TypeScript.

Prisma ORM v7 changes

Starting with Prisma ORM v7, when you run `prisma init`, a `prisma.config.ts` file is automatically created. The database connection URL is now configured in this file instead of in the `schema.prisma` file. See [Using environment variables](https://www.prisma.io/docs/orm/reference/prisma-config-reference#using-environment-variables) for setup details.

You can define your config in either of two ways:

-   Using the `defineConfig` helper:
    
    ```php
    import 'dotenv/config'import { defineConfig, env } from "prisma/config";export default defineConfig({  schema: 'prisma/schema.prisma',  migrations: {     path: 'prisma/migrations',    seed: 'tsx prisma/seed.ts',  },  datasource: {     url: env("DATABASE_URL")   }});
    ```
    
-   Using TypeScript's `satisfies` operator with the `PrismaConfig` type:
    
    ```typescript
    import 'dotenv/config'import type { PrismaConfig } from "prisma";import { env } from "prisma/config";export default {  schema: "prisma/schema.prisma",  migrations: {    path: "prisma/migrations",    seed: 'tsx prisma/seed.ts',  },  datasource: {     url: env("DATABASE_URL")   }} satisfies PrismaConfig;
    ```
    

## Configuration interface[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#configuration-interface "Direct link to Configuration interface")

Here is a simplified version of the `PrismaConfig` type:

```lua
export declare type PrismaConfig = {  // Whether features with an unstable API are enabled.  experimental: {    externalTables: boolean;  },  // The path to the schema file, or path to a folder that shall be recursively searched for *.prisma files.  schema?: string;  // Configuration for Prisma migrations.  migrations?: {    path: string;    seed: string;    initShadowDb: string;  };  // Configuration for the database view entities.  views?: {    path: string;  };  // Configuration for the `typedSql` preview feature.  typedSql?: {    path: string;  };    // Database connection configuration  datasource?: {    url: string;    shadowDatabaseUrl?: string;  }  };
```

Prisma ORM v6.19 and earlier

In Prisma ORM v6.19 and earlier, the configuration interface also included:

-   `experimental.adapter` and `experimental.studio` flags
-   `adapter` property for configuring driver adapters
-   `studio` property for Prisma Studio configuration
-   `datasource.directUrl` property for direct database connections
-   `engine` property for choosing between `classic` and `js` engines

These have been removed in Prisma ORM v7. See the individual property sections below for migration guidance.

## Supported file extensions[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#supported-file-extensions "Direct link to Supported file extensions")

Prisma Config files can be named as `prisma.config.*` or `.config/prisma.*` with the extensions `js`, `ts`, `mjs`, `cjs`, `mts`, or `cts`. Other extensions are supported to ensure compatibility with different TypeScript compiler settings.

Recommendation

-   Use **`prisma.config.ts`** for small TypeScript projects.
-   Use **`.config/prisma.ts`** for larger TypeScript projects with multiple configuration files (following the [`.config` directory proposal](https://github.com/pi0/config-dir)).

## Options reference[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#options-reference "Direct link to Options reference")

### `schema`[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#schema "Direct link to schema")

Configures how Prisma ORM locates and loads your schema file(s). Can be a file or folder path. Relative paths are resolved relative to the `prisma.config.ts` file location. See [here](https://www.prisma.io/docs/orm/prisma-schema/overview/location#multi-file-prisma-schema) for more info about schema location options.

| Property |  Type  | Required |                  Default                   |
|----------|--------|----------|--------------------------------------------|
|  `schema`  | `string` |    No    | `./prisma/schema.prisma` and `./schema.prisma` |

### `tables.external` and `enums.external`[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#tablesexternal-and-enumsexternal "Direct link to tablesexternal-and-enumsexternal")

These options declare tables and enums in your database that are **managed externally** (not by Prisma Migrate). You can still query them with Prisma Client, but they will be ignored by migrations.

|    Property     |   Type   | Required | Default |
|-----------------|----------|----------|---------|
| `tables.external` | `string[]` |    No    |   `[]`    |
| `enums.external`  | `string[]` |    No    |   `[]`    |

**Example:**

```php
import 'dotenv/config'import { defineConfig, env } from "prisma/config";export default defineConfig({  schema: 'prisma/schema.prisma',  migrations: {    path: 'prisma/migrations',  },  datasource: {    url: env('DATABASE_URL'),  },  experimental: {    externalTables: true,  },  tables: {    external: ["public.users"],  },  enums: {    external: ["public.role"],  },});
```

Learn more about the [`externalTables` feature here](https://www.prisma.io/docs/orm/prisma-schema/data-model/externally-managed-tables).

### `migrations.path`[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#migrationspath "Direct link to migrationspath")

The path to the directory where Prisma should store migration files, and look for them.

|    Property     |  Type  | Required | Default |
|-----------------|--------|----------|---------|
| `migrations.path` | `string` |    No    |  none   |

### `migrations.seed`[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#migrationsseed "Direct link to migrationsseed")

This option allows you to define a script that Prisma runs to seed your database after running migrations or using the npx prisma db seed command. The string should be a command that can be executed in your terminal, such as with `node`, `ts-node`, or `tsx`.

|    Property     |  Type  | Required | Default |
|-----------------|--------|----------|---------|
| `migrations.seed` | `string` |    No    |  none   |

**Example:**

```php
import 'dotenv/config'import { defineConfig, env } from "prisma/config";export default defineConfig({  schema: 'prisma/schema.prisma',  migrations: {    path: 'prisma/migrations',    seed: 'tsx db/seed.ts',  },  datasource: {    url: env('DATABASE_URL'),  },});
```

### `migrations.initShadowDb`[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#migrationsinitshadowdb "Direct link to migrationsinitshadowdb")

This option allows you to define SQL statements that Prisma runs on the **shadow database** before creating migrations. It is useful when working with [external managed tables](https://www.prisma.io/docs/orm/prisma-schema/data-model/externally-managed-tables), as Prisma needs to know about the structure of these tables to correctly generate migrations.

|        Property         |  Type  | Required | Default |
|-------------------------|--------|----------|---------|
| `migrations.initShadowDb` | `string` |    No    |  none   |

**Example:**

```php
import 'dotenv/config'import { defineConfig, env } from "prisma/config";export default defineConfig({  schema: 'prisma/schema.prisma',  migrations: {    path: 'prisma/migrations',    initShadowDb: `      CREATE TABLE public.users (id SERIAL PRIMARY KEY);    `,  },  datasource: {    url: env('DATABASE_URL'),  },  experimental: {    externalTables: true,  },  tables: {    external: ["public.users"],  },});
```

Learn more about the [`externalTables` feature here](https://www.prisma.io/docs/orm/prisma-schema/data-model/externally-managed-tables).

### `views.path`[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#viewspath "Direct link to viewspath")

The path to the directory where Prisma should look for the SQL view definitions.

|  Property  |  Type  | Required | Default |
|------------|--------|----------|---------|
| `views.path` | `string` |    No    |  none   |

### `typedSql.path`[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#typedsqlpath "Direct link to typedsqlpath")

The path to the directory where Prisma should look for the SQL files used for generating typings via [`typedSql`](https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/typedsql).

|   Property    |  Type  | Required | Default |
|---------------|--------|----------|---------|
| `typedSql.path` | `string` |    No    |  none   |

### `experimental`[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#experimental "Direct link to experimental")

Enables specific experimental features in the Prisma CLI.

|    Property    |  Type   | Required | Default |
|----------------|---------|----------|---------|
| `externalTables` | `boolean` |    No    |  `false`  |

Example:

```php
import 'dotenv/config'import { defineConfig, env } from "prisma/config";export default defineConfig({  schema: 'prisma/schema.prisma',  migrations: {    path: 'prisma/migrations',  },  datasource: {    url: env('DATABASE_URL'),  },  experimental: {    externalTables: true,  },});
```

note

If you use the `externalTables` feature without enabling the experimental flag, Prisma will throw an error:

```vbnet
Failed to load config file "~" as a TypeScript/JavaScript module. Error: Error: The `externalTables` configuration requires `experimental.externalTables` to be set to `true`.
```

Prisma ORM v6.19 and earlier

In Prisma ORM v6.19 and earlier, the `experimental` object also included `adapter` and `studio` flags. These have been removed in Prisma ORM v7. See the [`adapter`](https://www.prisma.io/docs/orm/reference/prisma-config-reference#adapter-removed) and [`studio`](https://www.prisma.io/docs/orm/reference/prisma-config-reference#studio-removed) sections for details.

### `datasource.url`[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#datasourceurl "Direct link to datasourceurl")

Connection URL including authentication info. Most connectors use [the syntax provided by the database](https://www.prisma.io/docs/orm/reference/connection-urls#format).

Prisma ORM v7 changes

In Prisma ORM v7, the `url` field is configured in `prisma.config.ts` instead of in [the `datasource` block of your `schema.prisma`](https://www.prisma.io/docs/orm/prisma-schema/overview/data-sources) file. When you run `prisma init`, the generated `schema.prisma` file will not include a `url` property in the `datasource` block.

For Prisma ORM v6.19 and earlier, the `url` field remains in the `schema.prisma` file's `datasource` block.

|    Property    |  Type  | Required | Default |
|----------------|--------|----------|---------|
| `datasource.url` | `string` |   Yes    |   `''`    |

**Example:**

```php
import 'dotenv/config'import { defineConfig, env } from "prisma/config";export default defineConfig({  schema: 'prisma/schema.prisma',  migrations: {    path: 'prisma/migrations',  },  datasource: {    url: env('DATABASE_URL'),  },});
```

### `datasource.shadowDatabaseUrl`[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#datasourceshadowdatabaseurl "Direct link to datasourceshadowdatabaseurl")

Connection URL to the shadow database used by Prisma Migrate. Allows you to use a cloud-hosted database as the shadow database.

Prisma ORM v7 changes

In Prisma ORM v7, the `shadowDatabaseUrl` field is configured in `prisma.config.ts` instead of in the `datasource` block of your `schema.prisma` file.

For Prisma ORM v6.19 and earlier, the `shadowDatabaseUrl` field remains in the `schema.prisma` file's `datasource` block.

|           Property           |  Type  | Required | Default |
|------------------------------|--------|----------|---------|
| `datasource.shadowDatabaseUrl` | `string` |    No    |   `''`    |

### `datasource.directUrl` (Removed)[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#datasourcedirecturl-removed "Direct link to datasourcedirecturl-removed")

Removed in Prisma ORM v7

The `datasource.directUrl` property has been removed in Prisma ORM v7 in favor of the [`url` property](https://www.prisma.io/docs/orm/reference/prisma-config-reference#datasourceurl).

For Prisma ORM v6.19 and earlier

### `adapter` (Removed)[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#adapter-removed "Direct link to adapter-removed")

Removed in Prisma ORM v7

The `adapter` property has been removed in Prisma ORM v7. Migrations for driver adapters work automatically without additional configuration in `prisma.config.ts` as of Prisma ORM v7.

For Prisma ORM v6.19 and earlier

### `engine` (Removed)[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#engine-removed "Direct link to engine-removed")

Removed in Prisma ORM v7

The `engine` property has been removed in Prisma ORM v7.

For Prisma ORM v6.19 and earlier

### `studio` (Removed)[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#studio-removed "Direct link to studio-removed")

Removed in Prisma ORM v7

The `studio` property has been removed in Prisma ORM v7. To run Prisma Studio, use:

```bash
npx prisma studio --config ./prisma.config.ts
```

Prisma Studio now uses the connection configuration from the `datasource` property automatically. See the [Prisma Studio documentation](https://www.prisma.io/docs/orm/reference/prisma-cli-reference#studio) for more details.

For Prisma ORM v6.19 and earlier

## Common patterns[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#common-patterns "Direct link to Common patterns")

### Setting up your project[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#setting-up-your-project "Direct link to Setting up your project")

To get started with Prisma Config, create a `prisma.config.ts` file in your project root. You can use either of these approaches:

Using `defineConfig`:

```php
import 'dotenv/config'import { defineConfig, env } from "prisma/config";export default defineConfig({  schema: 'prisma/schema.prisma',  migrations: {    path: 'prisma/migrations',  },  datasource: {    url: env('DATABASE_URL'),  },});
```

Using TypeScript types:

```typescript
import 'dotenv/config'import type { PrismaConfig } from "prisma";import { env } from "prisma/config";export default {  schema: 'prisma/schema.prisma',  migrations: {    path: 'prisma/migrations',  },  datasource: {    url: env('DATABASE_URL'),  },} satisfies PrismaConfig;
```

### Using environment variables[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#using-environment-variables "Direct link to Using environment variables")

Prisma ORM v7 changes

In Prisma ORM v7, when you run `prisma init`, the generated `prisma.config.ts` file includes `import 'dotenv/config'` by default. You must install the `dotenv` package to use environment variables.

When using `prisma.config.ts`, environment variables from `.env` files need to be loaded explicitly. There are several approaches depending on your runtime and Node version:

#### Using dotenv (Recommended for Prisma ORM v7)[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#using-dotenv-recommended-for-prisma-orm-v7 "Direct link to Using dotenv (Recommended for Prisma ORM v7)")

1.  Install the `dotenv` package:

2.  Import `dotenv/config` at the top of your `prisma.config.ts` file:

```php
import 'dotenv/config'import { defineConfig, env } from "prisma/config";export default defineConfig({  schema: 'prisma/schema.prisma',  migrations: {    path: 'prisma/migrations',    seed: 'tsx prisma/seed.ts',  },  datasource: {    url: env('DATABASE_URL'),  },});
```

#### Using Node.js v20+ or tsx with --env-file flag[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#using-nodejs-v20-or-tsx-with---env-file-flag "Direct link to Using Node.js v20+ or tsx with --env-file flag")

If using Node.js v20+ or `tsx`, you can pass a `--env-file` flag to automatically load environment variables:

```bash
tsx --env-file=.env src/index.tstsx watch --env-file=.env --env-file=.local.env src/index.tstsx --env-file=.env ./prisma/seed.ts
```

#### Using Bun[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#using-bun "Direct link to Using Bun")

For Bun, `.env` files are automatically loaded without additional configuration.

#### Type-safe environment variables[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#type-safe-environment-variables "Direct link to Type-safe environment variables")

Use the `env()` helper function to provide type-safe access to environment variables:

```php
import 'dotenv/config'import { defineConfig, env } from "prisma/config";type Env = {  DATABASE_URL: string}export default defineConfig({  schema: 'prisma/schema.prisma',  migrations: {    path: 'prisma/migrations',  },  datasource: {    url: env<Env>('DATABASE_URL'),  },});
```

### Using multi-file schemas[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#using-multi-file-schemas "Direct link to Using multi-file schemas")

If you want to split your Prisma schema into multiple files, you need to specify the path to your Prisma schema folder via the `schema` property:

```typescript
import path from "node:path";import type { PrismaConfig } from "prisma";export default {  schema: path.join("prisma", "schema"),} satisfies PrismaConfig;
```

In that case, your `migrations` directory must be located next to the `.prisma` file that defines the `datasource` block.

For example, assuming `schema.prisma` defines the `datasource`, here's how how need to place the migrations folder:

```go
# `migrations` and `schema.prisma` are on the same level.├── migrations├── models│   ├── posts.prisma│   └── users.prisma└── schema.prisma
```

## Path resolution[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#path-resolution "Direct link to Path resolution")

Prisma CLI commands such as `prisma validate` or `prisma migrate` use `prisma.config.ts` (or `.config/prisma.ts`) to locate your Prisma schema and other resources.

**Key rules:**

-   Paths defined in the config file (e.g., `schema`, `migrations`) are always resolved **relative to the location of the config file**, not where you run the CLI command from.
-   The CLI must first **find the config file** itself, which depends on how Prisma is installed and the package manager used.

### Behavior with `pnpm prisma`[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#behavior-with-pnpm-prisma "Direct link to behavior-with-pnpm-prisma")

When Prisma is installed locally and run via `pnpm prisma`, the config file is detected automatically whether you run the command from the project root or a subdirectory.

Example project tree:

```lua
.├── node_modules├── package.json├── prisma-custom│   └── schema.prisma├── prisma.config.ts└── src
```

Example run from the project root:

```graphql
pnpm prisma validate# → Loaded Prisma config from ./prisma.config.ts# → Prisma schema loaded from prisma-custom/schema.prisma
```

Example run from a subdirectory:

```graphql
cd srcpnpm prisma validate# → Still finds prisma.config.ts and resolves schema correctly
```

### Behavior with `npm exec prisma` or `bun prisma`[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#behavior-with-npm-exec-prisma-or-bun-prisma "Direct link to behavior-with-npm-exec-prisma-or-bun-prisma")

When running via `npm exec prisma` or `bun prisma`, the CLI only detects the config file if the command is run from the **project root** (where `package.json` declares Prisma).

Example run from the project root:

```perl
npm exec prisma validate# → Works as expected
```

Run from a subdirectory (fails):

```perl
cd srcnpm exec prisma validate# → Error: Could not find Prisma Schema...
```

To fix this, you can use the `--config` flag:

```bash
npm exec prisma -- --config ../prisma.config.ts validate
```

### Global Prisma installations[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#global-prisma-installations "Direct link to Global Prisma installations")

If Prisma is installed globally (`npm i -g prisma`), it may not find your `prisma.config.ts` or `prisma/config` module by default. To avoid issues:

-   Prefer local Prisma installations in your project.
-   Or use `prisma/config` locally and pass `--config` to point to your config file.

### Monorepos[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#monorepos "Direct link to Monorepos")

-   If Prisma is installed in the **workspace root**, `pnpm prisma` will detect the config file from subdirectories.
-   If Prisma is installed in a **subpackage** (e.g., `./packages/db`), run commands from that package directory or deeper.

### Custom config location[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#custom-config-location "Direct link to Custom config location")

You can specify a custom location for your config file when running Prisma CLI commands:

```css
prisma validate --config ./path/to/myconfig.ts
```

## Loading environment variables[](https://www.prisma.io/docs/orm/reference/prisma-config-reference#loading-environment-variables "Direct link to Loading environment variables")

Prisma ORM v7 changes

In Prisma ORM v7, `prisma init` generates a `prisma.config.ts` file automatically. To load environment variables with `dotenv`, do the following:

1.  Install the `dotenv` package.
2.  Add `import 'dotenv/config'` at the top of your `prisma.config.ts` file.

This is required for Prisma to read values from your `.env` file.

To load environment variables in your Prisma application, you can use the `prisma.config.ts` file along with the `env` helper from `prisma/config`. This approach provides better type safety and configuration management.

1.  Install the `dotenv` package:
    
2.  Create a `.env` file in your project root (if it doesn't exist) and add your database connection string:
    
    ```ini
    DATABASE_URL="your_database_connection_string_here"
    ```
    
3.  Ensure your `prisma.config.ts` file imports `dotenv/config` at the top:
    
    prisma.config.ts
    
    ```php
    import 'dotenv/config'import { defineConfig, env } from "prisma/config";export default defineConfig({  schema: 'prisma/schema.prisma',  migrations: {    path: 'prisma/migrations',    seed: 'tsx prisma/seed.ts',  },  datasource: {    url: env("DATABASE_URL"),  },});
    ```
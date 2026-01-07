This page explains how to get started with migrating your schema in a development environment using Prisma Migrate.

## Get started with Prisma Migrate from scratch[](https://www.prisma.io/docs/orm/prisma-migrate/getting-started#get-started-with-prisma-migrate-from-scratch "Direct link to Get started with Prisma Migrate from scratch")

To get started with Prisma Migrate in a development environment:

1.  Create a Prisma schema:
    
    -   Prisma 7
    -   Prisma 6
    
    schema.prisma
    
    ```kotlin
    datasource db {  provider = "postgresql"}model User {  id    Int    @id @default(autoincrement())  name  String  posts Post[]}model Post {  id        Int     @id @default(autoincrement())  title     String  published Boolean @default(true)  authorId  Int  author    User    @relation(fields: [authorId], references: [id])}
    ```
    
    tip
    
    You can use [native type mapping attributes](https://www.prisma.io/docs/orm/prisma-migrate/workflows/native-database-types) in your schema to decide which exact database type to create (for example, `String` can map to `varchar(100)` or `text`).
    
    For Prisma 7, be sure to have a `prisma.config.ts` in the root of your project:
    
    prisma.config.ts
    
    ```php
    import 'dotenv/config'import { defineConfig, env } from "prisma/config";export default defineConfig({  schema: "prisma/schema.prisma",  migrations: {    path: "prisma/migrations",  },  datasource: {    url: env("DATABASE_URL"),  },});
    ```
    
2.  Create the first migration:
    
    ```csharp
    prisma migrate dev --name init
    ```
    
    Your Prisma schema is now in sync with your database schema and you have initialized a migration history:
    
    ```
    migrations/  └─ 20210313140442_init/    └─ migration.sql
    ```
    
    > **Note**: The folder name will be different for you. Folder naming is in the format of YYYYMMDDHHMMSS\_your\_text\_from\_name\_flag.
    
3.  Add additional fields to your schema:
    
    ```kotlin
    model User {  id       Int    @id @default(autoincrement())  jobTitle String  name     String  posts    Post[]}
    ```
    
4.  Create the second migration:
    
    ```css
    prisma migrate dev --name added_job_title
    ```
    
    Your Prisma schema is once again in sync with your database schema, and your migration history contains two migrations:
    
    ```
    migrations/  └─ 20210313140442_init/    └─ migration.sql  └─ 20210313140442_added_job_title/    └─ migration.sql
    ```
    

You now have a migration history that you can [source control](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/migration-histories#committing-the-migration-history-to-source-control) and use to [deploy changes to test environments and production](https://www.prisma.io/docs/orm/prisma-migrate/workflows/development-and-production#production-and-testing-environments).

## Adding Prisma Migrate to an existing project[](https://www.prisma.io/docs/orm/prisma-migrate/getting-started#adding-prisma-migrate-to-an-existing-project "Direct link to Adding Prisma Migrate to an existing project")

The steps involved in **adding Prisma Migrate to your existing project** are:

1.  Introspect your database to update your Prisma schema
2.  Create a baseline migration
3.  Update your schema or migration to workaround features not supported by Prisma Schema Language
4.  Apply the baseline migration
5.  Commit the migration history and Prisma schema

### Introspect to create or update your Prisma schema[](https://www.prisma.io/docs/orm/prisma-migrate/getting-started#introspect-to-create-or-update-your-prisma-schema "Direct link to Introspect to create or update your Prisma schema")

Make sure your Prisma schema is in sync with your database schema. This should already be true if you are using a previous version of Prisma Migrate.

1.  Introspect the database to make sure that your Prisma schema is up-to-date:

### Create a baseline migration[](https://www.prisma.io/docs/orm/prisma-migrate/getting-started#create-a-baseline-migration "Direct link to Create a baseline migration")

Baselining is the process of initializing a migration history for a database that:

-   Existed before you started using Prisma Migrate
-   Contains data that must be maintained (like production), which means that the database cannot be reset

Baselining tells Prisma Migrate to assume that one or more migrations have **already been applied**. This prevents generated migrations from failing when they try to create tables and fields that already exist.

To create a baseline migration:

1.  If you have a `prisma/migrations` folder, delete, move, rename, or archive this folder.
2.  Run the following command to create a `migrations` directory inside with your preferred name. This example will use `0_init` for the migration name:
    
    ```bash
    mkdir -p prisma/migrations/0_init
    ```
    
    note
    
    The `0_` is important because Prisma Migrate applies migrations in a [lexicographic order](https://en.wikipedia.org/wiki/Lexicographic_order). You can use a different value such as the current timestamp.
    
3.  Generate a migration and save it to a file using `prisma migrate diff`:
    
    ```bash
    npx prisma migrate diff \--from-empty \--to-schema-datamodel prisma/schema.prisma \--script > prisma/migrations/0_init/migration.sql
    ```
    
4.  Review the generated migration.

### Work around features not supported by Prisma Schema Language[](https://www.prisma.io/docs/orm/prisma-migrate/getting-started#work-around-features-not-supported-by-prisma-schema-language "Direct link to Work around features not supported by Prisma Schema Language")

To include [unsupported database features](https://www.prisma.io/docs/orm/prisma-migrate/workflows/unsupported-database-features) that already exist in the database, you must replace or modify the initial migration SQL:

1.  Open the `migration.sql` file generated in the [Create a baseline migration](https://www.prisma.io/docs/orm/prisma-migrate/getting-started#create-a-baseline-migration) section.
2.  Modify the generated SQL. For example:

-   If the changes are minor, you can append additional custom SQL to the generated migration. The following example creates a partial index:
    
    ```sql
    /* Generated migration SQL */CREATE UNIQUE INDEX tests_success_constraint ON posts (subject, target)  WHERE success;
    ```
    
-   If the changes are significant, it can be easier to replace the entire migration file with the result of a database dump ([`mysqldump`](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html), [`pg_dump`](https://www.postgresql.org/docs/12/app-pgdump.html)). When using `pg_dump` for this, you'll need to update the `search_path` as follows with this command: `SELECT pg_catalog.set_config('search_path', '', false);`; otherwise you'll run into the following error: `The underlying table for model '_prisma_migrations' does not exist.` \`
    
    info
    
    Note that the order of the tables matters when creating all of them at once, since foreign keys are created at the same step. Therefore, either re-order them or move constraint creation to the last step after all tables are created, so you won't face `can't create constraint` errors
    

### Apply the initial migrations[](https://www.prisma.io/docs/orm/prisma-migrate/getting-started#apply-the-initial-migrations "Direct link to Apply the initial migrations")

To apply your initial migration(s):

1.  Run the following command against your database:
    
    ```css
    npx prisma migrate resolve --applied 0_init
    ```
    
2.  Review the database schema to ensure the migration leads to the desired end-state (for example, by comparing the schema to the production database).
    

The new migration history and the database schema should now be in sync with your Prisma schema.

### Commit the migration history and Prisma schema[](https://www.prisma.io/docs/orm/prisma-migrate/getting-started#commit-the-migration-history-and-prisma-schema "Direct link to Commit the migration history and Prisma schema")

Commit the following to source control:

-   The entire migration history folder
-   The `schema.prisma` file

## Going further[](https://www.prisma.io/docs/orm/prisma-migrate/getting-started#going-further "Direct link to Going further")

-   Refer to the [Deploying database changes with Prisma Migrate](https://www.prisma.io/docs/orm/prisma-client/deployment/deploy-database-changes-with-prisma-migrate) guide for more on deploying migrations to production.
-   Refer to the [Production Troubleshooting](https://www.prisma.io/docs/orm/prisma-migrate/workflows/patching-and-hotfixing#fixing-failed-migrations-with-migrate-diff-and-db-execute) guide to learn how to debug and resolve failed migrations in production using `prisma migrate diff`, `prisma db execute` and/ or `prisma migrate resolve`.
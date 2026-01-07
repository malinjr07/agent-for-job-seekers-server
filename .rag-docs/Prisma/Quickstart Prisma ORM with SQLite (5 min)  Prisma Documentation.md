[SQLite](https://sqlite.org/) is a lightweight, file-based database that's perfect for development, prototyping, and small applications. It requires no setup and stores data in a local file.

In this guide, you will learn how to set up a new TypeScript project from scratch, connect it to SQLite using Prisma ORM, and generate a Prisma Client for easy, type-safe access to your database.

## Prerequisites[](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/sqlite#prerequisites "Direct link to Prerequisites")

You need:

-   [Node.js](https://nodejs.org/en/) v20.19+, v22.12+, or v24.0+ installed on your machine
-   Basic knowledge of JavaScript or TypeScript

## 1\. Create a new project[](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/sqlite#1-create-a-new-project "Direct link to 1. Create a new project")

Create a project directory and navigate into it:

```bash
mkdir hello-prismacd hello-prisma
```

Initialize a TypeScript project:

```kotlin
npm init -ynpm install typescript tsx @types/node --save-devnpx tsc --init
```

## 2\. Install required dependencies[](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/sqlite#2-install-required-dependencies "Direct link to 2. Install required dependencies")

Install the packages needed for this quickstart:

```bash
npm install prisma @types/node @types/better-sqlite3 --save-dev npm install @prisma/client @prisma/adapter-better-sqlite3 dotenv
```

pnpm users with SQLite

If using pnpm 10+ with `pnpx`, you'll need the [`--allow-build=better-sqlite3`](https://pnpm.io/cli/dlx#--allow-build) flag when running Prisma Studio due to SQLite's native dependency requirements.

Here's what each package does:

-   **`prisma`** - The Prisma CLI for running commands like `prisma init`, `prisma migrate`, and `prisma generate`
-   **`@prisma/client`** - The Prisma Client library for querying your database
-   **`@prisma/adapter-better-sqlite3`** - The SQLite driver adapter that connects Prisma Client to your database
-   **`@types/better-sqlite3`** - TypeScript type definitions for better-sqlite3
-   **`dotenv`** - Loads environment variables from your `.env` file

## 3\. Configure ESM support[](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/sqlite#3-configure-esm-support "Direct link to 3. Configure ESM support")

Update `tsconfig.json` for ESM compatibility:

tsconfig.json

```json
{  "compilerOptions": {    "module": "ESNext",    "moduleResolution": "node",    "target": "ES2023",    "strict": true,    "esModuleInterop": true,    "ignoreDeprecations": "6.0"  }}
```

Update `package.json` to enable ESM:

package.json

## 4\. Initialize Prisma ORM[](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/sqlite#4-initialize-prisma-orm "Direct link to 4. Initialize Prisma ORM")

You can now invoke the Prisma CLI by prefixing it with `npx`:

Next, set up your Prisma ORM project by creating your [Prisma Schema](https://www.prisma.io/docs/orm/prisma-schema) file with the following command:

```css
npx prisma init --datasource-provider sqlite --output ../generated/prisma
```

This command does a few things:

-   Creates a `prisma/` directory with a `schema.prisma` file containing your database connection and schema models
-   Creates a `.env` file in the root directory for environment variables
-   Creates a `prisma.config.ts` file for Prisma configuration

The generated `prisma.config.ts` file looks like this:

prisma.config.ts

```php
import 'dotenv/config'import { defineConfig, env } from 'prisma/config'export default defineConfig({  schema: 'prisma/schema.prisma',  migrations: {    path: 'prisma/migrations',  },  datasource: {    url: env('DATABASE_URL'),  },})
```

The generated schema uses [the ESM-first `prisma-client` generator](https://www.prisma.io/docs/orm/prisma-schema/overview/generators#prisma-client) with a custom output path:

prisma/schema.prisma

```lua
generator client {  provider = "prisma-client"  output   = "../generated/prisma"}datasource db {  provider = "sqlite"}
```

A `.env` file should be created with the following value:

.env

```ini
DATABASE_URL="file:./dev.db"
```

## 5\. Define your data model[](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/sqlite#5-define-your-data-model "Direct link to 5. Define your data model")

Open `prisma/schema.prisma` and add the following models:

prisma/schema.prisma

```kotlin
generator client {  provider = "prisma-client"  output   = "../generated/prisma"}datasource db {  provider = "sqlite"}model User {  id    Int     @id @default(autoincrement())  email String  @unique  name  String?  posts Post[]}model Post {  id        Int     @id @default(autoincrement())  title     String  content   String?  published Boolean @default(false)  author    User    @relation(fields: [authorId], references: [id])  authorId  Int}
```

## 6\. Create and apply your first migration[](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/sqlite#6-create-and-apply-your-first-migration "Direct link to 6. Create and apply your first migration")

Create your first migration to set up the database tables:

```csharp
npx prisma migrate dev --name init
```

This command creates the database tables based on your schema.

Now run the following command to generate the Prisma Client:

## 7\. Instantiate Prisma Client[](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/sqlite#7-instantiate-prisma-client "Direct link to 7. Instantiate Prisma Client")

Now that you have all the dependencies installed, you can instantiate Prisma Client. You need to pass an instance of Prisma ORM's driver adapter to the `PrismaClient` constructor:

lib/prisma.ts

```javascript
import "dotenv/config";import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";import { PrismaClient } from "../generated/prisma/client";const connectionString = `${process.env.DATABASE_URL}`;const adapter = new PrismaBetterSqlite3({ url: connectionString });const prisma = new PrismaClient({ adapter });export { prisma };
```

Using SQLite with Bun

When targeting Bun, use the `@prisma/adapter-libsql` adapter instead of `@prisma/adapter-better-sqlite3`. Bun doesn’t support the native SQLite driver that `better-sqlite3` relies on (see the [`node:sqlite` reference](https://bun.com/reference/node/sqlite)). Instantiate Prisma Client like so:

```javascript
import 'dotenv/config';import { PrismaLibSql } from '@prisma/adapter-libsql';import { PrismaClient } from '../generated/prisma/client';const adapter = new PrismaLibSql({  url: process.env.DATABASE_URL ?? '',});const prisma = new PrismaClient({ adapter });export { prisma };
```

## 8\. Write your first query[](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/sqlite#8-write-your-first-query "Direct link to 8. Write your first query")

Create a `script.ts` file to test your setup:

script.ts

```lua
import { prisma } from './lib/prisma'async function main() {  // Create a new user with a post  const user = await prisma.user.create({    data: {      name: 'Alice',      email: 'alice@prisma.io',      posts: {        create: {          title: 'Hello World',          content: 'This is my first post!',          published: true,        },      },    },    include: {      posts: true,    },  })  console.log('Created user:', user)  // Fetch all users with their posts  const allUsers = await prisma.user.findMany({    include: {      posts: true,    },  })  console.log('All users:', JSON.stringify(allUsers, null, 2))}main()  .then(async () => {    await prisma.$disconnect()  })  .catch(async (e) => {    console.error(e)    await prisma.$disconnect()    process.exit(1)  })
```

Run the script:

You should see the created user and all users printed to the console!

## 9\. Explore your data with Prisma Studio[](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/sqlite#9-explore-your-data-with-prisma-studio "Direct link to 9. Explore your data with Prisma Studio")

Prisma Studio is a visual editor for your database. Launch it with:

```bash
npx prisma studio --config ./prisma.config.ts
```

This opens a web interface where you can view and edit your data.

SQLite requirements for Prisma Studio

-   File paths must have a `file:` protocol right now in the database url for SQLite
-   **Node.js 22.5+**: Works out of the box with the built-in `node:sqlite` module
    -   May require `NODE_OPTIONS=--experimental-sqlite` environment variable
-   **Node.js 20**: Requires installing `better-sqlite3` as a dependency
    -   If using pnpm 10+ with `pnpx`, you'll need the [`--allow-build=better-sqlite3`](https://pnpm.io/cli/dlx#--allow-build) flag
-   **Deno >= 2.2**: Supported via [built-in SQLite module](https://docs.deno.com/api/node/sqlite/)
-   **Bun**: Support for Prisma Studio with SQLite is coming soon and is not available yet

Using `npx` with `better-sqlite3`

If you don't have `node:sqlite` available in your runtime or prefer not to install `better-sqlite3` as a hard dependency (it adds ~10MB), you can use `npx` to temporarily install the required packages:

```css
npx -p better-sqlite3 -p prisma prisma studio --url file:./dev.db
```

This command:

-   Temporarily installs `better-sqlite3` without adding it to your project dependencies
-   Runs Prisma Studio with the specified SQLite database file
-   Avoids the 10MB overhead of `better-sqlite3` in your project

## Next steps[](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/sqlite#next-steps "Direct link to Next steps")

You've successfully set up Prisma ORM. Here's what you can explore next:

-   **Learn more about Prisma Client**: Explore the [Prisma Client API](https://www.prisma.io/docs/orm/prisma-client) for advanced querying, filtering, and relations
-   **Database migrations**: Learn about [Prisma Migrate](https://www.prisma.io/docs/orm/prisma-migrate) for evolving your database schema
-   **Performance optimization**: Discover [query optimization techniques](https://www.prisma.io/docs/orm/prisma-client/queries/query-optimization-performance)
-   **Build a full application**: Check out our [framework guides](https://www.prisma.io/docs/guides) to integrate Prisma ORM with Next.js, Express, and more
-   **Join the community**: Connect with other developers on [Discord](https://pris.ly/discord)

## More info[](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/sqlite#more-info "Direct link to More info")

-   [SQLite database connector](https://www.prisma.io/docs/orm/overview/databases/sqlite)
-   [Prisma Config reference](https://www.prisma.io/docs/orm/reference/prisma-config-reference)
-   [Database connection management](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections)
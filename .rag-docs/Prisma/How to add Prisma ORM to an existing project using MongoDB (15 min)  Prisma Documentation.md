[MongoDB](https://www.mongodb.com/) is a popular document-based NoSQL database known for its flexibility, scalability, and developer-friendly features. In this guide, you will learn how to add Prisma ORM to an existing TypeScript project, connect it to MongoDB, introspect your existing database schema, and start querying with type-safe Prisma Client.

MongoDB support for Prisma ORM v7

**MongoDB support for Prisma ORM v7 is coming in the near future.** In the meantime, please use **Prisma ORM v6.19** (the latest v6 release) when working with MongoDB.

This guide uses Prisma ORM v6.19 to ensure full compatibility with MongoDB.

## Prerequisites[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/mongodb#prerequisites "Direct link to Prerequisites")

In order to successfully complete this guide, you need:

-   [Node.js](https://nodejs.org/en/) installed on your machine (see [system requirements](https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-6#minimum-supported-nodejs-versions) for officially supported versions)
-   An existing TypeScript project with a `package.json` file
-   Access to a MongoDB 4.2+ server with a replica set deployment. We recommend using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

warning

The MongoDB database connector uses transactions to support nested writes. Transactions **requires** a [replica set](https://www.mongodb.com/docs/manual/tutorial/deploy-replica-set/) deployment. The easiest way to deploy a replica set is with [Atlas](https://www.mongodb.com/docs/atlas/getting-started/). It's free to get started.

Make sure you have your database [connection URL](https://www.prisma.io/docs/orm/reference/connection-urls) (that includes your authentication credentials) at hand!

note

If your project contains multiple directories with `package.json` files (e.g., `frontend`, `backend`, etc.), note that Prisma ORM is specifically designed for use in the API/backend layer. To set up Prisma, navigate to the appropriate backend directory containing the relevant `package.json` file and configure Prisma there.

## 1\. Set up Prisma ORM[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/mongodb#1-set-up-prisma-orm "Direct link to 1. Set up Prisma ORM")

Navigate to your existing project directory and install the required dependencies:

```graphql
npm install prisma@6.19 @types/node --save-devnpm install @prisma/client@6.19 dotenv
```

Here's what each package does:

-   **`prisma`** - The Prisma CLI for running commands like `prisma init`, `prisma db pull`, and `prisma generate`
-   **`@prisma/client`** - The Prisma Client library for querying your database
-   **`dotenv`** - Loads environment variables from your `.env` file

Why Prisma v6.19?

This is the latest stable version of Prisma ORM v6 that fully supports MongoDB. MongoDB support for Prisma ORM v7 is coming soon.

You can also install `prisma@6` and `@prisma/client@6` to automatically get the latest v6 release.

## 2\. Initialize Prisma ORM[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/mongodb#2-initialize-prisma-orm "Direct link to 2. Initialize Prisma ORM")

Set up your Prisma ORM project by creating your [Prisma Schema](https://www.prisma.io/docs/orm/prisma-schema) file with the following command:

```css
npx prisma init --datasource-provider mongodb --output ../generated/prisma
```

This command does a few things:

-   Creates a `prisma/` directory with a `schema.prisma` file containing your database connection configuration
-   Creates a `.env` file in the root directory for environment variables
-   Creates a `prisma.config.ts` file for Prisma configuration

The generated `prisma.config.ts` file looks like this:

prisma.config.ts

```php
import { defineConfig, env } from 'prisma/config'export default defineConfig({  schema: 'prisma/schema.prisma',  migrations: {    path: 'prisma/migrations',  },  engine: "classic",  datasource: {    url: env('DATABASE_URL'),  },})
```

Add `dotenv` to `prisma.config.ts` so that Prisma can load environment variables from your `.env` file:

prisma.config.ts

```php
import 'dotenv/config'import { defineConfig, env } from 'prisma/config'export default defineConfig({  schema: 'prisma/schema.prisma',  migrations: {    path: 'prisma/migrations',  },  engine: "classic",  datasource: {    url: env('DATABASE_URL'),  },})
```

The generated schema uses [the ESM-first `prisma-client` generator](https://www.prisma.io/docs/orm/prisma-schema/overview/generators#prisma-client) with a custom output path:

prisma/schema.prisma

```bash
generator client {  provider = "prisma-client"  output   = "../generated/prisma"}datasource db {  provider = "mongodb"  url = env("DATABASE_URL")}
```

## 3\. Connect your database[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/mongodb#3-connect-your-database "Direct link to 3. Connect your database")

Update the `.env` file with your MongoDB connection URL:

.env

```ini
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/mydb"
```

For MongoDB Atlas, the connection URL format is:

```perl
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE
```

Self-hosted MongoDB connection URL format:

```perl
mongodb://USERNAME:PASSWORD@HOST:PORT/DATABASE
```

Connection URL components:

-   **`USERNAME`**: Your database user name
-   **`PASSWORD`**: Your database user password
-   **`HOST`**: The host where [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) or [`mongos`](https://www.mongodb.com/docs/manual/reference/program/mongos/#mongodb-binary-bin.mongos) is running
-   **`PORT`**: The port where your database server is running (typically `27017`)
-   **`DATABASE`**: The name of your database

tip

For MongoDB Atlas, you can manually append the database name to the connection URL, as Atlas doesn't include it by default.

### Troubleshooting connection issues[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/mongodb#troubleshooting-connection-issues "Direct link to Troubleshooting connection issues")

#### `Error in connector: SCRAM failure: Authentication failed.`[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/mongodb#error-in-connector-scram-failure-authentication-failed "Direct link to error-in-connector-scram-failure-authentication-failed")

If you see the `Error in connector: SCRAM failure: Authentication failed.` error message, you can specify the source database for the authentication by [adding](https://github.com/prisma/prisma/discussions/9994#discussioncomment-1562283) `?authSource=admin` to the end of the connection string.

#### `Raw query failed. Error code 8000 (AtlasError): empty database name not allowed.`[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/mongodb#raw-query-failed-error-code-8000-atlaserror-empty-database-name-not-allowed "Direct link to raw-query-failed-error-code-8000-atlaserror-empty-database-name-not-allowed")

If you see the `Raw query failed. Code: unknown. Message: Kind: Command failed: Error code 8000 (AtlasError): empty database name not allowed.` error message, be sure to append the database name to the database URL. You can find more info in this [GitHub issue](https://github.com/prisma/docs/issues/5562).

## 4\. Introspect your database[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/mongodb#4-introspect-your-database "Direct link to 4. Introspect your database")

Run the following command to introspect your existing database:

This command:

-   Reads the `DATABASE_URL` from your `.env` file
-   Connects to your MongoDB database
-   Samples documents in your collections to infer the schema
-   Generates Prisma models in your `schema.prisma` file

![Introspect your database with Prisma ORM](https://www.prisma.io/docs/assets/images/prisma-db-pull-generate-schema-e54e9643a3888cb5819a9863fad8b40d.png)

info

**MongoDB introspection limitations:** Prisma introspects MongoDB by sampling documents. You may need to manually:

-   Add relation fields using the `@relation` attribute
-   Adjust field types if the sampling didn't capture all variations
-   Add indexes and constraints not detected during introspection

## 5\. Generate Prisma ORM types[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/mongodb#5-generate-prisma-orm-types "Direct link to 5. Generate Prisma ORM types")

Generate Prisma Client based on your introspected schema:

This creates a type-safe Prisma Client tailored to your database schema in the `generated/prisma` directory.

## 6\. Instantiate Prisma Client[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/mongodb#6-instantiate-prisma-client "Direct link to 6. Instantiate Prisma Client")

Create a utility file to instantiate Prisma Client:

lib/prisma.ts

```javascript
import "dotenv/config";import { PrismaClient } from '../generated/prisma/client'const prisma = new PrismaClient()export { prisma }
```

## 7\. Query your database[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/mongodb#7-query-your-database "Direct link to 7. Query your database")

Now you can use Prisma Client to query your database. Create a `script.ts` file:

script.ts

```javascript
import { prisma } from './lib/prisma'async function main() {  // Example: Fetch all records from a collection  // Replace 'user' with your actual model name  const allUsers = await prisma.user.findMany()  console.log('All users:', JSON.stringify(allUsers, null, 2))}main()  .then(async () => {    await prisma.$disconnect()  })  .catch(async (e) => {    console.error(e)    await prisma.$disconnect()    process.exit(1)  })
```

Run the script:

## 8\. Evolve your schema[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/mongodb#8-evolve-your-schema "Direct link to 8. Evolve your schema")

MongoDB doesn't support migrations like relational databases. Instead, use `db push` to sync schema changes:

### 8.1. Update your Prisma schema file[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/mongodb#81-update-your-prisma-schema-file "Direct link to 8.1. Update your Prisma schema file")

Modify your Prisma schema file with the changes you want. For example, add a new model:

prisma/schema.prisma

```kotlin
model Post {  id        String   @id @default(auto()) @map("_id") @db.ObjectId  title     String  content   String?  published Boolean  @default(false)  authorId  String   @db.ObjectId  author    User     @relation(fields: [authorId], references: [id])}model User {  id    String @id @default(auto()) @map("_id") @db.ObjectId  email String @unique  name  String?  posts Post[]}
```

info

In MongoDB, the `id` field is mapped to `_id` and uses `@db.ObjectId` type. Relations use `String` type with `@db.ObjectId` annotation.

### 8.2. Push the changes to your database[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/mongodb#82-push-the-changes-to-your-database "Direct link to 8.2. Push the changes to your database")

This command:

-   Applies schema changes to your MongoDB database
-   Automatically regenerates Prisma Client

Why `db push` instead of migrations?

MongoDB uses a flexible schema model. Prisma Migrate (which creates migration files) is not supported for MongoDB. Always use `prisma db push` to sync your schema changes.

## 9\. Explore your data[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/mongodb#9-explore-your-data "Direct link to 9. Explore your data")

You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), the MongoDB shell, or MongoDB Compass to view and manage your data.

[Prisma Studio](https://www.prisma.io/docs/orm/tools/prisma-studio) does not currently support MongoDB. Support may be added in a future release. See [Databases supported by Prisma Studio](https://www.prisma.io/docs/orm/tools/prisma-studio#databases-supported-by-prisma-studio) for more information.

## Next steps[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/mongodb#next-steps "Direct link to Next steps")

You've successfully set up Prisma ORM. Here's what you can explore next:

-   **Learn more about Prisma Client**: Explore the [Prisma Client API](https://www.prisma.io/docs/orm/prisma-client) for advanced querying, filtering, and relations
-   **Database migrations**: Learn about [Prisma Migrate](https://www.prisma.io/docs/orm/prisma-migrate) for evolving your database schema
-   **Performance optimization**: Discover [query optimization techniques](https://www.prisma.io/docs/orm/prisma-client/queries/query-optimization-performance)
-   **Build a full application**: Check out our [framework guides](https://www.prisma.io/docs/guides) to integrate Prisma ORM with Next.js, Express, and more
-   **Join the community**: Connect with other developers on [Discord](https://pris.ly/discord)

## More info[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/mongodb#more-info "Direct link to More info")

-   [MongoDB database connector](https://www.prisma.io/docs/orm/overview/databases/mongodb)
-   [Prisma Config reference](https://www.prisma.io/docs/orm/reference/prisma-config-reference)
-   [Database introspection](https://www.prisma.io/docs/orm/prisma-schema/introspection)
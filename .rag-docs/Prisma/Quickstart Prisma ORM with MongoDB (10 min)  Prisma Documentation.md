[MongoDB](https://www.mongodb.com/) is a popular NoSQL document database. In this guide, you will learn how to set up a new TypeScript project from scratch, connect it to MongoDB using Prisma ORM, and generate a Prisma Client for easy, type-safe access to your database.

MongoDB support for Prisma ORM v7

**MongoDB support for Prisma ORM v7 is coming in the near future.** In the meantime, please use **Prisma ORM v6.19** (the latest v6 release) when working with MongoDB.

This guide uses Prisma ORM v6.19 to ensure full compatibility with MongoDB.

## Prerequisites[](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/mongodb#prerequisites "Direct link to Prerequisites")

-   Node.js installed in your system [with the supported version](https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-6#minimum-supported-nodejs-versions)
-   A [MongoDB](https://www.mongodb.com/) database accessible via connection string

## 1\. Create a new project[](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/mongodb#1-create-a-new-project "Direct link to 1. Create a new project")

Create a project directory and navigate into it:

```bash
mkdir hello-prismacd hello-prisma
```

Initialize a TypeScript project:

```kotlin
npm init -ynpm install typescript tsx @types/node --save-devnpx tsc --init
```

## 2\. Install required dependencies[](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/mongodb#2-install-required-dependencies "Direct link to 2. Install required dependencies")

Install the packages needed for this quickstart:

```graphql
npm install prisma@6.19 @types/node --save-dev npm install @prisma/client@6.19 dotenv
```

Why Prisma v6.19?

This is the latest stable version of Prisma ORM v6 that fully supports MongoDB. MongoDB support for Prisma ORM v7 is coming soon.

You can also install `prisma@6` and `@prisma/client@6` to automatically get the latest v6 release.

Here's what each package does:

-   **`prisma`** - The Prisma CLI for running commands like `prisma init`, `prisma db push`, and `prisma generate`
-   **`@prisma/client`** - The Prisma Client library for querying your database
-   **`dotenv`** - Loads environment variables from your `.env` file

note

MongoDB doesn't require driver adapters since Prisma ORM connects directly to MongoDB.

## 3\. Configure ESM support[](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/mongodb#3-configure-esm-support "Direct link to 3. Configure ESM support")

Update `tsconfig.json` for ESM compatibility:

tsconfig.json

```json
{  "compilerOptions": {    "module": "ESNext",    "moduleResolution": "node",    "target": "ES2023",    "strict": true,    "esModuleInterop": true,    "ignoreDeprecations": "6.0"  }}
```

Update `package.json` to enable ESM:

package.json

## 4\. Initialize Prisma ORM[](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/mongodb#4-initialize-prisma-orm "Direct link to 4. Initialize Prisma ORM")

You can now invoke the Prisma CLI by prefixing it with `npx`:

Next, set up your Prisma ORM project by creating your [Prisma Schema](https://www.prisma.io/docs/orm/prisma-schema) file with the following command:

```css
npx prisma init --datasource-provider mongodb --output ../generated/prisma
```

This command does a few things:

-   Creates a `prisma/` directory with a `schema.prisma` file for your database connection and schema models
-   Creates a `.env` file in the root directory for environment variables
-   Creates a `prisma.config.ts` file for Prisma configuration

note

Prisma Client will be generated in the `generated/prisma/` directory when you run `npx prisma generate` later in this guide.

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

Update your `.env` file with your MongoDB connection string:

.env

```ini
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/mydb"
```

tip

Replace `username`, `password`, `cluster`, and `mydb` with your actual MongoDB credentials and database name. You can get your connection string from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or your MongoDB deployment.

## 5\. Define your data model[](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/mongodb#5-define-your-data-model "Direct link to 5. Define your data model")

Open `prisma/schema.prisma` and add the following models:

prisma/schema.prisma

```kotlin
generator client {  provider = "prisma-client"  output   = "../generated/prisma"}datasource db {  provider = "mongodb"  url = env("DATABASE_URL")}model User {  id    String  @id @default(auto()) @map("_id") @db.ObjectId  email String  @unique  name  String?  posts Post[]}model Post {  id        String  @id @default(auto()) @map("_id") @db.ObjectId  title     String  content   String?  published Boolean @default(false)  author    User    @relation(fields: [authorId], references: [id])  authorId  String  @db.ObjectId}
```

## 6\. Push your schema to MongoDB[](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/mongodb#6-push-your-schema-to-mongodb "Direct link to 6. Push your schema to MongoDB")

MongoDB doesn't support migrations like relational databases. Instead, use `db push` to sync your schema:

This command:

-   Creates the collections in MongoDB based on your schema
-   Automatically generates Prisma Client

info

Unlike relational databases, MongoDB uses a flexible schema. The `db push` command ensures your Prisma schema is reflected in your database without creating migration files.

## 7\. Instantiate Prisma Client[](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/mongodb#7-instantiate-prisma-client "Direct link to 7. Instantiate Prisma Client")

Now that you have all the dependencies installed, you can instantiate Prisma Client:

lib/prisma.ts

```javascript
import "dotenv/config";import { PrismaClient } from '../generated/prisma/client'const prisma = new PrismaClient()export { prisma }
```

## 8\. Write your first query[](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/mongodb#8-write-your-first-query "Direct link to 8. Write your first query")

Create a `script.ts` file to test your setup:

script.ts

```lua
import { prisma } from './lib/prisma'async function main() {  // Create a new user with a post  const user = await prisma.user.create({    data: {      name: 'Alice',      email: 'alice@prisma.io',      posts: {        create: {          title: 'Hello World',          content: 'This is my first post!',          published: true,        },      },    },    include: {      posts: true,    },  })  console.log('Created user:', user)  // Fetch all users with their posts  const allUsers = await prisma.user.findMany({    include: {      posts: true,    },  })  console.log('All users:', JSON.stringify(allUsers, null, 2))}main()  .then(async () => {    await prisma.$disconnect()  })  .catch(async (e) => {    console.error(e)    await prisma.$disconnect()    process.exit(1)  })
```

Run the script:

You should see the created user and all users printed to the console!

## 9\. Explore your data[](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/mongodb#9-explore-your-data "Direct link to 9. Explore your data")

You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), the MongoDB shell, or MongoDB Compass to view and manage your data.

[Prisma Studio](https://www.prisma.io/docs/orm/tools/prisma-studio) does not currently support MongoDB. Support may be added in a future release. See [Databases supported by Prisma Studio](https://www.prisma.io/docs/orm/tools/prisma-studio#databases-supported-by-prisma-studio) for more information.

## Next steps[](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/mongodb#next-steps "Direct link to Next steps")

You've successfully set up Prisma ORM. Here's what you can explore next:

-   **Learn more about Prisma Client**: Explore the [Prisma Client API](https://www.prisma.io/docs/orm/prisma-client) for advanced querying, filtering, and relations
-   **Database migrations**: Learn about [Prisma Migrate](https://www.prisma.io/docs/orm/prisma-migrate) for evolving your database schema
-   **Performance optimization**: Discover [query optimization techniques](https://www.prisma.io/docs/orm/prisma-client/queries/query-optimization-performance)
-   **Build a full application**: Check out our [framework guides](https://www.prisma.io/docs/guides) to integrate Prisma ORM with Next.js, Express, and more
-   **Join the community**: Connect with other developers on [Discord](https://pris.ly/discord)

## Troubleshooting[](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/mongodb#troubleshooting "Direct link to Troubleshooting")

### `Error in connector: SCRAM failure: Authentication failed.`[](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/mongodb#error-in-connector-scram-failure-authentication-failed "Direct link to error-in-connector-scram-failure-authentication-failed")

If you see the `Error in connector: SCRAM failure: Authentication failed.` error message, you can specify the source database for the authentication by [adding](https://github.com/prisma/prisma/discussions/9994#discussioncomment-1562283) `?authSource=admin` to the end of the connection string.

### `Raw query failed. Error code 8000 (AtlasError): empty database name not allowed.`[](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/mongodb#raw-query-failed-error-code-8000-atlaserror-empty-database-name-not-allowed "Direct link to raw-query-failed-error-code-8000-atlaserror-empty-database-name-not-allowed")

If you see the `Raw query failed. Code: unknown. Message: Kind: Command failed: Error code 8000 (AtlasError): empty database name not allowed.` error message, be sure to append the database name to the database URL. You can find more info in this [GitHub issue](https://github.com/prisma/docs/issues/5562).

## More info[](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/mongodb#more-info "Direct link to More info")

-   [MongoDB database connector](https://www.prisma.io/docs/orm/overview/databases/mongodb)
-   [MongoDB data modeling patterns](https://www.prisma.io/docs/orm/overview/databases/mongodb#type-mapping-between-mongodb-and-the-prisma-schema)
-   [MongoDB deployment considerations](https://www.prisma.io/docs/orm/overview/databases/mongodb#differences-to-connectors-for-relational-databases)
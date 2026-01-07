[PlanetScale](https://planetscale.com/) is a serverless database platform. This guide covers **PlanetScale MySQL**, which is built on Vitess and offers database branching, non-blocking schema changes, and automatic backups. In this guide, you will learn how to add Prisma ORM to an existing TypeScript project, connect it to PlanetScale MySQL, introspect your existing database schema, and start querying with type-safe Prisma Client.

## Prerequisites[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/planetscale#prerequisites "Direct link to Prerequisites")

You need:

-   [Node.js](https://nodejs.org/en/) v20.19+, v22.12+, or v24.0+ installed on your machine
-   Basic knowledge of JavaScript or TypeScript

## 1\. Set up Prisma ORM[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/planetscale#1-set-up-prisma-orm "Direct link to 1. Set up Prisma ORM")

Navigate to your existing project directory and install the required dependencies:

```bash
npm install prisma @types/node --save-devnpm install @prisma/client @prisma/adapter-planetscale undici dotenv
```

Here's what each package does:

-   **`prisma`** - The Prisma CLI for running commands like `prisma init`, `prisma db pull`, and `prisma generate`
-   **`@prisma/client`** - The Prisma Client library for querying your database
-   **`@prisma/adapter-planetscale`** - The PlanetScale driver adapter that connects Prisma Client to your database
-   **`undici`** - A fast HTTP/1.1 client required by the PlanetScale adapter
-   **`dotenv`** - Loads environment variables from your `.env` file

## 2\. Initialize Prisma ORM[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/planetscale#2-initialize-prisma-orm "Direct link to 2. Initialize Prisma ORM")

Set up your Prisma ORM project by creating your [Prisma Schema](https://www.prisma.io/docs/orm/prisma-schema) file with the following command:

```css
npx prisma init --datasource-provider mysql --output ../generated/prisma
```

This command does a few things:

-   Creates a `prisma/` directory with a `schema.prisma` file containing your database connection configuration
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
generator client {  provider = "prisma-client"  output   = "../generated/prisma"}datasource db {  provider     = "mysql"  relationMode = "prisma"}
```

info

PlanetScale requires `relationMode = "prisma"` because it doesn't support foreign key constraints.

## 3\. Connect your database[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/planetscale#3-connect-your-database "Direct link to 3. Connect your database")

Update the `.env` file with your PlanetScale connection URL:

.env

```ini
DATABASE_URL="mysql://username:password@host.connect.psdb.cloud/mydb?sslaccept=strict"
```

You can find your connection string in the PlanetScale dashboard.

## 4\. Introspect your database[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/planetscale#4-introspect-your-database "Direct link to 4. Introspect your database")

Run the following command to introspect your existing database:

This command reads the `DATABASE_URL` environment variable, connects to your database, and introspects the database schema. It then translates the database schema from SQL into a data model in your Prisma schema.

![Introspect your database with Prisma ORM](https://www.prisma.io/docs/assets/images/prisma-db-pull-generate-schema-e54e9643a3888cb5819a9863fad8b40d.png)

After introspection, your Prisma schema will contain models that represent your existing database tables.

## 5\. Generate Prisma ORM types[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/planetscale#5-generate-prisma-orm-types "Direct link to 5. Generate Prisma ORM types")

Generate Prisma Client based on your introspected schema:

This creates a type-safe Prisma Client tailored to your database schema in the `generated/prisma` directory.

## 6\. Instantiate Prisma Client[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/planetscale#6-instantiate-prisma-client "Direct link to 6. Instantiate Prisma Client")

Create a utility file to instantiate Prisma Client. You need to pass an instance of Prisma ORM's driver adapter to the `PrismaClient` constructor:

lib/prisma.ts

```javascript
import "dotenv/config";import { PrismaPlanetScale } from '@prisma/adapter-planetscale'import { PrismaClient } from '../generated/prisma/client'import { fetch as undiciFetch } from 'undici'const adapter = new PrismaPlanetScale({ url: process.env.DATABASE_URL, fetch: undiciFetch })const prisma = new PrismaClient({ adapter })export { prisma }
```

## 7\. Query your database[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/planetscale#7-query-your-database "Direct link to 7. Query your database")

Now you can use Prisma Client to query your database. Create a `script.ts` file:

script.ts

```javascript
import { prisma } from './lib/prisma'async function main() {  // Example: Fetch all records from a table  // Replace 'user' with your actual model name  const allUsers = await prisma.user.findMany()  console.log('All users:', JSON.stringify(allUsers, null, 2))}main()  .then(async () => {    await prisma.$disconnect()  })  .catch(async (e) => {    console.error(e)    await prisma.$disconnect()    process.exit(1)  })
```

Run the script:

## 8\. Evolve your schema[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/planetscale#8-evolve-your-schema "Direct link to 8. Evolve your schema")

PlanetScale uses a branching workflow instead of traditional migrations. To make changes to your database schema:

### 8.1. Update your Prisma schema file[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/planetscale#81-update-your-prisma-schema-file "Direct link to 8.1. Update your Prisma schema file")

Update your Prisma schema file to reflect the changes you want to make to your database schema. For example, add a new model:

prisma/schema.prisma

```kotlin
model Post {  id        Int      @id @default(autoincrement())  title     String  content   String?  published Boolean  @default(false)  authorId  Int  author    User     @relation(fields: [authorId], references: [id])}model User {  id    Int    @id @default(autoincrement())  email String @unique  name  String?  posts Post[]}
```

### 8.2. Push the changes to your development branch:[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/planetscale#82-push-the-changes-to-your-development-branch "Direct link to 8.2. Push the changes to your development branch:")

This command will:

-   Apply the schema changes to your PlanetScale database
-   Regenerate Prisma Client

info

For production deployments, use PlanetScale's [branching workflow](https://planetscale.com/docs/concepts/branching) to create deploy requests.

## 9\. Explore your data with Prisma Studio[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/planetscale#9-explore-your-data-with-prisma-studio "Direct link to 9. Explore your data with Prisma Studio")

Prisma Studio is a visual editor for your database. Launch it with:

```bash
npx prisma studio --config ./prisma.config.ts
```

This opens a web interface where you can view and edit your data.

## Next steps[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/planetscale#next-steps "Direct link to Next steps")

You've successfully set up Prisma ORM. Here's what you can explore next:

-   **Learn more about Prisma Client**: Explore the [Prisma Client API](https://www.prisma.io/docs/orm/prisma-client) for advanced querying, filtering, and relations
-   **Database migrations**: Learn about [Prisma Migrate](https://www.prisma.io/docs/orm/prisma-migrate) for evolving your database schema
-   **Performance optimization**: Discover [query optimization techniques](https://www.prisma.io/docs/orm/prisma-client/queries/query-optimization-performance)
-   **Build a full application**: Check out our [framework guides](https://www.prisma.io/docs/guides) to integrate Prisma ORM with Next.js, Express, and more
-   **Join the community**: Connect with other developers on [Discord](https://pris.ly/discord)

## More info[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/planetscale#more-info "Direct link to More info")

-   [PlanetScale database connector](https://www.prisma.io/docs/orm/overview/databases/planetscale)
-   [Prisma Config reference](https://www.prisma.io/docs/orm/reference/prisma-config-reference)
-   [Database introspection](https://www.prisma.io/docs/orm/prisma-schema/introspection)
-   [PlanetScale branching workflow](https://planetscale.com/docs/concepts/branching)
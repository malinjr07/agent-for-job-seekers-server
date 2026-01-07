[SQL Server](https://www.microsoft.com/en-us/sql-server) is Microsoft's enterprise relational database management system known for its performance, security, and integration with Microsoft tools. In this guide, you will learn how to add Prisma ORM to an existing TypeScript project, connect it to SQL Server, introspect your existing database schema, and start querying with type-safe Prisma Client.

## Prerequisites[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/sql-server#prerequisites "Direct link to Prerequisites")

You need:

-   [Node.js](https://nodejs.org/en/) v20.19+, v22.12+, or v24.0+ installed on your machine
-   Basic knowledge of JavaScript or TypeScript

## 1\. Set up Prisma ORM[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/sql-server#1-set-up-prisma-orm "Direct link to 1. Set up Prisma ORM")

Navigate to your existing project directory and install the required dependencies:

```bash
npm install prisma @types/node @types/mssql --save-devnpm install @prisma/client @prisma/adapter-mssql dotenv
```

Here's what each package does:

-   **`prisma`** - The Prisma CLI for running commands like `prisma init`, `prisma db pull`, and `prisma generate`
-   **`@prisma/client`** - The Prisma Client library for querying your database
-   **`@prisma/adapter-mssql`** - The SQL Server driver adapter that connects Prisma Client to your database
-   **`dotenv`** - Loads environment variables from your `.env` file
-   **`@types/mssql`** - TypeScript type definitions for mssql

## 2\. Initialize Prisma ORM[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/sql-server#2-initialize-prisma-orm "Direct link to 2. Initialize Prisma ORM")

Set up your Prisma ORM project by creating your [Prisma Schema](https://www.prisma.io/docs/orm/prisma-schema) file with the following command:

```css
npx prisma init --datasource-provider sqlserver --output ../generated/prisma
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
generator client {  provider = "prisma-client"  output   = "../generated/prisma"}datasource db {  provider = "sqlserver"}
```

## 3\. Connect your database[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/sql-server#3-connect-your-database "Direct link to 3. Connect your database")

Update the `.env` file with your SQL Server connection string details:

.env

```sql
DATABASE_URL="sqlserver://localhost:1433;database=mydb;user=username;password=password;encrypt=true"//add-startDB_USER="username"DB_PASSWORD="password"DB_NAME="mydb"HOST="localhost"//add-end
```

Replace the placeholders with your actual database credentials:

-   `localhost:1433`: Your SQL Server host and port
-   `mydb`: Your database name
-   `username`: Your SQL Server username
-   `password`: Your SQL Server password

## 4\. Introspect your database[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/sql-server#4-introspect-your-database "Direct link to 4. Introspect your database")

Run the following command to introspect your existing database:

This command reads the `DATABASE_URL` environment variable, connects to your database, and introspects the database schema. It then translates the database schema from SQL into a data model in your Prisma schema.

![Introspect your database with Prisma ORM](https://www.prisma.io/docs/assets/images/prisma-db-pull-generate-schema-e54e9643a3888cb5819a9863fad8b40d.png)

After introspection, your Prisma schema will contain models that represent your existing database tables.

## 5\. Baseline your database[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/sql-server#5-baseline-your-database "Direct link to 5. Baseline your database")

To use Prisma Migrate with your existing database, you need to [baseline your database](https://www.prisma.io/docs/orm/prisma-migrate/getting-started).

First, create a `migrations` directory:

```bash
mkdir -p prisma/migrations/0_init
```

Next, generate the migration file with `prisma migrate diff`:

```bash
npx prisma migrate diff --from-empty --to-schema prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql
```

Review the generated migration file to ensure it matches your database schema.

Then, mark the migration as applied:

```css
npx prisma migrate resolve --applied 0_init
```

You now have a baseline for your current database schema.

## 6\. Generate Prisma ORM types[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/sql-server#6-generate-prisma-orm-types "Direct link to 6. Generate Prisma ORM types")

Generate Prisma Client based on your introspected schema:

This creates a type-safe Prisma Client tailored to your database schema in the `generated/prisma` directory.

## 7\. Instantiate Prisma Client[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/sql-server#7-instantiate-prisma-client "Direct link to 7. Instantiate Prisma Client")

Create a utility file to instantiate Prisma Client. You need to pass an instance of Prisma ORM's driver adapter to the `PrismaClient` constructor:

lib/prisma.ts

```yaml
import "dotenv/config";import { PrismaMSSQL } from '@prisma/adapter-mssql';import { PrismaClient } from '../generated/prisma/client';const sqlConfig = {  user: process.env.DB_USER,  password: process.env.DB_PASSWORD,  database: process.env.DB_NAME,  server: process.env.HOST,  pool: {    max: 10,    min: 0,    idleTimeoutMillis: 30000  },  options: {    encrypt: true, // for azure    trustServerCertificate: false // change to true for local dev / self-signed certs  }}const adapter = new PrismaMSSQL(sqlConfig)const prisma = new PrismaClient({ adapter });export { prisma }
```

## 8\. Query your database[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/sql-server#8-query-your-database "Direct link to 8. Query your database")

Now you can use Prisma Client to query your database. Create a `script.ts` file:

script.ts

```javascript
import { prisma } from './lib/prisma'async function main() {  // Example: Fetch all records from a table  // Replace 'user' with your actual model name  const allUsers = await prisma.user.findMany()  console.log('All users:', JSON.stringify(allUsers, null, 2))}main()  .then(async () => {    await prisma.$disconnect()  })  .catch(async (e) => {    console.error(e)    await prisma.$disconnect()    process.exit(1)  })
```

Run the script:

## 9\. Evolve your schema[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/sql-server#9-evolve-your-schema "Direct link to 9. Evolve your schema")

To make changes to your database schema:

### 9.1. Update your Prisma schema file[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/sql-server#91-update-your-prisma-schema-file "Direct link to 9.1. Update your Prisma schema file")

Update your Prisma schema file to reflect the changes you want to make to your database schema. For example, add a new model:

prisma/schema.prisma

```kotlin
model Post {  id        Int      @id @default(autoincrement())  title     String  content   String?  published Boolean  @default(false)  authorId  Int  author    User     @relation(fields: [authorId], references: [id])}model User {  id    Int    @id @default(autoincrement())  email String @unique  name  String?  posts Post[]}
```

### 9.2. Create and apply a migration:[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/sql-server#92-create-and-apply-a-migration "Direct link to 9.2. Create and apply a migration:")

```css
npx prisma migrate dev --name your_migration_name
```

This command will:

-   Create a new SQL migration file
-   Apply the migration to your database
-   Regenerate Prisma Client

## 10\. Explore your data with Prisma Studio[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/sql-server#10-explore-your-data-with-prisma-studio "Direct link to 10. Explore your data with Prisma Studio")

Prisma Studio is a visual editor for your database. Launch it with:

```bash
npx prisma studio --config ./prisma.config.ts
```

This opens a web interface where you can view and edit your data.

## Next steps[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/sql-server#next-steps "Direct link to Next steps")

You've successfully set up Prisma ORM. Here's what you can explore next:

-   **Learn more about Prisma Client**: Explore the [Prisma Client API](https://www.prisma.io/docs/orm/prisma-client) for advanced querying, filtering, and relations
-   **Database migrations**: Learn about [Prisma Migrate](https://www.prisma.io/docs/orm/prisma-migrate) for evolving your database schema
-   **Performance optimization**: Discover [query optimization techniques](https://www.prisma.io/docs/orm/prisma-client/queries/query-optimization-performance)
-   **Build a full application**: Check out our [framework guides](https://www.prisma.io/docs/guides) to integrate Prisma ORM with Next.js, Express, and more
-   **Join the community**: Connect with other developers on [Discord](https://pris.ly/discord)

## More info[](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/sql-server#more-info "Direct link to More info")

-   [SQL Server database connector](https://www.prisma.io/docs/orm/overview/databases/sql-server)
-   [Prisma Config reference](https://www.prisma.io/docs/orm/reference/prisma-config-reference)
-   [Database introspection](https://www.prisma.io/docs/orm/prisma-schema/introspection)
-   [Prisma Migrate](https://www.prisma.io/docs/orm/prisma-migrate)
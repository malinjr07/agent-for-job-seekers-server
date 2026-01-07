The Prisma Schema (or _schema_ for short) is the main method of configuration for your Prisma ORM setup. It consists of the following parts:

-   [**Data sources**](https://www.prisma.io/docs/orm/prisma-schema/overview/data-sources): Specify the details of the data sources Prisma ORM should connect to (e.g. a PostgreSQL database)
-   [**Generators**](https://www.prisma.io/docs/orm/prisma-schema/overview/generators): Specifies what clients should be generated based on the data model (e.g. Prisma Client)
-   [**Data model definition**](https://www.prisma.io/docs/orm/prisma-schema/data-model): Specifies your application [models](https://www.prisma.io/docs/orm/prisma-schema/data-model/models#defining-models) (the shape of the data per data source) and their [relations](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations)

It is typically a single file called `schema.prisma` (or multiple files with `.prisma` file extension) that is stored in a defined but customizable [location](https://www.prisma.io/docs/orm/prisma-schema/overview/location). You can also [organize your Prisma schema in multiple files](https://www.prisma.io/docs/orm/prisma-schema/overview/location#multi-file-prisma-schema) if you prefer that.

See the [Prisma schema API reference](https://www.prisma.io/docs/orm/reference/prisma-schema-reference) for detailed information about each section of the schema.

Whenever a `prisma` command is invoked, the CLI typically reads some information from the schema, e.g.:

-   `prisma generate`: Reads _all_ above mentioned information from the Prisma schema to generate the correct data source client code (e.g. Prisma Client).
-   `prisma migrate dev`: Reads the data sources and data model definition to create a new migration.

You can also [use environment variables](https://www.prisma.io/docs/orm/prisma-schema/overview#accessing-environment-variables-from-the-schema) inside the schema to provide configuration options when a CLI command is invoked.

## Example[](https://www.prisma.io/docs/orm/prisma-schema/overview#example "Direct link to Example")

The following is an example of a Prisma Schema that specifies:

-   A data source (PostgreSQL or MongoDB)
-   A generator (Prisma Client)
-   A data model definition with two models (with one relation) and one `enum`
-   Several [native data type attributes](https://www.prisma.io/docs/orm/prisma-schema/data-model/models#native-types-mapping) (`@db.VarChar(255)`, `@db.ObjectId`)

-   Relational databases
-   MongoDB

```kotlin
datasource db {  provider = "postgresql"}generator client {  provider = "prisma-client"  output   = "./generated"}model User {  id        Int      @id @default(autoincrement())  createdAt DateTime @default(now())  email     String   @unique  name      String?  role      Role     @default(USER)  posts     Post[]}model Post {  id        Int      @id @default(autoincrement())  createdAt DateTime @default(now())  updatedAt DateTime @updatedAt  published Boolean  @default(false)  title     String   @db.VarChar(255)  author    User?    @relation(fields: [authorId], references: [id])  authorId  Int?}enum Role {  USER  ADMIN}
```

## Syntax[](https://www.prisma.io/docs/orm/prisma-schema/overview#syntax "Direct link to Syntax")

Prisma Schema files are written in Prisma Schema Language (PSL). See the [data sources](https://www.prisma.io/docs/orm/prisma-schema/overview/data-sources), [generators](https://www.prisma.io/docs/orm/prisma-schema/overview/generators), [data model definition](https://www.prisma.io/docs/orm/prisma-schema/data-model) and of course [Prisma Schema API reference](https://www.prisma.io/docs/orm/reference/prisma-schema-reference) pages for details and examples.

### VS Code[](https://www.prisma.io/docs/orm/prisma-schema/overview#vs-code "Direct link to VS Code")

Syntax highlighting for PSL is available via a [VS Code extension](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) (which also lets you auto-format the contents of your Prisma schema and indicates syntax errors with red squiggly lines). Learn more about [setting up Prisma ORM in your editor](https://www.prisma.io/docs/orm/more/development-environment/editor-setup).

### GitHub[](https://www.prisma.io/docs/orm/prisma-schema/overview#github "Direct link to GitHub")

PSL code snippets on GitHub can be rendered with syntax highlighting as well by using the `.prisma` file extension or annotating fenced code blocks in Markdown with `prisma`:

```kotlin
```prismamodel User {  id        Int      @id @default(autoincrement())  createdAt DateTime @default(now())  email     String   @unique  name      String?}```
```

## Accessing environment variables from the schema[](https://www.prisma.io/docs/orm/prisma-schema/overview#accessing-environment-variables-from-the-schema "Direct link to Accessing environment variables from the schema")

You can use environment variables to provide configuration options when a CLI command is invoked, or a Prisma Client query is run.

Hardcoding URLs directly in your schema is possible but is discouraged because it poses a security risk. Using environment variables in the schema allows you to **keep secrets out of the schema** which in turn **improves the portability of the schema** by allowing you to use it in different environments.

Environment variables can be accessed using the `env()` function:

```bash
datasource db {  provider = "postgresql"}
```

You can use the `env()` function in the following places:

-   A datasource url
-   Generator binary targets

See [Environment variables](https://www.prisma.io/docs/orm/more/development-environment/environment-variables) for more information about how to use an `.env` file during development.

There are three types of comments that are supported in Prisma Schema Language:

-   `// comment`: This comment is for the reader's clarity and is not present in the abstract syntax tree (AST) of the schema.
-   `/// comment`: These comments will show up in the abstract syntax tree (AST) of the schema as descriptions to AST nodes. Tools can then use these comments to provide additional information. All comments are attached to the next available node - [free-floating comments](https://github.com/prisma/prisma/issues/3544) are not supported and are not included in the AST.
-   `/* block comment */`: These comments will show up in the abstract syntax tree, similarly to `///` comments.

Here are some different examples:

```less
/// This comment will get attached to the `User` node in the ASTmodel User {  /// This comment will get attached to the `id` node in the AST  id     Int   @default(autoincrement())  // This comment is just for you  weight Float /// This comment gets attached to the `weight` node}// This comment is just for you. It will not// show up in the AST./// This comment will get attached to the/// Customer node.model Customer {  /**   * ...and so will this comment   */}
```

## Auto formatting[](https://www.prisma.io/docs/orm/prisma-schema/overview#auto-formatting "Direct link to Auto formatting")

Prisma ORM supports formatting `.prisma` files automatically. There are two ways to format `.prisma` files:

-   Run the [`prisma format`](https://www.prisma.io/docs/orm/reference/prisma-cli-reference#format) command.
-   Install the [Prisma VS Code extension](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) and invoke the [VS Code format action](https://code.visualstudio.com/docs/editor/codebasics#_formatting) - manually or on save.

There are no configuration options - [formatting rules](https://www.prisma.io/docs/orm/prisma-schema/overview#formatting-rules) are fixed (similar to Golang's `gofmt` but unlike Javascript's `prettier`):

### Formatting rules[](https://www.prisma.io/docs/orm/prisma-schema/overview#formatting-rules "Direct link to Formatting rules")

#### Configuration blocks are aligned by their `=` sign[](https://www.prisma.io/docs/orm/prisma-schema/overview#configuration-blocks-are-aligned-by-theirsign "Direct link to configuration-blocks-are-aligned-by-theirsign")

```bash
block _ {  key      = "value"  key2     = 1  long_key = true}
```

#### Field definitions are aligned into columns separated by 2 or more spaces[](https://www.prisma.io/docs/orm/prisma-schema/overview#field-definitions-are-aligned-into-columns-separated-by-2-or-more-spaces "Direct link to Field definitions are aligned into columns separated by 2 or more spaces")

```scss
block _ {  id          String       @id  first_name  LongNumeric  @default}
```

#### Empty lines resets block alignment and formatting rules[](https://www.prisma.io/docs/orm/prisma-schema/overview#empty-lines-resets-block-alignment-and-formatting-rules "Direct link to Empty lines resets block alignment and formatting rules")

```bash
block _ {  key   = "value"  key2  = 1  key10 = true  long_key   = true  long_key_2 = true}
```

```scss
block _ {  id  String  @id              @default  first_name  LongNumeric  @default}
```

#### Multiline field attributes are properly aligned with the rest of the field attributes[](https://www.prisma.io/docs/orm/prisma-schema/overview#multiline-field-attributes-are-properly-aligned-with-the-rest-of-the-field-attributes "Direct link to Multiline field attributes are properly aligned with the rest of the field attributes")

```scss
block _ {  id          String       @id                           @default  first_name  LongNumeric  @default}
```

#### Block attributes are sorted to the end of the block[](https://www.prisma.io/docs/orm/prisma-schema/overview#block-attributes-are-sorted-to-the-end-of-the-block "Direct link to Block attributes are sorted to the end of the block")

```graphql
block _ {  key   = "value"  @@attribute}
```
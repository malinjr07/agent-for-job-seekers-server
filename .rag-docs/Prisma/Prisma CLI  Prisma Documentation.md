The Prisma command line interface (CLI) is the primary way to interact with your Prisma project from the command line. It can initialize new project assets, generate Prisma Client, and analyze existing database structures through introspection to automatically create your application models.

## Command reference[](https://www.prisma.io/docs/orm/tools/prisma-cli#command-reference "Direct link to Command reference")

See [Prisma CLI command reference](https://www.prisma.io/docs/orm/reference/prisma-cli-reference) for a complete list of commands.

## Installation[](https://www.prisma.io/docs/orm/tools/prisma-cli#installation "Direct link to Installation")

The Prisma CLI is typically installed locally as a **development dependency**, that's why the `--save-dev` (npm) and `--dev` (Yarn) options are used in the commands below.

### npm[](https://www.prisma.io/docs/orm/tools/prisma-cli#npm "Direct link to npm")

Install with [npm](https://www.npmjs.com/):

```css
npm install prisma --save-dev
```

### Yarn[](https://www.prisma.io/docs/orm/tools/prisma-cli#yarn "Direct link to Yarn")

Install with [yarn](https://yarnpkg.com/):

### pnpm[](https://www.prisma.io/docs/orm/tools/prisma-cli#pnpm "Direct link to pnpm")

Install with [pnpm](https://pnpm.io/):

```css
pnpm install prisma --save-dev
```

### Bun[](https://www.prisma.io/docs/orm/tools/prisma-cli#bun "Direct link to Bun")

Install with [Bun](https://bun.sh/):

## Usage[](https://www.prisma.io/docs/orm/tools/prisma-cli#usage "Direct link to Usage")

If you installed Prisma as a development dependency, you need to prefix the `prisma` command with your package runner.

### npm[](https://www.prisma.io/docs/orm/tools/prisma-cli#npm-1 "Direct link to npm")

### Yarn[](https://www.prisma.io/docs/orm/tools/prisma-cli#yarn-1 "Direct link to Yarn")

### pnpm[](https://www.prisma.io/docs/orm/tools/prisma-cli#pnpm-1 "Direct link to pnpm")

### Bun[](https://www.prisma.io/docs/orm/tools/prisma-cli#bun-1 "Direct link to Bun")

## Synopsis[](https://www.prisma.io/docs/orm/tools/prisma-cli#synopsis "Direct link to Synopsis")

The `prisma` command can be called from command line once installed. When called without arguments, it will display its command usage and help document:

Show CLI results

```kotlin
$ npx prisma    ◭  Prisma is a modern DB toolkit to query, migrate and model your database (https://prisma.io)    Usage      $ prisma [command]    Commands                init   Set up Prisma for your app            generate   Generate artifacts (e.g. Prisma Client)                  db   Manage your database schema and lifecycle             migrate   Migrate your database              studio   Browse your data with Prisma Studio            validate   Validate your Prisma schema              format   Format your Prisma schema             version   Displays Prisma version info               debug   Displays Prisma debug info                 mcp   Starts an MCP server to use with AI development tools    Flags         --preview-feature   Run Preview Prisma commands         --help, -h          Show additional information about a command    Examples      Set up a new Prisma project      $ prisma init      Generate artifacts (e.g. Prisma Client)      $ prisma generate      Browse your data      $ prisma studio      Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)      $ prisma migrate dev      Pull the schema from an existing database, updating the Prisma schema      $ prisma db pull      Push the Prisma schema state to the database      $ prisma db push      Validate your Prisma schema      $ prisma validate      Format your Prisma schema      $ prisma format      Display Prisma version info      $ prisma version      Display Prisma debug info      $ prisma debug
```

You can get additional help on any of the `prisma` commands by adding the `--help` flag after the command.

## Exit codes[](https://www.prisma.io/docs/orm/tools/prisma-cli#exit-codes "Direct link to Exit codes")

All `prisma` CLI commands return the following codes when they exit:

-   exit code 0 when a command runs successfully
-   exit code 1 when a command errors
-   exit code 130 when the CLI receives a signal interrupt (SIGINT) message or if the user cancels a prompt. This exit code is available in Prisma ORM versions 4.3.0 and later.

## Telemetry[](https://www.prisma.io/docs/orm/tools/prisma-cli#telemetry "Direct link to Telemetry")

The term **telemetry** refers to the collection of certain usage data to help _improve the quality of a piece of software_. Prisma uses telemetry in two contexts:

-   when it collects CLI usage data
-   when it submits CLI error reports

This page describes the overall telemetry approach for Prisma, what kind of data is collected and how to opt-out of data collection.

### Why does Prisma collect metrics?[](https://www.prisma.io/docs/orm/tools/prisma-cli#why-does-prisma-collect-metrics "Direct link to Why does Prisma collect metrics?")

Telemetry helps us better understand _how many users_ are using our products and _how often_ they are using our products. Unlike many telemetry services, our telemetry implementation is intentionally limited in scope and is actually useful for the developer:

-   **Limited in scope**: We use telemetry to answer one question: how many monthly active developers are using Prisma CLI?
-   **Provides value**: Our telemetry service also checks for version updates and offers security notices.

### When is data collected?[](https://www.prisma.io/docs/orm/tools/prisma-cli#when-is-data-collected "Direct link to When is data collected?")

Data is collected in two scenarios that are described below.

#### Usage data[](https://www.prisma.io/docs/orm/tools/prisma-cli#usage-data "Direct link to Usage data")

Invocations of the `prisma` CLI and general usage of Studio results in data being sent to the telemetry server at [https://checkpoint.prisma.io](https://checkpoint.prisma.io/). Note that:

-   The data does **not** include your schema or the data in your database
-   Prisma only sends information after you execute a CLI command

Here is an overview of the data that's being submitted:

|    Field     | Attributes |                                     Description                                      |
|--------------|------------|--------------------------------------------------------------------------------------|
|   `product`    |   _string_   |                          Name of the product (e.g. `prisma`)                           |
|   `version`    |   _string_   |             Currently installed version of the product (e.g. `1.0.0-rc0`)              |
|     `arch`     |   _string_   |                 Client's operating system architecture (e.g. `amd64`).                 |
|      `os`      |   _string_   |                       Client's operating system (e.g. `darwin`).                       |
| `node_version` |   _string_   |                        Client's node version (e.g. `v12.12.0`).                        |
|  `signature`   |   _string_   | Random, non-identifiable signature UUID (e.g. `91b014df3-9dda-4a27-a8a7-15474fd899f8`) |
|  `user_agent`  |   _string_   |           User agent of the checkpoint client (e.g. `prisma/js-checkpoint`)            |
|  `timestamp`   |   _string_   |       When the request was made in RFC3339 format (e.g. `2019-12-12T17:45:56Z`)        |

You can opt-out of this behavior by setting the `CHECKPOINT_DISABLE` environment variable to `1`, e.g.:

```bash
export CHECKPOINT_DISABLE=1
```

#### Error reporting[](https://www.prisma.io/docs/orm/tools/prisma-cli#error-reporting "Direct link to Error reporting")

Prisma potentially collects error data when there is a crash in the CLI.

Before an error report is submitted, there will _always_ be a prompt asking you to confirm or deny the submission of the error report! Error reports are never submitted without your explicit consent!

### How to opt-out of data collection?[](https://www.prisma.io/docs/orm/tools/prisma-cli#how-to-opt-out-of-data-collection "Direct link to How to opt-out of data collection?")

#### Usage data[](https://www.prisma.io/docs/orm/tools/prisma-cli#usage-data-1 "Direct link to Usage data")

You can opt-out of usage data collection by setting the `CHECKPOINT_DISABLE` environment variable to `1`, e.g.:

```bash
export CHECKPOINT_DISABLE=1
```

#### Error reporting[](https://www.prisma.io/docs/orm/tools/prisma-cli#error-reporting-1 "Direct link to Error reporting")

You can opt-out of data collection by responding to the interactive prompt with _no_.
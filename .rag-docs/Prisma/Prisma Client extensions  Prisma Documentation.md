info

Prisma Client extensions are Generally Available from versions 4.16.0 and later. They were introduced in Preview in version 4.7.0. Make sure you enable the `clientExtensions` Preview feature flag if you are running on a version earlier than 4.16.0.

You can use Prisma Client extensions to add functionality to your models, result objects, and queries, or to add client-level methods.

You can create an extension with one or more of the following component types:

-   `model`: [add custom methods or fields to your models](https://www.prisma.io/docs/orm/prisma-client/client-extensions/model)
-   `client`: [add client-level methods to Prisma Client](https://www.prisma.io/docs/orm/prisma-client/client-extensions/client)
-   `query`: [create custom Prisma Client queries](https://www.prisma.io/docs/orm/prisma-client/client-extensions/query)
-   `result`: [add custom fields to your query results](https://www.prisma.io/docs/orm/prisma-client/client-extensions/result)

For example, you might create an extension that uses the `model` and `client` component types.

## About Prisma Client extensions[](https://www.prisma.io/docs/orm/prisma-client/client-extensions#about-prisma-client-extensions "Direct link to About Prisma Client extensions")

When you use a Prisma Client extension, you create an _extended client_. An extended client is a lightweight variant of the standard Prisma Client that is wrapped by one or more extensions. The standard client is not mutated. You can add as many extended clients as you want to your project. [Learn more about extended clients](https://www.prisma.io/docs/orm/prisma-client/client-extensions#extended-clients).

You can associate a single extension, or multiple extensions, with an extended client. [Learn more about multiple extensions](https://www.prisma.io/docs/orm/prisma-client/client-extensions#multiple-extensions).

You can [share your Prisma Client extensions](https://www.prisma.io/docs/orm/prisma-client/client-extensions/shared-extensions) with other Prisma ORM users, and [import Prisma Client extensions developed by other users](https://www.prisma.io/docs/orm/prisma-client/client-extensions/shared-extensions#install-a-shared-packaged-extension) into your Prisma ORM project.

### Extended clients[](https://www.prisma.io/docs/orm/prisma-client/client-extensions#extended-clients "Direct link to Extended clients")

Extended clients interact with each other, and with the standard client, as follows:

-   Each extended client operates independently in an isolated instance.
-   Extended clients cannot conflict with each other, or with the standard client.
-   All extended clients and the standard client communicate with the same [Prisma ORM query engine](https://www.prisma.io/docs/orm/more/under-the-hood/engines).
-   All extended clients and the standard client share the same connection pool.

> **Note**: The author of an extension can modify this behavior since they're able to run arbitrary code as part of an extension. For example, an extension might actually create an entirely new `PrismaClient` instance (including its own query engine and connection pool). Be sure to check the documentation of the extension you're using to learn about any specific behavior it might implement.

### Example use cases for extended clients[](https://www.prisma.io/docs/orm/prisma-client/client-extensions#example-use-cases-for-extended-clients "Direct link to Example use cases for extended clients")

Because extended clients operate in isolated instances, they can be a good way to do the following, for example:

-   Implement row-level security (RLS), where each HTTP request has its own client with its own RLS extension, customized with session data. This can keep each user entirely separate, each in a separate client.
-   Add a `user.current()` method for the `User` model to get the currently logged-in user.
-   Enable more verbose logging for requests if a debug cookie is set.
-   Attach a unique request id to all logs so that you can correlate them later, for example to help you analyze the operations that Prisma Client carries out.
-   Remove a `delete` method from models unless the application calls the admin endpoint and the user has the necessary privileges.

## Add an extension to Prisma Client[](https://www.prisma.io/docs/orm/prisma-client/client-extensions#add-an-extension-to-prisma-client "Direct link to Add an extension to Prisma Client")

You can create an extension using two primary ways:

-   Use the client-level [`$extends`](https://www.prisma.io/docs/orm/reference/prisma-client-reference#client-methods) method
    
    ```php
    const prisma = new PrismaClient().$extends({  name: 'signUp', // Optional: name appears in error logs  model: {        // This is a `model` component    user: { ... } // The extension logic for the `user` model goes inside the curly braces  },})
    ```
    
-   Use the `Prisma.defineExtension` method to define an extension and assign it to a variable, and then pass the extension to the client-level `$extends` method
    
    ```javascript
    import { Prisma } from '@prisma/client'// Define the extensionconst myExtension = Prisma.defineExtension({  name: 'signUp', // Optional: name appears in error logs  model: {        // This is a `model` component    user: { ... } // The extension logic for the `user` model goes inside the curly braces  },})// Pass the extension to a Prisma Client instanceconst prisma = new PrismaClient().$extends(myExtension)
    ```
    
    tip
    
    This pattern is useful for when you would like to separate extensions into multiple files or directories within a project.
    

The above examples use the [`model` extension component](https://www.prisma.io/docs/orm/prisma-client/client-extensions/model) to extend the `User` model.

In your `$extends` method, use the appropriate extension component or components ([`model`](https://www.prisma.io/docs/orm/prisma-client/client-extensions/model), [`client`](https://www.prisma.io/docs/orm/prisma-client/client-extensions/client), [`result`](https://www.prisma.io/docs/orm/prisma-client/client-extensions/result) or [`query`](https://www.prisma.io/docs/orm/prisma-client/client-extensions/query)).

## Name an extension for error logs[](https://www.prisma.io/docs/orm/prisma-client/client-extensions#name-an-extension-for-error-logs "Direct link to Name an extension for error logs")

You can name your extensions to help identify them in error logs. To do so, use the optional field `name`. For example:

```go
const prisma = new PrismaClient().$extends({  name: `signUp`,  // (Optional) Extension name  model: {    user: { ... } },})
```

## Multiple extensions[](https://www.prisma.io/docs/orm/prisma-client/client-extensions#multiple-extensions "Direct link to Multiple extensions")

You can associate an extension with an [extended client](https://www.prisma.io/docs/orm/prisma-client/client-extensions#about-prisma-client-extensions) in one of two ways:

-   You can associate it with an extended client on its own, or
-   You can combine the extension with other extensions and associate all of these extensions with an extended client. The functionality from these combined extensions applies to the same extended client. Note: [Combined extensions can conflict](https://www.prisma.io/docs/orm/prisma-client/client-extensions#conflicts-in-combined-extensions).

You can combine the two approaches above. For example, you might associate one extension with its own extended client and associate two other extensions with another extended client. [Learn more about how client instances interact](https://www.prisma.io/docs/orm/prisma-client/client-extensions#extended-clients).

### Apply multiple extensions to an extended client[](https://www.prisma.io/docs/orm/prisma-client/client-extensions#apply-multiple-extensions-to-an-extended-client "Direct link to Apply multiple extensions to an extended client")

In the following example, suppose that you have two extensions, `extensionA` and `extensionB`. There are two ways to combine these.

#### Option 1: Declare the new client in one line[](https://www.prisma.io/docs/orm/prisma-client/client-extensions#option-1-declare-the-new-client-in-one-line "Direct link to Option 1: Declare the new client in one line")

With this option, you apply both extensions to a new client in one line of code.

```less
// First of all, store your original Prisma Client in a variable as usualconst prisma = new PrismaClient()// Declare an extended client that has an extensionA and extensionBconst prismaAB = prisma.$extends(extensionA).$extends(extensionB)
```

You can then refer to `prismaAB` in your code, for example `prismaAB.myExtensionMethod()`.

#### Option 2: Declare multiple extended clients[](https://www.prisma.io/docs/orm/prisma-client/client-extensions#option-2-declare-multiple-extended-clients "Direct link to Option 2: Declare multiple extended clients")

The advantage of this option is that you can call any of the extended clients separately.

```less
// First of all, store your original Prisma Client in a variable as usualconst prisma = new PrismaClient()// Declare an extended client that has extensionA appliedconst prismaA = prisma.$extends(extensionA)// Declare an extended client that has extensionB appliedconst prismaB = prisma.$extends(extensionB)// Declare an extended client that is a combination of clientA and clientBconst prismaAB = prismaA.$extends(extensionB)
```

In your code, you can call any of these clients separately, for example `prismaA.myExtensionMethod()`, `prismaB.myExtensionMethod()`, or `prismaAB.myExtensionMethod()`.

### Conflicts in combined extensions[](https://www.prisma.io/docs/orm/prisma-client/client-extensions#conflicts-in-combined-extensions "Direct link to Conflicts in combined extensions")

When you combine two or more extensions into a single extended client, then the _last_ extension that you declare takes precedence in any conflict. In the example in option 1 above, suppose there is a method called `myExtensionMethod()` defined in `extensionA` and a method called `myExtensionMethod()` in `extensionB`. When you call `prismaAB.myExtensionMethod()`, then Prisma Client uses `myExtensionMethod()` as defined in `extensionB`.

## Type of an extended client[](https://www.prisma.io/docs/orm/prisma-client/client-extensions#type-of-an-extended-client "Direct link to Type of an extended client")

You can infer the type of an extended Prisma Client instance using the [`typeof`](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html) utility as follows:

```csharp
const extendedPrismaClient = new PrismaClient().$extends({  /** extension */})type ExtendedPrismaClient = typeof extendedPrismaClient
```

If you're using Prisma Client as a singleton, you can get the type of the extended Prisma Client instance using the `typeof` and [`ReturnType`](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype) utilities as follows:

```csharp
function getExtendedClient() {  return new PrismaClient().$extends({    /* extension */  })}type ExtendedPrismaClient = ReturnType<typeof getExtendedClient>
```

## Extending model types with `Prisma.Result`[](https://www.prisma.io/docs/orm/prisma-client/client-extensions#extending-model-types-with-prismaresult "Direct link to extending-model-types-with-prismaresult")

You can use the `Prisma.Result` type utility to extend model types to include properties added via client extensions. This allows you to infer the type of the extended model, including the extended properties.

### Example[](https://www.prisma.io/docs/orm/prisma-client/client-extensions#example "Direct link to Example")

The following example demonstrates how to use `Prisma.Result` to extend the `User` model type to include a `__typename` property added via a client extension.

```javascript
import { PrismaClient, Prisma } from '@prisma/client'const prisma = new PrismaClient().$extends({  result: {    user: {      __typename: {        needs: {},        compute() {          return 'User'        },      },    },  },})type ExtendedUser = Prisma.Result<typeof prisma.user, { select: { id: true } }, 'findFirstOrThrow'>async function main() {  const user: ExtendedUser = await prisma.user.findFirstOrThrow({    select: {      id: true,      __typename: true,    },  })  console.log(user.__typename) // Output: 'User'}main()
```

The `Prisma.Result` type utility is used to infer the type of the extended `User` model, including the `__typename` property added via the client extension.

## Limitations[](https://www.prisma.io/docs/orm/prisma-client/client-extensions#limitations "Direct link to Limitations")

### Usage of client-level methods in extended clients[](https://www.prisma.io/docs/orm/prisma-client/client-extensions#usage-of-client-level-methods-in-extended-clients "Direct link to Usage of client-level methods in extended clients")

[Client-level methods](https://www.prisma.io/docs/orm/reference/prisma-client-reference#client-methods) do not necessarily exist on extended clients. For these clients you will need to first check for existence before using.

```php
const xPrisma = new PrismaClient().$extends(...);if (xPrisma.$connect) {  xPrisma.$connect()}
```

### Usage with nested operations[](https://www.prisma.io/docs/orm/prisma-client/client-extensions#usage-with-nested-operations "Direct link to Usage with nested operations")

The `query` extension type does not support nested read and write operations.
# Nest module file responsibilities

This document summarizes **why** we create `*.controller.ts`, `*.module.ts`, and `*.service.ts` files for each feature module in a NestJS application, and what types of tasks each of them is responsible for. The intent is to stay aligned with the official NestJS docs stored under `.rag-docs/nest-js` (especially _Controllers_, _Modules_, and _Providers_).

---

## Why we have `*.controller.ts`

From the NestJS docs (`Controllers` chapter):

- Controllers are responsible for **handling incoming requests** and **sending responses** back to the client.
- Nest uses **routing** metadata (e.g. `@Controller('cats')`, `@Get()`, `@Post()`) to map an HTTP request to a specific controller method.
- A controller is therefore the **boundary between the outside world (HTTP / WebSocket / etc.) and our internal application logic**.

In a feature like `cats`, that leads to a dedicated file such as `cats.controller.ts`:

- It groups all routes for a single resource (e.g. `/cats`, `/cats/:id`) into one place.
- It keeps the transport-related details (HTTP method, route path, query/route/body decorators) **close to the handler**.
- It allows Nest to register these handlers by listing the controller in the module’s `controllers` array.

### Responsibilities of `*.controller.ts`

A `*.controller.ts` file should focus on:

- **Defining routes and HTTP methods**
  - Use decorators like `@Controller()`, `@Get()`, `@Post()`, `@Put()`, `@Delete()`, `@Patch()`, `@All()`, etc.
  - Configure **paths and route parameters** (e.g. `@Get(':id')`, `@Param('id')`).

- **Mapping request data into method parameters**
  - Use decorators such as `@Body()`, `@Query()`, `@Param()`, `@Headers()`, `@Req()`, `@Res()` when necessary.
  - Use DTO classes for typed bodies and validation, as recommended in the docs.

- **Coordinating with services (providers)**
  - Inject services (e.g. `constructor(private readonly catsService: CatsService) {}`) and delegate real work to them.
  - Controllers should stay thin: minimal branching / orchestration logic, **no persistence or heavy business rules**.

- **Controlling HTTP-level behavior when needed**
  - Optionally adjust status codes with `@HttpCode()`, headers with `@Header()`, or redirection with `@Redirect()`.
  - Optionally drop into framework-specific mode via `@Res()` if really necessary (with the trade-offs described in the docs).

In short, a `*.controller.ts` **translates HTTP (or other transport) into method calls on services and translates results back into responses**.

---

## Why we have `*.service.ts` (services as providers)

From the NestJS `Providers` chapter:

- Providers (including services) are **plain classes** that Nest can instantiate and inject.
- Controllers should handle HTTP and **delegate more complex tasks to providers**.
- A typical example is a `CatsService` handling **data storage and retrieval** and any associated domain logic.

That leads to one or more `*.service.ts` files per feature (e.g. `cats.service.ts`):

- They encapsulate **business logic and data access** behind a well-defined API.
- They can be **shared** across multiple controllers or modules through dependency injection.
- They take advantage of Nest’s IoC container and scoping model (singleton/request-scoped, etc.).

### Responsibilities of `*.service.ts`

A `*.service.ts` file should focus on:

- **Business logic** for a feature
  - Implement use cases like `createCat`, `findAllCats`, `updateCat`, `removeCat`, etc.
  - Enforce domain rules and invariants (e.g. validation beyond simple DTO checks, state transitions).

- **Data access and integration**
  - Interact with repositories, Prisma/ORM clients, external APIs, queues, etc.
  - Translate domain operations to persistence operations while keeping that detail **out of controllers**.

- **Being an injectable dependency**
  - Use `@Injectable()` so Nest can manage its lifecycle.
  - Be registered under the module’s `providers` array so controllers (and other providers) can inject it.

- **Optionally, maintaining shared, in-memory state**
  - For example, caching within the service, if appropriate, leveraging the fact that providers are singletons by default.

In short, a `*.service.ts` **owns the “how” of doing work for a domain**, while controllers own the “when” and “from which route/HTTP call”.

---

## Why we have `*.module.ts`

From the NestJS `Modules` chapter:

- A module is a class annotated with `@Module()` that **groups related capabilities**.
- Modules are used to build the internal **application graph**: which controllers and providers exist, and how they depend on each other.
- Feature modules (like `CatsModule`) bundle together controllers and services for a particular domain.

That leads to a `*.module.ts` file per domain (e.g. `cats.module.ts`):

- It acts as the **composition root for that feature**, declaring what controllers and providers belong to it.
- It defines which providers are **exported** and therefore usable by other modules.
- It imports other modules it depends on.

### Responsibilities of `*.module.ts`

A `*.module.ts` file should focus on:

- **Declaring which controllers exist in this feature**
  - `controllers: [CatsController, ...]`
  - This is how Nest knows to instantiate route handlers.

- **Declaring which providers (services, repositories, helpers) exist in this feature**
  - `providers: [CatsService, ...]`
  - This wires the DI container: controllers and other providers can inject these by type or token.

- **Defining module boundaries via imports/exports**
  - `imports: [...]` to bring in other modules’ exported providers.
  - `exports: [...]` to expose a subset of this module’s providers to other modules.
  - This creates clear, explicit dependencies instead of everything being global.

- **Optional cross-cutting configuration for the feature**
  - Mark the module as `@Global()` when its providers should be available everywhere (used sparingly).
  - For more advanced cases, expose `forRoot()` / `forRootAsync()`-style static methods for dynamic modules.

In short, a `*.module.ts` **defines the feature’s dependency graph: which controllers and services exist, how they are wired, and what is exported to the rest of the app**.

---

## How they work together in a feature module

Given a typical structure like:

- `cats.controller.ts`
- `cats.service.ts`
- `cats.module.ts`

The flow is:

1. The **module** (`cats.module.ts`):
   - Declares `CatsController` and `CatsService`.
   - Optionally exports `CatsService` so other modules can reuse it.

2. The **controller** (`cats.controller.ts`):
   - Exposes HTTP endpoints like `GET /cats`, `POST /cats`, `GET /cats/:id`.
   - Uses decorators and DTOs to handle request mapping and validation.
   - Injects `CatsService` and delegates work.

3. The **service** (`cats.service.ts`):
   - Implements the domain logic and data access.
   - Is injected wherever needed (controllers or other providers) as a provider.

This separation gives:

- Clear **responsibility boundaries**.
- High **testability** (services can be tested without HTTP; controllers can be tested with mocked services).
- Good **modularity**: features are grouped into their own modules, and services can be shared or encapsulated as needed.

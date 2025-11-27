# Agent for Job Seeker

## Directory Structure

We will use a **Feature-Based Structure**, organizing files by feature/domain rather than by file type (e.g., all controllers in one folder).
This structure groups all related components for a specific function (like users or auth) within a single directory.

### Example Structure

```
src/
├── modules/ (or simply just domain folders under src)
│   ├── users/
│   │   ├── controllers/
│   │   │   └── users.controller.ts (handles HTTP requests)
│   │   ├── services/
│   │   │   └── users.service.ts (contains business logic)
│   │   ├── dtos/
│   │   │   └── create-user.dto.ts (Data Transfer Objects)
│   │   ├── entities/
│   │   │   └── user.entity.ts (data structure/ORM entities)
│   │   ├── repositories/ (optional, for explicit data access layer)
│   │   └── users.module.ts (encapsulates the feature)
│   ├── auth/
│   │   ├── controllers/
│   │   ├── services/
│   │   └── auth.module.ts
├── common/ (reusable, lightweight utilities across modules)
│   ├── guards/
│   ├── pipes/
│   ├── decorators/
│   └── utils/ (helper functions)
├── config/ (configuration files for different environments)
├── middleware/ (custom middleware functions)
├── app.module.ts (the root module of the application)
└── main.ts (the application entry point/bootstrap file)
```
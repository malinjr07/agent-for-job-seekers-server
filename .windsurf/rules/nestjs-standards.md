# NestJS Project Standards

**Activation Mode:** Always On

**Priority:** High

## General Protocols

### NestJS Backend Project

- **Context:** This is a **NestJS** backend API project with PostgreSQL database.
- **Architecture:** Modular architecture with dependency injection, decorators, and middleware.
- **Documentation:** Before making changes, check `../rag-docs/` for official documentation of each library/package or existing markdown conversation logs.
- **ORM:** Uses Prisma as the ORM for database operations.
- **Authentication:** JWT-based authentication with EdDSA algorithm.

## Package Manager

- **Core Tool:** `yarn` (version 4.x)
- **Installation:** `yarn add <package>` (or `yarn add -D <package>` for dev dependencies)
- **Scripts:** Use `yarn start:dev`, `yarn build`, `yarn start:prod`, `yarn lint`
- **Testing:** Use `yarn test` for unit tests, `yarn test:e2e` for end-to-end tests

## Import Aliases & Paths

**Strictly use the following aliases defined in `tsconfig.json`. Do not use relative paths (like `../../`) when an alias is available.**

| Alias           | Path                      | Description           |
| :-------------- | :------------------------ | :-------------------- |
| `@dto/*`        | `src/dto/*`               | Data Transfer Objects |
| `@prisma/*`     | `src/prisma/*`            | Prisma-related files  |
| `@modules/*`    | `src/modules/*`           | Feature modules       |
| `@config/*`     | `src/config/*`            | Configuration files   |
| `@middleware/*` | `src/middleware/*`        | Custom middleware     |
| `@decorators/*` | `src/common/decorators/*` | Custom decorators     |
| `@guards/*`     | `src/common/guards/*`     | Authentication guards |
| `@pipes/*`      | `src/common/pipes/*`      | Validation pipes      |
| `@utils/*`      | `src/common/utils/*`      | Utility functions     |

**Rule:** When importing, use the keyword alias.
_Example_: `import { JwtAuthGuard } from '@guards/jwt-auth.guard';`

## Coding Standards

### NestJS Framework

- **Modules:** Use `@Module()` decorator with proper imports, controllers, and providers
- **Controllers:** Use `@Controller()` with route prefixes and HTTP method decorators
- **Services:** Use `@Injectable()` decorator and implement business logic
- **Dependency Injection:** Use constructor injection for dependencies
- **Async Operations:** Use async/await for database operations and external API calls

### Database & ORM

- **ORM:** Use Prisma for all database operations
- **Migrations:** Use `yarn prisma migrate dev` for schema changes
- **Generated Types:** Import from `@prisma/client` for database types
- **Transactions:** Use Prisma transactions for multi-operation consistency
- **Queries:** Use Prisma query builder for type-safe database operations

### Authentication & Security

- **JWT:** Use EdDSA algorithm with custom JWT guard
- **Password Hashing:** Use argon2 for password hashing
- **Guards:** Implement custom guards for route protection
- **Validation:** Use class-validator with DTOs for input validation
- **CORS:** Configure CORS properly in main.ts

### Validation & DTOs

- **Validation:** Use class-validator decorators in DTOs
- **Transformation:** Use class-transformer for data transformation
- **Pipes:** Use ValidationPipe globally for automatic validation
- **Error Handling:** Return proper error messages with validation details
- **Strong Validation:** Implement comprehensive validation rules (password complexity, email format, etc.)

## Implementation Guidelines

### File Structure

- **Feature-Based:** Organize code by feature modules in `src/modules/`
- **Shared Code:** Place common utilities in `src/common/`
- **Configuration:** Store config files in `src/config/`
- **Database:** Prisma schema and migrations in `prisma/` directory
- **DTOs:** Place DTOs in `src/dto/` or within feature modules
- **Follow established directory structure** and maintain naming consistency

### Module Structure

Each feature module should contain:

- `*.module.ts` - Module definition
- `*.controller.ts` - HTTP endpoints
- `*.service.ts` - Business logic
- `*.dto.ts` - Data transfer objects
- `*.entity.ts` - Database entities (if not using Prisma)

### Code Quality

- **TypeScript:** Use TypeScript for type safety with strict mode enabled
- **Type Definitions:** Use `interface` for entity definitions, `type` for utility types
- **ESLint:** Follow ESLint configuration with NestJS rules
- **Prettier:** Use Prettier for code formatting
- **Imports:** Ensure all imports use proper aliases
- **Testing:** Write unit tests for services and integration tests for controllers

### API Design

- **RESTful:** Follow REST conventions for API design
- **HTTP Status Codes:** Use appropriate HTTP status codes
- **Error Responses:** Consistent error response format
- **Pagination:** Implement pagination for list endpoints
- **Filtering:** Support filtering and sorting where applicable
- **Rate Limiting:** Implement rate limiting for sensitive endpoints

### Database Design

- **Schema First:** Design database schema with Prisma
- **Relationships:** Define proper relationships between entities
- **Indexes:** Add indexes for frequently queried fields
- **Soft Delete:** Implement soft delete where appropriate
- **Timestamps:** Include createdAt and updatedAt fields

## Examples

**Correct Import:**

```typescript
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { CreateUserDto } from '@dto/create-user.dto';
import { UsersService } from '@modules/users/users.service';
import { ConfigService } from '@config/config.service';
import { validateEmail } from '@utils/validation';
```

**Incorrect Import:**

```typescript
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../modules/users/users.service';
```

**Correct Module Structure:**

```typescript
@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

**Correct Controller:**

```typescript
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Query() query: FindAllUsersDto) {
    return this.usersService.findAll(query);
  }
}
```

**Correct Service:**

```typescript
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await hash(createUserDto.password);
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }
}
```

**Correct DTO:**

```typescript
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  password: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Handle can only contain letters, numbers, and underscores',
  })
  handle: string;
}
```

## Development Workflow

### Git & Commits

- **Commit Convention:** Use conventional commits with descriptive messages
- **Branch Strategy:** Feature branches with descriptive names
- **Code Review:** Ensure all code follows these standards before merging
- **Pre-commit:** Use Husky for pre-commit hooks (linting, formatting)

### Database Management

- **Migrations:** `yarn prisma migrate dev` for development
- **Generation:** `yarn prisma generate` after schema changes
- **Studio:** `yarn prisma studio` for database inspection
- **Seeding:** Use `yarn prisma db seed` for database seeding

### Build & Deployment

- **Development:** `yarn start:dev` for local development with hot reload
- **Production:** `yarn build` for production build
- **Start:** `yarn start:prod` for production server
- **Linting:** `yarn lint` for code quality checks

### Best Practices

- **Error Handling:** Use try-catch blocks and proper error responses
- **Logging:** Implement structured logging for debugging
- **Environment Variables:** Use `.env` files for configuration
- **Security:** Validate all inputs and sanitize outputs
- **Performance:** Use database indexes and query optimization
- **Testing:** Write comprehensive tests for all business logic
- **Documentation:** Document API endpoints with Swagger/OpenAPI

### Security Best Practices

- **Input Validation:** Always validate user input with DTOs
- **SQL Injection:** Use Prisma parameterized queries
- **XSS Protection:** Sanitize user-generated content
- **Rate Limiting:** Implement rate limiting for API endpoints
- **HTTPS:** Use HTTPS in production
- **Environment Security:** Never commit sensitive data to version control

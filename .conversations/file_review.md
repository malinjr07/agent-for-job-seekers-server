# Source Code Review - File by File

## Core Files

### src/main.ts
- **Function**: Application entry point.
- **Details**: 
  - Bootstraps NestJS application.
  - Sets global prefix 'api'.
  - Uses global  with white-listing and checks .
  - Uses custom .
  - Listens on port 9000 (or  env).

### src/app.module.ts
- **Function**: Root application module.
- **Details**:
  - Imports feature modules: , , , , , , .
  - Providers: .
  - Controllers: .

### src/app.controller.ts & src/app.service.ts
- **Function**: Basic health check/hello world.
- **Details**: Returns "Hello World!" on root route.

## Config & Common

### src/config/jwt.config.ts
- **Function**: JWT Configuration.
- **Details**: 
  - Loads keys from `keys` directory.
  - Uses EdDSA algorithm.
  - Expiration: 7 days.

### src/common/guards/jwt-auth.guard.ts
- **Function**: Custom JWT Guard.
- **Details**:
  - Manually parses and validates JWT token (EdDSA).
  - Checks expiration.
  - Validates user existence in database via .
  - Throws  for various failure cases.

### src/common/utils/generate-keys.ts
- **Function**: Key generation utility.
- **Details**: Generates Ed25519 key pair in PEM format if not present.


## Modules

### src/modules/google-auth
- **Overview**: Handles Google OAuth flow and account connection.
- **Key Files**:
  - `google-auth.module.ts`: Registered with `PassportModule`.
  - `google-auth.controller.ts`: Endpoints `/google/auth` and `/google/callback`. Uses `GoogleAuthGuard`.
  - `google-auth.service.ts`:
    - Creates OAuth2 client.
    - `upsertGoogleAccount`: Stores/updates Google account tokens in DB.
    - `getOAuthClientForUser`: Retrieves stored tokens to recreate OAuth client.
  - `google.strategy.ts`:
    - Implements Passport Google Strategy.
    - Scopes: spreadsheets.readonly, userinfo.email, userinfo.profile.
    - Validates email and upserts account in DB on success.

### src/modules/users
- **Overview**: User management, authentication, and CRUD.
- **Key Files**:
  - `users.controller.ts`:
    - `/users/registration`: Creates user.
    - `/users/login`: Manual login (email/password).
    - `/users/list`: Paginated list of users.
    - `/users/single/:id`: Get/Update/Soft-delete user.
    - `/users/generators`: Generates fake users (dev only).
  - `users.service.ts`:
    - `create`: Hashes password (argon2), checks email/handle uniqueness.
    - `findAll`: Supports pagination, search, status filtering.
    - `login`: Verifies password, checks status (deleted?), generates JWT manually (EdDSA).
    - `generateToken`: Creates signed JWT with private key.
    - `generateFakeUsers`: Uses faker-js.
  - `create-user.dto.ts`: Strong validation (password complexity, no emojis, handle format).

### src/modules/email-templates
- **Overview**: CRUD operations for email templates.
- **Key Files**:
  - `email-templates.controller.ts`:
    - `POST /`: Create template.
    - `GET ?userId=...`: List templates by user.
    - `PUT /single/:id`: Update template.
    - `DELETE /single/:id`: Remove template.
  - `email-templates.service.ts`:
    - Standard CRUD using Prisma.
    - `create`: Stores name, body, variables.
    - `findAllByUser`: Returns list sorted by creation date (desc).

### src/modules/google-sheets
- **Overview**: Manages Google Sheets integration.
- **Key Files**:
  - `google-sheets.controller.ts`:
    - `POST /`: Add sheet (via URL).
    - `GET /:id/headers`: Get cached headers.
    - `PUT /:id/refresh`: Refresh headers from Google API.
  - `google-sheets.service.ts`:
    - `addSheetForUser`: 
      - Extracts Sheet ID from URL.
      - Uses `GoogleAuthService` to get OAuth client.
      - Fetches sheet title and 1st row (headers).
      - Stores `GoogleSheet` and `Header` in DB.
    - `refreshHeadersForSheet`: Re-fetches headers and updates DB.

### src/modules/resumes
- **Overview**: Resume management and PDF generation.
- **Key Files**:
  - `resumes.controller.ts`:
    - `POST /`: Create resume.
    - `GET /`: List resumes.
    - `POST /single/:id/generate-pdf`: Generates PDF.
  - `resumes.service.ts`:
    - `create`: Creates resume and sections.
    - `update`: Updates details; replaces sections (deleteMany + createMany).
    - `generatePdf`:
      - Uses Puppeteer to render HTML to PDF.
      - Uploads to S3.
      - Updates `pdfPath` in DB.
      - **Note**: Missing import for `PutObjectCommand`? Also `this.s3Client` seems undefined/missing in the snippet I read? (Need to verify imports).

### src/modules/leads
- **Overview**: Lead management (CRM-lite).
- **Key Files**:
  - `leads.controller.ts`:
    - CRUD for leads.
    - `POST /bulk`: Bulk import.
  - `leads.service.ts`:
    - `create`: Upsert based on email + leadSource.
    - `bulkCreate`: 
      - Rate limited (10k/30min).
      - Mismatched imports for prisma generated types?
      - Iterates and upserts leads. Returns stats and errors.

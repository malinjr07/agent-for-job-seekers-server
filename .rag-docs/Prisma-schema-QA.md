# Prisma Schema Q&A – Agent for Job Seekers

This document answers questions about the Prisma schema at `src/prisma/schema/schema.prisma`, grounded in the project spec in `.idea/Agent-for-Job-seekers.md`.

---

## 1. What are the `User` relations on lines 24–28 and why are they needed?

Snippet from schema:

```prisma
model User {
  id           String        @id @default(uuid(7)) @db.Uuid
  email        String        @unique @db.VarChar(255)
  passwordHash String        @db.VarChar(255)
  firstName    String        @db.VarChar(100)
  lastName     String        @db.VarChar(100)
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt

  googleSheets   GoogleSheet[]
  emailTemplates EmailTemplate[]
  resumes        Resume[]
  mailLogs       MailLog[]
  leads          Lead[]
}
```

These array fields define the **one‑to‑many relationships** described in the _Relationships_ section of `.idea/Agent-for-Job-seekers.md` (lines ~226–237):

- **`googleSheets   GoogleSheet[]`**
  - From spec:
    - _"Users 1:N GoogleSheets"_ (line 227).
    - GoogleSheets table: each sheet row has a `user_id` foreign key (lines 146–151).
  - Meaning: A user can connect multiple Google Sheets, each represented by a `GoogleSheet` record.
  - Why needed: the app lets a user import different lead sheets (different campaigns, sources, markets), so we must link many sheets back to one user.

- **`emailTemplates EmailTemplate[]`**
  - From spec:
    - _"Users 1:N EmailTemplates"_ (line 228).
    - EmailTemplates table: `user_id` foreign key (lines 168–171).
  - Meaning: A user owns many email templates.
  - Why needed: the product lets each user create multiple personalized templates for different outreach strategies.

- **`resumes        Resume[]`**
  - From spec:
    - _"Users 1:N Resumes"_ (line 229).
    - Resumes table: `user_id` foreign key (lines 178–183).
  - Meaning: A user can create multiple resume variants.
  - Why needed: the core idea is tailoring resumes per job/market; each variant is a `Resume` row linked to the user.

- **`mailLogs       MailLog[]`**
  - From spec:
    - _"Users 1:N MailLogs"_ (line 230).
    - MailLogs table: `user_id` foreign key (lines 199–205).
  - Meaning: All sent emails (batch sends, follow ups) are logged and tied back to a user.
  - Why needed: the dashboard and reporting features (lines 92–95, 544–551) require per‑user stats on emails sent, delivered, failed, etc.

- **`leads          Lead[]`**
  - From spec:
    - _"Users 1:N Leads"_ (line 231).
    - Leads table: `user_id` foreign key (lines 211–215).
  - Meaning: A user can own many leads sourced from tools like Apollo.
  - Why needed: the system stores rich lead data (`data JSONB`, lines 213–215) for each user so AI and email flows can work on that set.

In short, these relations directly implement the 1:N relationships listed in the spec so that Prisma can express, query, and enforce those links.

---

## 2. Why is `passwordHash` defined as `@db.VarChar(255)`?

Snippet:

```prisma
passwordHash String @db.VarChar(255)
```

From the _Users Table_ in the spec (lines 135–144):

- Column definition:
  - `password_hash | VARCHAR(255) | Hashed password` (line 140).

So the Prisma field is modeled to match the spec:

- **Type**: `String` in Prisma, mapped to PostgreSQL `VARCHAR(255)` via `@db.VarChar(255)`.
- **Why 255 and not TEXT or larger?**
  - The spec explicitly calls for `VARCHAR(255)`.
  - Typical password hashes (e.g. Argon2id, bcrypt, scrypt) encoded as base64 or modular crypt format strings are usually well under 255 characters.
  - Using `VARCHAR(255)` aligns with common practice and keeps the schema tight while still comfortably holding modern password hashes.

If in the future you decide to store longer hash formats or additional metadata, we could safely change this to `@db.Text` or increase the length, but for now it follows the written spec exactly.

---

## 3. What is stored in `sheetId` and why?

Snippet from `GoogleSheet`:

```prisma
model GoogleSheet {
  id         String   @id @default(uuid(7)) @db.Uuid
  userId     String   @db.Uuid
  sheetUrl   String   @db.Text
  sheetId    String   @db.VarChar(255)
  currentTab String   @db.VarChar(100)
  createdAt  DateTime @default(now())
  ...
}
```

From the _GoogleSheets Table_ spec (lines 146–155):

- Columns:
  - `sheet_url | TEXT | Full Google Sheets URL` (line 151).
  - `sheet_id | VARCHAR(255) | Extracted sheet ID` (line 152).

The **purpose of `sheetId`** is:

- Store the **canonical Google Sheet identifier** parsed from `sheet_url` (the part used by the Google Sheets API).
- Avoid re‑parsing the URL every time the backend needs to call Google APIs, and have a stable key to work with.

Why `@db.VarChar(255)`:

- The spec calls `sheet_id` a `VARCHAR(255)` field; Prisma mirrors that.
- Actual Google Sheet IDs are much shorter than 255 characters, so 255 is a safe upper bound.

Usage, based on the doc’s flows:

- During onboarding / Google Sheet integration (lines 535–538), you:
  - Accept `sheet_url` from the user.
  - Validate access, then extract and store `sheet_id` for subsequent API calls.
- Later endpoints like:
  - `POST /api/sheets` (lines 252–255).
  - `GET /api/sheets/:id/headers` and `PUT /api/sheets/:id/refresh` (lines 256–259).
    use the stored DB row (including `sheetId`) to fetch headers and data from Google.

---

## 4. What is the `Header` model and how is it used?

Snippet:

```prisma
model Header {
  id            String   @id @default(uuid(7)) @db.Uuid
  googleSheetId String   @db.Uuid
  tabName       String   @db.VarChar(100)
  headers       Json?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  googleSheet GoogleSheet @relation(fields: [googleSheetId], references: [id], onDelete: Cascade)
}
```

This model corresponds to the **Headers Table** and related notes in the spec.

From the _Headers Table_ section (lines 156–163):

- Columns:
  - `id | UUIDv7 (Primary Key)` (line 159).
  - `google_sheet_id | UUIDv7 (Foreign Key to GoogleSheets)` (line 160).
  - `tab_name | VARCHAR(100)` (line 161).
  - `created_at`, `updated_at` timestamps (lines 162–163).
- And from GraphQL type `Header` (lines 333–340):

  ```graphql
  type Header {
    id: ID!
    googleSheetId: ID!
    tabName: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    # Note: Headers are stored as JSONB, but for GraphQL, we can expose as [String!]
    headers: [String!]!
  }
  ```

How this maps to the Prisma model:

- `id`, `googleSheetId`, `tabName`, `createdAt`, `updatedAt`
  - Directly from the table definition.
- `googleSheet GoogleSheet @relation(...)`
  - Implements the _"GoogleSheets 1:N Headers"_ relationship (line 232).
  - Each `GoogleSheet` can have multiple `Header` records.
- `headers Json?`
  - Implements the spec’s note that _"Headers are stored as JSONB"_.
  - In PostgreSQL this will typically be `JSONB`, and Prisma’s `Json` type maps to that.
  - Conceptually this stores an array of header names, e.g.:

    ```json
    ["Name", "Email", "Job Title", "Company", ...]
    ```

### Usage in the application (from the spec)

The spec references headers in several flows:

- **Google Sheets integration & header extraction** (lines 535–539):
  - After the user provides a Google Sheet URL, the app:
    - Verifies access and extracts **column headers**.
    - Stores these headers for later use.

- **Email template creation** (lines 21–24, 539–541):
  - The UI shows a list of available headers (variables) that come from this stored header data.
  - Users insert placeholders like `{{recipient_name}}` based on these headers.

- **Resume/editor and variable mapping** (lines 23–25, 540–541, 545–548):
  - Variables used in resumes and filenames are tied to sheet headers.
  - When performing **Data Mapping** (line 546), the backend needs fast access to the header names for a given sheet/tab to map columns to template variables.

- **API endpoints**:
  - `GET /api/sheets/:id/headers` (lines 256–257) returns stored headers.
  - `PUT /api/sheets/:id/refresh` (line 258) re‑reads the sheet and updates the corresponding `Header` records.

So the `Header` model is the **canonical cache of column header metadata per Google Sheet and tab**, enabling:

- Template and resume variable selection.
- Quick mapping from Google Sheet columns to personalization variables.
- Efficient refresh and reuse without hitting the Google Sheets API for every request.

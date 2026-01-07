# Agent for Job Seekers

OK, so this is a record of the application that I intend to build. The application will serve as an assistant for job seekers.

## Problem with the Current Job Market

The problem with the current job market is that it has become very competitive according to Austin Balcek's website cultivatedculture.com, live events, and social media posts. There are several milestones of a perfect resume that one should complete. The resume should have a specific name format. The resume should have a specific design, a sequence of content, action words, power words, hard skills, and soft skills. Also, from several career gurus, submitting a typical resume-based application won't take you far. One needs to send cold emails to reach out to people who have power over the role that one is applying for.

Also, there should not be one resume for all jobs, so based on company, job title, job position, and company location, the resume should be modified, crafted, or rewritten.

For example, in the front-end and React job market in Poland, if there are 30 job posts with different shiny design designations, the resume should get updated for each one of them. The title on the resume should get updated. Based on the designation mentioned in the job post, the soft skills should be adjusted. The core skills should get re-ordered, reorganized, added, hidden, or removed based on the skills defined in the job description, as well as from the Coffee Chat.

So, what needed is that a job seeker have to send batch cold emails to a bunch of job openings from a bunch of companies from a bunch of countries, but the batch emails should get personalized for each job post. The email should have a specific format and should be personalized for each job post. Personalization such as mentioning the recipient's name, job title, company name, location, and scale. These should be personalized in each cold email. Also, the resume that a job seeker should send along with the email has to be personalized too. The file name and the title on the resume should get updated based on the job description. The skills should get reordered based on the job description; the experience section should get re-ordered based on the job description.

## Application Idea

So, the idea is that I will create a SaaS that will take a URL from the Google Sheet. First, the user will pick a specific page or multiple pages from the Google Sheet.

People will have different rows in the sheet. So, what will happen is: a user will share the link of a Google Sheet that is readable. Once the link is added, the application will verify whether it can get the data or not. If the application can get the data, that will mean that the sheet is accessible via URL.

Once we get that, the application will show each and every single header from the Google Sheet.

Then, the next flow of the application will be creating an email template. There will be a rich text editor which a user can use to write his email template in different formats, as many as he wants. On that flow, he will also have at least a section of available headers from the Google Sheet. On that section, there will be a refresh button. By clicking on which, we will get the latest list of headers and update that section. So, the user can craft his email template using a text editor along with adding variables from the headers of the Google Sheet.

After successfully creating the email template, the user will have a resume editor screen on his next step. The resume editor will be exactly the same as FlowCV. What extra facility the resume editor will have is that a user can personalize the file name based on his preferences. Available options for personalizing the name would be putting a timestamp, putting the user's first name and last name, and tags from sheet headers.

To give more context on the UI of how FlowCV looks:

There is a left panel to add content or edit the UI and modify the view, and there is a right panel as a preview of the resume.

The left panel will have a list of all the available components that can be added to the resume.

The left panel should have two tabs, one should be content and another should be customized.

On the content tab, there should be two content items available by default. One is basic information and the other is the About Me section. Then, there will be a button with a plus icon, and the button content should be the text "add content". Clicking on the button should open a modal which will have 14 different types of content items. The content items will be collapsible. Clicking on the content heading will collapse or expand the section. These 14 items should be:

1. Education: Show your primary education, college degree, and extension semesters. The education section should have the list of educations that has been created, and users can change the section title. Also, users can change the icon of the section in the content area. Each item of the education will be editable; clicking on the education item itself will open the editing form. The edit or create education form will be similar or exactly the same. The form should have six input fields: first, the school name with a prefix button for adding a link; second, the degree; then start date, end date, location; finally, description. The description should be a rich text editor field, although it will be a minimal rich text editor. The text editor will have five buttons only: one for making the text bold, one for italic, one for underline, one for text alignment (either left, right, or center), one for unordered list, and finally, one button for adding links.

2. Professional Experience: A place to highlight your professional experience, including internships. Expanding the experience section will show the list of experiences with draggable icons. Users can re-order the experiences based on their preferences. Each experience item should have a drag icon on the left, then a specific pairing, then the job designation with company name split by a comma. On the right end, there should be an eye icon representing whether this experience should be visible or not. Clicking on each experience should open the edit experience form. There should be a button for adding experience. Clicking on the button will open a new experience form. The new experience and the edit experience form will be exactly the same. Input fields for creating or editing professional experience are: job title, employer with a prefix button for adding a link, start date, end date, location, and finally description. The description will have the exact same functionality and UI as the description field from the education form.

3. Skills: List your technical, managerial, or soft skills in this section. Upon expanding the skills section, it will show the list of skills in vertical alignment. Each skill item should have a draggable icon at the left end, the title of the skill, and the visibility/eye icon at the right end. The new or edited skill form, which are exactly the same, should have the following input fields: skill, information/sub-skills (which will be exactly the same rich text editor as the description input field), skill level, a drop-down with five options: beginner, amateur, competent, proficient, expert.

4. Languages: If you speak more than one language, make sure to list them here. The edit/new language form should have three input fields: language, additional information (the same input field as the description), language level (same drop-down as the skill level).

5. Certificates: Driver's certificates and other industry-specific certificates you have belong here. The edit/new certificate form should have only two input fields: the certificate title input field with a prefix for adding links, and the additional information—the exact same rich text editor as the description field mentioned above.

6. Interests: If you have interests that align with your career aspirations, list them here. The edit/add new interest form will be exactly the same as the form for certificates.

7. Projects: If you've worked on a particular challenging project in the past, mention it here. The create/edit project form should have the following input fields: project title with a prefix for adding a new link, subtitle, start date and end date, description (a rich text editor same as mentioned above).

8. Courses: If you've completed MOOCs or any evening courses, show them off in this section. The create/edit course form should have the following input fields: course title, institution, start date, end date, location, and description.

9. Awards: Awards like student competitions or industry accolades belong here. The add/edit awards form should have the following input fields: award with a prefix button to add a link, issuer, date with three drop-down items: day, month, year. Under the day and month drop-down fields, there should be a checkbox "Don't show". Finally, the same description field.

10. Organizations: If you volunteer or participate in good causes or state activities, list them here. The add/edit organizations form should have the following input fields: organization with a prefix button to add a link, position, start date, end date, location, and finally the same description field.

11. Publications: Academic publications or book releases have a dedicated place here. The add/edit form should have the following input fields: title with a link prefix, publisher, the three drop-down fields for date (similar to the date field of the awards), and finally the description.

12. References: If you have former colleagues or bosses that vouch for you, list them. The form to add or edit a reference will have the following input fields: name with a link prefix, job title, organization, email, and phone.

13. Declaration: If you need a declaration with a signature, use this. The declaration creation form should have the following input fields: text, signature upload button, full name, place, date.

14. Custom: If you didn't find what you're looking for or you want to combine two sections to save space, use this.

Clicking on the customize button on the tab menu of the resume screen will open a whole new set of UI on the left sidebar. Here, users can choose a template from the list. Then, the user can pick a column style. The style can be 1, 2, or mix, which represent one column to fill the width, two columns to fill the width, or the ability to use both options. Then, the user can rearrange the sections and add page breaks.

### To Do:

We need to develop a PDF parser (pdf2htmlex) to turn a PDF resume to HTML resume.

## Customize Options

Color mode is a complicated one. We can modify the color of the heading area and the header text, then we can modify the color of text, background, and accent. There will be options to pick on which the accent color should be implemented. The options are: name, dots/bars/bubbles, headings, dates, headings line, link icons, header icons. The name option and the header icons option will take the accent color of the header area if checked. The other options will take color from the secondary area.

Next is spacing. We can increase the font size, the line height, left and right margins, top and bottom margins, space between entries.

Next, we can select a font family. The font family will be grouped by Serif, Sans, and Mono options.

The Serif fonts are: Amiri, Vollkorn, Lora, PT Serif, Alegreya, Aleo, Crimson Pro, EB Garamond, Zilla Slab, Cormorant Garamond, Crimson Text, Source Serif Pro.

The Sans fonts are: Source Sans Pro, Karla, Mulish, Lato, Titillium Web, Work Sans, Barlow, Jost, Fira Sans, Roboto, Rubik, Asap, Nunito, Open Sans.

The Mono fonts are: Inconsolata, Source Code Pro, IBM Plex Mono, Overpass Mono, Space Mono, Courier Prime.

Then, we have a section for headings. We can select different types of style, capitalization, size, and icon if we prefer.

## Post-Resume Creation

Once the resume is completed, a user can select one of his existing email templates and then validate the fields with the existing variables of the template. Also, validate if a field has an empty cell or is filled with a placeholder or gets ignored. We need to store the ignored data from the sheet in another page.

The batch mail will be scheduled. When the schedule meets, the application will convert the HTML resume to PDF with an appropriate file name. Finally, an array will be created with filling of data in necessary variables; finally, that array will be sent in batch. Then, we will get the response. We will check the number of successful mails sent and the number of failed mails, and we will finally store it in the dashboard of our application.

## Dashboard

Once the onboarding flow is completed, which will have an entry input field for Google Sheet URL, creating an email template, creating a resume or uploading a resume, the user will get the first view of the dashboard on the home screen. We will have several cards. Some cards will show stats: number of emails sent, number of emails delivered, number of emails failed, number of data ignored. Then, following these cards, some other cards with charts will be on the dashboard screen. On the left sidebar, we will have options such as email templates, resume builder, mail logs, settings.

## Technical Architecture

### Overview

The application is built as a micro-SaaS platform using a modern web stack. It consists of a React-based frontend for user interactions, a Node.js backend for business logic, and PostgreSQL for data storage. Integration with Google Sheets API for data import and email services for batch sending.

### Technical Stack

- **Frontend**: React.js + Tanstack Query, Tanstack Router (Dashboard) with Next.js + GSAP (Landing Page) framework for server-side rendering and routing.
- **Backend**: NestJS for RESTful & GraphQL API development.
- **Caching**: Redis or Memcached for Server-side caching. Tanstack Query for client-side caching.
- **Database**: PostgreSQL for relational data storage, with Prisma ORM for schema management.
- **Authentication**: JWT (JSON Web Tokens) with Ed25519 or ES256 (ECDSA with P-256) for session management, with Argon2id for password hashing.
- **Email Service**: Namecheap Mail Provider.
- **AI Services**: OpenAI GPT or similar for email reply analysis and lead data categorization.
- **PDF Generation**: Puppeteer for converting HTML resumes to PDF.
- **PDF Parser**: pdf2htmlex for converting PDF resumes to HTML.
- **File Storage**: AWS S3 or similar for storing generated PDFs.
- **Google Sheets Integration**: Google APIs Client Library for Node.js to fetch and parse sheet data.
- **Rich Text Editor**: Editor.js, Draft.js, or Lexical for email and resume content editing.
- **Deployment**: Docker for containerization, hosted on AWS EC2 or Vercel for frontend.

### Architecture Diagram

```
[Frontend (React/Next.js)]
    |
    | HTTP Requests
    |
[Backend (NestJs)]
    | API Endpoints
    |
[Database (PostgreSQL & Redis or Memcached)]
    | Data Storage
    |
[External Services: Google Sheets API, Email Provider, File Storage]
```

## Database Schema

The database schema is designed to support user management, template creation, resume building, and email logging. Below are the key tables with their fields and relationships.

### Users Table

| Field             | Type                                                               | Description                                                         |
| ----------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------- |
| id                | UUIDv7 (Primary Key)                                               | Unique identifier                                                   |
| email             | VARCHAR(255)                                                       | User's email address (stored in lowercase, unique)                  |
| password_hash     | VARCHAR(255)                                                       | Hashed password (Argon2id)                                          |
| first_name        | VARCHAR(100)                                                       | User's first name                                                   |
| last_name         | VARCHAR(100, nullable)                                             | User's last name (optional at registration; can be updated later)   |
| handle            | VARCHAR(50, nullable, unique)                                      | Public username/handle; optional at registration and editable later |
| status            | ENUM (ACTIVE, VERIFICATION_PENDING, DISABLED, HIBERNATED, DELETED) | Account status (default: VERIFICATION_PENDING)                      |
| status_updated_at | TIMESTAMP                                                          | Timestamp when status last changed (default: current timestamp)     |
| created_at        | TIMESTAMP                                                          | Account creation timestamp                                          |
| updated_at        | TIMESTAMP                                                          | Last update timestamp                                               |

### LeadSources Table

| Field       | Type                                        | Description                                                                                  |
| ----------- | ------------------------------------------- | -------------------------------------------------------------------------------------------- |
| id          | UUIDv7 (Primary Key)                        | Unique identifier for one uploaded/linked lead source (Google Sheet, CSV, Spreadsheet, JSON) |
| user_id     | UUIDv7 (Foreign Key to Users)               | Owner user                                                                                   |
| source_type | ENUM (GOOGLE_SHEET, CSV, SPREADSHEET, JSON) | Type of lead source                                                                          |
| source_uri  | TEXT                                        | Google Sheet URL or storage path / identifier of uploaded file                               |
| meta        | JSONB                                       | Metadata (sheetId, tab names, original file name, etc.)                                      |
| created_at  | TIMESTAMP                                   | Creation timestamp                                                                           |

### Headers Table

| Field          | Type                                | Description                                                                                  |
| -------------- | ----------------------------------- | -------------------------------------------------------------------------------------------- |
| id             | UUIDv7 (Primary Key)                | Unique identifier                                                                            |
| lead_source_id | UUIDv7 (Foreign Key to LeadSources) | Associated lead source (Google Sheet, CSV, Spreadsheet, JSON)                                |
| tab_name       | VARCHAR(100, nullable)              | Logical tab/sheet name (e.g., "Sheet1" for Google Sheets; null/ignored for CSV/JSON sources) |
| headers        | JSONB                               | Array/list of header names available in this source (used as variables in templates/resumes) |
| created_at     | TIMESTAMP                           | Creation timestamp                                                                           |
| updated_at     | TIMESTAMP                           | Last update timestamp                                                                        |

### EmailTemplates Table

| Field         | Type                          | Description        |
| ------------- | ----------------------------- | ------------------ |
| id            | UUIDv7 (Primary Key)          | Unique identifier  |
| user_id       | UUIDv7 (Foreign Key to Users) | Template owner     |
| name          | VARCHAR(255)                  | Template name      |
| template_body | TEXT                          | Rich text content  |
| created_at    | TIMESTAMP                     | Creation timestamp |
| updated_at    | TIMESTAMP                     | Creation timestamp |

### Resumes Table

| Field        | Type                          | Description                                    |
| ------------ | ----------------------------- | ---------------------------------------------- |
| id           | UUIDv7 (Primary Key)          | Unique identifier                              |
| user_id      | UUIDv7 (Foreign Key to Users) | Resume owner                                   |
| name         | VARCHAR(255)                  | Resume name                                    |
| html_content | TEXT                          | HTML representation                            |
| pdf_path     | TEXT                          | Path to generated PDF                          |
| variables    | JSONB                         | List of variables used in content and filename |
| template_id  | UUIDv7 (Optional)             | Linked template if any                         |
| created_at   | TIMESTAMP                     | Creation timestamp                             |

### ResumeSections Table

| Field        | Type                            | Description                        |
| ------------ | ------------------------------- | ---------------------------------- |
| id           | UUIDv7 (Primary Key)            | Unique identifier                  |
| resume_id    | UUIDv7 (Foreign Key to Resumes) | Parent resume                      |
| section_type | VARCHAR(50)                     | Type (e.g., education, experience) |
| content      | JSONB                           | Section data                       |
| order_index  | INTEGER                         | Display order                      |

### MailLogs Table

| Field             | Type                                   | Description             |
| ----------------- | -------------------------------------- | ----------------------- |
| id                | UUIDv7 (Primary Key)                   | Unique identifier       |
| user_id           | UUIDv7 (Foreign Key to Users)          | User who sent           |
| email_template_id | UUIDv7 (Foreign Key to EmailTemplates) | Used template           |
| resume_id         | UUIDv7 (Foreign Key to Resumes)        | Attached resume         |
| recipient_email   | VARCHAR(255)                           | Recipient's email       |
| status            | ENUM (sent, failed, pending)           | Email status            |
| sent_at           | TIMESTAMP                              | Send timestamp          |
| error_message     | TEXT                                   | Error details if failed |

### Leads Table

| Field          | Type                                | Description                                        |
| -------------- | ----------------------------------- | -------------------------------------------------- |
| id             | UUIDv7 (Primary Key)                | Unique identifier                                  |
| user_id        | UUIDv7 (Foreign Key to Users)       | Owner user                                         |
| lead_source_id | UUIDv7 (Foreign Key to LeadSources) | Source file / sheet / JSON this lead row came from |
| first_name     | VARCHAR(255, nullable)              | Lead's first name (optional)                       |
| last_name      | VARCHAR(255, nullable)              | Lead's last name (optional)                        |
| full_name      | VARCHAR(255, nullable)              | Full name as present in the source (optional)      |
| email_address  | VARCHAR(255)                        | Required; primary email address                    |
| company_name   | VARCHAR(255)                        | Required; company name                             |
| created_at     | TIMESTAMP                           | Creation timestamp                                 |
| updated_at     | TIMESTAMP                           | Last update timestamp                              |

This table intentionally stores only **canonical lead fields** that are required or commonly used in flows:

- Optional identity: `first_name`, `last_name`, `full_name`.
- Required core: `email_address`, `company_name`.

Each lead row is linked to a specific `LeadSources` entry (`lead_source_id`) and user (`user_id`). Additional, highly dynamic attributes from the original sheet/CSV/Spreadsheet/JSON remain associated with the corresponding `LeadSources` and `Headers` entries (and, if configured, documents in a NoSQL store) and are used when resolving template/resume variables.

During email and resume generation, for each lead the system resolves variables from:

- Canonical fields in `Leads` (for example `email_address`, `company_name`, `first_name`).
- Header-based fields defined in `Headers.headers` for the selected `LeadSources` entry (and the associated dynamic payload for that source).

If any **required variable** for a chosen email template or resume cannot be resolved for a particular lead, that email is **not sent immediately**. Instead, the corresponding mail log entry is recorded with `status = pending` until data is corrected or filled, and the ignored/pending items can be surfaced in the dashboard.

### EmailFlags Table

| Field        | Type                      | Description                          |
| ------------ | ------------------------- | ------------------------------------ |
| id           | UUIDv7 (Primary Key)      | Unique identifier                    |
| email        | VARCHAR(255)              | Email address                        |
| score        | INTEGER                   | Score (lower for auto replies, etc.) |
| flag         | ENUM (green, yellow, red) | Flag status                          |
| last_updated | TIMESTAMP                 | Last update timestamp                |

### Relationships

- Users 1:N LeadSources
- Users 1:N EmailTemplates
- Users 1:N Resumes
- Users 1:N MailLogs
- Users 1:N Leads
- LeadSources 1:N Headers
- LeadSources 1:N Leads
- Headers: define available variables/fields for EmailTemplates and Resumes per lead source
- Resumes 1:N ResumeSections
- EmailTemplates 1:N MailLogs
- Resumes 1:N MailLogs
- EmailFlags: Global table for scoring emails

### Dynamic Data & NoSQL Considerations

While the core schema above is modeled in PostgreSQL, the **LeadSources** and **Leads** domains have highly dynamic shapes per user and per input file. As the system evolves, we may introduce a **NoSQL/document store** (for example MongoDB) to handle the flexible parts of the data model.

#### MongoDB Collections (Example)

Two example collections:

- `lead_sources_payloads`
  - `leadSourceId` (UUIDv7 from PostgreSQL `LeadSources.id`)
  - `userId` (UUIDv7 from PostgreSQL `Users.id`)
  - `sourceType` (mirrors `LeadSources.source_type`)
  - `originalFileName`
  - `headers: string[]` (duplicated for quick access)
  - `rows: [{ rowIndex: number, data: { [key: string]: any } }]` – full parsed payload for each row

- `lead_documents` (optional per-lead documents)
  - `leadId` (UUIDv7 from PostgreSQL `Leads.id`)
  - `leadSourceId`
  - `userId`
  - `data: { [key: string]: any }` – dynamic attributes beyond canonical SQL columns

#### Backend Integration Plan (NestJS + SQL + Mongo)

The backend should keep PostgreSQL and MongoDB concerns cleanly separated via repository-style abstractions:

- **PostgreSQL-backed repositories** (via Prisma):
  - `UsersRepository` – users and authentication.
  - `LeadSourcesRepository` – `LeadSources` metadata.
  - `HeadersRepository` – stored header/variable lists.
  - `LeadsRepository` – canonical lead fields.
  - `EmailTemplatesRepository`, `ResumesRepository`, `MailLogsRepository`, `EmailFlagsRepository`.

- **MongoDB-backed repositories**:
  - `LeadSourcesPayloadRepository` – read/write `lead_sources_payloads` documents.
  - `LeadDocumentsRepository` – read/write `lead_documents` documents when row-level dynamic attributes are needed.

- **Service layer responsibilities**:
  - High-level domain services (for example `LeadsService`, `MailSchedulingService`) orchestrate both SQL and Mongo repositories.
  - Controllers depend only on services, not on concrete persistence implementations.
  - This separation allows the system to start purely on PostgreSQL and progressively adopt MongoDB for dynamic payloads without breaking the REST API surface.

## API Design

The backend exposes RESTful APIs for frontend interactions. All endpoints require authentication via JWT tokens in the Authorization header.

### User & Authentication Endpoints

- **POST /api/users/registration**: Register a new user.
  - Body: { email, password, firstName, lastName?, handle? }
  - Notes:
    - `email` and `password` are required.
    - `firstName` is required.
    - `lastName` and `handle` are optional at registration and can be set or updated later via the update endpoint.
  - Response: { user, token }
- **POST /api/users/login**: User login.
  - Body: { email, password }
  - Response: { user, token }
- **GET /api/users/list**: List users with pagination, search, and status filter.
  - Query parameters:
    - `page` (default: 1)
    - `limit` (default: 10)
    - `search` (partial match on email, firstName, lastName, handle)
    - `status` (one of: active, verification_pending, disabled, hibernated, deleted)
- **GET /api/users/single/:id**: View details of a single user.
  - Response: { user }
- **PATCH /api/users/single/:id**: Update user details.
  - Body (all fields optional): { email?, password?, firstName?, lastName?, handle?, status? }
  - Notes:
    - Changing `status` updates `status_updated_at` to the current server timestamp.
    - `handle` must be unique per user.
- **DELETE /api/users/single/:id**: Soft delete a user.
  - Behavior: Does not physically remove the record; sets `status` to `deleted` and updates `status_updated_at`.
- **POST /api/auth/logout**: Invalidate token (client-side).

### Google Sheets Endpoints

- **POST /api/sheets**: Add a new Google Sheet.
  - Body: { sheet_url }
  - Response: { sheet_id, headers }
- **GET /api/sheets/:id/headers**: Fetch headers for a sheet.
  - Response: { headers: [] }
- **PUT /api/sheets/:id/refresh**: Refresh headers from sheet.

### Email Template Endpoints

- **POST /api/templates**: Create a new email template.
  - Body: { name, template_body, variables }
  - Response: { template }
- **GET /api/templates**: List user's templates.
  - Response: { templates: [] }
- **PUT /api/templates/single/:id**: Update a template.
- **DELETE /api/templates/single/:id**: Delete a template.

### Resume Endpoints

- **POST /api/resumes**: Create a new resume.
  - Body: { name, html_content, sections }
  - Response: { resume }
- **GET /api/resumes**: List user's resumes.
- **PUT /api/resumes/single/:id**: Update resume.
- **POST /api/resumes/single/:id/generate-pdf**: Generate PDF from HTML.
  - Response: { pdf_url }

### Email Sending Endpoints

- **POST /api/mails/batch**: Schedule batch email send.
  - Body: { template_id, resume_id, sheet_id, schedule_time }
  - Response: { batch_id }
- **POST /api/mails/follow-up**: AI-determined follow-up email.
  - Body: { original_email_id, reply_content }
  - Response: { follow_up_template_id }
- **GET /api/mails/logs**: Fetch mail logs.
  - Response: { logs: [] }

### Leads Endpoints

- **POST /api/leads**: Add or update a single lead.
  - Body: { data: JSON }
  - Response: { lead }
- **POST /api/leads/bulk**: Bulk create or update leads parsed from Google Sheets, CSV, Spreadsheet, or JSON files.
  - Body:
    - `source`: 'google_sheet' | 'csv' | 'spreadsheet' | 'json'
    - `leads`: [{ data: JSON }]
    - `requiredFieldMapping`: { email: string, companyName: string }
  - Notes:
    - The client-side application uploads and parses the raw file and sends normalized JSON to this API; the backend does not parse files on this route.
  - Validation rules:
    - Maximum of **10,000** leads per request.
    - Per-user import limit of **10,000** leads within any rolling **30-minute** window; requests exceeding this should be rejected.
    - Every lead must contain non-empty values for the required fields (email & company name); invalid rows are skipped and reported.
  - Response: { createdCount, updatedCount, skippedCount, errors: [{ rowIndex, reason }] }
- **GET /api/leads**: List user's leads.
- **PUT /api/leads/single/:id**: Update lead data.
- **DELETE /api/leads/single/:id**: Delete a single lead.
- **DELETE /api/leads/bulk**: Bulk delete leads.
  - Body: { ids: [UUID] }

### Email Flags Endpoints

- **GET /api/flags/:email**: Get flag status for an email.
  - Response: { score, flag }
- **PUT /api/flags/:email**: Update flag.
  - Body: { score, flag }

### Cleanup Endpoints

- **POST /api/remove**: Permanently delete soft-deleted records older than 90 days.
  - Body: { modelName }
  - Behavior:
    - Finds records in the specified model/table where `status` is `DELETED` (or equivalent soft-delete flag).
    - Deletes records only when their `statusUpdatedAt` is older than 90 days.

## GraphQL API Design

As an alternative to REST, the backend can expose a GraphQL API using NestJS with Apollo Server. This provides flexible querying and reduces over-fetching. Below is the proposed GraphQL schema with types, queries, and mutations.

### GraphQL Schema Types

```graphql
type User {
  id: ID!
  email: String!
  firstName: String!
  lastName: String
  handle: String
  status: UserStatus!
  statusUpdatedAt: DateTime!
  createdAt: DateTime!
  updatedAt: DateTime!
  googleSheets: [GoogleSheet!]!
  emailTemplates: [EmailTemplate!]!
  resumes: [Resume!]!
  mailLogs: [MailLog!]!
  leads: [Lead!]!
}

type GoogleSheet {
  id: ID!
  userId: ID!
  sheetUrl: String!
  sheetId: String!
  currentTab: String!
  createdAt: DateTime!
  headers: [Header!]!
}

type Header {
  id: ID!
  googleSheetId: ID!
  tabName: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  # Note: Headers are stored as JSONB, but for GraphQL, we can expose as [String!]
  headers: [String!]!
}

type EmailTemplate {
  id: ID!
  userId: ID!
  name: String!
  templateBody: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Resume {
  id: ID!
  userId: ID!
  name: String!
  htmlContent: String!
  pdfPath: String
  variables: JSON
  templateId: ID
  createdAt: DateTime!
  sections: [ResumeSection!]!
}

type ResumeSection {
  id: ID!
  resumeId: ID!
  sectionType: String!
  content: JSON!
  orderIndex: Int!
}

type MailLog {
  id: ID!
  userId: ID!
  emailTemplateId: ID!
  resumeId: ID
  recipientEmail: String!
  status: MailStatus!
  sentAt: DateTime
  errorMessage: String
}

type Lead {
  id: ID!
  userId: ID!
  data: JSON!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type EmailFlag {
  id: ID!
  email: String!
  score: Int!
  flag: FlagStatus!
  lastUpdated: DateTime!
}

enum MailStatus {
  SENT
  FAILED
  PENDING
}

enum FlagStatus {
  GREEN
  YELLOW
  RED
}

enum UserStatus {
  ACTIVE
  VERIFICATION_PENDING
  DISABLED
  HIBERNATED
  DELETED
}

scalar DateTime
scalar JSON
```

### Queries

```graphql
type Query {
  # User
  me: User!

  # Google Sheets
  googleSheets: [GoogleSheet!]!
  googleSheet(id: ID!): GoogleSheet
  headers(sheetId: ID!): [Header!]!

  # Templates and Resumes
  emailTemplates: [EmailTemplate!]!
  resumes: [Resume!]!
  resume(id: ID!): Resume

  # Logs and Flags
  mailLogs: [MailLog!]!
  emailFlag(email: String!): EmailFlag

  # Leads
  leads: [Lead!]!
}
```

### Mutations

```graphql
type Mutation {
  # Authentication
  register(
    email: String!
    password: String!
    firstName: String!
    lastName: String
    handle: String
  ): AuthPayload!
  login(email: String!, password: String!): AuthPayload!

  # Google Sheets
  createGoogleSheet(sheetUrl: String!): GoogleSheet!
  updateGoogleSheet(id: ID!, currentTab: String): GoogleSheet!
  createHeader(
    googleSheetId: ID!
    tabName: String!
    headers: [String!]!
  ): Header!

  # Templates and Resumes
  createEmailTemplate(name: String!, templateBody: String!): EmailTemplate!
  updateEmailTemplate(
    id: ID!
    name: String
    templateBody: String
  ): EmailTemplate!
  createResume(name: String!, htmlContent: String!, variables: JSON): Resume!
  updateResume(
    id: ID!
    name: String
    htmlContent: String
    variables: JSON
  ): Resume!
  generatePdf(resumeId: ID!): String! # Returns PDF URL
  # Email Sending
  sendBatchEmail(
    templateId: ID!
    resumeId: ID!
    sheetId: ID!
    scheduleTime: DateTime
  ): BatchResponse!
  sendFollowUp(originalEmailId: ID!, replyContent: String!): FollowUpResponse!

  # Leads and Flags
  createLead(data: JSON!): Lead!
  updateLead(id: ID!, data: JSON!): Lead!
  updateEmailFlag(email: String!, score: Int, flag: FlagStatus): EmailFlag!

  # Deletions
  deleteEmailTemplate(id: ID!): Boolean!
  deleteResume(id: ID!): Boolean!
  deleteLead(id: ID!): Boolean!
}

type AuthPayload {
  user: User!
  token: String!
}

type BatchResponse {
  batchId: ID!
  message: String!
}

type FollowUpResponse {
  followUpTemplateId: ID!
  message: String!
}
```

### Example Queries

```graphql
# Get user dashboard data
query GetDashboard {
  me {
    email
    googleSheets {
      id
      sheetUrl
      headers {
        tabName
        headers
      }
    }
    emailTemplates {
      id
      name
    }
    resumes {
      id
      name
    }
    mailLogs {
      status
      sentAt
    }
  }
}

# Create and send batch email
mutation SendBatch($templateId: ID!, $resumeId: ID!, $sheetId: ID!) {
  sendBatchEmail(
    templateId: $templateId
    resumeId: $resumeId
    sheetId: $sheetId
    scheduleTime: null
  ) {
    batchId
    message
  }
}
```

This GraphQL API allows clients to request exactly the data needed, reducing bandwidth and improving performance. It integrates seamlessly with NestJS and can coexist with REST endpoints.

## Detailed User Flows

### Onboarding Flow

1. **Registration/Login**: User creates account or logs in via email/password.
2. **Leads Data Source Setup**: User either provides a shareable Google Sheets URL or uploads a CSV/Spreadsheet/JSON file (handled on the client-side).
3. **Header & Field Validation**:
   - For Google Sheets, the app verifies access and extracts column headers.
   - For uploaded files, the frontend parses the file and sends normalized lead data to the backend via `POST /api/leads/bulk`, including a mapping for required fields (email & company name).
   - Enforce validation rules: maximum 10,000 leads per request and per user within any rolling 30-minute window.
4. **Email Template Creation**: User uses rich text editor to craft template, inserting variables like {{recipient_name}} from sheet headers.
5. **Resume Building**: User accesses resume editor (inspired by FlowCV), adds sections, customizes design, and sets personalized filename options (e.g., {{first_name}}_{{last_name}}_{{job_title}}.pdf).
6. **Validation and Save**: App validates template variables against sheet data, saves template and resume.
7. **Dashboard Access**: User is redirected to dashboard with stats and navigation.

### Batch Email Sending Flow

1. **Selection**: User selects email template, resume, and target sheet.
2. **Data Mapping**: App maps sheet columns to template variables (e.g., column 'Name' to {{recipient_name}}).
3. **Validation**: Checks for empty cells, placeholders, or ignored rows; stores ignored data separately.
4. **Scheduling**: User sets send time; app queues the batch.
5. **PDF Generation**: At scheduled time, converts resume HTML to PDF with dynamic filename.
6. **Email Dispatch**: Sends personalized emails with attached PDFs; logs success/failure.
7. **Reporting**: Updates dashboard with send stats and logs.

### Resume Customization Flow

1. **Section Addition**: User adds content sections from the 14 predefined types.
2. **Content Editing**: Fills forms for each section, using rich text for descriptions.
3. **Reordering and Visibility**: Drags sections to reorder, toggles visibility.
4. **Styling**: Customizes colors, fonts, spacing, and layout via customize tab.
5. **Preview**: Real-time preview on right panel updates with changes.

## Security and Privacy

- **Authentication**: JWT tokens with expiration; refresh tokens for prolonged sessions.
- **Data Encryption**: Sensitive data (passwords, API keys) encrypted at rest and in transit (HTTPS).
- **Google OAuth**: Uses OAuth 2.0 for secure Google Sheets access without storing credentials.
- **Input Validation**: Sanitizes all user inputs to prevent XSS and injection attacks.
- **Rate Limiting**: API rate limits to prevent abuse.
- **Data Privacy**: Complies with GDPR; user data export/deletion options.
- **Email Security**: SPF, DKIM, DMARC for email authentication; no sensitive data in emails.

## Integration Details

### Google Sheets API

- Uses googleapis npm package.
- Fetches data via spreadsheets.values.get method.
- Handles pagination for large sheets.
- Error handling for access denied or invalid URLs.

### Email Provider Integration

- Configured with API keys for SendGrid/AWS SES.
- Supports attachments up to 10MB.
- Tracks delivery status via webhooks.

### PDF Generation

- Uses Puppeteer to render HTML resume.
- Applies CSS for proper styling.
- Saves to cloud storage (S3) with public URLs.

## Additional Features

### AI-Driven Follow-Up Emails

We need to integrate AI for determining which email to send as follow-up based on reply emails. The concept is to build rapport with leads. Once the primary email is sent, follow-up emails are sent based on the response. AI analyzes the reply email to decide the appropriate follow-up.

Scenarios:

1. If the lead replies with a positive response, send a thank you email.
2. If the lead replies with a negative response, send a sequence of follow-up emails.
3. If the lead doesn't reply, send a sequence of follow-up emails.

### Email Scoring and Flagging

On each sheet read, evaluate email addresses and score them based on criteria:

1. Auto replies: lower score.
2. Mail delivery failed: red flag.
3. Read tracking no response: yellow flag.
4. Read tracking response: green flag.

Flagging is stored in the DB. On each sheet read, store new email addresses. On each mail send, update flagging. On new users, check if lead emails exist in our DB. If red-flagged, do not send emails and inform the user to use alternatives (offered for extra charge, providing alternative emails from the same company and designation).

### Lead Storage

Store leads with comprehensive data. Initially, aim for all fields from Apollo: Last Name, First Name, Title, Email, Person Linkedin Url, Company Name, Seniority, Departments, Corporate Phone, # Employees, Industry, Keywords, Website, Company Linkedin Url, Facebook Url, Twitter Url, City, State, Country, Company Address, Company City, Company State, Company Country, Company Phone, Technologies, Annual Revenue, Total Funding, Latest Funding, Latest Funding Amount, Last Raised At, Secondary Email.

Fields may be dynamic based on sources (PostgreSQL can handle this with JSONB). Implement AI to categorize data into correct fields, especially URLs (e.g., distinguish Person Twitter URL from Company Twitter URL).

- AI-powered resume optimization based on job descriptions.
- Multi-language support.
- Mobile app version.
- Advanced analytics on email performance.
- Integration with LinkedIn for profile data import.

# Features Summary - Resumail Application

## Authentication & Security

### JWT Authentication System
- **Logic**: EdDSA algorithm with 7-day expiration
- **Implementation**: Custom JWT guard with manual token parsing
- **Security**: Password hashing with argon2, user existence validation
- **APIs**: Login endpoint with password verification
- **Schema**: User table with email, handle, password hash

### Google OAuth Integration
- **Logic**: OAuth2 flow with Google Strategy
- **Implementation**: Passport-based authentication
- **Security**: Token storage and refresh capabilities
- **APIs**: `/google/auth`, `/google/callback`
- **Schema**: GoogleAccount table with tokens and user association
- **Scopes**: spreadsheets.readonly, userinfo.email, userinfo.profile

## User Management

### User Registration & Authentication
- **Logic**: Email/handle uniqueness validation, password complexity
- **Implementation**: Argon2 hashing, JWT token generation
- **Security**: Strong DTO validation, no emojis allowed
- **APIs**: `/users/registration`, `/users/login`
- **Features**: Soft delete, status filtering, pagination

### User Data Management
- **Logic**: CRUD operations with soft delete
- **Implementation**: Prisma ORM with pagination
- **APIs**: `/users/list`, `/users/single/:id`
- **Features**: Search functionality, bulk operations, fake user generation

## Email Template System

### Template CRUD Operations
- **Logic**: Template creation with variable support
- **Implementation**: Standard CRUD with user association
- **APIs**: `POST /`, `GET /`, `PUT /single/:id`, `DELETE /single/:id`
- **Schema**: EmailTemplate table with name, body, variables
- **Features**: User-specific templates, creation date sorting

## Google Sheets Integration

### Sheet Management
- **Logic**: URL parsing, header extraction, OAuth client recreation
- **Implementation**: Google API integration with token management
- **APIs**: `POST /`, `GET /:id/headers`, `PUT /:id/refresh`
- **Schema**: GoogleSheet and Header tables
- **Features**: Cached headers, refresh capabilities, Sheet ID extraction

## Resume Generation System

### Resume Management
- **Logic**: Resume creation with sections, PDF generation
- **Implementation**: Puppeteer HTML to PDF conversion
- **APIs**: `POST /`, `GET /`, `POST /single/:id/generate-pdf`
- **Schema**: Resume and ResumeSection tables
- **Features**: S3 upload, section replacement, PDF path storage

### PDF Generation
- **Logic**: HTML rendering to PDF via Puppeteer
- **Implementation**: S3 integration for file storage
- **Features**: Automatic upload, database path updates

## Lead Management (CRM)

### Lead CRUD Operations
- **Logic**: Lead creation with email + source uniqueness
- **Implementation**: Bulk import with rate limiting
- **APIs**: Standard CRUD + `POST /bulk`
- **Schema**: Lead table with email, source, and metadata
- **Features**: Rate limiting (10k/30min), bulk statistics, error handling

### Bulk Import System
- **Logic**: Iterative upsert with validation
- **Implementation**: Rate limiting and error tracking
- **Features**: Import statistics, error reporting, duplicate handling

## Infrastructure & Configuration

### Application Setup
- **Logic**: NestJS bootstrap with global configuration
- **Implementation**: Global API prefix, validation pipes
- **Security**: CORS with whitelist, custom validation
- **Port**: 9000 (configurable via environment)

### Key Management
- **Logic**: Ed25519 key pair generation
- **Implementation**: PEM format storage in keys directory
- **Security**: Automatic key generation if missing
- **Usage**: JWT signing and verification

## Database Schema

### Core Tables
- **User**: Authentication and profile data
- **GoogleAccount**: OAuth tokens and integration
- **EmailTemplate**: Template management
- **GoogleSheet**: Sheet integration data
- **Header**: Sheet headers cache
- **Resume**: Resume data and PDF paths
- **ResumeSection**: Resume content sections
- **Lead**: CRM lead data

## Security Features

### Authentication
- EdDSA JWT tokens
- Argon2 password hashing
- Custom JWT guard implementation
- User existence validation

### Data Validation
- Strong DTO validation
- Password complexity requirements
- Email/handle uniqueness
- No emoji restrictions

### API Security
- Rate limiting on bulk operations
- CORS configuration
- Input sanitization
- Soft delete implementation

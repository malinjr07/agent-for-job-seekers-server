# JWT Hash. Guide

## 1. High-level goals

**What**

- Provide stateless authentication for users via JSON Web Tokens (JWTs).
- Securely store user passwords using a modern password hashing algorithm (Argon2).
- Use asymmetric keys for signing and verifying JWTs, so private keys never need to be shared with consumers of the tokens.

**Why**

- JWTs allow the API to authenticate requests without hitting the database for every call (once a token is issued).
- Password hashing ensures that even if the database is compromised, raw passwords are not exposed.
- Asymmetric keys (private/public) enable safer validation in distributed systems and are a better long-term choice than symmetric secrets for many security models.

---

## 2. Key generation: `src/common/utils/generate-keys.ts`

**File**: `src/common/utils/generate-keys.ts`

```ts
import { generateKeyPairSync } from 'crypto';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const keysDir = join(process.cwd(), 'src/config/keys');

if (!existsSync(keysDir)) {
  mkdirSync(keysDir, { recursive: true });
}

const { privateKey, publicKey } = generateKeyPairSync('ec', {
  namedCurve: 'P-256',
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
});

writeFileSync(join(keysDir, 'private.key'), privateKey);
writeFileSync(join(keysDir, 'public.key'), publicKey);

console.log('Keys generated successfully in src/config/keys');
```

### 2.1 What it does

- **Computes filesystem paths** using `process.cwd()` (the project root when the script is run) and `join` to build `src/config/keys` as the target directory for keys.
- **Ensures the keys directory exists**:
  - If `src/config/keys` doesn’t exist, it is created recursively.
- **Generates an EC key pair**:
  - Uses Node’s `crypto.generateKeyPairSync('ec', { namedCurve: 'P-256', ... })`.
  - Outputs:
    - `privateKey`: PEM-encoded, PKCS#8 format.
    - `publicKey`: PEM-encoded, SPKI format.
- **Writes the keys to disk**:
  - `src/config/keys/private.key`
  - `src/config/keys/public.key`

### 2.2 Why it is designed this way

- **Asymmetric keys (EC P-256)**
  - EC P-256 (`ES256` in JWT terms) is a modern, NIST-recommended elliptic-curve algorithm.
  - Compared to large RSA keys, P-256 provides strong security with smaller key sizes and potentially better performance.
- **Reusable key generation utility**
  - The script lives under `src/common/utils` and can be imported or executed from tooling instead of being tied to the entrypoint.
  - Keys are generated once and stored as files, rather than being hard-coded in the repo.
  - This allows different environments (dev/stage/prod) to generate and keep separate key pairs.
- **File-based keys under `src/config/keys`**
  - Centralizes key storage in one place that the Nest app can reference via configuration (`jwt.config.ts`).
  - Simplifies local development: run the script once from the project root (so `process.cwd()` is correct), then start the app.

> Note: Operationally, these key files should be kept out of version control and managed securely (e.g., only generated per environment). The current code assumes they are available at runtime in `src/config/keys`.

#### How to actually create the key files (command)

From the **project root** (where `package.json` lives), run:

```bash
yarn ts-node src/common/utils/generate-keys.ts
```

**What this command does**

- Uses Yarn to execute the local `ts-node` binary from `devDependencies`.
- `ts-node` runs `src/common/utils/generate-keys.ts` in Node with TypeScript support.
- That script:
  - Computes `keysDir = join(process.cwd(), 'src/config/keys')`.
  - Ensures the directory exists (creates it if necessary).
  - Calls `generateKeyPairSync('ec', ...)` to generate an EC P-256 key pair.
  - Writes the results as:
    - `src/config/keys/private.key`
    - `src/config/keys/public.key`

Alternative (after building to JS):

```bash
yarn build
node dist/common/utils/generate-keys.js
```

In both cases, the effect is the same: **two PEM files are created under `src/config/keys`**, which `jwt.config.ts` then reads at application startup.

### 2.3 What `ec`, `spki`, and `pkcs8` mean (and alternatives)

- **`'ec'` – algorithm type**
  - Stands for **Elliptic Curve** cryptography.
  - Other algorithm types you can pass to `generateKeyPairSync` (depending on Node.js version) include:
    - `'rsa'` – RSA key pair.
    - `'rsassa-pss'` – RSA-PSS signature variant.
    - `'dsa'` – DSA key pair (less common today).
    - `'ed25519'`, `'ed448'` – modern EdDSA signature schemes.
    - `'x25519'`, `'x448'` – X25519/X448 key agreement (ECDH-style), typically for key exchange rather than JWT signing.
  - **When to use what**
    - Use **`'ec'` with `namedCurve: 'P-256'`** when you want ES256-compatible JWTs (what this app uses): good performance, widely supported, strong security.
    - Use **`'rsa'` / `'rsassa-pss'`** when you need compatibility with systems or hardware that only support RSA.
    - Use **`'ed25519'` / `'ed448'`** when you are explicitly targeting EdDSA (compact keys/signatures, increasingly popular) and your ecosystem (JWT libraries, infra) supports it.

- **`'spki'` – public key container type**
  - Stands for **Subject Public Key Info** (the X.509 `SubjectPublicKeyInfo` structure).
  - Node’s `publicKeyEncoding.type` options include:
    - `'spki'` – generic X.509 SPKI wrapper for public keys (works for both RSA and EC).
    - `'pkcs1'` – RSA-only public key structure.
  - **When to use what**
    - For EC keys (**this app’s configuration**), you **must** use `'spki'` – PKCS#1 does not apply to EC keys.
    - For RSA keys, you can choose either `'spki'` or `'pkcs1'`, but `'spki'` is more generic and tends to interoperate better with X.509 tooling.

- **`'pkcs8'` – private key container type**
  - Stands for **Public-Key Cryptography Standards #8**.
  - Node’s `privateKeyEncoding.type` options include:
    - `'pkcs8'` – generic standard format for many algorithms (RSA, EC, etc.).
    - `'pkcs1'` – RSA-only private key format.
    - `'sec1'` – EC-specific private key format (from the SEC1 specification).
  - **When to use what**
    - For EC keys (**this app’s configuration**), `'pkcs8'` is a good default: broadly supported, algorithm-agnostic, and works well with most libraries.
    - Use `'sec1'` only when a consumer explicitly requires the older ECPrivateKey/SEC1 format.
    - For RSA, use `'pkcs1'` if a consumer expects that legacy format; otherwise `'pkcs8'` is usually more future-proof.

- **`format: 'pem'` – how the key is serialized**
  - `'pem'` encodes the key as Base64 with `-----BEGIN ...-----` / `-----END ...-----` headers.
  - Alternatives include `'der'` (binary encoding of the same structures) and, in newer Node versions, `'jwk'` (JSON Web Key).
  - This app uses PEM because it is human-readable, easy to store as files, and widely supported by OpenSSL and other tooling.

### 2.4 Quick cheat-sheet: which combo to use?

| Use case                           | Algorithm type (`generateKeyPairSync`) | JWT alg (typical) | Public key `type`     | Private key `type`     | Notes                                                                |
| ---------------------------------- | -------------------------------------- | ----------------- | --------------------- | ---------------------- | -------------------------------------------------------------------- |
| **This app (current setup)**       | `'ec'` + `namedCurve: 'P-256'`         | `ES256`           | `'spki'`              | `'pkcs8'`              | Modern, compact EC keys; great for JWT; widely supported.            |
| Legacy / broad-compat JWT          | `'rsa'`                                | `RS256` / `RS512` | `'spki'` or `'pkcs1'` | `'pkcs1'` or `'pkcs8'` | Use when you must interop with RSA-only systems/HSMs.                |
| Modern EdDSA-based tokens          | `'ed25519'` / `'ed448'`                | `EdDSA`           | `'spki'`              | `'pkcs8'`              | Very small keys/signatures; only if your JWT tooling supports EdDSA. |
| Key agreement / ECDH (not for JWT) | `'x25519'` / `'x448'`                  | n/a               | `'spki'`              | `'pkcs8'`              | For key exchange, not for signing JWTs.                              |

In short, for **JWT in this project**, stick with **`'ec'` + P‑256 + `spki`/`pkcs8` + PEM** unless you have a strong interoperability reason to switch to RSA or EdDSA.

---

## 3. JWT configuration: `src/config/jwt.config.ts`

**File**: `src/config/jwt.config.ts`

```ts
import { readFileSync } from 'fs';
import { join } from 'path';

const keysDir = join(__dirname, 'keys');

export const jwtConfig = {
  publicKey: readFileSync(join(keysDir, 'public.key')),
  privateKey: readFileSync(join(keysDir, 'private.key')),
  signOptions: {
    expiresIn: '7d',
    algorithm: 'ES256',
  },
};
```

### 3.1 What it does

- **Resolves the keys directory**
  - Uses `__dirname` of `jwt.config.ts` and joins it with `'keys'` → effectively `src/config/keys` at runtime.
- **Reads the key files into memory**
  - `publicKey`: contents of `public.key`.
  - `privateKey`: contents of `private.key`.
- **Defines shared signing options** via `signOptions`:
  - `expiresIn: '7d'` → tokens are valid for 7 days.
  - `algorithm: 'ES256'` → tells the JWT library to use ECDSA with P-256 and SHA-256.
- **Exports a single `jwtConfig` object**
  - Other parts of the app (e.g., modules) import `jwtConfig` instead of re-reading files.

### 3.2 Why this configuration

- **Centralized JWT config**
  - Keeping keys and signing options in one module avoids duplication and configuration drift.
- **File-based keys loaded once**
  - Reading the keys via `readFileSync` at startup makes them available to Nest modules without passing them around manually.
- **Explicit algorithm choice (`ES256`)**
  - Prevents the library from defaulting to a weaker or unintended algorithm.
  - Matches the key type generated by `generate-keys.ts`.
- **Fixed token lifetime (`7d`)**
  - Tokens are short-lived enough to reduce the window of compromise but long enough for practical use.
  - Centralizing this value makes it easier to change policy later.

---

## 4. Nest integration: `UsersModule` + `JwtModule`

**File**: `src/modules/users/users.module.ts`

```ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { jwtConfig } from '../../config/jwt.config';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      privateKey: jwtConfig.privateKey,
      publicKey: jwtConfig.publicKey,
      signOptions: jwtConfig.signOptions,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

### 4.1 What it does

- **Imports `JwtModule` from `@nestjs/jwt`** and registers it locally within `UsersModule`.
- **Provides keys and signing options** using `jwtConfig`:
  - `privateKey`: used by `JwtService` for signing tokens.
  - `publicKey`: used for verification when necessary.
  - `signOptions`: shared options (`expiresIn`, `algorithm`).
- **Makes `JwtService` injectable** into `UsersService` and any future providers inside `UsersModule`.

### 4.2 Why it is wired this way

- **Module-scoped configuration**
  - Using `JwtModule.register(...)` in `UsersModule` keeps JWT configuration close to where it is used (user auth).
- **DI-friendly design**
  - `JwtService` becomes a Nest provider; `UsersService` receives it via constructor injection.
- **Asymmetric signing + verification**
  - Providing both `privateKey` and `publicKey` allows future guards/strategies to verify tokens using only the public key.

> As of the current code, no `JwtStrategy` / `AuthGuard` is defined yet. JWTs are generated for logins, but route-level protection using these tokens has not been implemented in this repo.

---

## 5. JWT usage in `UsersService`

**File**: `src/modules/users/users.service.ts`

Key pieces related to JWT:

```ts
import { JwtService } from '@nestjs/jwt';
...
@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  ...

  async login(email: string, password: string): Promise<LoginResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    ... // validation + status checks

    const token = this.generateToken(user);
    const userDto = plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });

    return new LoginResponseDto(userDto, token);
  }

  private generateToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      handle: user.handle,
    };

    return this.jwtService.sign(payload);
  }
}
```

### 5.1 What it does

- **Injects `JwtService` into `UsersService`** via the constructor.
- **`login(...)` flow**:
  - Looks up the user by lowercased email.
  - Validates the password using Argon2 (see section 6).
  - Ensures the user is not in `DELETED` status.
  - Calls `generateToken(user)` to build a signed JWT.
  - Returns a `LoginResponseDto` containing:
    - a serialized `UserResponseDto` (public-facing user fields), and
    - the JWT `token` string.
- **`generateToken(user)`**:
  - Builds the payload:
    - `sub`: user ID (subject, per JWT standard claim name).
    - `email`: user’s email.
    - `handle`: user’s handle.
  - Calls `this.jwtService.sign(payload)` which uses:
    - the `privateKey` and `signOptions` from `JwtModule.register(...)`.

### 5.2 Why this payload & flow

- **Standard JWT claim `sub`**
  - `sub` is a standard JWT claim for the subject (who the token refers to).
  - This makes it easy to identify the user in future guards/strategies.
- **Including `email` and `handle`**
  - Allows downstream services or clients to use these fields without extra DB lookups.
  - Useful for UI and auditing.
- **Separation of concerns**
  - `login()` focuses on the login workflow.
  - `generateToken()` encapsulates token creation, so future changes (additional claims, different options) are in one place.

---

## 6. Password hashing with Argon2 in `UsersService`

**File**: `src/modules/users/users.service.ts`

Relevant snippets:

```ts
import { hash, verify } from 'argon2';
...
// During user creation
const passwordHash: string = await hash(password, {
  timeCost: 3,
  memoryCost: 12288, // 12 MB
  parallelism: 1,
  type: 2,
});
...
// During password update
if (updateUserDto.password) {
  updateData.passwordHash = await hash(updateUserDto.password, {
    timeCost: 3,
    memoryCost: 12288,
    parallelism: 1,
    type: 2,
  });
}
...
// Password verification
private async verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  try {
    return await verify(hash, password);
  } catch {
    return false;
  }
}
```

### 6.1 What it does

- **Uses `argon2` library for password hashing and verification**.
- **On user creation** (`create`):
  - Hashes the raw `password` into `passwordHash` using Argon2 with custom parameters.
  - Stores `passwordHash` in the database (not the raw password).
- **On user update** (`update`):
  - If a new `password` is provided, rehashes it with the same Argon2 parameters and saves as `passwordHash`.
- **On login** (`login`):
  - Fetches the stored `passwordHash` from the DB.
  - Uses `verify(storedHash, providedPassword)` to check if the password is correct.

### 6.2 Argon2 parameters and why

- **`timeCost: 3`**
  - Number of iterations; higher means more CPU work per hash.
  - Balances security with performance so that hashing is slow enough to hurt brute-force attacks but fast enough for user logins.
- **`memoryCost: 12288` (approx 12 MB)**
  - Amount of memory used by the algorithm.
  - Large memory usage makes GPU/ASIC attacks significantly harder and more expensive.
- **`parallelism: 1`**
  - Number of threads/lanes used.
  - Set to `1` for predictable performance and resource usage; can be tuned later for multi-core environments.
- **`type: 2` (Argon2id)**
  - Argon2 has variants: `Argon2d`, `Argon2i`, `Argon2id`.
  - `2` corresponds to `Argon2id` (hybrid) which is recommended for password hashing because it combines defenses against both side-channel and GPU attacks.

### 6.3 Why Argon2

- **Modern, memory-hard KDF**
  - Argon2 is the winner of the Password Hashing Competition and is considered state-of-the-art for password hashing.
- **Configurable difficulty**
  - Allows tuning for different environments (CPU, RAM constraints) by adjusting `timeCost` and `memoryCost`.
- **Better resistance to brute-force**
  - Compared to older schemes (e.g., plain SHA, PBKDF2 with low iterations), Argon2 significantly raises the cost for attackers.

---

## 7. How JWT and hashing work together in this app

### 7.1 Authentication flow (current state)

**What happens today**

1. **User registration**
   - A new user is created with a lowercased email and handle.
   - The raw password is hashed with Argon2 and stored as `passwordHash`.
   - User status starts as `VERIFICATION_PENDING` with `statusUpdatedAt` set.

2. **User login**
   - The service looks up the user by lowercased email.
   - The provided password is verified against `passwordHash` (Argon2).
   - If invalid or user status is `DELETED`, an `UnauthorizedException` is thrown.
   - If valid, a JWT is generated using the EC private key and returned alongside a sanitized user DTO.

3. **Token usage**
   - The caller receives a signed JWT containing `sub`, `email`, and `handle`.
   - As of the current code, Nest guards/strategies to verify this token on incoming requests have not yet been implemented.

### 7.2 Why this split of responsibilities

- **Password hashing protects credentials at rest**
  - Even if the DB is compromised, attackers do not get raw passwords.
- **JWTs enable stateless session management**
  - After a secure login, subsequent requests can be authenticated by validating the JWT rather than the password each time.
- **Asymmetric keys separate signing from verification**
  - The private key stays with the auth service.
  - Public key can be safely shared with other services if/when they need to verify tokens.

---

## 8. Summary of current JWT + hash configuration

**What exists now**

- EC P-256 key pair generation script (`generate-keys.ts`) that writes PEM-encoded keys to `src/config/keys`.
- Centralized JWT configuration in `src/config/jwt.config.ts` using `ES256` and a 7-day expiry.
- `UsersModule` wiring `JwtModule.register(...)` with both private and public keys from `jwtConfig`.
- `UsersService` that:
  - Hashes passwords with Argon2id (timeCost=3, memoryCost=12MB, parallelism=1).
  - Verifies passwords with Argon2 before login.
  - Issues JWTs on successful login with `sub`, `email`, and `handle` claims.

**What is not yet present (but expected in a typical setup)**

- No `JwtStrategy` or `AuthGuard` currently using these tokens to protect routes.
- No refresh-token or token revocation mechanism; only access tokens with a 7-day lifetime.

This guide should be the reference for how JWT and password hashing are configured **today** in this codebase, so future changes (e.g., adding guards/strategies or adjusting Argon2 parameters) can be made with a clear understanding of the existing design.

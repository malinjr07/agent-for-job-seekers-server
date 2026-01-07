# JWT + EdDSA / Ed25519 Hash. Guide

## 1. High-level goals (EdDSA version)

**What**

- Provide stateless authentication via JSON Web Tokens (JWTs), now signed with **EdDSA / Ed25519**.
- Securely store user passwords using **Argon2** (same as before).
- Use **asymmetric keys** for JWT signing/verification, but generate and handle them manually with Node’s `crypto` instead of Nest’s `JwtService`.
- Build the JWT string **manually** (header.payload.signature) so we are not blocked by `jsonwebtoken`’s lack of EdDSA support.

**Why**

- The Nest `JwtService` is a thin wrapper around `jsonwebtoken`, which (in the version used in this repo) supports only HS/RS/ES/PS algorithms — **not EdDSA**.
- We specifically want **Ed25519 (EdDSA)** for modern, compact, and secure signatures.
- Using Node’s built-in `crypto` + manual JWT assembly gives us:
  - Full control over the JWT **header**, **payload**, and **signature algorithm**.
  - No additional external JWT library needed for signing.
  - A clear, explicit implementation that is easy to reason about and document.

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

const { privateKey, publicKey } = generateKeyPairSync('ed25519', {
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

### 2.1 What it does (line by line)

- **`import { generateKeyPairSync } from 'crypto';`**
  - Pulls in Node’s core crypto API to generate a public/private key pair.
- **`import { writeFileSync, mkdirSync, existsSync } from 'fs';`**
  - `existsSync(path)`: checks if a file/directory exists.
  - `mkdirSync(path, { recursive: true })`: creates the directory (and parents if needed).
  - `writeFileSync(path, data)`: writes keys to disk.
- **`import { join } from 'path';`**
  - Safe path concatenation across OSes.

- **`const keysDir = join(process.cwd(), 'src/config/keys');`**
  - `process.cwd()` is the **current working directory** (project root when you run the script).
  - This builds an absolute path like: `/<project-root>/src/config/keys`.

- **`if (!existsSync(keysDir)) { mkdirSync(keysDir, { recursive: true }); }`**
  - Ensures that `src/config/keys` exists before writing files.
  - `recursive: true` prevents errors if parent directories don’t exist.

- **`generateKeyPairSync('ed25519', { ... })`**
  - `'ed25519'` means **EdDSA with the Ed25519 curve**.
  - This is the core of the EdDSA setup:
    - Keys are suitable for the JWT `alg: "EdDSA"` header.
    - Signatures will be Ed25519 signatures.

- **`publicKeyEncoding: { type: 'spki', format: 'pem' }`**
  - `type: 'spki'`:
    - SPKI = **Subject Public Key Info**, a standard X.509 structure for public keys.
    - Works for Ed25519, EC, RSA, etc.
  - `format: 'pem'`:
    - Human-readable Base64 with `-----BEGIN PUBLIC KEY-----` headers.

- **`privateKeyEncoding: { type: 'pkcs8', format: 'pem' }`**
  - `type: 'pkcs8'`:
    - PKCS#8, a generic private key container that supports Ed25519.
  - `format: 'pem'`:
    - Again, text-based PEM suitable for file storage and inspection.

- **`writeFileSync(join(keysDir, 'private.key'), privateKey);`**
  - Writes the PEM-encoded **private Ed25519 key** to `src/config/keys/private.key`.
- **`writeFileSync(join(keysDir, 'public.key'), publicKey);`**
  - Writes the PEM-encoded **public Ed25519 key** to `src/config/keys/public.key`.
- **`console.log('Keys generated successfully in src/config/keys');`**
  - Developer feedback when run manually.

### 2.2 Why it is designed this way

- **Ed25519 (EdDSA)**
  - Modern, fast, and secure signature scheme with small keys/signatures.
  - Explicitly matches JWT `alg: "EdDSA"` when using Ed25519 keys.
- **File-based keys in `src/config/keys`**
  - Keeps private keys **out of source** and in a location that can be environment-specific.
  - Easy to regenerate per environment (dev/stage/prod) by running the script.
- **PEM, SPKI, PKCS#8**
  - Standard formats widely supported by OpenSSL and most tooling.
  - Allow interoperability if other services or tooling need to consume the keys.

### 2.3 How to actually create the key files

From the project root:

```bash
yarn ts-node src/common/utils/generate-keys.ts
```

- Uses `ts-node` via Yarn to execute the TypeScript script.
- The script:
  - Resolves `keysDir` to `src/config/keys`.
  - Ensures the directory exists.
  - Calls `generateKeyPairSync('ed25519', ...)`.
  - Writes `private.key` and `public.key` as PEM files.

After this, `src/config/keys/private.key` and `src/config/keys/public.key` are ready for `jwt.config.ts`.

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
  algorithm: 'EdDSA' as const,
  expiresInSeconds: 7 * 24 * 60 * 60,
};
```

### 3.1 What each part means

- **`import { readFileSync } from 'fs';`**
  - Synchronously reads key files into memory during app startup.

- **`const keysDir = join(__dirname, 'keys');`**
  - `__dirname` is the directory of this file at runtime (e.g., `dist/src/config`).
  - `join(__dirname, 'keys')` points to `dist/src/config/keys` (after build), which should contain the copied/generated PEM files.

- **`publicKey: readFileSync(join(keysDir, 'public.key'))`**
  - Loads the **public Ed25519 key** into a `Buffer`.
  - Intended for **verification** use-cases (even if not yet wired in guards/strategies).

- **`privateKey: readFileSync(join(keysDir, 'private.key'))`**
  - Loads the **private Ed25519 key** into a `Buffer`.
  - Used for **signing** JWTs.

- **`algorithm: 'EdDSA' as const`**
  - String literal for JWT header `alg`.
  - Ties the code and documentation to the fact that we’re using **EdDSA** (Ed25519 keys).
  - Used when constructing the JWT header manually in `UsersService`.

- **`expiresInSeconds: 7 * 24 * 60 * 60`**
  - Calculates the token lifetime in seconds.
  - `7 * 24 * 60 * 60` = 7 days.
  - Used to set the `exp` claim (expiration time) in the JWT payload.

### 3.2 Why this shape

- **Single source of truth**
  - All JWT-related key material and timing configuration live in one object, `jwtConfig`.
  - If we change the expiry or move to a new key directory, we do it once here.

- **Algorithm is explicit**
  - Having `algorithm: 'EdDSA'` in code makes accidental algorithm changes less likely.
  - The JWT header in `UsersService` directly references `jwtConfig.algorithm`.

- **Seconds-based expiry**
  - Using a numeric `expiresInSeconds` makes it straightforward to compute `exp` relative to `iat` (issued-at) timestamps.

---

## 4. Manual JWT creation in `UsersService`

**File**: `src/modules/users/users.service.ts`

Key parts:

```ts
import { sign as cryptoSign } from 'crypto';
...
import { jwtConfig } from '@config/jwt.config';
...
private generateToken(user: User): string {
  const now = Math.floor(Date.now() / 1000);

  const header = {
    alg: jwtConfig.algorithm,
    typ: 'JWT' as const,
  };

  const payload = {
    sub: user.id,
    email: user.email,
    handle: user.handle,
    iat: now,
    exp: now + jwtConfig.expiresInSeconds,
  };

  const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
  const encodedPayload = this.base64UrlEncode(JSON.stringify(payload));
  const data = `${encodedHeader}.${encodedPayload}`;

  const signature = cryptoSign(null, Buffer.from(data), jwtConfig.privateKey);
  const encodedSignature = this.base64UrlEncode(signature);

  return `${data}.${encodedSignature}`;
}
```

### 4.1 What each piece does

- **`import { sign as cryptoSign } from 'crypto';`**
  - Uses Node’s core `crypto.sign` function to create a **digital signature** over the JWT header+payload.
  - We alias it as `cryptoSign` to avoid confusion with any other `sign` symbols.

- **`const now = Math.floor(Date.now() / 1000);`**
  - Current Unix timestamp in **seconds**.
  - Used for both `iat` (issued-at) and expiration (`exp`).

- **`header = { alg: jwtConfig.algorithm, typ: 'JWT' }`**
  - `alg`: algorithm name for the JWT — `'EdDSA'`.
  - `typ`: token type — standard `"JWT"`.
  - This header is later JSON-stringified and Base64URL-encoded.

- **`payload = { sub, email, handle, iat, exp }`**
  - `sub`: subject — here, the user’s `id`, a standard JWT claim.
  - `email`: user email (for downstream convenience).
  - `handle`: user handle (for UI / auditing).
  - `iat`: issued at (seconds since epoch).
  - `exp`: expiration time (in seconds since epoch), set to `now + jwtConfig.expiresInSeconds` (7 days by default).

- **`encodedHeader = this.base64UrlEncode(JSON.stringify(header));`**
  - Serializes the header to JSON string.
  - Encodes to Base64URL (URL-safe variant of Base64 with `-` and `_`, no padding `=`).

- **`encodedPayload = this.base64UrlEncode(JSON.stringify(payload));`**
  - Same process for the payload JSON.

- **`data = `${encodedHeader}.${encodedPayload}`;`**
  - Concatenates the two parts with a dot (`.`).
  - This is the **message** that will be signed.

- **`const signature = cryptoSign(null, Buffer.from(data), jwtConfig.privateKey);`**
  - Calls `crypto.sign` to generate the actual Ed25519 signature.
  - First argument `null`:
    - For Ed25519, Node infers the algorithm from the **type of the key** (Ed25519 key), so the digest algorithm parameter is `null` (no separate hash/digest function).
  - Second argument `Buffer.from(data)`:
    - The bytes of the `header.payload` string.
  - Third argument `jwtConfig.privateKey`:
    - The private Ed25519 key (Buffer from `jwt.config.ts`).

- **`encodedSignature = this.base64UrlEncode(signature);`**
  - Encodes the raw binary signature as Base64URL.

- **`return `${data}.${encodedSignature}`;`**
  - Builds the full JWT string: `header.payload.signature`.

- **`base64UrlEncode(input: string | Buffer)`** helper:
  - Converts input to a `Buffer`.
  - Calls `.toString('base64')`.
  - Replaces `+` → `-`, `/` → `_`, and strips `=` padding.
  - This matches the JWT Base64URL requirements.

### 4.2 Why manual JWT instead of `JwtService`

- **Library limitation**
  - Nest’s `JwtService` uses `jsonwebtoken` under the hood.
  - The version of `jsonwebtoken` in this project **does not support EdDSA/Ed25519** as a JWT `alg`.

- **Control and clarity**
  - By constructing the header, payload, and signature manually, we:
    - Avoid relying on a library that doesn’t support the algorithm we want.
    - Make the cryptographic steps explicit and easy to audit.
    - Retain the ability to later swap in another library (e.g. `jose`) if desired.

- **Security parity**
  - We still use **asymmetric signing** (private vs public key) and standard JWT semantics (`sub`, `iat`, `exp`).
  - The only difference is that we are not delegating the actual signing to `JwtService`.

### 4.3 What’s missing (verification side)

- Currently, we only **generate** the JWT in `UsersService` and return it from `login`.
- Token **verification** (e.g. via a guard or middleware) has not yet been implemented for this EdDSA flow.
  - When added, it will likely:
    - Parse the token into header, payload, signature.
    - Recompute `header.payload` and call `crypto.verify` with the **public Ed25519 key**.
    - Check `exp` and `iat` to enforce expiration.

---

## 5. Password hashing (Argon2) recap

Even though this guide focuses on EdDSA, the **password hashing** side is unchanged and still important context.

- **Where**: `src/modules/users/users.service.ts`
- **What**:
  - Uses `argon2` library (`hash`, `verify`).
  - On user creation / password update:
    - Hashes the raw password with Argon2id with parameters:
      - `timeCost: 3`
      - `memoryCost: 12288` (≈12 MB)
      - `parallelism: 1`
      - `type: 2` (Argon2id)
  - On login:
    - Uses `verify(storedHash, providedPassword)` to check the password.
- **Why**:
  - Argon2id is a modern, memory-hard password hashing algorithm, resistant to GPU/ASIC brute-force attacks.
  - Parameter choices balance security and usability for typical API login workloads.

JWT + Argon2 together provide:

- Protection of **credentials at rest** (hashing).
- Stateless **session tokens** after successful login (JWT with EdDSA signatures).

---

## 6. End-to-end login & token flow (EdDSA version)

1. **User registration**
   - Plain-text password → Argon2 hash stored in DB.
   - User created with status (e.g. `VERIFICATION_PENDING`).

2. **User login** (`UsersService.login`)
   - Looks up user by lowercased email.
   - Verifies password with Argon2.
   - Ensures the user is not `DELETED`.
   - Calls `generateToken(user)`:
     - Builds EdDSA JWT header & payload.
     - Signs `header.payload` with the Ed25519 private key using `crypto.sign`.
     - Returns the final JWT string.
   - Wraps token and user DTO into `LoginResponseDto`.

3. **Client usage**
   - Client stores the JWT (e.g. in memory, HTTP-only cookie, etc.).
   - Uses it as a Bearer token in `Authorization` headers for subsequent calls (once verification is implemented).

---

## 7. Quick glossary of important terms

- **EdDSA**: Edwards-curve Digital Signature Algorithm; in this app implemented as **Ed25519**.
- **Ed25519**: A specific EdDSA curve offering fast, secure signatures with small keys.
- **SPKI**: Subject Public Key Info, standard X.509 wrapper for public keys.
- **PKCS#8**: Standard container format for private keys, algorithm-agnostic.
- **PEM**: Text-based encoding of key material with `BEGIN/END` headers and Base64 body.
- **`iat`**: JWT claim, issued-at time (seconds since epoch).
- **`exp`**: JWT claim, expiration time (seconds since epoch).
- **`sub`**: JWT claim, subject (the principal the token is about — here, `user.id`).
- **Base64URL**: URL-safe variant of Base64 (uses `-` & `_`, no padding `=`), required for JWT segments.

This guide should be the reference for how **EdDSA / Ed25519-based JWTs** and **Argon2 password hashing** are wired in this repo **today**, using manual JWT creation instead of Nest’s `JwtService`.

import { readFileSync } from 'fs';
import { join } from 'path';

const keysDir = join(__dirname, 'keys');

export const jwtConfig = {
  publicKey: readFileSync(join(keysDir, 'public.key')),
  privateKey: readFileSync(join(keysDir, 'private.key')),
  algorithm: 'EdDSA' as const,
  expiresInSeconds: 7 * 24 * 60 * 60,
};

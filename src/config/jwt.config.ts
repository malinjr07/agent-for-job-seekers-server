import { readFileSync } from 'fs';
import { join } from 'path';

const keysDir = join(__dirname, 'keys');

export const jwtConfig = {
  publicKey: readFileSync(join(keysDir, 'public.key')),
  privateKey: readFileSync(join(keysDir, 'private.key')),
  signOptions: {
    expiresIn: '7d' as const,
    algorithm: 'ES256' as const,
  },
};

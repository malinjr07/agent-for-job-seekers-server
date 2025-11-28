import { generateKeyPairSync } from 'crypto';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const keysDir = join(__dirname, 'src/config/keys');

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

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
export const security = (
  certPath: string,
  shortCodeSecurityCredential: ArrayBuffer | SharedArrayBuffer
) => {
  const bufferToEncrypt = Buffer.from(shortCodeSecurityCredential);
  const data = fs.readFileSync(path.resolve(certPath));
  const privateKey = String(data);
  const encrypted = crypto.publicEncrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    bufferToEncrypt
  );
  const securityCredential = encrypted.toString('base64');
  return securityCredential;
};

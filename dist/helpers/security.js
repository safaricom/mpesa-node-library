import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
export var security = function(certPath, shortCodeSecurityCredential) {
  var bufferToEncrypt = Buffer.from(shortCodeSecurityCredential);
  var data = fs.readFileSync(path.resolve(certPath));
  var privateKey = String(data);
  var encrypted = crypto.publicEncrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    bufferToEncrypt
  );
  var securityCredential = encrypted.toString('base64');
  return securityCredential;
};
//# sourceMappingURL=security.js.map

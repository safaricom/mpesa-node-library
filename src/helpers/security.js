const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

module.exports = () => {
  const { MPESA_CERT_FILE, MPESA_SHORTCODE_SECURITY_CRED } = process.env
  const bufferToEncrypt = Buffer.from(MPESA_SHORTCODE_SECURITY_CRED)
  const data = fs.readFileSync(path.resolve(MPESA_CERT_FILE))
  const privateKey = String(data)
  const encrypted = crypto.publicEncrypt({
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_PADDING
  }, bufferToEncrypt)
  const securityCredential = encrypted.toString('base64')
  return securityCredential
}

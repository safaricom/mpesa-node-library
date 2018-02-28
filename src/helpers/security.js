const fs = require('fs')
const crypto = require('crypto')
const constants = require('constants')

module.exports = () => {
  // sandbox value for security credential = Security Credential (Shortcode 1)
  // production value for security credential = api initiator password
  let bufferToEncrypt = Buffer.from('ENTER SECURITY CREDENTIAL TEXT HERE')
  // read the sandbox/production certificate data
  // PATH - e.g "../keys/sandbox-cert.cer"
  let data = fs.readFileSync('PATH TO CERTIFICATE FILE')
  // convert data to string
  let privateKey = String(data)
  // encrypt the credential using the privatekey
  let encrypted = crypto.publicEncrypt({
    key: privateKey,
    padding: constants.RSA_PKCS1_PADDING
  }, bufferToEncrypt)
  // convert encrypted value to string and encode to base64
  let securityCredential = encrypted.toString('base64')
  // return value to invoking method
  return securityCredential
}
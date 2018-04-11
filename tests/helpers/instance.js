const path = require('path')
const Mpesa = require('../.././src/m-pesa')
require('dotenv').config({path: path.resolve('tests/helpers/tests.env')})
const {
  CONSUMER_KEY,
  CONSUMER_SECRET,
  SHORTCODE,
  INITIATOR_NAME,
  LIPA_NA_MPESA_SHORTCODE,
  LIPA_NA_MPESA_SHORTPASS,
  SECURITY_CREDENTIAL
} = process.env
const testInstance = new Mpesa({
  consumerKey: CONSUMER_KEY,
  consumerSecret: CONSUMER_SECRET,
  environment: 'sandbox',
  shortCode: SHORTCODE,
  initiatorName: INITIATOR_NAME,
  lipaNaMpesaShortCode: LIPA_NA_MPESA_SHORTCODE,
  lipaNaMpesaShortPass: LIPA_NA_MPESA_SHORTPASS,
  securityCredential: SECURITY_CREDENTIAL,
  certPath: path.resolve('keys/sandbox-cert.cer')
})

module.exports = testInstance

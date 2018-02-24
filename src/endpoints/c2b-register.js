const rp = require('request-promise')
const oAuth = require('./oauth')

module.exports = async (shortCode, responseType, confirmationUrl, validationUrl) => {
  const credentials = await oAuth()
  let options = {
    method: 'POST',
    // uri: 'https://api.safaricom.co.ke/mpesa/c2b/v1/registerurl',
    uri: 'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl',
    headers: {
      'Authorization': 'Bearer ' + credentials['access_token'],
      'Content-Type': 'application/json'
    },
    body: {
      'ShortCode': shortCode,
      'ResponseType': responseType,
      'ConfirmationURL': confirmationUrl,
      'ValidationURL': validationUrl
    },
    json: true
  }

  return rp(options)
}

const request = require('.././helpers/request')
module.exports = async (shortCode, responseType, confirmationUrl, validationUrl) => {
  const req = await request()
  return req.post('/mpesa/c2b/v1/registerurl', {
    'ShortCode': shortCode,
    'ResponseType': responseType,
    'ConfirmationURL': confirmationUrl,
    'ValidationURL': validationUrl
  })
}

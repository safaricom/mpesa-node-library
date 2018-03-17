const request = require('.././helpers/request')
module.exports = async (shortCode, timeStamp, passKey, checkoutRequestId) => {
  const password = Buffer.from(`${shortCode}${passKey}${timeStamp}`).toString('base64')
  const req = await request()
  return req.post('/mpesa/stkpushquery/v1/query', {
    'BusinessShortCode': shortCode,
    'Password': password,
    'Timestamp': timeStamp,
    'CheckoutRequestID': checkoutRequestId
  })
}

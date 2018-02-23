const rp = require('request-promise')
const oAuth = require('./oauth')

module.exports = async (shortCode, timeStamp, passKey, checkoutRequestId) => {
  const credentials = await oAuth()
  let password = new Buffer(shortCode + passKey + timeStamp).toString('base64')
  let options = {
    method: 'POST',
    // uri: 'https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query',
    uri: 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    },
    body: {
      'BusinessShortCode': shortCode,
      'Password': password,
      'Timestamp': timeStamp,
      'CheckoutRequestID': checkoutRequestId
    },
    json: true
  }
  return rp(options)
}

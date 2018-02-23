const rp = require('request-promise')
const oAuth = require('./oauth')

module.exports = async (shortCode, commandId, amount, msisdn, billRefNumber) => {
  const credentials = await oAuth()
  let options = {
    method: 'POST',
    // uri: 'https://api.safaricom.co.ke/mpesa/c2b/v1/simulate',
    uri: 'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate',
    headers: {
      'Authorization': 'Bearer ' + credentials['access_token'],
      'Content-Type': 'application/json'
    },
    body: {
      'ShortCode': shortCode,
      'CommandID': commandId,
      'Amount': amount,
      'Msisdn': msisdn,
      'BillRefNumber': billRefNumber
    },
    json: true
  }

  return rp(options)
}

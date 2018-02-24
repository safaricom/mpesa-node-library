const rp = require('request-promise')
const oAuth = require('./oauth')

module.exports = async (initiatorName, commandId, amount, partyA, partyB, remarks, queueUrl, resultUrl, occasion) => {
  const credentials = await oAuth()
  let options = {
    method: 'POST',
    // uri: 'https://api.safaricom.co.ke/mpesa/b2c/v1/paymentrequest',
    uri: 'https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest',
    headers: {
      'Authorization': 'Bearer ' + credentials['access_token'],
      'Content-Type': 'application/json'
    },
    body: {
      'InitiatorName': initiatorName,
      'SecurityCredential': security_credential,
      'CommandID': commandId,
      'Amount': amount,
      'PartyA': partyA,
      'PartyB': partyB,
      'Remarks': remarks,
      'QueueTimeOutURL': queueUrl,
      'ResultURL': resultUrl,
      'Occasion': occasion
    },
    json: true
  }
  return rp(options)
}

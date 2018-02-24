const rp = require('request-promise')
const oAuth = require('./oauth')

module.exports = async (initiator, commandId, senderId, receiverId, amount, partyA, partyB, accountRef, remarks, queueUrl, resultUrl, occasion) => {
  const credentials = await oAuth()
  let options = {
    method: 'POST',
    // uri: 'https://api.safaricom.co.ke/mpesa/b2b/v1/paymentrequest',
    uri: 'https://sandbox.safaricom.co.ke/mpesa/b2b/v1/paymentrequest',
    headers: {
      'Authorization': 'Bearer ' + credentials['access_token'],
      'Content-Type': 'application/json'
    },
    body: {
      'Initiator': initiator,
      'SecurityCredential': security_credential,
      'CommandID': commandId,
      'SenderIdentifierType': senderId,
      'RecieverIdentifierType': receiverId,
      'Amount': amount,
      'PartyA': partyA,
      'PartyB': partyB,
      'AccountReference': accountRef,
      'Remarks': remarks,
      'QueueTimeOutURL': queueUrl,
      'ResultURL': resultUrl,
      'Occasion': occasion
    },
    json: true
  }

  return rp(options)
}

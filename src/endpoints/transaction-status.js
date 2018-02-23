const rp = require('request-promise')
const oAuth = require('./oauth')

module.exports = async (initiator, commandId, transactionId, partyA, idType, resultUrl, queueUrl, remarks, occasion, originalConversationId) => {
  const security_credential = this.security()
  const credentials = await oAuth()
  let options = {
    method: 'POST',
    // uri: 'https://api.safaricom.co.ke/mpesa/reversal/v1/request',
    uri: 'https://sandbox.safaricom.co.ke/mpesa/transactionstatus/v1/query',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    },
    body: {
      'Initiator': initiator,
      'SecurityCredential': security_credential,
      'CommandID': commandId,
      'TransactionID': transactionId,
      'PartyA': partyA,
      'IdentifierType': idType,
      'ResultURL': resultUrl,
      'QueueTimeOutURL': queueUrl,
      'Remarks': remarks,
      'Occasion': occasion,
      'OriginalConversationID': originalConversationId
    },
    json: true
  }
  return rp(options)
}

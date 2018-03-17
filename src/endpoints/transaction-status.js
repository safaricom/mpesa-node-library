const security = require('.././helpers/security')
const request = require('.././helpers/request')

module.exports = async (initiator, commandId, transactionId, partyA, idType, resultUrl, queueUrl, remarks, occasion, originalConversationId) => {
  const securityCredential = security()
  const req = await request()
  return req.post('/mpesa/transactionstatus/v1/query', {
    'Initiator': initiator,
    'SecurityCredential': securityCredential,
    'CommandID': commandId,
    'TransactionID': transactionId,
    'PartyA': partyA,
    'IdentifierType': idType,
    'ResultURL': resultUrl,
    'QueueTimeOutURL': queueUrl,
    'Remarks': remarks,
    'Occasion': occasion,
    'OriginalConversationID': originalConversationId
  })
}

const security = require('.././helpers/security')
const request = require('.././helpers/request')
module.exports = async (initiator, commandId, transactionId, amount, receiverParty, receiverIdType, resultUrl, queueUrl, remarks, occasion) => {
  const securityCredential = security()
  const req = await request()
  return req.post('/mpesa/reversal/v1/request', {
    'Initiator': initiator,
    'SecurityCredential': securityCredential,
    'CommandID': commandId,
    'TransactionID': transactionId,
    'Amount': amount,
    'ReceiverParty': receiverParty,
    'RecieverIdentifierType': receiverIdType,
    'ResultURL': resultUrl,
    'QueueTimeOutURL': queueUrl,
    'Remarks': remarks,
    'Occasion': occasion
  })
}

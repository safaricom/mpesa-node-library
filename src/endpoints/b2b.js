const security = require('.././helpers/security')
const request = require('.././helpers/request')
module.exports = async (initiator, commandId, senderId, receiverId, amount, partyA, partyB, accountRef, remarks, queueUrl, resultUrl, occasion) => {
  const req = await request()
  const securityCredential = security()
  return req.post('/mpesa/b2b/v1/paymentrequest', {
    'Initiator': initiator,
    'SecurityCredential': securityCredential,
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
  })
}

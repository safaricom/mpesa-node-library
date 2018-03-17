const security = require('.././helpers/security')
const request = require('.././helpers/request')
module.exports = async (initiatorName, commandId, amount, partyA, partyB, remarks, queueUrl, resultUrl, occasion) => {
  const securityCredential = security()
  const req = await request()
  return req.post('/mpesa/b2c/v1/paymentrequest', {
    'InitiatorName': initiatorName,
    'SecurityCredential': securityCredential,
    'CommandID': commandId,
    'Amount': amount,
    'PartyA': partyA,
    'PartyB': partyB,
    'Remarks': remarks,
    'QueueTimeOutURL': queueUrl,
    'ResultURL': resultUrl,
    'Occasion': occasion
  })
}

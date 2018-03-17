const security = require('.././helpers/security')
const request = require('.././helpers/request')

module.exports = async (initiator, commandId, partyA, idType, remarks, queueUrl, resultUrl) => {
  const securityCredential = security()
  const req = await request()
  return req.post('/mpesa/accountbalance/v1/query', {
    'Initiator': initiator,
    'SecurityCredential': securityCredential,
    'CommandID': commandId,
    'PartyA': partyA,
    'IdentifierType': idType,
    'Remarks': remarks,
    'QueueTimeOutURL': queueUrl,
    'ResultURL': resultUrl
  })
}

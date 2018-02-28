const rp = require('request-promise')
const oAuth = require('./oauth')

module.exports = async (initiator) => {
  const security_credential = this.security()
  const credentials = await oAuth()
  let options = {
    method: 'POST',
    // uri: 'https://api.safaricom.co.ke/mpesa/accountbalance/v1/query',
    uri: 'https://sandbox.safaricom.co.ke/mpesa/accountbalance/v1/query',
    headers: {
      'Authorization': 'Bearer ' + credentials['access_token'],
      'Content-Type': 'application/json'
    },
    body: {
      'Initiator': initiator,
      'SecurityCredential': security_credential,
      'CommandID': commandId,
      'PartyA': partyA,
      'IdentifierType': idType,
      'Remarks': remarks,
      'QueueTimeOutURL': queueUrl,
      'ResultURL': resultUrl
    },
    json: true
  }

  rp(options)
}

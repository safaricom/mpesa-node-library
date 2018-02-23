const rp = require('request-promise')
const oAuth = require('./oauth')

module.exports = async (shortCode, timeStamp, passKey, transactionType, amount, partyA, partyB, phoneNumber, callbackUrl, accountRef, transactionDesc) => {
  const credentials = await oAuth()
  let password = new Buffer(shortCode + passKey + timeStamp).toString('base64')
  let options = {
    method: 'POST',
    // uri: 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
    uri: 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
    headers: {
      'Authorization': 'Bearer ' + credentials['access_token'],
      'Content-Type': 'application/json'
    },
    body: {
      'BusinessShortCode': shortCode,
      'Password': password,
      'Timestamp': timeStamp,
      'TransactionType': transactionType,
      'Amount': amount,
      'PartyA': partyA,
      'PartyB': partyB,
      'PhoneNumber': phoneNumber,
      'CallBackURL': callbackUrl,
      'AccountReference': accountRef,
      'TransactionDesc': transactionDesc
    },
    json: true
  }

  return rp(options)
}

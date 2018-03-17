const request = require('.././helpers/request')
module.exports = async (shortCode, timeStamp, passKey, transactionType, amount, partyA, partyB, phoneNumber, callbackUrl, accountRef, transactionDesc) => {
  const password = Buffer.from(`${shortCode}${passKey}${timeStamp}`).toString('base64')
  const req = await request()
  return req.post('/mpesa/stkpush/v1/processrequest', {
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
  })
}

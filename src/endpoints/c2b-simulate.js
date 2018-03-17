const request = require('.././helpers/request')
module.exports = async (shortCode, commandId, amount, msisdn, billRefNumber) => {
  const req = await request()
  return req.post('/mpesa/c2b/v1/simulate', {
    'ShortCode': shortCode,
    'CommandID': commandId,
    'Amount': amount,
    'Msisdn': msisdn,
    'BillRefNumber': billRefNumber
  })
}

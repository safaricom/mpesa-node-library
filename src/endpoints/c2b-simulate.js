/**
 * C2B Simulate Transaction
 * @name C2BSimulate
 * @function
 * @description Use this API to simulate a C2B transaction
 * @see {@link https://developer.safaricom.co.ke/c2b/apis/post/simulate | C2B Simulate Transaction }
 * @param  {number} msisdn                              Phone number (msisdn) initiating the transaction
 * @param  {number} amount                              The amount being transacted
 * @param  {string} billRefNumber                Bill Reference Number
 * @param  {string} [commandId='CustomerPayBillOnline'] Unique command for each transaction type. For C2B dafult
 * @param  {number} [shortCode=null]                    Short Code receiving the amount being transacted
 * @return {Promise}
 */
module.exports = async function (msisdn, amount, billRefNumber, commandId = 'CustomerPayBillOnline', shortCode = null) {
  const req = await this.request()
  return req.post('/mpesa/c2b/v1/simulate', {
    'ShortCode': shortCode || this.configs.shortCode,
    'CommandID': commandId,
    'Amount': amount,
    'Msisdn': msisdn,
    'BillRefNumber': billRefNumber
  })
}

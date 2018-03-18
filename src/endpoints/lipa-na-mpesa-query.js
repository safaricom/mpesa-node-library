/**
 * Lipa Na M-Pesa Query Request API
 * @name LipaNaMpesaQuery
 * @description Use this API to check the status of a Lipa Na M-Pesa Online Payment.
 * @param  {string} checkoutRequestId Checkout RequestID
 * @param  {number} [shortCode=null]  Business Short Code
 * @param  {number} [timeStamp=null]  timeStamp
 * @param  {string} [passKey=null]    lipaNaMpesa Pass Key
 * @return {Promise}
 */
module.exports = async function (checkoutRequestId, shortCode = null, passKey = null) {
  const _shortCode = shortCode || this.configs.lipaNaMpesaShortCode
  const _passKey = passKey || this.configs.lipaNaMpesaShortPass
  const timeStamp = (new Date()).toISOString().replace(/[^0-9]/g, '').slice(0, -3)
  const password = Buffer.from(`${_shortCode}${_passKey}${timeStamp}`).toString('base64')
  const req = await this.request()
  return req.post('/mpesa/stkpushquery/v1/query', {
    'BusinessShortCode': _shortCode,
    'Password': password,
    'Timestamp': timeStamp,
    'CheckoutRequestID': checkoutRequestId
  })
}

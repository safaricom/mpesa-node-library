/**
 * AccountBalance - Use this API to enquire the balance on an M-Pesa BuyGoods (Till Number)
 * @name AccountBalance
 * @function
 * @see {@link https://developer.safaricom.co.ke/account-balance/apis/post/query|Account Balance Request}
 * @param  {integer} shortCode          The organisation shortCode
 * @param  {integer} idType             Type of organization receiving the transaction
 * @param  {String} queueUrl            The path that stores information of a time out transaction
 * @param  {String} resultUrl          The path that stores information of transaction
 * @param  {String} [remarks='Checking account balance'] Comments that are sent along with the transaction.
 * @param  {String} [initiator=null]   The name of Initiator to initiating  the request
 * @param  {String} [commandId='AccountBalance']   Takes only 'AccountBalance' CommandID
 * @return {Promise}                    This returns a promise that resolves to the account balance
 */
module.exports = async function accountBalance (shortCode, idType, queueUrl, resultUrl, remarks = 'Checking account balance', initiator = null, commandId = 'AccountBalance') {
  const securityCredential = this.security()
  const req = await this.request()
  return req.post('/mpesa/accountbalance/v1/query', {
    'Initiator': initiator || this.configs.initiatorName,
    'SecurityCredential': securityCredential,
    'CommandID': commandId,
    'PartyA': shortCode,
    'IdentifierType': idType,
    'Remarks': remarks,
    'QueueTimeOutURL': queueUrl,
    'ResultURL': resultUrl
  })
}

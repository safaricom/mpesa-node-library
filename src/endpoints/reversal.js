/**
 * Reversal Request
 * @name ReversalRequest
 * @description Transaction Reversal API reverses a M-Pesa transaction.
 * @function
 * @see {@link https://developer.safaricom.co.ke/reversal/apis/post/request| Reversal Request}
 * @param  {string} transactionId                     The transaction id for reversal eg LKXXXX1234
 * @param  {string} queueUrl                          The path that stores information of time out transaction
 * @param  {string} resultUrl                         The path that stores information of transaction
 * @param  {string} [shortCode=null]                  Organization receiving the transaction
 * @param  {String} [remarks='Reversal']              Comments that are sent along with the transaction.
 * @param  {String} [occasion='Reversal']             Optional Parameter
 * @param  {[type]} [initiator=null]                  The name of Initiator to initiating the request
 * @param  {String} [receiverIdType='11']             Type of organization receiving the transaction
 * @param  {String} [commandId='TransactionReversal'] Takes only 'TransactionReversal' Command id
 * @return {Promise}
 */
module.exports = async function (transactionId, amount, queueUrl, resultUrl, shortCode = null, remarks = 'Reversal', occasion = 'Reversal', initiator = null, receiverIdType = '11', commandId = 'TransactionReversal') {
  const securityCredential = this.security()
  const req = await this.request()
  return req.post('/mpesa/reversal/v1/request', {
    'Initiator': initiator || this.configs.initiatorName,
    'SecurityCredential': securityCredential,
    'CommandID': commandId,
    'TransactionID': transactionId,
    'Amount': amount,
    'ReceiverParty': shortCode || this.configs.shortCode,
    'RecieverIdentifierType': receiverIdType,
    'ResultURL': resultUrl,
    'QueueTimeOutURL': queueUrl,
    'Remarks': remarks,
    'Occasion': occasion
  })
}

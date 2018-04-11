/**
 * Transaction Status Request
 * @name TransactionStatus
 * @description Use this api to check the transaction status.
 * @function
 * @see {@link https://developer.safaricom.co.ke/transaction-status/apis/post/query| Transaction Status Request }
 * @param  {string} transactionId                        Unique identifier to identify a transaction on M-Pesa
 * @param  {number} receiverParty                        Organization/MSISDN receiving the transaction
 * @param  {number} idType                               Type of organization receiving the transaction
 * @param  {string} queueUrl                             The path that stores information of time out transaction
 * @param  {string} resultUrl                            The path that stores information of transaction
 * @param  {String} [remarks='TransactionReversal']      Comments that are sent along with the transaction
 * @param  {String} [occasion='TransactionReversal']     Optional Parameter
 * @param  {[type]} [initiator=null]                     The name of Initiator to initiating  the request
 * @param  {String} [commandId='TransactionStatusQuery'] Takes only 'TransactionStatusQuery' command id
 * @return {Promise}
 */
module.exports = async function (transactionId, receiverParty, idType, queueUrl, resultUrl, remarks = 'TransactionReversal', occasion = 'TransactionReversal', initiator = null, commandId = 'TransactionStatusQuery') {
  const securityCredential = this.security()
  const req = await this.request()
  return req.post('/mpesa/transactionstatus/v1/query', {
    'Initiator': initiator || this.configs.initiatorName,
    'SecurityCredential': securityCredential,
    'CommandID': commandId,
    'TransactionID': transactionId,
    'PartyA': receiverParty,
    'IdentifierType': idType,
    'ResultURL': resultUrl,
    'QueueTimeOutURL': queueUrl,
    'Remarks': remarks,
    'Occasion': occasion
  })
}

/**
 * B2B Request
 * @name B2BRequest
 * @function
 * @see {@link https://developer.safaricom.co.ke/b2b/apis/post/paymentrequest|Account Balance Request}
 * @description - Use this api to transit Mpesa Transaction from one company to another.
 * @param  {number}  senderParty                              Organization Sending the transaction
 * @param  {number}  receiverParty                            Organization Receiving the funds
 * @param  {number}  amount                                   The amount been transacted
 * @param  {string}  queueUrl                                 The path that stores information of time out transactions
 * @param  {string}  resultUrl                                The path that receives results from M-Pesa.
 * @param  {number}  [senderType=4]                           Type of organization sending the transaction[ default Shortcode]
 * @param  {number}  [receiverType=4]                         Type of organization receiving the transaction [ default Shortcode]
 * @param  {string}  [initiator=null]                         This is the credential/username used to authenticate the transaction request.
 * @param  {String}  [commandId='BusinessToBusinessTransfer'] The command id used to carry out a B2B payment[BusinessPayBill,BusinessBuyGoods, DisburseFundsToBusiness, BusinessToBusinessTransfer, MerchantToMerchantTransfer]
 * @param  {string}  [accountRef=null]                        Account Reference mandatory for "BussinessPaybill" CommandID
 * @param  {String}  [remarks='B2B Request']                  Comments that are sent along with the transaction.
 * @return {Promise}
 */
module.exports = async function (senderParty, receiverParty, amount, queueUrl, resultUrl, senderType = 4, receiverType = 4, initiator = null, commandId = 'BusinessToBusinessTransfer', accountRef = null, remarks = 'B2B Request') {
  const req = await this.request()
  const securityCredential = this.security()
  return req.post('/mpesa/b2b/v1/paymentrequest', {
    'Initiator': initiator || this.configs.initiatorName,
    'SecurityCredential': securityCredential,
    'CommandID': commandId,
    'SenderIdentifierType': senderType,
    'RecieverIdentifierType': receiverType,
    'Amount': amount,
    'PartyA': senderParty,
    'PartyB': receiverParty,
    'AccountReference': accountRef,
    'Remarks': remarks,
    'QueueTimeOutURL': queueUrl,
    'ResultURL': resultUrl
  })
}

import Mpesa from '../';
import { AxiosResponse } from 'axios';
/**
 * B2B Request
 * @name B2BRequest
 * @function
 * @see {@link https://developer.safaricom.co.ke/b2b/apis/post/paymentrequest|Account Balance Request}
 * @description - Use mpesa api to transit Mpesa Transaction from one company to another.
 * @param  {number}  senderParty                              Organization Sending the transaction
 * @param  {number}  receiverParty                            Organization Receiving the funds
 * @param  {number}  amount                                   The amount been transacted
 * @param  {string}  queueUrl                                 The path that stores information of time out transactions
 * @param  {string}  resultUrl                                The path that receives results from M-Pesa.
 * @param  {number}  [senderType=4]                           Type of organization sending the transaction[ default Shortcode]
 * @param  {number}  [receiverType=4]                         Type of organization receiving the transaction [ default Shortcode]
 * @param  {string}  [initiator=null]                         mpesa is the credential/username used to authenticate the transaction request.
 * @param  {String}  [commandId='BusinessToBusinessTransfer'] The command id used to carry out a B2B payment[BusinessPayBill,BusinessBuyGoods, DisburseFundsToBusiness, BusinessToBusinessTransfer, MerchantToMerchantTransfer]
 * @param  {string}  [accountRef=null]                        Account Reference mandatory for "BussinessPaybill" CommandID
 * @param  {String}  [remarks='B2B Request']                  Comments that are sent along with the transaction.
 * @return {Promise}
 */
export type B2BOptions = {
  senderParty: number;
  receiverParty: number;
  amount: number;
  queueUrl: string;
  resultUrl: string;
  senderType?: number;
  receiverType?: number;
  initiator?: string;
  commandId?: string;
  accountRef?: string;
  remarks?: string;
};

// TODO Possible Spelling Error "RecieverIdentifierType" -> "ReceiverIdentifierType"
export async function b2b(
  mpesa: Mpesa,
  options: B2BOptions
): Promise<AxiosResponse<any>> {
  const req = await mpesa.request();
  const securityCredential = mpesa.security();
  return req.post('/mpesa/b2b/v1/paymentrequest', {
    Initiator: options.initiator || mpesa.configs.initiatorName,
    SecurityCredential: securityCredential,
    CommandID: options.commandId || 'BusinessToBusinessTransfer',
    SenderIdentifierType: options.senderType || 4,
    RecieverIdentifierType: options.receiverType || 4,
    Amount: options.amount,
    PartyA: options.senderParty,
    PartyB: options.receiverParty,
    AccountReference: options.accountRef,
    Remarks: options.remarks || 'B2B Request',
    QueueTimeOutURL: options.queueUrl,
    ResultURL: options.resultUrl,
  });
}

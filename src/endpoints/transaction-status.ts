import Mpesa from '../';
import { AxiosResponse } from 'axios';

/**
 * Transaction Status Request
 * @name TransactionStatus
 * @description Use mpesa api to check the transaction status.
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
export type TransactionStatusOptions = {
  transactionId: string;
  receiverParty: number;
  idType: number;
  queueUrl: string;
  resultUrl: string;
  remarks?: string;
  occasion?: string;
  initiator?: string;
  commandId?: string;
};
export async function transactionStatus(
  mpesa: Mpesa,
  options: TransactionStatusOptions
): Promise<AxiosResponse<any>> {
  const securityCredential = mpesa.security();
  const req = await mpesa.request();
  return req.post('/mpesa/transactionstatus/v1/query', {
    Initiator: options.initiator || mpesa.configs.initiatorName,
    SecurityCredential: securityCredential,
    CommandID: options.commandId || 'TransactionStatusQuery',
    TransactionID: options.transactionId,
    PartyA: options.receiverParty,
    IdentifierType: options.idType,
    ResultURL: options.resultUrl,
    QueueTimeOutURL: options.queueUrl,
    Remarks: options.remarks || 'TransactionReversal',
    Occasion: options.occasion || 'TransactionReversal',
  });
}

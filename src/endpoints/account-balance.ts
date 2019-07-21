import Mpesa from '../';
import { AxiosResponse } from 'axios';

/**
 * AccountBalance - Use this API to enquire the balance on an M-Pesa BuyGoods (Till Number)
 * @name AccountBalance
 * @function
 * @see {@link https://developer.safaricom.co.ke/account-balance/apis/post/query|Account Balance Request}
 * @param  {number} shortCode          The organization shortCode
 * @param  {number} idType             Type of organization receiving the transaction
 * @param  {String} queueUrl            The path that stores information of a time out transaction
 * @param  {String} resultUrl          The path that stores information of transaction
 * @param  {String} [remarks='Checking account balance'] Comments that are sent along with the transaction.
 * @param  {String} [initiator=null]   The name of Initiator to initiating  the request
 * @param  {String} [commandId='AccountBalance']   Takes only 'AccountBalance' CommandID
 * @return {Promise}                    This returns a promise that resolves to the account balance
 */
export type AccountBalanceOptions = {
  shortCode: number;
  idType: number;
  queueUrl: string;
  resultUrl: string;
  remarks?: string;
  initiator?: string;
  commandId?: string;
};
export async function accountBalance(
  mpesa: Mpesa,
  options: AccountBalanceOptions
): Promise<AxiosResponse<any>> {
  const securityCredential = mpesa.security();
  const req = await mpesa.request();
  return req.post('/mpesa/accountbalance/v1/query', {
    Initiator: options.initiator || mpesa.configs.initiatorName,
    SecurityCredential: securityCredential,
    CommandID: options.commandId || 'AccountBalance',
    PartyA: options.shortCode,
    IdentifierType: options.idType,
    Remarks: options.remarks || 'Checking account balance',
    QueueTimeOutURL: options.queueUrl,
    ResultURL: options.resultUrl,
  });
}

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
export declare type AccountBalanceOptions = {
  shortCode: number;
  idType: number;
  queueUrl: string;
  resultUrl: string;
  remarks?: string;
  initiator?: string;
  commandId?: string;
};
export declare function accountBalance(
  mpesa: Mpesa,
  options: AccountBalanceOptions
): Promise<AxiosResponse<any>>;

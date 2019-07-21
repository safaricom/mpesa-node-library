import Mpesa from '../';
import { AxiosResponse } from 'axios';
/**
 * B2C Payment Request
 * @name B2CRequest
 * @function
 * @description Use this API to transact between an M-Pesa short code to a phone number registered on M-Pesa.
 * @see {@link https://developer.safaricom.co.ke/b2c/apis/post/paymentrequest|B2C Payment Request}
 * @param  {number} senderParty                   Organization /MSISDN sending the transaction
 * @param  {number} receiverParty                 MSISDN receiving the transaction
 * @param  {number} amount                        The amount being transacted
 * @param  {string} queueUrl                      The path that stores information of time out transaction
 * @param  {string} resultUrl                     The path that stores information of transaction
 * @param  {string} [commandId='BusinessPayment'] Unique command for each transaction type [SalaryPayment|BusinessPayment|PromotionPayment]
 * @param  {string} [initiatorName=null]          The name of the initiator initiating the request
 * @param  {String} [remarks='B2C Payment']       Comments that are sent along with the transaction.
 * @param  {string} occasion
 * @return {Promise}
 */
export declare type B2COptions = {
  senderParty: number;
  receiverParty: number;
  amount: number;
  queueUrl: string;
  resultUrl: string;
  commandId?: 'SalaryPayment' | 'BusinessPayment' | 'PromotionPayment';
  initiatorName?: string;
  remarks?: string;
  occasion: string;
};
export declare function b2c(
  mpesa: Mpesa,
  options: B2COptions
): Promise<AxiosResponse<any>>;

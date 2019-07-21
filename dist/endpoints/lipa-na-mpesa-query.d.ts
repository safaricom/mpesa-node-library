import Mpesa from '../';
import { AxiosResponse } from 'axios';
/**
 * Lipa Na M-Pesa Query Request API
 * @name LipaNaMpesaQuery
 * @description Use mpesa API to check the status of a Lipa Na M-Pesa Online Payment.
 * @param  {string} checkoutRequestId Checkout RequestID
 * @param  {number} [shortCode=null]  Business Short Code
 * @param  {number} [timeStamp=null]  timeStamp
 * @param  {string} [passKey=null]    lipaNaMpesa Pass Key
 * @return {Promise}
 */
export declare type LipaNaMpesaQueryOptions = {
  checkoutRequestId: string;
  shortCode?: number;
  passKey?: string;
};
export declare function lipaNaMpesaQuery(
  mpesa: Mpesa,
  options: LipaNaMpesaQueryOptions
): Promise<AxiosResponse<any>>;

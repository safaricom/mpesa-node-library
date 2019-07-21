import Mpesa from '../';
import { AxiosResponse } from 'axios';

/**
 * C2B Simulate Transaction
 * @name C2BSimulate
 * @function
 * @description Use mpesa API to simulate a C2B transaction
 * @see {@link https://developer.safaricom.co.ke/c2b/apis/post/simulate | C2B Simulate Transaction }
 * @param  {number} msisdn                              Phone number (msisdn) initiating the transaction
 * @param  {number} amount                              The amount being transacted
 * @param  {string} billRefNumber                Bill Reference Number
 * @param  {string} [commandId='CustomerPayBillOnline'] Unique command for each transaction type. For C2B dafult
 * @param  {number} [shortCode=null]                    Short Code receiving the amount being transacted
 * @return {Promise}
 */
export type C2BSimulateOptions = {
  msisdn: number;
  amount: number;
  billRefNumber: string;
  commandId: string;
  shortCode?: number;
};
export async function c2bSimulate(
  mpesa: Mpesa,
  options: C2BSimulateOptions
): Promise<AxiosResponse<any>> {
  const req = await mpesa.request();
  return req.post('/mpesa/c2b/v1/simulate', {
    ShortCode: options.shortCode || mpesa.configs.shortCode,
    CommandID: options.commandId || 'CustomerPayBillOnline',
    Amount: options.amount,
    Msisdn: options.msisdn,
    BillRefNumber: options.billRefNumber,
  });
}

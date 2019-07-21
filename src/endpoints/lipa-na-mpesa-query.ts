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
export type LipaNaMpesaQueryOptions = {
  checkoutRequestId: string;
  shortCode?: number;
  passKey?: string;
};
export async function lipaNaMpesaQuery(
  mpesa: Mpesa,
  options: LipaNaMpesaQueryOptions
): Promise<AxiosResponse<any>> {
  const _shortCode = options.shortCode || mpesa.configs.lipaNaMpesaShortCode;
  const _passKey = options.passKey || mpesa.configs.lipaNaMpesaShortPass;
  const timeStamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, '')
    .slice(0, -3);
  const password = Buffer.from(`${_shortCode}${_passKey}${timeStamp}`).toString(
    'base64'
  );
  const req = await mpesa.request();
  return req.post('/mpesa/stkpushquery/v1/query', {
    BusinessShortCode: _shortCode,
    Password: password,
    Timestamp: timeStamp,
    CheckoutRequestID: options.checkoutRequestId,
  });
}

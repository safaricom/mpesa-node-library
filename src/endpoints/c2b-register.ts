import Mpesa from '../';
import { AxiosResponse } from 'axios';

/**
 * C2B Register URL
 * @name C2BRegister
 * @function
 * @description Use this API to register validation and confirmation URLs on M-Pesa
 * @see {@link https://developer.safaricom.co.ke/c2b/apis/post/registerurl| C2B Register URL}
 * @param  {string} confirmationUrl            Validation URL for the client
 * @param  {string} validationUrl              Confirmation URL for the client
 * @param  {number} [shortCode=null]           The short code of the organization.
 * @param  {string} [responseType='Completed'] Default response type for timeout. Incase a tranaction times out, Mpesa will by default Complete or Cancel the transaction
 * @return {Promise}
 */
export type C2BRegisterOptions = {
  confirmationUrl: string;
  validationUrl: string;
  shortCode?: number;
  responseType?: string;
};
export async function c2bRegister(
  mpesa: Mpesa,
  options: C2BRegisterOptions
): Promise<AxiosResponse<any>> {
  const req = await mpesa.request();
  return req.post('/mpesa/c2b/v1/registerurl', {
    ShortCode: options.shortCode || mpesa.configs.shortCode,
    ResponseType: options.responseType || 'Completed',
    ConfirmationURL: options.confirmationUrl,
    ValidationURL: options.validationUrl,
  });
}

import Mpesa from '../';
import { AxiosResponse } from 'axios';
/**
 * Lipa Na M-Pesa Online Payment API
 * @name lipaNaMpesaOnline
 * @description Use mpesa API to initiate online payment on behalf of a customer.
 * @see {@link https://developer.safaricom.co.ke/lipa-na-m-pesa-online/apis/post/stkpush/v1/processrequest|Lipa Na M-Pesa Online Payment API }
 * @param  {number} senderMsisdn                              The MSISDN sending the funds
 * @param  {number} amount                                    The amount to be transacted
 * @param  {string} callbackUrl                               Call Back URL
 * @param  {string} accountRef                                Account Reference
 * @param  {string} [transactionDesc='Lipa na mpesa online']  any string of less then 20 characters
 * @param  {string} [transactionType='CustomerPayBillOnline'] The transaction type to be used for the request 'CustomerPayBillOnline'
 * @param  {number} [shortCode=null]                          The organization shortcode used to receive the transaction
 * @param  {string} [passKey=null]                            Lipa na mpesa passKey
 * @return {Promise}
 */
export type LipaNaMpesaOnlineOptions = {
  senderMsisdn: number;
  amount: number;
  callbackUrl: string;
  accountRef: string;
  transactionDesc?: string;
  transactionType?: string;
  shortCode?: number;
  passKey?: string;
};
export async function lipaNaMpesaOnline(
  mpesa: Mpesa,
  options: LipaNaMpesaOnlineOptions
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
  return req.post('/mpesa/stkpush/v1/processrequest', {
    BusinessShortCode: _shortCode,
    Password: password,
    Timestamp: timeStamp,
    TransactionType: options.transactionType || 'CustomerPayBillOnline',
    Amount: options.amount,
    PartyA: options.senderMsisdn,
    PartyB: _shortCode,
    PhoneNumber: options.senderMsisdn,
    CallBackURL: options.callbackUrl,
    AccountReference: options.accountRef,
    TransactionDesc: options.transactionDesc || 'Lipa na mpesa online',
  });
}

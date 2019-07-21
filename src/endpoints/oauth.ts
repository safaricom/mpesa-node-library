import axios, { AxiosResponse } from 'axios';
import Mpesa from '../';

export type OAuthOptions = {
  consumerKey: string;
  consumerSecret: string;
  baseURL?: string;
};
export function oAuth(
  mpesa: Mpesa,
  options: OAuthOptions
): Promise<AxiosResponse<any>> {
  const auth = Buffer.from(
    options.consumerKey + ':' + options.consumerSecret
  ).toString('base64');
  return axios.get(
    (options.baseURL || mpesa.baseURL) +
      '/oauth/v1/generate?grant_type=client_credentials',
    {
      headers: {
        Authorization: 'Basic ' + auth,
        'content-type': 'application/json',
      },
    }
  );
}

import { AxiosResponse } from 'axios';
import Mpesa from '../';
export declare type OAuthOptions = {
  consumerKey: string;
  consumerSecret: string;
  baseURL?: string;
};
export declare function oAuth(
  mpesa: Mpesa,
  options: OAuthOptions
): Promise<AxiosResponse<any>>;

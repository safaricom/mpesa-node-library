import { B2BOptions } from './endpoints/b2b';
import { B2COptions } from './endpoints/b2c';
import { C2BRegisterOptions } from './endpoints/c2b-register';
import { C2BSimulateOptions } from './endpoints/c2b-simulate';
import { TransactionStatusOptions } from './endpoints/transaction-status';
import { LipaNaMpesaQueryOptions } from './endpoints/lipa-na-mpesa-query';
import { LipaNaMpesaOnlineOptions } from './endpoints/lipa-na-mpesa-online';
import { AccountBalanceOptions, ReversalOptions } from './endpoints';
import { AxiosInstance, AxiosResponse } from 'axios';
/**
 * Class representing the Mpesa instance
 */
export declare type MpesaEnvironment = 'production' | 'sandbox';
export interface MpesaConfig {
  consumerKey: string;
  consumerSecret: string;
  shortCode: number;
  lipaNaMpesaShortCode: number;
  lipaNaMpesaShortPass: string;
  environment: MpesaEnvironment;
  initiatorName: string;
  certPath: string;
  securityCredential: ArrayBuffer | SharedArrayBuffer;
}
export default class Mpesa {
  configs: MpesaConfig;
  request: (_baseURL?: string) => Promise<AxiosInstance>;
  security: () => string;
  baseURL: string;
  environment: MpesaEnvironment;
  /**
   * Introduce Mpesa Configuration
   * @constructor
   * @param {Object} [config={}] The Configuration  to use for mPesa
   */
  constructor(config: MpesaConfig);
  /**
   * AccountBalance via instance
   * @borrows AccountBalance as accountBalanceCall
   */
  accountBalance(options: AccountBalanceOptions): Promise<AxiosResponse<any>>;
  /**
   * B2B Request via instance
   * @name b2bCall
   */
  b2b(options: B2BOptions): Promise<AxiosResponse<any>>;
  /**
   * B2C Request
   * @borrows B2CRequest as b2c
   */
  b2c(options: B2COptions): Promise<AxiosResponse<any>>;
  c2bRegister(options: C2BRegisterOptions): Promise<AxiosResponse<any>>;
  c2bSimulate(options: C2BSimulateOptions): Promise<AxiosResponse<any>>;
  lipaNaMpesaOnline(
    options: LipaNaMpesaOnlineOptions
  ): Promise<AxiosResponse<any>>;
  lipaNaMpesaQuery(
    options: LipaNaMpesaQueryOptions
  ): Promise<AxiosResponse<any>>;
  oAuth(baseUrl?: string): Promise<AxiosResponse<any>>;
  reversal(options: ReversalOptions): Promise<AxiosResponse<any>>;
  transactionStatus(
    options: TransactionStatusOptions
  ): Promise<AxiosResponse<any>>;
}

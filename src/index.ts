import { B2BOptions } from './endpoints/b2b';
import { B2COptions } from './endpoints/b2c';
import { C2BRegisterOptions } from './endpoints/c2b-register';
import { C2BSimulateOptions } from './endpoints/c2b-simulate';
import { TransactionStatusOptions } from './endpoints/transaction-status';
import { LipaNaMpesaQueryOptions } from './endpoints/lipa-na-mpesa-query';
import { LipaNaMpesaOnlineOptions } from './endpoints/lipa-na-mpesa-online';
import {
  accountBalance,
  b2b,
  b2c,
  c2bRegister,
  c2bSimulate,
  lipaNaMpesaOnline,
  lipaNaMpesaQuery,
  oAuth,
  reversal,
  transactionStatus,
  AccountBalanceOptions,
  ReversalOptions,
} from './endpoints';
import { request, security } from './helpers';
import { AxiosInstance, AxiosResponse } from 'axios';

/**
 * Class representing the Mpesa instance
 */
export type MpesaEnvironment = 'production' | 'sandbox';

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
  public configs: MpesaConfig;
  request: (_baseURL?: string) => Promise<AxiosInstance>;
  security: () => string;
  baseURL: string;
  public environment: MpesaEnvironment;
  /**
   * Introduce Mpesa Configuration
   * @constructor
   * @param {Object} [config={}] The Configuration  to use for mPesa
   */
  constructor(config: MpesaConfig) {
    if (!config.consumerKey) throw new Error('Consumer Key is Missing');
    if (!config.consumerSecret) throw new Error('Consumer Secret is Missing');
    this.configs = config;
    this.environment =
      config.environment === 'production' ? 'production' : 'sandbox';
    this.request = _baseUrl => request(this, _baseUrl);
    this.security = () => {
      return security(this.configs.certPath, this.configs.securityCredential);
    };
    this.baseURL = `https://${
      this.environment === 'production' ? 'api' : 'sandbox'
    }.safaricom.co.ke`;
  }

  /**
   * AccountBalance via instance
   * @borrows AccountBalance as accountBalanceCall
   */
  accountBalance(options: AccountBalanceOptions): Promise<AxiosResponse<any>> {
    return accountBalance(this, options);
  }

  /**
   * B2B Request via instance
   * @name b2bCall
   */
  b2b(options: B2BOptions): Promise<AxiosResponse<any>> {
    return b2b(this, options);
  }

  /**
   * B2C Request
   * @borrows B2CRequest as b2c
   */
  b2c(options: B2COptions): Promise<AxiosResponse<any>> {
    return b2c(this, options);
  }

  c2bRegister(options: C2BRegisterOptions): Promise<AxiosResponse<any>> {
    return c2bRegister(this, options);
  }
  c2bSimulate(options: C2BSimulateOptions): Promise<AxiosResponse<any>> {
    if (this.environment === 'production') {
      throw new Error('Cannot call C2B simulate in production.');
    }
    return c2bSimulate(this, options);
  }

  lipaNaMpesaOnline(
    options: LipaNaMpesaOnlineOptions
  ): Promise<AxiosResponse<any>> {
    return lipaNaMpesaOnline(this, options);
  }

  lipaNaMpesaQuery(
    options: LipaNaMpesaQueryOptions
  ): Promise<AxiosResponse<any>> {
    return lipaNaMpesaQuery(this, options);
  }

  oAuth(baseUrl?: string): Promise<AxiosResponse<any>> {
    const { consumerKey, consumerSecret } = this.configs;
    const options = {
      baseUrl,
      consumerKey,
      consumerSecret,
    };
    return oAuth(this, options);
  }

  reversal(options: ReversalOptions): Promise<AxiosResponse<any>> {
    return reversal(this, options);
  }

  transactionStatus(
    options: TransactionStatusOptions
  ): Promise<AxiosResponse<any>> {
    return transactionStatus(this, options);
  }
}

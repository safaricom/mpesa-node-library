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
} from './endpoints';
import { request, security } from './helpers';
var Mpesa = /** @class */ (function() {
  /**
   * Introduce Mpesa Configuration
   * @constructor
   * @param {Object} [config={}] The Configuration  to use for mPesa
   */
  function Mpesa(config) {
    var _this = this;
    if (!config.consumerKey) throw new Error('Consumer Key is Missing');
    if (!config.consumerSecret) throw new Error('Consumer Secret is Missing');
    this.configs = config;
    this.environment =
      config.environment === 'production' ? 'production' : 'sandbox';
    this.request = function(_baseUrl) {
      return request(_this, _baseUrl);
    };
    this.security = function() {
      return security(_this.configs.certPath, _this.configs.securityCredential);
    };
    this.baseURL =
      'https://' +
      (this.environment === 'production' ? 'api' : 'sandbox') +
      '.safaricom.co.ke';
  }
  /**
   * AccountBalance via instance
   * @borrows AccountBalance as accountBalanceCall
   */
  Mpesa.prototype.accountBalance = function(options) {
    return accountBalance(this, options);
  };
  /**
   * B2B Request via instance
   * @name b2bCall
   */
  Mpesa.prototype.b2b = function(options) {
    return b2b(this, options);
  };
  /**
   * B2C Request
   * @borrows B2CRequest as b2c
   */
  Mpesa.prototype.b2c = function(options) {
    return b2c(this, options);
  };
  Mpesa.prototype.c2bRegister = function(options) {
    return c2bRegister(this, options);
  };
  Mpesa.prototype.c2bSimulate = function(options) {
    if (this.environment === 'production') {
      throw new Error('Cannot call C2B simulate in production.');
    }
    return c2bSimulate(this, options);
  };
  Mpesa.prototype.lipaNaMpesaOnline = function(options) {
    return lipaNaMpesaOnline(this, options);
  };
  Mpesa.prototype.lipaNaMpesaQuery = function(options) {
    return lipaNaMpesaQuery(this, options);
  };
  Mpesa.prototype.oAuth = function(baseUrl) {
    var _a = this.configs,
      consumerKey = _a.consumerKey,
      consumerSecret = _a.consumerSecret;
    var options = {
      baseUrl: baseUrl,
      consumerKey: consumerKey,
      consumerSecret: consumerSecret,
    };
    return oAuth(this, options);
  };
  Mpesa.prototype.reversal = function(options) {
    return reversal(this, options);
  };
  Mpesa.prototype.transactionStatus = function(options) {
    return transactionStatus(this, options);
  };
  return Mpesa;
})();
export default Mpesa;
//# sourceMappingURL=index.js.map

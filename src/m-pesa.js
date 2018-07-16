const {
  accountBalance,
  b2b,
  b2c,
  c2bRegister,
  c2bSimulate,
  lipaNaMpesaOnline,
  lipaNaMpesaQuery,
  oAuth,
  reversal,
  transactionStatus
} = require('./endpoints')
const {
  request,
  security
} = require('./helpers')

/**
 * Class representing the Mpesa instance
 */
class Mpesa {
  /**
   * Introduce Mpesa Configuration
   * @constructor
   * @param {Object} [config={}] The Configuration  to use for mPesa
   */
  constructor (config = {}) {
    if (!config.consumerKey) throw new Error('Consumer Key is Missing')
    if (!config.consumerSecret) throw new Error('Consumer Secret is Missing')
    this.configs = { ...config }
    this.enviroment = config.environment === 'production' ? 'production' : 'sandbox'
    this.request = request.bind(this)
    this.security = () => {
      return security(this.configs.certPath, this.configs.securityCredential)
    }
    this.baseURL = `https://${this.enviroment === 'production' ? 'api' : 'sandbox'}.safaricom.co.ke`
  }

  /**
   * AccountBalance via instance
   * @borrows AccountBalance as accountBalanceCall
   */
  accountBalance () {
    return accountBalance.bind(this)(...arguments)
  }

  /**
   * B2B Request via instance
   * @name b2bCall
   */
  b2b () {
    return b2b.bind(this)(...arguments)
  }

  /**
   * B2C Request
   * @borrows B2CRequest as b2c
   */
  b2c () {
    return b2c.bind(this)(...arguments)
  }
  
  c2bRegister () {
    return c2bRegister.bind(this)(...arguments)
  }
  c2bSimulate () {
    if(this.enviroment === 'production'){
      throw new Error('Cannot call C2B simulate in production.')
    }
    return c2bSimulate.bind(this)(...arguments)
  }

  lipaNaMpesaOnline () {
    return lipaNaMpesaOnline.bind(this)(...arguments)
  }

  lipaNaMpesaQuery () {
    return lipaNaMpesaQuery.bind(this)(...arguments)
  }

  oAuth () {
    const { consumerKey, consumerSecret } = this.configs
    return oAuth.bind(this)(consumerKey, consumerSecret)
  }

  reversal () {
    return reversal.bind(this)(...arguments)
  }
          
  transactionStatus () {
    return transactionStatus.bind(this)(...arguments)
  }
}

module.exports = Mpesa
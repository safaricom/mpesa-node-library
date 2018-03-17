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
class Mpesa {
  constructor (config = {}) {
    if (!config.consumerKey) throw new Error('Consumer Key is Missing')
    if (!config.consumerSecret) throw new Error('Consumer Secret is Missing')
    this.configs = { ...config }
    this.enviroment = config.environment === 'production' ? 'production' : 'sandbox'
    this.request = request.bind(this)
    this.security = security.bind(this)
  }
  accountBalance () {
    return accountBalance.bind(this)(...arguments)
  }

  b2b () {
    return b2b.bind(this)(...arguments)
  }

  b2c () {
    return b2c.bind(this)(...arguments)
  }

  c2bRegister () {
    return c2bRegister.bind(this)(...arguments)
  }

  c2bSimulate () {
    return c2bSimulate.bind(this)(...arguments)
  }

  lipaNaMpesaOnline () {
    return lipaNaMpesaOnline.bind(this)(...arguments)
  }

  lipaNaMpesaQuery () {
    return lipaNaMpesaQuery.bind(this)(...arguments)
  }

  oAuth () {
    return oAuth.bind(this)(...arguments)
  }

  reversal () {
    return reversal.bind(this)(...arguments)
  }

  transactionStatus () {
    return transactionStatus.bind(this)(...arguments)
  }
}

module.exports = Mpesa

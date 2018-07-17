const expect = require('expect.js')
const Mpesa = require('../.././src/m-pesa')
const instance = new Mpesa({ consumerKey: 'test', consumerSecret: 'test' })
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
} = instance

describe('All Methods are Callble', function () {
  [
    accountBalance,
    b2b,
    b2c,
    c2bRegister,
    c2bSimulate,
    lipaNaMpesaOnline,
    lipaNaMpesaQuery,
    oAuth,
    reversal,
    transactionStatus ].map(f => {
    it(f.name, function () {
      expect(typeof f).to.be('function')
    })
  })
})

describe('C2B', function () {
  const productionInstance = new Mpesa({
    consumerKey: 'test',
    consumerSecret: 'test',
    environment: 'production'
  })

  it('should throw error in production', function () {
    let threwError = false
    
    try {
      productionInstance.c2bSimulate()
    } catch (e) {
      threwError = true
      expect(e.message).to.be('Cannot call C2B simulate in production.')
    } finally {
      expect(threwError).to.be(true)
    }
  })
})

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

describe('C2B in production', function() {
  const productionInstance = new Mpesa({
    consumerKey: 'test',
    consumerSecret: 'test',
    environment: 'production'
  })
  
  it('should throw error', function () {
    expect(productionInstance.c2bSimulate.bind(productionInstance)).throwError(error => {
      expect(error.message).to.be('Cannot call C2B simulate in production.')
    })
  })
})

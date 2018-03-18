const expect = require('expect.js')
const got = require('got')
const emitter = require('.././helpers/callbacksemitter')
const testInstance = require('.././helpers/instance')
describe('TransactionStatus Callbacks', function () {
  /**
     * Simulates timeouts coz lol, apparently there is no such way in Daraja
     */
  it('simulates a timeout', function (done) {
    this.timeout(15000)
    const URL = global.NGROK_URL
    emitter.once('transactionStatusTimeout', function (payload) {
      expect(payload.simulation).to.be(true)
      expect(payload.success).to.be(true)
      done()
    })
    got.post(URL + '/transactionstatus/timeout', { data: 'test' }).then(r => r).catch(e => {
      throw new Error('Something went wrong. Message: ' + e.message)
    })
  })
  it('gets a transactionStatus success callback from Daraja', function (done) {
    this.timeout(15000)
    this.retries(3)
    const URL = global.NGROK_URL
    const { shortCode } = testInstance.configs
    testInstance.transactionStatus('LKXXXX1234', shortCode, 4, URL + '/transactionstatus/timeout', URL + '/transactionstatus/success').catch(e => {
      throw new Error('Something went wrong. Message: ' + e.message)
    })
    emitter.once('transactionStatusSuccessCallback', function (payload) {
      expect(payload['Result']['ResultDesc']).to.match(/The format of parameter null is invalid./)
      done()
    })
  })
})

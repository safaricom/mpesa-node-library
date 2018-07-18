const expect = require('expect.js')
const got = require('got')
const emitter = require('.././helpers/callbacksemitter')
const testInstance = require('.././helpers/instance')
describe('Account Callbacks', function () {
  /**
     * Simulates timeouts coz lol, apparently there is no such way in Daraja
     */
  it('simulates a timeout', function (done) {
    this.timeout(15000)
    const URL = global.NGROK_URL
    emitter.once('accountBalanceTimeout', function (payload) {
      expect(payload.simulation).to.be(true)
      expect(payload.success).to.be(true)
      done()
    })
    got.post(URL + '/accountbalance/timeout', { data: 'test' }).then(r => r).catch(e => {
      throw new Error('Something went wrong. Message: ' + e.message)
    })
  })
  it('gets an account balance callback from Daraja', function (done) {
    this.timeout(15000)
    const URL = global.NGROK_URL
    const { shortCode } = testInstance.configs
    this.retries(3)
    testInstance.accountBalance(shortCode, 4, URL + '/accountbalance/timeout', URL + '/accountbalance/success').catch(e => {
      throw new Error('Something went wrong. Message: ' + e.message)
    })
    emitter.once('accountBalanceCallback', function (payload) {
      expect(payload['Result']['ResultDesc']).to.match(/The service request is processed successfully/)
      done()
    })
  })
})

const expect = require('expect.js')
const got = require('got')
const emitter = require('.././helpers/callbacksemitter')
const testInstance = require('.././helpers/instance')
describe('Reversal Callbacks', function () {
  /**
     * Simulates timeouts coz lol, apparently there is no such way in Daraja
     */
  it('simulates a timeout', function (done) {
    this.timeout(15000)
    const URL = global.NGROK_URL
    emitter.once('reversalTimeout', function (payload) {
      expect(payload.simulation).to.be(true)
      expect(payload.success).to.be(true)
      done()
    })
    got.post(URL + '/reversal/timeout', { data: 'test' }).then(r => r).catch(e => {
      throw new Error('Something went wrong. Message: ' + e.message)
    })
  })
  it('gets an reversal success callback from Daraja', function (done) {
    this.timeout(15000)
    this.retries(3)
    const URL = global.NGROK_URL
    testInstance.reversal('LKXXXX1234', 100, URL + '/reversal/timeout', URL + '/reversal/success').catch(e => {
      throw new Error('Something went wrong. Message: ' + e.message)
    })
    emitter.once('reversalSuccessCallback', function (payload) {
      expect(payload['Result']['ResultDesc']).to.match(/The OriginalTransactionID is invalid./)
      done()
    })
  })
})

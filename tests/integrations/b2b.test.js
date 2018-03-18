const expect = require('expect.js')
const got = require('got')
const emitter = require('.././helpers/callbacksemitter')
const testInstance = require('.././helpers/instance')
describe('B2B Callbacks', function () {
  /**
     * Simulates timeouts coz lol, apparently there is no such way in Daraja
     */
  it('simulates a timeout', function (done) {
    this.timeout(15000)
    const URL = global.NGROK_URL
    emitter.once('b2bTimeout', function (payload) {
      expect(payload.simulation).to.be(true)
      expect(payload.success).to.be(true)
      done()
    })
    got.post(URL + '/b2b/timeout', { data: 'test' }).then(r => r).catch(e => {
      throw new Error('Something went wrong. Message: ' + e.message)
    })
  })
  it('gets an b2b success callback from Daraja', function (done) {
    this.timeout(15000)
    const URL = global.NGROK_URL
    const { shortCode } = testInstance.configs
    const testShortcode2 = 600000
    testInstance.b2b(shortCode, testShortcode2, 100, URL + '/b2b/timeout', URL + '/b2b/success').catch(e => {
      throw new Error('Something went wrong. Message: ' + e.message)
    })
    emitter.once('b2bSuccessCallback', function (payload) {
      expect(payload['Result']['ResultDesc']).to.match(/The service request is processed successfully/)
      done()
    })
  })
})

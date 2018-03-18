const expect = require('expect.js')
const got = require('got')
const emitter = require('.././helpers/callbacksemitter')
const testInstance = require('.././helpers/instance')
describe('B2C Callbacks', function () {
  /**
     * Simulates timeouts coz lol, apparently there is no such way in Daraja
     */
  it('simulates a timeout', function (done) {
    this.timeout(15000)
    const URL = global.NGROK_URL
    emitter.once('b2cTimeout', function (payload) {
      expect(payload.simulation).to.be(true)
      expect(payload.success).to.be(true)
      done()
    })
    got.post(URL + '/b2c/timeout', { data: 'test' }).then(r => r).catch(e => {
      throw new Error('Something went wrong. Message: ' + e.message)
    })
  })
  it('gets an b2c success callback from Daraja', function (done) {
    this.timeout(15000)
    this.retries(3)
    const URL = global.NGROK_URL
    const { shortCode } = testInstance.configs
    const testMSISDN = 254708374149
    testInstance.b2c(shortCode, testMSISDN, 100, URL + '/b2c/timeout', URL + '/b2c/success').catch(e => {
      throw new Error('Something went wrong. Message: ' + e.message)
    })
    emitter.once('b2cSuccessCallback', function (payload) {
      expect(payload['Result']['ResultDesc']).to.match(/The service request is processed successfully/)
      done()
    })
  })
})

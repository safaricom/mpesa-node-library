const expect = require('expect.js')
const emitter = require('.././helpers/callbacksemitter')
const testInstance = require('.././helpers/instance')
describe('c2b Callbacks', function () {
  it('gets an c2b success callback from Daraja', function (done) {
    this.timeout(25000)
    const URL = global.NGROK_URL
    const { shortCode } = testInstance.configs
    const testMSISDN = 254708374149
    testInstance.c2bRegister(URL + '/c2b/validation', URL + '/c2b/success')
      .then(() => {
        testInstance.c2bSimulate(testMSISDN, 100, Math.random().toString(35).substr(2, 7)).catch(e => {
          throw new Error('Something went wrong. Message: ' + e.message + ' ' + e.response.message)
        })
      })
      .catch(e => {
        throw new Error('Something went wrong. Message: ' + e.message + ' ' + e.response.message)
      })
    emitter.on('c2bSuccessCallback', function (payload) {
      expect(payload['BusinessShortCode']).to.be(`${shortCode}`)
      expect(payload['MSISDN']).to.be(`${testMSISDN}`)
      done()
    })
  })
})

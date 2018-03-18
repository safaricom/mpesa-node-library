const expect = require('expect.js')
const emitter = require('.././helpers/callbacksemitter')
const testInstance = require('.././helpers/instance')
let checkoutRequestId = null
describe('Lipa Na Mpesa Online Callbacks', function () {
  const testMSISDN = 254708374149
  const amount = 100
  it('gets a lipaNaMpesa success callback from Daraja', function (done) {
    // Since we have to wait for a time out and das sad and
    this.timeout(200 * 1000) // 200s
    const URL = global.NGROK_URL
    testInstance.lipaNaMpesaOnline(testMSISDN, amount, URL + '/lipanampesa/success', Math.random().toString(35).substr(2, 7))
      .then(({ data }) => {
        checkoutRequestId = data['CheckoutRequestID']
      })
      .catch(e => {
        throw new Error('Something went wrong. Message: ' + e.message + ' ' + e.response.message)
      })
    emitter.on('lipaNaMpesaOnlineSuccessCallback', function (payload) {
      expect(payload).to.be.ok()
      done()
    })
  })

  it(`allows checking of lipaNaMpesa status for ${checkoutRequestId}`, function (done) {
    this.timeout(5000)
    testInstance.lipaNaMpesaQuery(checkoutRequestId).then(({ data }) => {
      expect(data['ResponseDescription']).to.match(/The service request has been accepted successsfully/)
      done()
    }).catch(e => {
      throw new Error('Something went wrong. Message: ' + e.message + ' ' + e.response.message)
    })
  })
})

const expect = require('expect.js')
const got = require('got')
const emitter = require('.././helpers/callbacksemitter')
describe('Callbacks', function () {
  it('should have a NGROK_URL', function () {
    const URL = global.NGROK_URL
    expect(URL.length).to.be.greaterThan(5)
  })
  it('throws an event and handles it', function (done) {
    this.timeout(15000)
    const URL = global.NGROK_URL
    emitter.on('hello', function (payload) {
      expect(payload).to.be('From CallbacksEmitter')
      done()
    })
    if (!URL) { throw new Error('Missing URL') }
    got(URL).then(r => r).catch(e => {
      throw new Error('Something went wrong. Message: ' + e.message)
    })
  })
})

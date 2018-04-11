const app = require('.././helpers/app')
const ngrokify = require('.././helpers/ngrok')
const ngrok = require('ngrok')

before(async function () {
  this.timeout(15000)
  console.log('Setting up the callback server')
  await ngrok.disconnect()
  global.NGROK_URL = await ngrokify(app)
  console.log('Connected to ' + global.NGROK_URL)
})

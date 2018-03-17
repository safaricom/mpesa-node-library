//const app = require('.././helpers/app')
//const ngrokify = require('.././helpers/ngrok')
const ngrok = require('ngrok')

before(function(done) {
  this.timeout(15000)
  console.log('Setting up the callback server')
  ngrok.connect(9090, function (err, url) {
    if (err) throw err
    console.log(url)
    done()
  })
})

after(function (done) {
  ngrok.kill()
  done()
})

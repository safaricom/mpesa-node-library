const http = require('http')
const ngrok = require('ngrok')
function ngrokify (server) {
  if (typeof server === 'function') server = http.createServer(server)

  // let ngroked = Object.create(server)
  let ngrokURL

  server.once('close', function () {
    ngrokURL && ngrok.disconnect(ngrokURL)
  })

  let addr = server.address()
  if (!addr) server.listen(0)
  addr = server.address()

  return ngrok.connect(addr.port).then(function (url) {
    ngrokURL = url
    return url
  })
}
module.exports = ngrokify

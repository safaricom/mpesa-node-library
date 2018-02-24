const ngrok = require('ngrok')
before(function(done) {
    console.log("Setting up the callback server")
    ngrok.connect(9090, function (err, url) {
      console.log(url)
      done()
    });
});

const rp = require('request-promise')

module.exports = (consumerKey, consumerSecret) => {
  const auth = 'Basic ' + Buffer.from(consumerKey + ':' + consumerSecret).toString('base64')
  const options = {
        uri: 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
        headers: {
          'Authorization': auth
        },
        json: true
      }
  return rp(options)
}

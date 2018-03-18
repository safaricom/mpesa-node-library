const axios = require('axios')
module.exports = function (consumerKey, consumerSecret, baseURL = null) {
  const auth = Buffer.from(consumerKey + ':' + consumerSecret).toString('base64')
  return axios.get((baseURL || this.baseURL) + '/oauth/v1/generate?grant_type=client_credentials', {
    headers: {
      'Authorization': 'Basic ' + auth,
      'content-type': 'application/json'
    }
  })
}

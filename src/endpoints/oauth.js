const axios = require('axios')
module.exports = () => {
  const {
    MPESA_BASE_URL,
    MPESA_CONSUMER_KEY,
    MPESA_CONSUMER_SECRET
  } = process.env
  const auth = Buffer.from(MPESA_CONSUMER_KEY + ':' + MPESA_CONSUMER_SECRET).toString('base64')
  return axios.get(MPESA_BASE_URL + '/oauth/v1/generate?grant_type=client_credentials', {
    headers: {
      'Authorization': 'Basic ' + auth,
      'content-type': 'application/json'
    }
  })
}

const axios = require('axios')
const baseURL = process.env.MPESA_BASE_URL || 'https://sandbox.safaricom.co.ke'
const oAuth = require('.././endpoints/oauth')
module.exports = async () => {
  const credentials = await oAuth()
  const instance = axios.create({
    baseURL,
    timeout: 1000,
    headers: {
      'Authorization': 'Bearer ' + credentials.data['access_token'],
      'Content-Type': 'application/json'
    }
  })
  return instance
}

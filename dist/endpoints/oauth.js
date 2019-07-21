import axios from 'axios';
export function oAuth(mpesa, options) {
  var auth = Buffer.from(
    options.consumerKey + ':' + options.consumerSecret
  ).toString('base64');
  return axios.get(
    (options.baseURL || mpesa.baseURL) +
      '/oauth/v1/generate?grant_type=client_credentials',
    {
      headers: {
        Authorization: 'Basic ' + auth,
        'content-type': 'application/json',
      },
    }
  );
}
//# sourceMappingURL=oauth.js.map

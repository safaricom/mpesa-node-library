# Node.js M-Pesa API
**M-Pesa Library for Node.js using REST API**

![Node Mpesa Rest API](https://i.imgur.com/PRYk4Q3.jpg)

<a href="https://standardjs.com" style="float: right; padding: 0 0 20px 20px;"><img src="https://cdn.rawgit.com/feross/standard/master/sticker.svg" alt="JavaScript Standard Style" width="100" align="right"></a>
[![Build Status](https://travis-ci.org/safaricom/mpesa-node-library.svg?branch=master)](https://travis-ci.org/safaricom/mpesa-node-library)
[![Made in Africa](https://img.shields.io/badge/Africa's%20Rising-%E2%9C%93-green.svg)](https://github.com/collections/made-in-africa)
[![Known Vulnerabilities](https://snyk.io/test/github/safaricom/mpesa-node-library/badge.svg?targetFile=package.json)](https://snyk.io/test/github/safaricom/mpesa-node-library?targetFile=package.json)

## Prerequisites
1. Node v6+, 8+ recommended.
2. Yarn* (optional) You can still use npm
3. ES6 knowledge

## Installation
Use npm/yarn:
```
npm i mpesa-node
```

### Pre-Usage
You need the following before getting to use this library:
1. Consumer Key and Consume Secret
2. Test Credentials *(Optional only for sandbox)*

## Getting Started
This library is extremely modular, meaning you can create more than one Mpesa instance
````js
const Mpesa = require('mpesa-node')
const mpesaApi = new Mpesa({ consumerKey: '<your consumer key>', consumerSecret: '<your consumer secret>' })
// another instance
// const instance = new Mpesa({ consumerKey: 'test', consumerSecret: 'test', environment: 'production' })
mpesaApi
    .c2bSimulate(
        254708374149,
        500,
        'h6dk0Ue2'
    )
    .then((result) => {
        //do something
    })
    .catch((err) => {
        // retry?
    })
````

While working with the Mpesa Class, you only need two key-value items, ie: consumerKey and consumerSecret.
Nonetheless, prefilling some things means you dont have to re-enter them again. A complete config object looks like this
````js
new Mpesa({
    consumerKey: '<your consumer key>',
    consumerSecret: '<your consumer secret>',
    environment: 'sandbox',
    shortCode: '600111',
    initiatorName: 'Test Initiator',
    lipaNaMpesaShortCode: 123456,
    lipaNaMpesaShortPass: '<some key here>',
    securityCredential: '<credential here>',
    certPath: path.resolve('keys/myKey.cert')
})
````
## API
Please note that this library is in active development, use in production with caution.

Current API:
````js
const mpesaApi = new Mpesa({ consumerKey: '<your consumer key>', consumerSecret: '<your consumer secret>' })
const {
  accountBalance,
  b2b,
  b2c,
  c2bRegister,
  c2bSimulate,
  lipaNaMpesaOnline,
  lipaNaMpesaQuery,
  reversal,
  transactionStatus
} = mpesaApi
````
Ofcourse you dont need to import all methods, you can import the only ones you need.

All methods return a `<Promise>`, hence you can use `.then` or `await`.
All calls are done by Axios, so for the response structure check Axios documentation.

### Methods
• [B2C Request](https://developer.safaricom.co.ke/b2c/apis/post/paymentrequest)

This initiates a business to customer transactions from a company (shortcode) to end users (mobile numbers) of their services.
````js
/*
 * b2c(senderParty, receiverParty, amount, queueUrl, resultUrl, commandId = 'BusinessPayment', initiatorName = null, remarks = 'B2C Payment', occasion = null)
 * Example:
*/
const { shortCode } = mpesaApi.configs
const testMSISDN = 254708374149
await mpesaApi.b2c(shortCode, testMSISDN, 100, URL + '/b2c/timeout', URL + '/b2c/success')
````

• [B2B Request](https://developer.safaricom.co.ke/b2b/apis/post/paymentrequest)

This initiates a business to business transaction between one company to another.
````js
/*
 * b2c(senderParty, receiverParty, amount, queueUrl, resultUrl, senderType = 4, receiverType = 4, initiator = null, commandId = 'BusinessToBusinessTransfer', accountRef = null, remarks = 'B2B Request')
 * Example:
*/
const { shortCode } = mpesaApi.configs
const testShortcode2 = 600000
await mpesaApi.b2b(shortCode, testShortcode2, 100, URL + '/b2b/timeout', URL + '/b2b/success')
````
• [C2B Register](https://developer.safaricom.co.ke/c2b/apis/post/registerurl)

This initiates a C2B confirmation and validation registration for a company's URLs

````js
/*
 * c2bRegister(confirmationUrl, validationUrl, shortCode = null, responseType = 'Completed')
 * Example:
 */

await mpesaApi.c2bRegister(URL + '/c2b/validation', URL + '/c2b/success')

````

• [C2B Simulate](https://developer.safaricom.co.ke/c2b/apis/post/simulate)

This initiates a C2B transaction between an end-user and a company (paybill or till number)

````js
/*
 * c2bSimulate(msisdn, amount, billRefNumber, commandId = 'CustomerPayBillOnline', shortCode = null)
 * Example:
 */
const testMSISDN = 254708374149
await mPesa.c2bSimulate(testMSISDN, 100, Math.random().toString(35).substr(2, 7))

````
• [M-Pesa Express Request - Lipa Na M-Pesa Online Payment API](https://developer.safaricom.co.ke/lipa-na-m-pesa-online/apis/post/stkpush/v1/processrequest)

This initiates a Lipa Na M-Pesa Online Payment transaction using STK Push.

````js
/*
 * lipaNaMpesaOnline(senderMsisdn, amount, callbackUrl, accountRef, transactionDesc = 'Lipa na mpesa online', transactionType = 'CustomerPayBillOnline', shortCode = null, passKey = null)
 * Example:
 */
 const testMSISDN = 254708374149
 const amount = 100
 const accountRef = Math.random().toString(35).substr(2, 7)
await mpesaApi.lipaNaMpesaOnline(testMSISDN, amount, URL + '/lipanampesa/success', accountRef)

````
• [M-Pesa Express Query Request - Lipa Na M-Pesa Query Request API](https://developer.safaricom.co.ke/lipa-na-m-pesa-online/apis/post/stkpushquery/v1/query)

This API checks the status of a Lipa Na M-Pesa Online Payment transaction

````js
/*
 * lipaNaMpesaQuery(checkoutRequestId, shortCode = null, passKey = null)
 * Example:
 */
const checkoutRequestId ='ws_co_123456789'
await mpesaApi.lipaNaMpesaQuery(checkoutRequestId)
````
• [Reversal Request](https://developer.safaricom.co.ke/reversal/apis/post/request)

This initiates an M-Pesa transaction reversal on B2B, B2C or C2B API
````js
/*
 * reversal(transactionId, amount, queueUrl, resultUrl, shortCode = null, remarks = 'Reversal', occasion = 'Reversal', initiator = null, receiverIdType = '11', commandId = 'TransactionReversal')
 * Example:
 */
await mpesaApi.reversal('LKXXXX1234', 100, URL + '/reversal/timeout', URL + '/reversal/success')
````
• [Transaction Status Request](https://developer.safaricom.co.ke/transaction-status/apis/post/query)

This API is used to check the status of B2B, B2C and C2B transactions

````js
/*
 * transactionStatus(transactionId, receiverParty, idType, queueUrl, resultUrl, remarks = 'TransactionReversal', occasion = 'TransactionReversal', initiator = null, commandId = 'TransactionStatusQuery')
 * Example:
 */
await mpesaApi.transactionStatus('LKXXXX1234', shortCode, 4, URL + '/transactionstatus/timeout', URL + '/transactionstatus/success')
````
• [Account Balance Request](https://developer.safaricom.co.ke/account-balance/apis/post/query)

This initiates a request for the account balance of a shortcode

````js
/*
 * accountBalance(shortCode, idType, queueUrl, resultUrl, remarks = 'Checking account balance', initiator = null, commandId = 'AccountBalance')
 * Example:
 */
const { shortCode } = mpesaApi.configs
await mpesaApi.accountBalance(shortCode, 4, URL + '/accountbalance/timeout', URL + '/accountbalance/success')
````
## Testing
Testing needs you to clone this repo.

The command below runs both integration and unit test.

Integration tests launch a ngrok instance and await callbacks (you will need an active internet connection for this).

To run each separately, check `package.json` for the commands.
````
npm test
````
## Going Live/Production

You will need to first click on "Going Live" on [Daraja](https://developer.safaricom.co.ke/user/me/apps)

The only thing you need to tweek in this Libs config is `environment`:
````js
new Mpesa({
    consumerKey: '<your consumer key>',
    consumerSecret: '<your consumer secret>',
    environment: 'production', //<------
    .....
    })
````

## Pending Stuff

- [x] E2E Integration Tests
- [x] Deploy to Npm
- [x] Reduce number of args
- [x] Detailed Documentation
- [ ] Enumify
- [ ] Validators for MSISDN and other expected inputs
- [x] More detailed Unit tests
- [ ] Handle all Promises

## Contributing
1. Create your feature branch: `git checkout -b my-new-feature`
2. Commit your changes: `git commit -m 'Add some feature'`
3. Push to the branch: `git push origin my-new-feature`
4. Submit a pull request :D

## Credits

| **Contributor** |
<br/>
| [DGatere](https://github.com/DGatere) |<br/>
| [geofmureithi](https://github.com/geofmureithi) |


## License

MIT

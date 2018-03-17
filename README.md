# Node.js M-Pesa API 
**M-Pesa Library for Node.js using REST API**

<a href="https://standardjs.com" style="float: right; padding: 0 0 20px 20px;"><img src="https://cdn.rawgit.com/feross/standard/master/sticker.svg" alt="JavaScript Standard Style" width="100" align="right"></a>
[![Build Status](https://travis-ci.org/geofmureithi/mpesa-node-library.svg?branch=master)](https://travis-ci.org/geofmureithi/mpesa-node-library)

## Prerequisites
1. Node v6+, 8+ recommended
2. Yarn* (optional) You can still use npm
3. ES6 knowledge

## Installation
Use npm/yarn:
```
npm i m-pesa
```

### Pre-Usage
You need the following befor getting to use this library:
1. Consumer Key and Consume Secret 
2. Test Credentials *(Optional only for sandbox)*

## Getting Started
This library is extremely modular, meaning you can create more than one Mpesa instance
````js
const Mpesa = require('m-pesa')
const mpesaApi = new Mpesa({ consumerKey: '<your consumer key>', consumerSecret: '<your consumer secret>' })
// another instance
// const instance = new Mpesa({ consumerKey: 'test', consumerSecret: 'test', environment: 'production' })
mpesaApi
    .c2bSimulate(
        '600133',
        'CustomerPayBillOnline',
        '300',
        '254708374149',
        '0000'
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
Please note that this library is in active development and **PLEASE DONT!!** not to use in **PRODUCTION** 

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
1. [B2C Request](https://developer.safaricom.co.ke/b2c/apis/post/paymentrequest)

This initiates a business to customer transactions from a company (shortcode) to end users (mobile numbers) of their services.
````js
/*
 * b2c(initiatorName, commandId, amount, partyA, partyB, remarks, queueUrl, resultUrl, occasion)
 * Example:
*/
const { b2c } = mpesaApi
await b2c('testapi', 'BusinessPayment', '100', '600133', '254708374149', 'test', 'http://randomurl.com', 'http://randomurl2.com')
````

2. [B2B Request](https://developer.safaricom.co.ke/b2b/apis/post/paymentrequest)

This initiates a business to business transaction between one company to another.
````js
/*
 * b2c(initiator, commandId, senderId, receiverId, amount, partyA, partyB, accountRef, remarks, queueUrl, resultUrl, occasion)
 * Example: 
*/
const { b2b } = mpesaApi
await b2b('testapi', 'BusinessPayBill', '4', '4', '1000', '600133', '600000', 'BusinessA', 'test', 'http://randomurl.com', 'http://randomurl2.com', 'test')
````
3. [C2B Register](https://developer.safaricom.co.ke/c2b/apis/post/registerurl)

This initiates a C2B confirmation and validation registration for a company's URLs

````js
/*
 * c2bRegister(shortCode, responseType, confirmationUrl, validationUrl)
 * Example:
 */
const { c2bRegister } = mpesaApi
c2bRegister('600133', 'Completed', 'http://randomurl.com', 'http://randomurl2.com')

````

4. [C2B Simulate](https://developer.safaricom.co.ke/c2b/apis/post/simulate)

This initiates a C2B transaction between an end-user and a company (paybill or till number)

````js
/*
 * C2B_Simulate(shortCode, commandId, amount, msisdn, billRefNumber)
 * Example:
 */
const { c2bSimulate } = mpesaApi
c2bSimulate('600133', 'CustomerPayBillOnline', '300', '254708374149', '0000')

````
5. [M-Pesa Express Request - Lipa Na M-Pesa Online Payment API](https://developer.safaricom.co.ke/lipa-na-m-pesa-online/apis/post/stkpush/v1/processrequest)

This initiates a Lipa Na M-Pesa Online Payment transaction using STK Push.

````js
/*
 * lipaNaMpesaOnline(shortCode, timeStamp, passKey, transactionType, amount, partyA, partyB, phoneNumber, callbackUrl, accountRef, transactionDesc)
 * Example:
 */
const { lipaNaMpesaOnline } = mpesaApi
lipaNaMpesaOnline('174379', '20180215123520', 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919', 'CustomerPayBillOnline', '1', '254708374149', '174379', '254708374149', 'http://randomurl.com', 'test', 'test')

````
6. [M-Pesa Express Query Request - Lipa Na M-Pesa Query Request API](https://developer.safaricom.co.ke/lipa-na-m-pesa-online/apis/post/stkpushquery/v1/query)

This API checks the status of a Lipa Na M-Pesa Online Payment transaction

````js
/*
 * lipaNaMpesaQuery(shortCode, timeStamp, passKey, checkoutRequestId)
 * Example:
 */
const { lipaNaMpesaQuery} = mpesaApi
lipaNaMpesaQuery(174379, '20180215123520', 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919', 'ws_co_123456789')
````
7. [Reversal Request](https://developer.safaricom.co.ke/reversal/apis/post/request)

This initiates an M-Pesa transaction reversal on B2B, B2C or C2B API
````js
/*
 * reversal(initiator, commandId, transactionId, amount, receiverParty, receiverIdType, resultUrl, queueUrl, remarks, occasion)
 * Example:
 */
const { reversal } = mpesaApi
reversal('testapi', 'TransactionReversal', 'LKXXXX1234', '100', '600133', '11', 'http://randomurl.com', 'http://randomurl2.com', 'test', 'test')
````
8. [Transaction Status Request](https://developer.safaricom.co.ke/transaction-status/apis/post/query)

This API is used to check the status of B2B, B2C and C2B transactions

````js
/*
 * transactionStatus(initiator, commandId, transactionId, partyA, idType, resultUrl, queueUrl, remarks, occasion, originalConversationId)
 * Example:
 */
const { transactionStatus } = mpesaApi
transactionStatus('testapi', 'TransactionStatusQuery', 'LKXXXX1234', '600133', '4', 'http://randomurl.com', 'http://randomurl2.com', 'test', '4455-6589979')
````
9. [Account Balance Request](https://developer.safaricom.co.ke/account-balance/apis/post/query)

This initiates a request for the account balance of a shortcode

````js
/*
 * accountBalance(initiator, commandId, partyA, idType, remarks, queueUrl, resultUrl)
 * Example:
 */
const { accountBalance } = mpesaApi
accountBalance('testapi', 'AccountBalance', '600133', '4', 'test', 'http://randomurl.com', 'http://randomurl2.com')
````
## Testing
Testing needs you to clone this repo.
The command below runs both integration and unit test.
Integration tests launch a ngrok instance and await callbacks (you will need an active internet connection for this)
To run each separately, check `package.json` for the commands.
````
npm test
````

## Contributing
1. Create your feature branch: `git checkout -b my-new-feature`
2. Commit your changes: `git commit -m 'Add some feature'`
3. Push to the branch: `git push origin my-new-feature`
4. Submit a pull request :D

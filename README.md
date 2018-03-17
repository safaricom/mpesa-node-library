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




[**C2B Register**](https://developer.safaricom.co.ke/c2b/apis/post/registerurl)

This initiates a C2B confirmation and validation registration for a company's URLs

C2B_Register(shortCode, responseType, confirmationUrl, validationUrl)<br>
_Example:_ `mpesa.C2B_Register('600133', 'Completed', 'http://randomurl.com', 'http://randomurl2.com');`


[**C2B Simulate**](https://developer.safaricom.co.ke/c2b/apis/post/simulate)

This initiates a C2B transaction between an end-user and a company (paybill or till number)

C2B_Simulate(shortCode, commandId, amount, msisdn, billRefNumber)<br>
_Example:_ `mpesa.C2B_Simulate('600133', 'CustomerPayBillOnline', '300', '254708374149', '0000');`


[**M-Pesa Express Request - Lipa Na M-Pesa Online Payment API**](https://developer.safaricom.co.ke/lipa-na-m-pesa-online/apis/post/stkpush/v1/processrequest)

This initiates a Lipa Na M-Pesa Online Payment transaction using STK Push.

Lipa_Na_Mpesa_Online(shortCode, timeStamp, passKey, transactionType, amount, partyA, partyB, phoneNumber, callbackUrl, accountRef, transactionDesc)<br>
_Example:_ `mpesa.Lipa_Na_Mpesa_Online('174379', '20180215123520', 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919', 'CustomerPayBillOnline', '1', '254708374149', '174379', '254708374149', 'http://randomurl.com', 'test', 'test');`

[**M-Pesa Express Query Request - Lipa Na M-Pesa Query Request API**](https://developer.safaricom.co.ke/lipa-na-m-pesa-online/apis/post/stkpushquery/v1/query)

This API checks the status of a Lipa Na M-Pesa Online Payment transaction

Lipa_Na_Mpesa_Query(shortCode, timeStamp, passKey, checkoutRequestId)<br>
_Example:_ `mpesa.Lipa_Na_Mpesa_Query(174379, '20180215123520', 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919', 'ws_co_123456789');`

[**Reversal Request**](https://developer.safaricom.co.ke/reversal/apis/post/request)

This initiates an M-Pesa transaction reversal on B2B, B2C or C2B API

Reversal(initiator, commandId, transactionId, amount, receiverParty, receiverIdType, resultUrl, queueUrl, remarks, occasion)<br>
_Example:_ `mpesa.Reversal('testapi', 'TransactionReversal', 'LKXXXX1234', '100', '600133', '11', 'http://randomurl.com', 'http://randomurl2.com', 'test', 'test');`

[**Transaction Status Request**](https://developer.safaricom.co.ke/transaction-status/apis/post/query)

This API is used to check the status of B2B, B2C and C2B transactions

Transaction_Status(initiator, commandId, transactionId, partyA, idType, resultUrl, queueUrl, remarks, occasion, originalConversationId)<br>
_Example:_ `mpesa.Transaction_Status('testapi', 'TransactionStatusQuery', 'LKXXXX1234', '600133', '4', 'http://randomurl.com', 'http://randomurl2.com', 'test', '4455-6589979');`

[**Account Balance Request**](https://developer.safaricom.co.ke/account-balance/apis/post/query)

This initiates a request for the account balance of a shortcode

Account_Balance(initiator, commandId, partyA, idType, remarks, queueUrl, resultUrl)<br>
_Example:_ `mpesa.Account_Balance('testapi', 'AccountBalance', '600133', '4', 'test', 'http://randomurl.com', 'http://randomurl2.com');`

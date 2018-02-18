# mpesa-node-library
**M-Pesa Library for Node.js using REST API**

This package is intended to assist Node.js developers to use the M-Pesa API.

Before using the transaction API set the consumer key and consumer secret from <br>My Apps > Select App > copy Consumer Key and Consumer Secret and paste within quotes:

    const consumer_key = 'INSERT CONSUMER KEY HERE';
    const consumer_secret = 'INSERT CONSUMER SECRET HERE';

On the security function set your security credential value as specified within quotes:<br>
    
`let bufferToEncrypt = new Buffer("ENTER SECURITY CREDENTIAL TEXT HERE");`

**_Additional Notes_**  
* If using on production comment sandbox URL and uncomment production URL, set to sandbox initially.<br>
* ES5 compatible version of library generated with babel located in lib folder of project.<br>
* Click links for more information on possible values and use of each API

**Usage**

[**B2C Request**](https://developer.safaricom.co.ke/b2c/apis/post/paymentrequest)

This initiates a business to customer transactions from a company (shortcode) to end users (mobile numbers) of their services.

B2C(initiatorName, commandId, amount, partyA, partyB, remarks, queueUrl, resultUrl, occasion)<br>
_Example:_ `mpesa.B2C('testapi', 'BusinessPayment', '100', '600133', '254708374149', 'test', 'http://randomurl.com', 'http://randomurl2.com');`

[**B2B Request**](https://developer.safaricom.co.ke/b2b/apis/post/paymentrequest)

This initiates a business to business transaction between one company to another.

B2B(initiator, commandId, senderId, receiverId, amount, partyA, partyB, accountRef, remarks, queueUrl, resultUrl, occasion)<br>
_Example:_ `mpesa.B2B('testapi', 'BusinessPayBill', '4', '4', '1000', '600133', '600000', 'BusinessA', 'test', 'http://randomurl.com', 'http://randomurl2.com', 'test');`

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
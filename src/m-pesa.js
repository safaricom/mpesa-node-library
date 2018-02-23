const rp = require('request-promise')
const request = require('request')
const crypto = require('crypto')
const constants = require('constants')
const fs = require('fs')

// Object mpesa used to encapsulate all M-Pesa API for easier calling of each method e.g (mpesa.B2C(<arguments>))

let mpesa = {
  O_Auth () {
    const consumer_key = 'INSERT CONSUMER KEY HERE'
    const consumer_secret = 'INSERT CONSUMER SECRET HERE'
    const auth = 'Basic ' + new Buffer(consumer_key + ':' + consumer_secret).toString('base64')

    let options = {
      // uri: "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      uri: 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      headers: {
        'Authorization': auth
      },
      json: true
    }
    // return all the options needed for an oauth call for use in every API call
    return rp(options)
  },
  security () {
    // sandbox value for security credential = Security Credential (Shortcode 1)
    // production value for security credential = api initiator password
    let bufferToEncrypt = new Buffer('ENTER SECURITY CREDENTIAL TEXT HERE')
    // read the sandbox/production certificate data
    // PATH - e.g "../keys/sandbox-cert.cer"
    let data = fs.readFileSync('PATH TO CERTIFICATE FILE')
    // convert data to string
    let privateKey = String(data)
    // encrypt the credential using the privatekey
    let encrypted = crypto.publicEncrypt({
      key: privateKey,
      padding: constants.RSA_PKCS1_PADDING
    }, bufferToEncrypt)
    // convert encrypted value to string and encode to base64
    let securityCredential = encrypted.toString('base64')
    // return value to invoking method
    return securityCredential
  },
  B2C (initiatorName, commandId, amount, partyA, partyB, remarks, queueUrl, resultUrl, occasion) {
    // invoke oauth function in a promise to ensure token is returned before next function is run
    this.O_Auth().then(response => {
      let security_credential = this.security()
      // returned token from function call accesses the access_token value and stores it
      let accessToken = response.access_token
      let options = {
        method: 'POST',
        // uri: 'https://api.safaricom.co.ke/mpesa/b2c/v1/paymentrequest',
        uri: 'https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: {
          'InitiatorName': initiatorName,
          'SecurityCredential': security_credential,
          'CommandID': commandId,
          'Amount': amount,
          'PartyA': partyA,
          'PartyB': partyB,
          'Remarks': remarks,
          'QueueTimeOutURL': queueUrl,
          'ResultURL': resultUrl,
          'Occasion': occasion
        },
        json: true
      }
      rp(options)
        .then(function (body) {
          console.log(body)
        })
        .catch(function (err) {
          console.log(err)
        })
    }).catch(error => console.log(error))
  },
  B2B (initiator, commandId, senderId, receiverId, amount, partyA, partyB, accountRef, remarks, queueUrl, resultUrl, occasion) {
    this.O_Auth().then(response => {
      let security_credential = this.security()
      let accessToken = response.access_token
      let options = {
        method: 'POST',
        // uri: 'https://api.safaricom.co.ke/mpesa/b2b/v1/paymentrequest',
        uri: 'https://sandbox.safaricom.co.ke/mpesa/b2b/v1/paymentrequest',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: {
          'Initiator': initiator,
          'SecurityCredential': security_credential,
          'CommandID': commandId,
          'SenderIdentifierType': senderId,
          'RecieverIdentifierType': receiverId,
          'Amount': amount,
          'PartyA': partyA,
          'PartyB': partyB,
          'AccountReference': accountRef,
          'Remarks': remarks,
          'QueueTimeOutURL': queueUrl,
          'ResultURL': resultUrl,
          'Occasion': occasion
        },
        json: true
      }

      rp(options)
        .then(function (body) {
          console.log(body)
        })
        .catch(function (err) {
          console.log(err)
        })
    }).catch(error => console.log(error))
  },
  C2B_Register (shortCode, responseType, confirmationUrl, validationUrl) {
    this.O_Auth().then(response => {
      let accessToken = response.access_token
      let options = {
        method: 'POST',
        // uri: 'https://api.safaricom.co.ke/mpesa/c2b/v1/registerurl',
        uri: 'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: {
          'ShortCode': shortCode,
          'ResponseType': responseType,
          'ConfirmationURL': confirmationUrl,
          'ValidationURL': validationUrl
        },
        json: true
      }

      rp(options)
        .then(function (body) {
          console.log(body)
        })
        .catch(function (err) {
          console.log(err)
        })
    }).catch(error => console.log(error))
  },
  C2B_Simulate (shortCode, commandId, amount, msisdn, billRefNumber) {
    this.O_Auth().then(response => {
      let accessToken = response.access_token
      let security_credential = this.security()
      let token = accessToken
      let options = {
        method: 'POST',
        // uri: 'https://api.safaricom.co.ke/mpesa/c2b/v1/simulate',
        uri: 'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: {
          'ShortCode': shortCode,
          'CommandID': commandId,
          'Amount': amount,
          'Msisdn': msisdn,
          'BillRefNumber': billRefNumber
        },
        json: true
      }

      rp(options)
        .then(function (body) {
          console.log(body)
        })
        .catch(function (err) {
          console.log(err)
        })
    }).catch(error => console.log(error))
  },
  Lipa_Na_Mpesa_Online (shortCode, timeStamp, passKey, transactionType, amount, partyA, partyB, phoneNumber, callbackUrl, accountRef, transactionDesc) {
    this.O_Auth().then(response => {
      let accessToken = response.access_token
      const short_code = shortCode
      let time_stamp = timeStamp
      const pass_key = passKey
      let password = new Buffer(short_code + pass_key + time_stamp).toString('base64')
      let options = {
        method: 'POST',
        // uri: 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
        uri: 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: {
          'BusinessShortCode': shortCode,
          'Password': password,
          'Timestamp': timeStamp,
          'TransactionType': transactionType,
          'Amount': amount,
          'PartyA': partyA,
          'PartyB': partyB,
          'PhoneNumber': phoneNumber,
          'CallBackURL': callbackUrl,
          'AccountReference': accountRef,
          'TransactionDesc': transactionDesc
        },
        json: true
      }

      rp(options)
        .then(function (body) {
          console.log(body)
        })
        .catch(function (err) {
          console.log(err)
        })
    }).catch(error => console.log(error))
  },
  Lipa_Na_Mpesa_Query (shortCode, timeStamp, passKey, checkoutRequestId) {
    this.O_Auth().then(response => {
      let accessToken = response.access_token
      const short_code = shortCode
      let time_stamp = timeStamp
      const pass_key = passKey
      let password = new Buffer(short_code + pass_key + time_stamp).toString('base64')
      let options = {
        method: 'POST',
        // uri: 'https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query',
        uri: 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: {
          'BusinessShortCode': shortCode,
          'Password': password,
          'Timestamp': timeStamp,
          'CheckoutRequestID': checkoutRequestId
        },
        json: true
      }

      rp(options)
        .then(function (body) {
          console.log(body)
        })
        .catch(function (err) {
          console.log(err)
        })
    }).catch(error => console.log(error))
  },
  Reversal (initiator, commandId, transactionId, amount, receiverParty, receiverIdType, resultUrl, queueUrl, remarks, occasion) {
    this.O_Auth().then(response => {
      let security_credential = this.security()
      let accessToken = response.access_token
      let options = {
        method: 'POST',
        // uri: 'https://api.safaricom.co.ke/mpesa/reversal/v1/request',
        uri: 'https://sandbox.safaricom.co.ke/mpesa/reversal/v1/request',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: {
          'Initiator': initiator,
          'SecurityCredential': security_credential,
          'CommandID': commandId,
          'TransactionID': transactionId,
          'Amount': amount,
          'ReceiverParty': receiverParty,
          'RecieverIdentifierType': receiverIdType,
          'ResultURL': resultUrl,
          'QueueTimeOutURL': queueUrl,
          'Remarks': remarks,
          'Occasion': occasion
        },
        json: true
      }

      rp(options)
        .then(function (body) {
          console.log(body)
        })
        .catch(function (err) {
          console.log(err)
        })
    }).catch(error => console.log(error))
  },
  Transaction_Status (initiator, commandId, transactionId, partyA, idType, resultUrl, queueUrl, remarks, occasion, originalConversationId) {
    this.O_Auth().then(response => {
      let security_credential = this.security()
      let accessToken = response.access_token
      let options = {
        method: 'POST',
        // uri: 'https://api.safaricom.co.ke/mpesa/reversal/v1/request',
        uri: 'https://sandbox.safaricom.co.ke/mpesa/transactionstatus/v1/query',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: {
          'Initiator': initiator,
          'SecurityCredential': security_credential,
          'CommandID': commandId,
          'TransactionID': transactionId,
          'PartyA': partyA,
          'IdentifierType': idType,
          'ResultURL': resultUrl,
          'QueueTimeOutURL': queueUrl,
          'Remarks': remarks,
          'Occasion': occasion,
          'OriginalConversationID': originalConversationId
        },
        json: true
      }

      rp(options)
        .then(function (body) {
          console.log(body)
        })
        .catch(function (err) {
          console.log(err)
        })
    }).catch(error => console.log(error))
  },
  Account_Balance (initiator, commandId, partyA, idType, remarks, queueUrl, resultUrl) {
    this.O_Auth().then(response => {
      let security_credential = this.security()
      let accessToken = response.access_token
      let options = {
        method: 'POST',
        // uri: 'https://api.safaricom.co.ke/mpesa/accountbalance/v1/query',
        uri: 'https://sandbox.safaricom.co.ke/mpesa/accountbalance/v1/query',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: {
          'Initiator': initiator,
          'SecurityCredential': security_credential,
          'CommandID': commandId,
          'PartyA': partyA,
          'IdentifierType': idType,
          'Remarks': remarks,
          'QueueTimeOutURL': queueUrl,
          'ResultURL': resultUrl
        },
        json: true
      }

      rp(options)
        .then(function (body) {
          console.log(body)
        })
        .catch(function (err) {
          console.log(err)
        })
    }).catch(error => console.log(error))
  }
}

'use strict'

var rp = require('request-promise')
var request = require('request')
var crypto = require('crypto')
var constants = require('constants')
var fs = require('fs')

// Object mpesa used to encapsulate all M-Pesa API for easier calling of each method e.g (mpesa.B2C(<arguments>))

var mpesa = {
  O_Auth: function O_Auth () {
    var consumer_key = 'INSERT CONSUMER KEY HERE'
    var consumer_secret = 'INSERT CONSUMER SECRET HERE'
    var auth = 'Basic ' + new Buffer(consumer_key + ':' + consumer_secret).toString('base64')

    var options = {
      // uri for production = https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials
      uri: 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      headers: {
        'Authorization': auth
      },
      json: true
    }
    // return all the options needed for an oauth call for use in every API call
    return rp(options)
  },
  security: function security () {
    // sandbox value = Security Credential (Shortcode 1)
    // production value = api initiator password
    var bufferToEncrypt = new Buffer('Safaricom133!')
    // read the sandbox/production certificate data
    // PATH - e.g "./keys/sandbox-cert.cer"
    var data = fs.readFileSync('PATH TO CERTIFICATE FILE')
    // convert data to string
    var privateKey = String(data)
    // encrypt the credential using the privatekey
    var encrypted = crypto.publicEncrypt({
      key: privateKey,
      padding: constants.RSA_PKCS1_PADDING
    }, bufferToEncrypt)
    // convert encrypted value to string and encode to base64
    var securityCredential = encrypted.toString('base64')
    // return value to invoking method
    return securityCredential
  },
  B2C: function B2C (initiatorName, commandId, amount, partyA, partyB, remarks, queueUrl, resultUrl, occasion) {
    var _this = this

    // invoke oauth function in a promise to ensure token is returned before next function is run
    this.O_Auth().then(function (response) {
      var security_credential = _this.security()
      // returned token from function call access the access_token value and store
      var accessToken = response.access_token
      var options = {
        method: 'POST',
        // production - uri: 'https://api.safaricom.co.ke/mpesa/b2c/v1/paymentrequest'
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
      rp(options).then(function (body) {
        console.log(body)
      }).catch(function (err) {
        console.log(err)
      })
    }).catch(function (error) {
      return console.log(error)
    })
  },
  B2B: function B2B (initiator, commandId, senderId, receiverId, amount, partyA, partyB, accountRef, remarks, queueUrl, resultUrl, occasion) {
    var _this2 = this

    this.O_Auth().then(function (response) {
      var security_credential = _this2.security()
      var accessToken = response.access_token
      var options = {
        method: 'POST',
        // production - uri: 'https://api.safaricom.co.ke/mpesa/b2b/v1/paymentrequest'
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

      rp(options).then(function (body) {
        console.log(body)
      }).catch(function (err) {
        console.log(err)
      })
    }).catch(function (error) {
      return console.log(error)
    })
  },
  C2B_Register: function C2B_Register (shortCode, responseType, confirmationUrl, validationUrl) {
    this.O_Auth().then(function (response) {
      var accessToken = response.access_token
      var options = {
        method: 'POST',
        // production - uri: 'https://api.safaricom.co.ke/mpesa/c2b/v1/registerurl'
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

      rp(options).then(function (body) {
        console.log(body)
      }).catch(function (err) {
        console.log(err)
      })
    }).catch(function (error) {
      return console.log(error)
    })
  },
  C2B_Simulate: function C2B_Simulate (shortCode, commandId, amount, msisdn, billRefNumber) {
    var _this3 = this

    this.O_Auth().then(function (response) {
      var accessToken = response.access_token
      var security_credential = _this3.security()
      var token = accessToken
      var options = {
        method: 'POST',
        // production - uri: 'https://api.safaricom.co.ke/mpesa/c2b/v1/simulate'
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

      rp(options).then(function (body) {
        console.log(body)
      }).catch(function (err) {
        console.log(err)
      })
    }).catch(function (error) {
      return console.log(error)
    })
  },
  Lipa_Na_Mpesa_Online: function Lipa_Na_Mpesa_Online (shortCode, timeStamp, passKey, transactionType, amount, partyA, partyB, phoneNumber, callbackUrl, accountRef, transactionDesc) {
    this.O_Auth().then(function (response) {
      var accessToken = response.access_token
      var short_code = shortCode
      var time_stamp = timeStamp
      var pass_key = passKey
      var password = new Buffer(short_code + pass_key + time_stamp).toString('base64')
      var options = {
        method: 'POST',
        // production - uri: 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
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

      rp(options).then(function (body) {
        console.log(body)
      }).catch(function (err) {
        console.log(err)
      })
    }).catch(function (error) {
      return console.log(error)
    })
  },
  Lipa_Na_Mpesa_Query: function Lipa_Na_Mpesa_Query (shortCode, timeStamp, passKey, checkoutRequestId) {
    this.O_Auth().then(function (response) {
      var accessToken = response.access_token
      var short_code = shortCode
      var time_stamp = timeStamp
      var pass_key = passKey
      var password = new Buffer(short_code + pass_key + time_stamp).toString('base64')
      var options = {
        method: 'POST',
        // production - uri: 'https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query'
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

      rp(options).then(function (body) {
        console.log(body)
      }).catch(function (err) {
        console.log(err)
      })
    }).catch(function (error) {
      return console.log(error)
    })
  },
  Reversal: function Reversal (initiator, commandId, transactionId, amount, receiverParty, receiverIdType, resultUrl, queueUrl, remarks, occasion) {
    var _this4 = this

    this.O_Auth().then(function (response) {
      var security_credential = _this4.security()
      var accessToken = response.access_token
      var options = {
        method: 'POST',
        // production - uri: 'https://api.safaricom.co.ke/mpesa/reversal/v1/request'
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

      rp(options).then(function (body) {
        console.log(body)
      }).catch(function (err) {
        console.log(err)
      })
    }).catch(function (error) {
      return console.log(error)
    })
  },
  Transaction_Status: function Transcation_Status (initiator, commandId, transactionId, partyA, idType, resultUrl, queueUrl, remarks, occasion, originalConversationId) {
    var _this5 = this

    this.O_Auth().then(function (response) {
      var security_credential = _this5.security()
      var accessToken = response.access_token
      var options = {
        method: 'POST',
        // production - uri: 'https://api.safaricom.co.ke/mpesa/reversal/v1/request'
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

      rp(options).then(function (body) {
        console.log(body)
      }).catch(function (err) {
        console.log(err)
      })
    }).catch(function (error) {
      return console.log(error)
    })
  },
  Account_Balance: function Account_Balance (initiator, commandId, partyA, idType, remarks, queueUrl, resultUrl) {
    var _this6 = this

    this.O_Auth().then(function (response) {
      var security_credential = _this6.security()
      var accessToken = response.access_token
      var options = {
        method: 'POST',
        // production - uri: 'https://api.safaricom.co.ke/mpesa/accountbalance/v1/query'
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

      rp(options).then(function (body) {
        console.log(body)
      }).catch(function (err) {
        console.log(err)
      })
    }).catch(function (error) {
      return console.log(error)
    })
  }
}

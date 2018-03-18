/***
 * This is a sample express of how to handle callbacks
 * @see {@link https://github.com/safaricom/mpesa_listener| Mpesa Lister Example}
 */

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const emitter = require('./callbacksemitter')

app.use(bodyParser.json())
app.get('/', (req, res) => {
  emitter.emit('hello', 'From CallbacksEmitter')
  res.send('Hello World!')
})
// AccountBalance
app.post('/accountbalance/timeout', (req, res) => {
  emitter.emit('accountBalanceTimeout', { simulation: true, success: true })
  res.json({
    'ResponseCode': '00000000',
    'ResponseDesc': 'success'
  })
})
app.post('/accountbalance/success', (req, res) => {
  emitter.emit('accountBalanceCallback', req.body)
  res.json({
    'ResponseCode': '00000000',
    'ResponseDesc': 'success'
  })
})

// B2B Call
app.post('/b2b/timeout', (req, res) => {
  emitter.emit('b2bTimeout', { simulation: true, success: true })
  res.json({
    'ResponseCode': '00000000',
    'ResponseDesc': 'success'
  })
})
app.post('/b2b/success', (req, res) => {
  emitter.emit('b2bSuccessCallback', req.body)
  res.json({
    'ResponseCode': '00000000',
    'ResponseDesc': 'success'
  })
})
// B2C Call
app.post('/b2c/timeout', (req, res) => {
  emitter.emit('b2cTimeout', { simulation: true, success: true })
  res.json({
    'ResponseCode': '00000000',
    'ResponseDesc': 'success'
  })
})
app.post('/b2c/success', (req, res) => {
  emitter.emit('b2cSuccessCallback', req.body)
  res.json({
    'ResponseCode': '00000000',
    'ResponseDesc': 'success'
  })
})
// C2B
app.post('/c2b/confirmation', (req, res) => {
  res.json({
    'ResponseCode': '00000000',
    'ResponseDesc': 'success'
  })
})
app.post('/c2b/success', (req, res) => {
  emitter.emit('c2bSuccessCallback', req.body)
  res.json({
    'ResponseCode': '00000000',
    'ResponseDesc': 'success'
  })
})

// Lipa na mpesa
app.post('/lipanampesa/success', (req, res) => {
  emitter.emit('lipaNaMpesaOnlineSuccessCallback', req.body)
  res.json({
    'ResponseCode': '00000000',
    'ResponseDesc': 'success'
  })
})

// Reversal
app.post('/reversal/timeout', (req, res) => {
  emitter.emit('reversalTimeout', { simulation: true, success: true })
  res.json({
    'ResponseCode': '00000000',
    'ResponseDesc': 'success'
  })
})
app.post('/reversal/success', (req, res) => {
  emitter.emit('reversalSuccessCallback', req.body)
  res.json({
    'ResponseCode': '00000000',
    'ResponseDesc': 'success'
  })
})

// Transaction Status
app.post('/transactionstatus/timeout', (req, res) => {
  emitter.emit('transactionStatusTimeout', { simulation: true, success: true })
  res.json({
    'ResponseCode': '00000000',
    'ResponseDesc': 'success'
  })
})
app.post('/transactionstatus/success', (req, res) => {
  emitter.emit('transactionStatusSuccessCallback', req.body)
  res.json({
    'ResponseCode': '00000000',
    'ResponseDesc': 'success'
  })
})

module.exports = app

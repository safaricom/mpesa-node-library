const express = require('express')
const app = express()

const emitter = require('./callbacksemitter')

app.get('/', (req, res) => {
  emitter.emit('hello', 'From CallbacksEmitter')
  res.send('Hello World!')
})

module.exports = app

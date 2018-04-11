const util = require('util')
const events = require('events')
function CallbacksEmitter () {
  events.EventEmitter.call(this)
}

util.inherits(CallbacksEmitter, events.EventEmitter)

module.exports = new CallbacksEmitter()

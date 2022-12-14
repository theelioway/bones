//* Listens for requests to the API; parses the request object; marshalls the call to the router. */

const url = require("url")
const { StringDecoder } = require("string_decoder")
const crudifyT = require("./crudifyT")
const helpers = require("./helpers")

module.exports = (rib, packet, db, cb) => {
  crudifyT(rib, packet, db, (statusCode, payload) => {
    cb(statusCode || 200, payload)
  })
}

'use strict'

require('dotenv').config()

require('./database')
const app = require('./app')

/**
 * Set the port
 */
const port = parseInt(process.env['PORT'], 10)

/**
 * Start the server
 */
const server = app.listen(port, function () {
  console.log(`bones EXOSKELETON is ${process.env['EXOSKELETON']}`)
  console.log(`bones ENDOSKELETON is ${process.env['ENDOSKELETON']}`)
  console.log(`bones is connected to http://localhost:${server.address().port}`)
})

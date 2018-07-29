'use strict'

require('./database')
const app = require('./app')

// set the port
const port = parseInt(process.env.PORT, 10) || 3030

// start the server
const server = app.listen(port, function () {
  console.log(`API is RESTing at: http://localhost:${server.address().port}`)
})

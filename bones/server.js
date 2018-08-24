'use strict'

process.env.ENDOSKELETON = 'TestVersion'
process.env.EXOSKELETON = 'boney'
process.env.DATABASENAME = 'elioWay'
process.env.MONGODB = 'mongodb://localhost:27017/'
process.env.PORT = 3030

require('./database')
const app = require('./app')

// set the port
const port = parseInt(process.env.PORT, 10) || process.env.PORT

// start the server
const server = app.listen(port, function () {
  console.log(`API is RESTing at: http://localhost:${server.address().port}`)
})

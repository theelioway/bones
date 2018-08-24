'use strict'
const nconf = require('nconf')
const mongoose = require('mongoose')

// connect to the database
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB + process.env.DATABASENAME, {
  useNewUrlParser: true
})

let db = mongoose.connection

// get notified if the connection was successful or not
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log(`Connected to the ${process.env.DATABASENAME} database`)
})

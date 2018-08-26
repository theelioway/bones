'use strict'
const mongoose = require('mongoose')

/**
 * Connect to the database
 */
let cnnStr = '' + process.env['MONGODB'] + process.env['DATABASENAME']
mongoose.Promise = global.Promise
mongoose.connect(cnnStr, {
  useNewUrlParser: true
})

/**
 * Create a db object.
 */
let db = mongoose.connection

/**
 * Get notified if the db connection was successful or not
 */
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log(`bones is connected to ${process.env['MONGODB']}${process.env.DATABASENAME}`)
})

'use strict'
require('request')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')({
  origin: true
})

/**
 * Create the express app.
 */
const app = express()

/**
 * Configure the body-parser to accept urlencoded bodies and json data
 */
app
  .use(cors)
  .use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  .use(
    bodyParser.json({
      type: 'application/vnd.api+json'
    })
  )

var routes = require('./routes') // importing routes
routes(app) // register the route

/**
 * Export the app
 */
module.exports = app

'use strict'

// dependencies
const express = require('express')
const bodyParser = require('body-parser')

// create the express app
const app = express()

// configure the body-parser to accept urlencoded bodies and json data
app.use(bodyParser.urlencoded({
  extended: true
}))
  .use(bodyParser.json())

// register all routers
var routes = require('./routes') // importing route
routes(app) // register the route

// export
module.exports = app

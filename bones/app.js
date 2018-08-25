'use strict'
require('request')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')({origin: true})

// create the express app
const app = express()
app.use(cors)

// configure the body-parser to accept urlencoded bodies and json data
app.use(bodyParser.urlencoded({
  extended: true
}))
  .use(bodyParser.json())

var routes = require('./routes') // importing route
routes(app) // register the route

// export
module.exports = app

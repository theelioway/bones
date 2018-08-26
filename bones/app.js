'use strict'
require('request')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')({
  origin: true
})

// create the express app
const app = express()
app.use(cors)

// configure the body-parser to accept urlencoded bodies and json data
app.use(bodyParser.urlencoded({
    extended: true
  }))
  .use(bodyParser.json())
  .use(bodyParser.json({
    type: 'application/vnd.api+json'
  }))

var routes = require('./routes') // importing route
routes(app) // register the route

// export
module.exports = app


//
// app.use(morgan('dev')); // log every request to the console
// app.use(bodyParser.urlencoded({
//   'extended': 'true'
// })); // parse application/x-www-form-urlencoded
// app.use(bodyParser.json()); // parse application/json
// app.use(bodyParser.json({
//   type: 'application/vnd.api+json'
// })); // parse application/vnd.api+json as json
// app.use(methodOverride());

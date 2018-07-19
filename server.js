'use strict';

// database connection
require('./configs/database');

// dependencies
const express = require('express');
const bodyParser = require('body-parser');

// create the express app
const app = express();

// configure the body-parser
// to accept urlencoded bodies
// and json data
app.use(bodyParser.urlencoded({
    extended: true
  }))
  .use(bodyParser.json());

// register all routers
// all routes are prefixed with /api
app.use('/api', require('./routes/thing'));

// set the port
const port = parseInt(process.env.PORT, 10) || 3000;

// start the server
const server = app.listen(port, () => {
  console.log(`App is running at: http://localhost:${server.address().port}`);
});

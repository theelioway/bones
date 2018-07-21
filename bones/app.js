"use strict";

// dependencies
const express = require("express");
const bodyParser = require("body-parser");

// create the express app
const app = express();

// configure the body-parser to accept urlencoded bodies and json data
app.use(bodyParser.urlencoded({
    extended: true
  }))
  .use(bodyParser.json());

// register all routers
// all routes are prefixed with /engage
app.use("/engage", require("./routes/engage"));

// export
module.exports = app;

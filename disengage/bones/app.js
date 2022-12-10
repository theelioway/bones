"use strict"
require("dotenv").config()
const bodyParser = require("body-parser")
const cors = require("cors")
const express = require("express")
// const pino = require('pino-http')()

const routerApi = require("./router")
const routerAuth = require("./auth/router")
const routerSchema = require("./schema/router")
const app = express()

// app.locals.title = "bones"
// app.locals.email = "bones@elioway.com"
// app.locals.fs = require("fs")
// app.locals.log = msg => console.log(msg)

app.locals.fs = require("fs")

app
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
// .use(pino);

app.use("/auth", routerAuth)
app.use("/schema", routerSchema)
app.use("/", routerApi)

module.exports = app

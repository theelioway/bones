"use strict"
require("dotenv").config()
const { MONGODB_URL } = process.env
const bodyParser = require("body-parser")
const cors = require("cors")
const express = require("express")
const mongoose = require("mongoose")
// const pino = require('pino-http')()

const database = require("@elioway/bones/bones/database")
const routerApi = require("./router")
const routerAuth = require("./auth/router")
const routerSchema = require("./schema/router")
const app = express()
// app.locals.title = "mongoose-bones"
// app.locals.email = "mongoose-bones@elioway.com"
// app.locals.fs = require("fs")
// app.locals.log = msg => console.log(msg)
app
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
// .use(pino);



database
  .dbconnect(MONGODB_URL)
  .on("error", err => {
    console.log(
      { ______APP______: "DBCONNECT ERR" },
      `%c dbconnect failed to connect to ${MONGODB_URL}`
    )
  })
  .on("connected", stream => {
    console.log(
      { ______APP______: "DBCONNECT SUCCESS" },
      `%c dbconnect connected to ${MONGODB_URL}`
    )
  })

// database
//   .dbclear()
const ThingModel = require("./ThingModel")
// ThingModel({ "name": "GOD"}).save()
app.use("/all", (req, res) => {
  ThingModel.find((err, list) => {
    if (err) throw err
    res.status(200).send(list)
  })
})

app.use("/auth", routerAuth)
app.use("/schema", routerSchema)
app.use("/", routerApi)

module.exports = app

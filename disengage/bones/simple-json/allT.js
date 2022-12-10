/**
* @file Express Route GET/?q= handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
* // router.js
* >> const { Router } = require('express')
* >> const allT = require('@elioway/bones/bones/simple-json/allT')
* >> module.exports = T => {
* >>   let crudRouter = Router()
* >>   crudRouter.get("/:engage/", allT(ThingJSONSchema))
* >>   return crudRouter
* >> }

// app.js
* >> let T = {  thing: "Thing" }
* >> let crudRouter = require('./router.js')
* >> let apiRouter = Router()
* >> apiRouter.use(`/`, crudRouter)
* ============================================================================ *
* @param {JSON.Model} Thing JSON Model object.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"
const JSONdb = require("simple-json-db")
const db = new JSONdb("../database.json")

module.exports = Thing => {
  return async (req, res) => {
    res.status(200).send(db.JSON())
  }
}

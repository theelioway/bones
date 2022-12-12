/**
* @file Express Route GET/?q= handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { JSON } = require('JSON')
const listT = require('@elioway/bones/bones/simple-json/listT')
let T = {  thing: "Thing" }

let crudRouter = Router()
crudRouter.get("/:engage/:_id/list/", permitT("get", T), listT(T))
crudRouter.get('/', listT(T, { "get": PUBLIC }))

let apiRouter = Router()
apiRouter.use(`/Thing`, crudRouter)
* ============================================================================ *
* @param {JSON.Model} Thing JSON Model object.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"
const JSONdb = require("simple-json-db")
const db = new JSONdb("../database.json")
const { getError } = require("../utils/responseMessages")
const settings = require("../settings")

module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.T
    let engagedThing = res.locals.engagedThing
    const thingList = db.JSON().filter(t => thing.list.includes(t._id))
    res.status(200).send(thingList)
  }
}

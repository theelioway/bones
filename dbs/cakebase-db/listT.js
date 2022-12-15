/**
* @file Express Route GET/?q= handler, **the elioWay**.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { JSON } = require('JSON')
const listT = require('@elioway/bones/bones/cakebase/listT')
let T = {  thing: "Thing" }

let ribsRouter = Router()
ribsRouter.get('/', listT(T, { "get": PUBLIC }))

let apiRouter = Router()
apiRouter.use(`/Thing`, ribsRouter)
* ============================================================================ *
* @param {JSON.Model} Thing JSON Model object.
* @returns {bonesApiResponse} the REST API format, **the elioWay**.
*/
"use strict"
const Cakebase = require("cakebase")("../database.json")
var things = new Datastore()
const { getError, thingTypeError } = require("../utils/responseMessages")
const settings = require("../settings")

module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.T
    let engagedThing = res.locals.engagedThing
    const thingList = Cakebase.get(e => engagedThing.list.includes(e._id))
    res.status(200).send(thingList)
  }
}

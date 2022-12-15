/**
* @file Express Route GET/?q= handler, **the elioWay**.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { JSON } = require('JSON')
const listT = require('@elioway/bones/bones/nedb/listT')
let T = {  thing: "Thing" }

let crudRouter = Router()
crudRouter.get('/', listT(T, { "get": PUBLIC }))

let apiRouter = Router()
apiRouter.use(`/Thing`, crudRouter)
* ============================================================================ *
* @param {JSON.Model} Thing JSON Model object.
* @returns {bonesApiResponse} the REST API format, **the elioWay**.
*/
"use strict"
var Datastore = require("nedb")
var things = new Datastore()
const { getError } = require("../utils/responseMessages")
const settings = require("../settings")

module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.engage
    let engagedThing = res.locals.engagedThing
    await things.find({ thing: req.params.engage }, function (e, thingList) {
      if (e) {
        let Err = getError(e)
        res.status(Err.name).json(Err).end()
      } else {
        res.status(200).send(thingList)
      }
    })
  }
}

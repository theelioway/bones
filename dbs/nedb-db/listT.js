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
const { getError, thingTypeError } = require("../utils/responseMessages")
const settings = require("../settings")

module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.T
    let engagedThing = res.locals.engagedThing

    await things.find({ _id: { $in: thing.list } }, function (e, thingList) {
      if (e) {
        // General error getting this Thing.
        let Err = getError(e)
        // console.log({ loginT: "Err" }, Err)
        res.status(Err.name).json(Err).end()
      } else {
        // query.select(settings.slim)
        res.status(200).send(thingList)
      }
    })
  }
}

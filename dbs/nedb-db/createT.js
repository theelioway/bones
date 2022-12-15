/**
* @file Express Route POST handler, **the elioWay**.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { JSON } = require('JSON')
const createT = require('@elioway/bones/bones/nedb/createT')
let T = {  thing: "Thing" }

let crudRouter = Router()
crudRouter.post('/', createT(T, { "create": PUBLIC }))

let apiRouter = Router()
apiRouter.use(`/Thing`, crudRouter)
* ============================================================================ *
* @param {JSON.Model} Thing JSON Model object.
* @returns {bonesApiResponse} the REST API format, **the elioWay**.
*/
"use strict"
var Datastore = require("nedb")
var things = new Datastore()
const { createError, thingTypeError } = require("../utils/responseMessages")
const { thingTypeMatched } = require("../utils/validations")

module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.T
    let createT = req.body
    if (!thingTypeMatched(createT, thingType)) {
      // Thing's Type does not match the endpoint called.
      let Err = thingTypeError("create", thingType)
      // console.log({ createT: "Err" }, Err)
      res.status(Err.name).json(Err).end()
    } else {
      createT.created = Date.now()
      createT.createdBy = req.params._id
      createT.god = req.user._id
      createT.thing = thingType
      things.insert(createT, function (Err, createdT) {
        res.locals.engagedThing.list.push(createdT._id)
        res.status(201).send(createdT)
      })
    }
  }
}

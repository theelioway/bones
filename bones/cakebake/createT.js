/**
* @file Express Route POST handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { JSON } = require('JSON')
const createT = require('@elioway/JSON-bones/bones/crudities/createT')
const ThingModel = JSON.Model("Thing", { name: String })

let crudRouter = Router()
crudRouter.post('/', createT(ThingModel, { "create": PUBLIC }))

let apiRouter = Router()
apiRouter.use(`/Thing`, crudRouter)
* ============================================================================ *
* @param {JSON.Model} Thing JSON Model object.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"
const Cakebase = require('cakebase')("../database.json");
const { createError, thingTypeError } = require("../utils/responseMessages")
const { thingTypeMatched } = require("../utils/validations")

module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.T
    let createT = req.body
    if (!thingTypeMatched(createT, thingType)) {
      // Thing's Type does not match the endpoint called.
      let err = thingTypeError("create", thingType)
      // console.log({ createT: "err" }, err)
      res.status(err.name).json(err).end()
    } else {
      createT.created = Date.now()
      createT.createdBy = req.params._id
      createT.god = req.user._id
      createT.thing = thingType
      let createdT = Cakebase.set(createT)
      res.status(201).send(createdT)
    }
  }
}

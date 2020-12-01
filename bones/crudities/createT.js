/**
* @file Express Route POST handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { mongoose } = require('mongoose')
const createT = require('@elioway/mongoose-bones/bones/crudities/createT')
const ThingModel = mongoose.Model("Thing", { name: String })

let crudRouter = Router()
crudRouter.post('/', createT(ThingModel, { "create": PUBLIC }))

let apiRouter = Router()
apiRouter.use(`/Thing`, crudRouter)
* ============================================================================ *
* @param {mongoose.Model} Thing mongoose Model object.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"
const { createError, thingTypeError } = require("../utils/responseMessages")
const { thingTypeMatched } = require("../utils/validations")

module.exports = Thing => {
  return async (req, res) => {
    // console.log({ createT: "reqBody" }, req.body)
    // console.log({ createT: "reqParams" }, req.params)
    // console.log({ createT: "localsThing" }, res.locals.thing)
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

      console.log({ ______APP______: "createT"}, createT)
      await Thing.create(createT, async (e, createdT) => {
        if (e) {
          // General error creating this Thing.
          let err = createError(e)
          // console.log({ createT: "err" }, err)
          res.status(err.name).json(err).end()
        } else {
          // console.log({ createT: "createdT" }, createdT)
          // Add the new thing to the list?
          res.locals.thing.list.push(createdT._id)
          await res.locals.thing.save()
          res.status(201).send(createdT)
        }
      })
    }
  }
}

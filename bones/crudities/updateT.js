/**
* @file Express Route PATCH handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { mongoose } = require('mongoose')
const updateT = require('@elioway/mongoose-bones/bones/crudities/updateT')
const ThingModel = mongoose.Model("Thing", { name: String })

let crudRouter = Router()
crudRouter.patch('/:_id', updateT(ThingModel, { "update": OWNER }))

let apiRouter = Router()
apiRouter.use(`/Thing`, crudRouter)
* ============================================================================ *
* @param {mongoose.Model} Thing mongoose Model object.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"
const {
  updateError,
  updateSuccess,
  thingTypeError,
} = require("../utils/responseMessages")
const { thingTypeMatched } = require("../utils/validations")

module.exports = Thing => {
  return async (req, res) => {
    // console.log({ updateT: 'req' }, req)
    // console.log({ updateT: "reqBody" }, req.body)
    // console.log({ updateT: "reqParams" }, req.params)
    // console.log({ updateT: "localsThing" }, res.locals.thing)
    let thingType = req.params.engage
    let thing = res.locals.thing
    if (!thingTypeMatched(thing, thingType)) {
      // Thing's Type does not match the endpoint called.
      let err = thingTypeError("update", thingType)
      // console.log({ updateT: "err" }, err)
      res.status(err.name).json(err).end()
    } else {
      let createT = req.body
      createT.updated = Date.now()
      createT.updatedBy = req.user._id
      // console.log({ updateT: "createT" }, createT)
      await Thing.updateOne(
        { _id: req.params._id },
        { $set: createT },
        { returnOriginal: false },
        e => {
          if (e) {
            let err = updateError(e)
            // console.log({ updateT: "err" }, err)
            res.status(err.name).json(err).end()
          } else {
            let success = updateSuccess(thingType)
            res.status(success.name).send(success)
          }
        }
      )
    }
  }
}

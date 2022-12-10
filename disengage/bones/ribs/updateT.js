/**
* @file Express Route PATCH handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')

const updateT = require('@elioway/bones/bones/ribs/updateT')
let T = {  thing: "Thing" }

let ribsRouter = Router()
ribsRouter.patch('/:_id', updateT(T, { "update": OWNER }))

let apiRouter = Router()
apiRouter.use(`/Thing`, ribsRouter)
* ============================================================================ *
* @param {Object} Thing schema.
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
    let thingType = req.params.engage
    let engagedThing = res.locals.engagedThing
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

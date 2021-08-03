/**
* @file Express Route PATCH handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { JSON } = require('JSON')
const updateT = require('@elioway/bones/bones/nedb/updateT')
let T = {  thing: "Thing" }

let crudRouter = Router()
crudRouter.patch('/:_id', updateT(T, { "update": OWNER }))

let apiRouter = Router()
apiRouter.use(`/Thing`, crudRouter)
* ============================================================================ *
* @param {JSON.Model} Thing JSON Model object.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"
var Datastore = require("nedb")
var things = new Datastore()
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
    if (!thingTypeMatched(thing, thingType)) {
      // Thing's Type does not match the endpoint called.
      let err = thingTypeError("update", thingType)
      // console.log({ updateT: "err" }, err)
      res.status(err.name).json(err).end()
    } else {
      let updateT = req.body
      updateT.updated = Date.now()
      updateT.updatedBy = req.user._id
      // console.log({ updateT: "createT" }, createT)
      things.update(
        { _id: req.params._id },
        updateT,
        {},
        function (e, numReplaced) {
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

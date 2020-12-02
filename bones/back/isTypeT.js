/**
* @file Middleware to ensure the route "Thing" param in the Url matches the object.thing Type, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const isTypeT = require("@@elioway/mongoose-bones/bones/back/isTypeT")
const deleteT = require('../bones/my-route/deleteT')
let T = {

}
let apiRouter = Router()
apiRouter.delete(`/Thing/:_id`, isTypeT(T), deleteT(T))
* ============================================================================ *
* @param {JSON.Model} Thing JSON Model object.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"
const {
  thingTypeError,
} = require("../utils/responseMessages")
const { thingIsTypeT } = require("../utils/validations")

module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.engage
    let engagedThing = res.locals.engagedThing
    if (!thingIsTypeT(engagedThing, thingType)) {
      let err = thingTypeError("update", thingType)
      // console.log({ isTypeT: "err" }, err)
      res.status(err.name).json(err).end()
    } else {
      next()
    }
  }
}

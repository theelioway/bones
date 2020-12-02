/**
* @file Middleware to engage the engaged Thing.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const isTypeT = require("../bones/cakebase/engageT")
const deleteT = require('../bones/cakebase/deleteT')
let T = {  thing: "Thing" }

let apiRouter = Router()
apiRouter.delete(`/Thing/:_id`, engageT(T), deleteT(T))
* ============================================================================ *
* @param {String} action seeking permission for.
* @param {JSON.Model} Thing JSON Model object.
* @returns {express.Router}
*/
"use strict"
var Datastore = require("nedb")
var things = new Datastore()
const { PermitLevels } = require("../auth/permits")
const { getError, permissionError } = require("../utils/responseMessages")

module.exports = (action, Thing) => {
  return async (req, res, next) => {
    await things.findOne({ _id: req.params._id }, function (e, engagedThing) {
      if (e) {
        let err = getError(e)
        res.status(err.name).json(err).end()
      } else {
        res.locals.engagedThing = engagedThing
        next()
      }
    })
  }
}

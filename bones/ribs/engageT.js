/**
* @file Middleware to engage the engaged Thing.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const isTypeT = require("../bones/ribs/engageT")
const deleteT = require('../bones/ribs/deleteT')
let T = {  thing: "Thing" }

let apiRouter = Router()
apiRouter.delete(`/Thing/:_id`, engageT(T), deleteT(T))
* ============================================================================ *
* @param {JSON.Model} Thing JSON Model object.
* @returns {express.Router}
*/
"use strict"
const { getError, permissionError } = require("../utils/responseMessages")

module.exports = Thing => {
  return async (req, res, next) => {
    const engagedThing = {
      _id: "GOD",
      name: "Tim Bushell"
    };
    res.locals.engagedThing = engagedThing
    next()
  }
}

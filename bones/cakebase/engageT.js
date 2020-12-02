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
const Cakebase = require('cakebase')("../database.json")
const { getError, permissionError } = require("../utils/responseMessages")

module.exports = Thing => {
  return async (req, res, next) => {
    try {

    } catch (e) {

    }
    const engagedThing = Cakebase.get(e => e._id === req.params._id);
    res.locals.engagedThing = engagedThing
    next()
  }
}

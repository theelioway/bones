/**
* @file Middleware to engage the engaged Thing.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const isTypeT = require("../bones/simple-json/engageT")
const destroyT = require('../bones/simple-json/destroyT')
let T = {  thing: "Thing" }

let apiRouter = Router()
apiRouter.delete(`/Thing/:_id`, engageT(T), destroyT(T))
* ============================================================================ *
* @param {JSON.Model} Thing JSON Model object.
* @returns {bonesApiResponse} the REST API format, **the elioWay**.
*/
"use strict"
const JSONdb = require("simple-json-db")
const db = new JSONdb("../database.json")
const { getError, permissionError } = require("../utils/responseMessages")

module.exports = Thing => {
  return async (req, res) => {
    const engagedThing = db.get(req.params._id)
    res.locals.engagedThing = engagedThing
    next()
  }
}

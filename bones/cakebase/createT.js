/**
* @file Express Route POST handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const createT = require('@elioway/bones/bones/cakebase/createT')
let T = {  thing: "Thing" }

let ribsRouter = Router()
ribsRouter.post('/', createT(T, { "create": PUBLIC }))

let apiRouter = Router()
apiRouter.use(`/Thing`, ribsRouter)
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
    let engagedThing = res.locals.engagedThing
    let createT = req.body
    createT.created = Date.now()
    createT.createdBy = req.params._id
    createT.god = req.user._id
    createT.thing = thingType
    let createdT = Cakebase.set(createT)
    engagedThing.list.push(createdT._id)
    Cakebase.set(engagedThing)
    res.status(201).send(createdT)
  }
}

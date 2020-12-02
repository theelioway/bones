/**
* @file Express Route GET/?q= handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const listT = require('@elioway/bones/bones/ribs/listT')
let T = {  thing: "Thing" }

let ribsRouter = Router()
ribsRouter.get('/', listT(T, { "get": PUBLIC }))
* ============================================================================ *
* @param {Object} Thing schema.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"
const { getError } = require("../utils/responseMessages")
const settings = require("../settings")

module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.engage
    let engagedThing = res.locals.engagedThing
    res.locals.engagedThing
    res.status(200).send({

    })
  }
}

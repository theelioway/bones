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

let apiRouter = Router()
apiRouter.use(`/Thing`, ribsRouter)
* ============================================================================ *
* @param {Object} Thing schema.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"
const { getError } = require("../utils/responseMessages")
const settings = require("../settings")

module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.T
    let engagedThing = res.locals.engagedThing

    let thingList = engagedThing.list.map(t => slim(t, settings.slim))

    if (e) {
      let err = getError(e)
      res.status(err.name).json(err).end()
    } else {
      res.status(200).send(thingList)
    }
  }
}

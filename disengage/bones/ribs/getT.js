/**
* @file Express Route GET/id handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')

const getT = require('@elioway/bones/bones/ribs/getT')
let T = {  thing: "Thing" }

let ribsRouter = Router()
ribsRouter.get('/:_id', getT(T, { "create": PUBLIC }))

let apiRouter = Router()
apiRouter.use(`/Thing`, ribsRouter)
* ============================================================================ *
* @param {Object} Thing schema.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"

module.exports = Thing => {
  return async (req, res) => {
    res.status(200).send(res.locals.engagedThing)
  }
}

/**
* @file Express Route POST handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')

const createT = require('@elioway/bones/bones/ribs/createT')
let T = {  thing: "Thing" }

let ribsRouter = Router()
ribsRouter.post('/', createT(T, { "create": PUBLIC }))

let apiRouter = Router()
apiRouter.use(`/:engaged/`, ribsRouter)
* ============================================================================ *
* @param {Object} Thing schema.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"
const { createError } = require("../utils/responseMessages")

module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.T
    let engagedThing = res.locals.engagedThing

    let createT = req.body
    createT.created = Date.now()
    createT.createdBy = req.params._id
    createT.god = req.user._id
    createT.thing = thingType

    let createdT = await createT.save()

    if (e) {
      // General error creating this Thing.
      let err = createError(e)
      // console.log({ createT: "err" }, err)
      res.status(err.name).json(err).end()
    } else {
      // console.log({ createT: "createdT" }, createdT)
      // Add the new thing to the list?
      engagedThing.list.push(createdT._id)
      await engagedThing.save()

      res.status(201).send(createdT)
    }
  }
}

/**
* @file Express Route DELETE/id handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')

const deleteT = require('@elioway/bones/bones/ribs/deleteT')
let T = {  thing: "Thing" }

let ribsRouter = Router()
ribsRouter.delete('/:_id', deleteT(T, { "delete": OWNER }))

let apiRouter = Router()
apiRouter.use(`/Thing`, ribsRouter)
* ============================================================================ *
* @param {Object} Thing schema.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"
const {
  deleteError,
  deleteSuccess,
} = require("../utils/responseMessages")

module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.engage
    let engagedThing = res.locals.engagedThing
    await engagedThing.delete()
    if (e) {
      // General error deleting this Thing.
      let err = deleteError(e)
      // console.log({ deleteT: "err" }, err)
      res.status(err.name).json(err)
    } else {
      let success = deleteSuccess(thingType)
      res.status(success.name).json(success)
    }
  }
}

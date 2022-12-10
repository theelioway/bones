/**
* @file Express Route PATCH handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { JSON } = require('JSON')
const updateT = require('@elioway/bones/bones/cakebase/updateT')
let T = {  thing: "Thing" }

let ribsRouter = Router()
ribsRouter.patch('/:_id', updateT(T, { "update": OWNER }))

let apiRouter = Router()
apiRouter.use(`/Thing`, ribsRouter)
* ============================================================================ *
* @param {JSON.Model} Thing JSON Model object.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"
const Cakebase = require("cakebase")("../database.json")
const {
  updateError,
  updateSuccess,
  thingTypeError,
} = require("../utils/responseMessages")
const { thingTypeMatched } = require("../utils/validations")

module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.engage
    let engagedThing = res.locals.engagedThing
    let updateT = req.body
    updateT.updated = Date.now()
    updateT.updatedBy = req.user._id
    let updatedT = Cakebase.update(e => e._id === req.params._id, updateT)
    let success = updateSuccess(thingType)
    res.status(success.name).send(updatedT)
  }
}

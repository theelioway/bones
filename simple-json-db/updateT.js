/**
* @file Express Route PATCH handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { JSON } = require('JSON')
const updateT = require('@elioway/bones/bones/simple-json/updateT')
let T = {  thing: "Thing" }

let crudRouter = Router()
crudRouter.patch('/:_id', updateT(T, { "update": OWNER }))

let apiRouter = Router()
apiRouter.use(`/Thing`, crudRouter)
* ============================================================================ *
* @param {JSON.Model} Thing JSON Model object.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"
const JSONdb = require("simple-json-db")
const db = new JSONdb("../database.json")
const { updateSuccess } = require("../utils/responseMessages")

module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.engage
    let engagedThing = res.locals.engagedThing
    let updateT = req.body
    updateT.updated = Date.now()
    updateT.updatedBy = req.user._id
    let updatedT = db.set(req.params._id, updateT)
    let success = updateSuccess(thingType)
    res.status(success.name).send(updatedT)
  }
}

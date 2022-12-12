/**
* @file Express Route DELETE/id handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { JSON } = require('JSON')
const deleteT = require('@elioway/bones/bones/simple-json/deleteT')
let T = {  thing: "Thing" }

let crudRouter = Router()
crudRouter.delete('/:_id', deleteT(T, { "delete": OWNER }))

let apiRouter = Router()
apiRouter.use(`/Thing`, crudRouter)
* ============================================================================ *
* @param {JSON.Model} Thing JSON Model object.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"
const JSONdb = require("simple-json-db")
const db = new JSONdb("../database.json")
const { deleteSuccess } = require("../utils/responseMessages")

module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.engage
    const deletedableT = db.delete(req.params._id)
    let success = deleteSuccess(thingType)
    res.status(success.name).json(deletedableT)
  }
}

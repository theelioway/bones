/**
* @file Express Route DELETE/id handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { JSON } = require('JSON')
const deleteT = require('@elioway/JSON-bones/bones/crudities/deleteT')
const ThingModel = JSON.Model("Thing", { name: String })

let crudRouter = Router()
crudRouter.delete('/:_id', deleteT(ThingModel, { "delete": OWNER }))

let apiRouter = Router()
apiRouter.use(`/Thing`, crudRouter)
* ============================================================================ *
* @param {JSON.Model} Thing JSON Model object.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"
const Cakebase = require('cakebase')("../database.json");
var things = new Datastore();
const {
  deleteError,
  deleteSuccess,
  thingTypeError,
} = require("../utils/responseMessages")
const { thingTypeMatched } = require("../utils/validations")

module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.engage
    const deletedableT = Cakebase.get(e => e._id === req.params._id)
    Cakebase.remove(deletedableT)
    let success = deleteSuccess(thingType)
    res.status(success.name).json(success)
  }
}

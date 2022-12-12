/**
* @file Express Route DELETE/id handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { JSON } = require('JSON')
const deleteT = require('@elioway/bones/bones/nedb/deleteT')
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
var Datastore = require("nedb")
var things = new Datastore()
const {
  deleteError,
  deleteSuccess,
  thingTypeError,
} = require("../utils/responseMessages")
const { thingTypeMatched } = require("../utils/validations")

module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.engage
    await things.findOne({ _id: req.params._id }, function (e, deletedableT) {
      // console.log({ deleteT: "deletedableT" }, deletedableT)
      if (e) {
        // General error finding this Thing.
        let Err = deleteError(e)
        res.status(Err.name).json(Err)
      } else if (!thingTypeMatched(deletedableT, thingType)) {
        // Thing's Type does not match the endpoint called.
        let Err = thingTypeError("delete", thingType)
        // console.log({ deleteT: "Err" }, Err)
        res.status(Err.name).json(Err)
      } else {
        things.remove(
          { _id: { $regex: req.params._id } },
          function (e, numDeleted) {
            if (e) {
              // General error deleting this Thing.
              let Err = deleteError(e)
              // console.log({ deleteT: "Err" }, Err)
              res.status(Err.name).json(Err)
            } else {
              let success = deleteSuccess(thingType)
              res.status(success.name).json(success)
            }
          }
        )
      }
    })
  }
}

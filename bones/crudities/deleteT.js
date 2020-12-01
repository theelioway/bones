/**
* @file Express Route DELETE/id handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { mongoose } = require('mongoose')
const deleteT = require('@elioway/mongoose-bones/bones/crudities/deleteT')
const ThingModel = mongoose.Model("Thing", { name: String })

let crudRouter = Router()
crudRouter.delete('/:_id', deleteT(ThingModel, { "delete": OWNER }))

let apiRouter = Router()
apiRouter.use(`/Thing`, crudRouter)
* ============================================================================ *
* @param {mongoose.Model} Thing mongoose Model object.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"
const {
  deleteError,
  deleteSuccess,
  thingTypeError,
} = require("../utils/responseMessages")
const { isPermitted, thingTypeMatched } = require("../utils/validations")

module.exports = Thing => {
  return async (req, res) => {
    // console.log({ deleteT: "reqBody" }, req.body)
    // console.log({ deleteT: "reqParams" }, req.params)
    // console.log({ deleteT: "localsThing" }, res.locals.thing)
    let thingType = req.params.engage
    await Thing.findById(req.params._id, (e, deletedableT) => {
      // console.log({ deleteT: "deletedableT" }, deletedableT)
      if (e) {
        // General error finding this Thing.
        let err = deleteError(e)
        // console.log({ deleteT: "err" }, err)
        res.status(err.name).json(err)
      } else if (!thingTypeMatched(deletedableT, thingType)) {
        // Thing's Type does not match the endpoint called.
        let err = thingTypeError("delete", thingType)
        // console.log({ deleteT: "err" }, err)
        res.status(err.name).json(err)
      } else {
        Thing.deleteOne({ _id: req.params._id }, e => {
          if (e) {
            // General error deleting this Thing.
            let err = deleteError(e)
            // console.log({ deleteT: "err" }, err)
            res.status(err.name).json(err)
          } else {
            let success = deleteSuccess(thingType)
            res.status(success.name).json(success)
          }
        })
      }
    })
  }
}

/**
* @file Express Route GET/?q= handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { mongoose } = require('mongoose')
const listT = require('@elioway/mongoose-bones/bones/crudities/listT')
const ThingModel = mongoose.Model("Thing", { name: String })

let crudRouter = Router()
crudRouter.get('/', listT(ThingModel, { "get": PUBLIC }))

let apiRouter = Router()
apiRouter.use(`/Thing`, crudRouter)
* ============================================================================ *
* @param {mongoose.Model} Thing mongoose Model object.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"
const { getError, thingTypeError } = require("../utils/responseMessages")
const settings = require("../settings")

module.exports = Thing => {
  return async (req, res) => {
    // console.log({ listT: "reqBody" }, req.body)
    // console.log({ listT: "reqParams" }, req.params)
    // console.log({ listT: "localsThing" }, res.locals.thing)
    let thingType = req.params.T
    let thing = res.locals.thing
    let query = Thing.find()
    query.select(settings.slim)
    query.setOptions({ lean: true })
    query.where("_id").in(thing.list)
    if (thingType) query.where("thing").eq(thingType)
    await query.exec((e, thingList) => {
      // console.log({ listT: "thingList" }, thingList)
      if (e) {
        // General error getting this Thing.
        let err = getError(e)
        // console.log({ loginT: "err" }, err)
        res.status(err.name).json(err).end()
      } else {
        res.status(200).send(thingList)
      }
    })
  }
}

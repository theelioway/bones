/**
* @file Express Route GET/id handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { mongoose } = require('mongoose')
const getT = require('@elioway/mongoose-bones/bones/crudities/getT')
const ThingModel = mongoose.Model("Thing", { name: String })

let crudRouter = Router()
crudRouter.get('/:_id', getT(ThingModel, { "create": PUBLIC }))

let apiRouter = Router()
apiRouter.use(`/Thing`, crudRouter)
* ============================================================================ *
* @param {mongoose.Model} Thing mongoose Model object.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"

module.exports = Thing => {
  return async (req, res) => {
    // console.log({ getT: "reqBody" }, req.body)
    // console.log({ getT: "reqParams" }, req.params)
    // console.log({ getT: "localsThing" }, res.locals.thing)
    console.log({ ______APP______: "res.locals.thing"}, res.locals.thing)
    res.status(200).send(res.locals.thing)
  }
}

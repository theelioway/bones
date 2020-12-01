/**
* @file Express Route GET/?q= handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { JSON } = require('JSON')
const listT = require('@elioway/JSON-bones/bones/crudities/listT')
const ThingModel = JSON.Model("Thing", { name: String })

let crudRouter = Router()
crudRouter.get('/', listT(ThingModel, { "get": PUBLIC }))

let apiRouter = Router()
apiRouter.use(`/Thing`, crudRouter)
* ============================================================================ *
* @param {JSON.Model} Thing JSON Model object.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"
const Cakebase = require('cakebase')("../database.json");

module.exports = Thing => {
  return async (req, res) => {
   res.status(200).send(Cakebase.getAll())
  }
}

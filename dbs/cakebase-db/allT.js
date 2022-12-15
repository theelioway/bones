/**
* @file Express Route GET/?q= handler, **the elioWay**.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { JSON } = require('JSON')
const listT = require('@elioway/bones/bones/cakebase/listT')
let T = {  thing: "Thing" }

let ribsRouter = Router()
ribsRouter.get('/', listT(T, { "get": PUBLIC }))

let apiRouter = Router()
apiRouter.use(`/Thing`, ribsRouter)
* ============================================================================ *
* @param {JSON.Model} Thing JSON Model object.
* @returns {bonesApiResponse} the REST API format, **the elioWay**.
*/
"use strict"
const Cakebase = require("cakebase")("../database.json")

module.exports = Thing => {
  return async (req, res) => {
    try {
      res.status(200).send(Cakebase.getAll())
    } catch (e) {
      // General error creating this Thing.
      let Err = createError(e)
      // console.log({ createT: "Err" }, Err)
      res.status(Err.name).json(Err).end()
    }
  }
}

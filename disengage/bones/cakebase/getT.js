/**
* @file Express Route GET/id handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { JSON } = require('JSON')
const getT = require('@elioway/bones/bones/cakebase/getT')
let T = {  thing: "Thing" }

let crudRouter = Router()
crudRouter.get('/:_id', getT(T, { "create": PUBLIC }))

let apiRouter = Router()
apiRouter.use(`/Thing`, crudRouter)
* ============================================================================ *
* @param {JSON.Model} Thing JSON Model object.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"

module.exports = Thing => {
  return async (req, res) => {
    console.log(
      { ______GET______: "res.locals.engagedThing" },
      res.locals.engagedThing
    )
    res.status(200).send(res.locals.engagedThing)
  }
}

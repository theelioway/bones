/**
* @file Express Route LOGOUT handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { JSON } = require('JSON')
const logoutT = require('@elioway/bones/crudities/logoutT')
const Thing = JSON.Model("Thing", { name: String })

let crudRouter = Router()
crudRouter.post('/logout', logoutT(Thing))

let apiRouter = Router()
apiRouter.use(`/Thing`, crudRouter)
* ============================================================================ *
* @param {JSON.Model} Thing JSON Model object.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"
const Cakebase = require("cakebase")("../database.json")
var things = new Datastore()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { logoutSuccess } = require("../utils/responseMessages")
const { JWT_SECRET } = process.env

module.exports = Thing => {
  return async (req, res) => {
    // log.debug({ logoutT: "reqBody" }, req.body)
    // log.debug({ logoutT: "reqParams" }, req.params)
    // log.debug({ createT: "localsThing" }, res.locals.engagedThing)
    res.clearCookie("access_token")
    // Logout success.
    let err = logoutSuccess()
    res.status(err.name).json(err)
  }
}

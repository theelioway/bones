/**
* @file Express Route LOGOUT handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')

const logoutT = require('@elioway/mongoose-bones/crudities/logoutT')
const Thing = mongoose.Model("Thing", { name: String })

let ribsRouter = Router()
ribsRouter.post('/logout', logoutT(Thing))

let apiRouter = Router()
apiRouter.use(`/Thing`, ribsRouter)
* ============================================================================ *
* @param {Object} Thing schema.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"
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

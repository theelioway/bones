/**
* @file Express Route LOGOUT handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { JSON } = require('JSON')
const logoutT = require('@elioway/bones/simple-json/logoutT')
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
const JSONdb = require("simple-json-db")
const db = new JSONdb("../database.json")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { logoutSuccess } = require("../utils/responseMessages")
const { JWT_SECRET } = process.env

module.exports = Thing => {
  return async (req, res) => {
    res.clearCookie("access_token")
    let Err = logoutSuccess()
    res.status(Err.name).json(Err)
  }
}

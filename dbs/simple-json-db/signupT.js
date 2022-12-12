/**
* @file Express Route SIGNUP POST handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { JSON } = require('JSON')
const signupT = require('@elioway/bones/bones/simple-json/signupT')
const T = JSON.Model("Thing", { name: String, ...etc })

let crudRouter = Router()
crudRouter.post('/', signupT(T))

let apiRouter = Router()
apiRouter.use(`/:Thing`, crudRouter)
* ============================================================================ *
* @param {JSON.Model} Thing JSON Model object.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"
const JSONdb = require("simple-json-db")
const db = new JSONdb("../database.json")
const bcrypt = require("bcryptjs")
const {
  signUpError,
  credentialsMissingError,
} = require("../utils/responseMessages")

module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.engage
    const signupT = req.body
    const { username, password } = signupT
    if (!username || !password) {
      let Err = credentialsMissingError()
      res.status(Err.name).json(Err)
    } else {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      signupT._id = Date.now().toString()
      signupT.created = Date.now()
      signupT.password = hash
      signupT.thing = thingType
      let signedupT = db.set(signupT._id, signupT)
      // No hashed password in response: Useless and ugly.
      delete signedupT.password
      res.status(201).send(signedupT)
    }
  }
}

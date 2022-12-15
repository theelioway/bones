/**
* @file Express Route SIGNUP POST handler, **the elioWay**.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { JSON } = require('JSON')
const signupT = require('@elioway/bones/bones/cakebase/signupT')
const T = JSON.Model("Thing", { name: String, ...etc })

let crudRouter = Router()
crudRouter.post('/', signupT(T))

let apiRouter = Router()
apiRouter.use(`/:Thing`, crudRouter)
* ============================================================================ *
* @param {JSON.Model} Thing JSON Model object.
* @returns {bonesApiResponse} the REST API format, **the elioWay**.
*/
"use strict"
const Cakebase = require("cakebase")("../database.json")
var things = new Datastore()
const bcrypt = require("bcryptjs")
const {
  signUpError,
  credentialsMissingError,
  thingTypeError,
} = require("../utils/responseMessages")
const { thingTypeMatched } = require("../utils/validations")

module.exports = Thing => {
  return async (req, res) => {
    // console.log({ signupT: 'req' }, req)
    // console.log({ signupT: "reqBody" }, req.body)
    // console.log({ signupT: "reqParams" }, req.params)
    let thingType = req.params.engage
    const signupT = req.body
    const { username, password } = signupT
    if (!username || !password) {
      // Data missing for this request.
      let Err = credentialsMissingError()
      // console.log({ signupT: "Err" }, Err)
      res.status(Err.name).json(Err)
    } else if (!thingTypeMatched(signupT, thingType)) {
      // Thing's Type does not match the endpoint called.
      let Err = thingTypeError("signup", thingType)
      // console.log({ signupT: "Err" }, Err)
      res.status(Err.name).json(Err)
    } else {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      signupT.created = Date.now()
      signupT.password = hash
      signupT.thing = thingType
      let signedupT = Cakebase.set(signupT)
      // No hashed password in response: Useless and ugly.
      delete signedupT.password
      res.status(201).send(signedupT)
    }
  }
}

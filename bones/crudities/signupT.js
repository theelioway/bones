/**
* @file Express Route SIGNUP POST handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { mongoose } = require('mongoose')
const signupT = require('@elioway/mongoose-bones/bones/crudities/signupT')
const ThingModel = mongoose.Model("Thing", { name: String, ...etc })

let crudRouter = Router()
crudRouter.post('/', signupT(ThingModel))

let apiRouter = Router()
apiRouter.use(`/:Thing`, crudRouter)
* ============================================================================ *
* @param {mongoose.Model} Thing mongoose Model object.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"
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
      let err = credentialsMissingError()
      // console.log({ signupT: "err" }, err)
      res.status(err.name).json(err)
    } else if (!thingTypeMatched(signupT, thingType)) {
      // Thing's Type does not match the endpoint called.
      let err = thingTypeError("signup", thingType)
      // console.log({ signupT: "err" }, err)
      res.status(err.name).json(err)
    } else {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      signupT.created = Date.now()
      signupT.password = hash
      signupT.thing = thingType
      await Thing.create(signupT, (e, signedupT) => {
        if (e) {
          // General error signing up this Thing.
          let err = signUpError(e)
          // console.log({ signupT: "err" }, err)
          res.status(err.name).json(err)
        } else {
          let rtnT = signedupT.toObject()
          // No hashed password in response: Useless and ugly.
          delete rtnT.password
          rtnT.permits = Object.fromEntries(signedupT.permits)
          res.status(201).send(rtnT)
        }
      })
    }
  }
}

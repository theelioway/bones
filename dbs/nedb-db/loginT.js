/**
* @file Express Route POST handler, the elioWay.
* @author Tim Bushell | [C. K. Tang](https://github.com/cktang88)
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { JSON } = require('JSON')
const loginT = require('@elioway/bones/crudities/loginT')
const Thing = JSON.Model("Thing", { name: String })

let crudRouter = Router()
crudRouter.post('/login', loginT(Thing))

let apiRouter = Router()
apiRouter.use(`/Thing`, crudRouter)
* ============================================================================ *
* @param {JSON.Model} Thing JSON Model object.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"
var Datastore = require("nedb")
var things = new Datastore()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {
  credentialsError,
  credentialsMissingError,
  loginTokenError,
} = require("../utils/responseMessages")
const { JWT_SECRET } = process.env

module.exports = Thing => {
  return async (req, res) => {
    // log.debug({ loginT: "reqBody" }, req.body)
    // log.debug({ loginT: "reqParams" }, req.params)
    const newT = req.body
    const { username, password } = newT
    if (!username || !password) {
      // Data missing for this request.
      let Err = credentialsMissingError()
      // console.log({ loginT: "Err" }, Err)
      res.status(Err.name).json(Err).end()
    } else {
      await things.findOne({ username: username }, async function (e, user) {
        if (!user) {
          // Data missing for this request.
          let Err = credentialsError()
          // console.log({ loginT: "Err" }, Err)
          res.status(Err.name).json(Err).end()
          return
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
          const payload = {
            id: user._id,
            username: user.username,
          }
          await jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: 36000 },
            (e, token) => {
              if (e) {
                // General creating token.
                let Err = loginTokenError(e)
                // console.log({ loginT: "Err" }, Err)
                res.status(Err.name).json(Err).end()
              } else {
                res
                  .status(200)
                  .json({
                    _id: user._id,
                    name: user.name,
                    success: true,
                    username: user.username,
                    token: `Bearer ${token}`,
                  })
                  .end()
              }
            }
          )
        } else {
          // General error logging in to this Thing.
          let Err = credentialsError()
          // console.log({ loginT: "Err" }, Err)
          res.status(Err.name).json(Err).end()
        }
      })
    }
  }
}

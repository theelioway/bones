/**
* @file Middleware for endpoints to handle permissions.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const permitTo = require("@@elioway/mongoose-bones/bones/back/permitTo")
const deleteT = require('../bones/my-route/deleteT')

let apiRouter = Router()
apiRouter.delete(`/Thing/:_id`, permitTo("delete", T), deleteT(T))
* ============================================================================ *
* @param {String} action seeking permission for.
* @param {Object} Thing schema.
* @returns {express.Router}
*/
"use strict"
const { PermitLevels } = require("../auth/permits")
const { getError, permissionError } = require("../utils/responseMessages")

module.exports = (action, Thing) => {
  return async (req, res, next) => {
      let engagedThing = res.locals.engagedThing
      // Get the permission setting from the Thing.
      let banned = req.user.permits.get("banned")
      // Pass the found engagedThing done the middleware chain.
      if (!engagedThing._id) {
        // General error getting this Thing.
        let err = getError(e)
        res.status(err.name).json(err).end()
      } else if (banned) {
        // General error getting this Thing.
        let err = getError({ name: 403, message: `${req.user._id} has been banned.`})
        res.status(err.name).json(err).end()
      } else {
        if (!engagedThing.permits) {
          // Nothing is permitted; not banned; pass the content forward.
          next()
        } else {
          let permitLevel = engagedThing.permits.get(action)
          let permitted = false
          if (permitLevel === PermitLevels.AUTH) {
            // Permit action on Thing if authenticated.
            permitted = req.user
          } else if (permitLevel === PermitLevels.GOD) {
            // Permit action on Thing if authenticated and owner OR is SELF
            if (req.user) {
              permitted =
                (req.user._id.equals(engagedThing.god)) ||
                req.user._id.equals(engagedThing._id)
            }
          } else if (permitLevel === PermitLevels.LISTED) {
            // Permit action on Thing if authenticated and in the list OR GOD or SELF
            if (req.user) {
              permitted =
                (!banned && engagedThing.list.includes(req.user._id)) ||
                req.user._id.equals(engagedThing.god) ||
                req.user._id.equals(engagedThing._id)
            }
          } else {
            // PermitLevels.ANON?
            permitted = !banned
          }
          if (permitted) {
            next()
          } else {
            let err = permissionError(action, req.params.engage)
            res.status(err.name).json(err).end()
          }
        }
      }
    })
  }
}

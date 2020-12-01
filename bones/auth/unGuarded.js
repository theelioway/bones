"use strict"
const passport = require("passport")
const passportCustom = require("passport-custom")
const settings = require("../settings")
const { SITE_ID } = process.env

module.exports = T => {
  passport.use(
    "unguarded",
    new passportCustom.Strategy((req, callback) => {
      // console.log({ unGuarded: "req"}, req.params)
      // console.log({ unGuarded: "callback"}, callback)
      let myThing = null
      // console.log({ ______APP______: "SITE_ID"}, SITE_ID)
      T.findById(SITE_ID, (e, thing) => {
        // console.log({ unGuarded: "thing"}, thing)
        if (e) {
          return callback(e)
        } else {
          // Forceably turn off the User's own authority
          // thing.permits.set("banned", true)
          // console.log({ ______APP______: "thing"}, thing)
          return callback(null, thing)
        }
      })
    })
  )
  return passport.authenticate("unguarded", { session: false })
}

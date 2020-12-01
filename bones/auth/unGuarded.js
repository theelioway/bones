"use strict"
var Datastore = require('nedb');
var things = new Datastore();
const passport = require("passport")
const passportCustom = require("passport-custom")
const settings = require("../settings")
const { SITE_ID } = process.env

module.exports = T => {
  passport.use(
    "unguarded",
    new passportCustom.Strategy((req, callback) => {
      let myThing = null
      await things.findOne({ _id: SITE_ID }, function(e, thing) {
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

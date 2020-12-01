/**
* @file Subroute with endpoints to handle mongoose.Model cruddy operations, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { mongoose } = require('mongoose')
const crudify = require('@elioway/mongoose-bones/crudify')
const ThingModel = mongoose.Model("Thing", { name: String })
let apiRouter = Router()
apiRouter.use(`/Thing`, crudify(ThingModel))
* ============================================================================ *
*
* @param {mongoose.Model} T the Thing mongoose Model object.
* @returns {express.Router}
*/
"use strict"
const { Router } = require("express")

const permitTo = require("./crudities/permitTo")
const allT = require("./crudities/allT")
const createT = require("./crudities/createT")
const deleteT = require("./crudities/deleteT")
const getT = require("./crudities/getT")
const listT = require("./crudities/listT")
const updateT = require("./crudities/updateT")

module.exports = T => {
  let crudRouter = Router()
  crudRouter.get("/:engage/", allT(T))
  crudRouter.get("/:engage/:_id/", permitTo("get", T), getT(T))
  crudRouter.get("/:engage/:_id/list/", permitTo("get", T), listT(T))
  crudRouter.get("/:engage/:_id/listof/:T/", permitTo("get", T), listT(T))
  crudRouter.post("/:engage/:_id/:T/", permitTo("create", T), createT(T))
  crudRouter.patch("/:engage/:_id/", permitTo("update", T), updateT(T))
  crudRouter.delete("/:engage/:_id/", permitTo("delete", T), deleteT(T))
  return crudRouter
}

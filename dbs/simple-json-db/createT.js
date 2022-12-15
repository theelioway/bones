/**
* @file Express Route POST handler, **the elioWay**.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { JSON } = require('JSON')
const createT = require('@elioway/bones/bones/simple-json/createT')
let T = {  thing: "Thing" }

let ribsRouter = Router()
ribsRouter.post('/', createT(T, { "create": PUBLIC }))

let apiRouter = Router()
apiRouter.use(`/Thing`, ribsRouter)
* ============================================================================ *
* @param {JSON.Model} Thing JSON Model object.
* @returns {bonesApiResponse} the REST API format, **the elioWay**.
*/
"use strict"
const JSONdb = require("simple-json-db")
const db = new JSONdb("../database.json")
const { createError } = require("../utils/responseMessages")

module.exports = Thing => {
  return async (req, res) => {
    let thingType = req.params.T
    let createT = req.body
    createT._id = Date.now().toString()
    createT.created = Date.now()
    createT.createdBy = req.params._id
    createT.god = req.user._id
    createT.thing = thingType
    let createdT = db.set(createT._id, createT)
    res.status(201).send(createdT)
  }
}

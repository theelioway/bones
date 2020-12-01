/**
* @file Express Route GET/?q= handler, the elioWay.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const { Router } = require('express')
const { JSON } = require('JSON')
const listT = require('@elioway/JSON-bones/bones/crudities/listT')
const ThingModel = JSON.Model("Thing", { name: String })

let crudRouter = Router()
crudRouter.get('/', listT(ThingModel, { "get": PUBLIC }))

let apiRouter = Router()
apiRouter.use(`/Thing`, crudRouter)
* ============================================================================ *
* @param {JSON.Model} Thing JSON Model object.
* @returns {bonesApiResponse} the REST API format, the elioWay.
*/
"use strict"

//inital
const Cakebase = require('cakebase')("../database.json");

//Create a new row
Cakebase.set({ id: 0, email: "..." });

//Get rows
const rows = Cakebase.get(e => e.email === "...");

//Remove rows
Cakebase.remove(rows);

//Update rows
Cakebase.update(e => e.id === "e1fe3...", { email: "..." });

//Get all rows


//Clear the whole database
Cakebase.clear();

const Cakebase = require('cakebase')("../database.json");
var things = new Datastore();
const { getError } = require("../utils/responseMessages")
const settings = require("../settings")

module.exports = Thing => {
  return async (req, res) => {
   res.status(200).send(Cakebase.getAll())
  }
}

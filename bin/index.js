#!/usr/bin/env node
const fs = require("node:fs")
const path = require("node:path")
const db = require("@elioway/dbhell")
const adons = require("../adons")
const ribs = require("../ribs")
const spine = require("../spine")
const flesh = require("../flesh")
const { boneUp, boneEnvVarsLoader, ribsConfig, yargsBone } = require("../src")

const commandDir = process.cwd()
const allDefaultRibs = { ...ribs, ...spine, ...adons }

fs.readFile(path.join(commandDir, ".env"), "utf8", (readEnvErr, envData) => {
  // Default CFG you can override by adding a .env file in the directory. 
  let CFG = boneEnvVarsLoader(readEnvErr, envData, commandDir)
  console.log({ CFG })
  // `boneUp` is a **yargs** ready command router. **yargs** will intecept the command, 
  // which is passed to eliobones to handle as a turd or list.  
  let commandHandler = packet => boneUp(packet, allDefaultRibs, db, flesh)
  // Once the db has been initialized (which is quick for dbhell), create a **yargs** CLI command.
  db.initialize(CFG, () => yargsBone("bones", ribsConfig, commandHandler))
})

#!/usr/bin/env node
const fs = require("fs")
const path = require("path")
const yargs = require("yargs")

const db = require("@elioway/dbhell")
const boneUp = require("../src/boneUp")
const ribs = require("../ribs")
const spine = require("../spine")
const flesh = require("../flesh")
const initializeT = require("./initializeT")

fs.readFile(".env", "utf8", (readEnvErr, envData) => {
  // Parse the file's contents and store them in an object
  let envVars = { DATADIR: "./" }
  if (!readEnvErr) {
    let envVars = envData
      .trim()
      .split("\n")
      .map(line => line.split("="))
      .reduce((acc, [key, value]) => {
        acc[key] = value
        return acc
      }, {})
  }

  db.initialize(envVars)

  yargs
    .scriptName("bones")
    .usage("$0 <rib>T [identifier] [listIdentifier] --schemaProps")
    .parserConfiguration({
      "short-option-groups": true,
      "camel-case-expansion": false,
      "dot-notation": true,
      "parse-numbers": true,
      "parse-positional-numbers": true,
      "boolean-negation": true,
      "deep-merge-config": false,
    })

  const ribsConfig = {
    destroyT: { aliases: ["delete"], positionals: ["identifier"] },
    enlistT: {
      aliases: ["add", "addTolist"],
      positionals: ["subjectOf", "identifier"],
    },
    listT: { aliases: ["list"], positionals: ["identifier"] },
    pingT: { aliases: ["ping"], positionals: [] },
    readT: { aliases: ["get"], positionals: ["identifier"] },
    schemaT: {
      aliases: ["schema", "scheme", "meta"],
      positionals: ["mainEntityOfPage"],
    },
    takeonT: {
      aliases: ["createAdd"],
      positionals: ["subjectOf", "identifier"],
    },
    takeupT: { aliases: ["create", "new"], positionals: ["identifier"] },
    unlistT: {
      aliases: ["remove", "removeFromlist"],
      positionals: ["subjectOf", "identifier"],
    },
    updateT: { aliases: ["update", "patch"], positionals: ["identifier"] },
    inflateT: { aliases: ["dirInflateT"], positionals: ["identifier"] },
    optimizeT: { aliases: ["actionStatusOfT"], positionals: ["identifier"] },
    undoT: { aliases: ["undo"], positionals: ["identifier"] },
  }

  // Use the envVars to build some initial permissions.
  Object.entries(ribsConfig).forEach(([ribName, ribConfig]) => {
    let { aliases, positionals } = ribConfig
    let commandPositionals = ""
    if (positionals && positionals.length) {
      commandPositionals = " " + positionals.map(pos => `[${pos}]`).join(" ")
    }
    yargs.command({
      command: `${ribName}${commandPositionals}`,
      aliases: aliases,
      desc: `${aliases.join(" ")} a thing`,
      handler: argv =>
        boneUp(
          ribName,
          initializeT(argv, ribsConfig, envVars),
          { ...ribs, ...spine },
          db,
          flesh
        ),
    })
  })

  // Final chance to **yarg** some settings.
  yargs.demandCommand().help().argv
}) // end read and objectify file `.env`

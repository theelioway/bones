#!/usr/bin/env node
const path = require("path")
const db = require("../node-db/index")
const bones = require("../bones")
const flesh = require("../flesh")

const yargs = require("yargs")

yargs
  .scriptName("bones")
  .usage("$0 <rib> <mainEntityOfPage> [identifier] [listIdentifier]")
  .parserConfiguration({
    "short-option-groups": true,
    "camel-case-expansion": false,
    "dot-notation": true,
    "parse-numbers": true,
    "parse-positional-numbers": true,
    "boolean-negation": true,
    "deep-merge-config": false,
  })

let engage = {
  takeupT: ["create"],
  updateT: ["update", "patch"],
  readT: ["get"],
  deleteT: ["delete"],
  pingT: ["ping"],
}
Object.keys(engage).forEach(rib => {
  yargs.command({
    command: rib,
    aliases: engage[rib],
    desc: `engage > ${rib}`,
    builder: yargs => {},
    handler: argv => bones(rib, argv || {}, db, flesh),
  })
})

let list = {
  takeonT: ["createAndList"],
  listT: ["list"],
  listOfT: ["listType"],
  enlistT: ["add"],
  unlistT: ["remove"],
}
Object.keys(list).forEach(rib => {
  yargs.command({
    command: rib,
    aliases: list[rib],
    desc: `engage > list > ${rib}`,
    builder: yargs => {
      yargs.positional("engagedIdentifier", {
        type: "string",
        describe: "the engaged thing's id needed for list operations",
      })
    },
    handler: argv => bones(rib, argv, db, flesh),
  })
})

yargs.demandCommand().help().argv

// (process.argv.slice(2)).argv
// console.log({itall})

//
// commander
//   .version("1.0.0", "-v, --version")
//   .usage("[OPTIONS]...")
//   .arguments('<rib> <THINGTYPE> [identifier] [listIdentifier]')
//   // .option(
//   //   "-lT, --LISTTHINGTYPE <str>",
//   //   "The Type being listed.",
//   //   "Thing"
//   // )
//   .option('-a, --all <items>', 'A regular expression that matches all options', /.*/)
//   .parse(process.argv)
//   // .action(( ) => console.log({rib,mainEntityOfPage,identifier,listIdentifier, opts,command}))

// let [ rib,THINGTYPE,identifier,listIdentifier ] = commander.args
//
// console.log({ rib,THINGTYPE,identifier,listIdentifier }, commander.args, commander.opts(), process.argv)

// bones({
//   rib,THINGTYPE,identifier,listIdentifier,
// db: db,
// }, (payload) => {
//     console.log({ payload })
// })

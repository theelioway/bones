const { CamelCase } = require("../src/helpers")
const { accessSpecsMaker } = require("../ribs/inviteT")
const PERMITLEVELS = require("../src/permits")
const DAY = 1000 * 60 * 60 * 24

/** Make a Action object tuned to provide a UX button that can call an action
 * and then complete itself *can count it's operations - we can todoT with it!). */
const makeEndpointAction = () => {}

const initializeT = (argv, ribsConfig, envVars) => {
  let thing = { ...argv } || {}
  let { subjectOf } = envVars
  // give permission to access initially.
  thing.ItemList = {
    itemListElement: [
      accessSpecsMaker({
        identifier: "DANGER_LOCKMEDOWN",
        subjectOf: "",
        ActionAccessSpecification: {
          requiresSubscription: "*",
          expectsAcceptanceOf: "*",
        },
      }),
    ],
  }
  delete thing._
  delete thing.$0
  return thing
}

module.exports = initializeT

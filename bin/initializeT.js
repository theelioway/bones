const { CamelCase } = require("../src/helpers")
const PERMITLEVELS = require("../src/permits")
const DAY = 1000 * 60 * 60 * 24

/** Make a Action object tuned to provide a UX button that can call an action
 * and then complete itself *can count it's operations - we can todoT with it!). */
const makeEndpointAction = () => {}

const initializeT = (argv, ribsConfig, envVars) => {
  let thing = { ...argv } || {}
  let { subjectOf } = envVars
  // Defaults!
  thing.mainEntityOfPage = thing.mainEntityOfPage || "Thing"
  // For now, suggest the CamelCase version of the name.
  thing.additionalType = CamelCase(thing.identifier)
  // Every thing gets an item list.
  thing.ItemList = {}
  thing.ItemList.itemListElement = []
  // Everything gets its own permissions? Hmm... only when takeupT perhaps!
  delete thing._
  delete thing.$0
  return thing
}

module.exports = initializeT

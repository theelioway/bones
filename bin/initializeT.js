const PERMITLEVELS = require("../bones/permits")
const { camelCase } = require("../bones/helpers")

const DAY = 1000 * 60 * 60 * 24

const initializeT = (argv, ribs, envVars) => {
  let thing = { ...argv } || {}
  let { subjectOf } = envVars
  // Defaults!
  thing.mainEntityOfPage = thing.mainEntityOfPage || "Thing"
  thing.additionalType = camelCase(thing.identifier)
  thing.subjectOf = subjectOf
  thing.ItemList = {}
  thing.ItemList.itemListElement = []
  // Object.entries(ribs).map(
  //   ([ribName, ribConfig]) =>
  //     new Object({
  //       identifier: ribName,
  //       mainEntityOfPage: "Permit",
  //       subjectOf: thing.identifier,
  //       Permit: {
  //         validUntil: new Date(Date.now() + DAY * 90),
  //         permitAudience: envVars[ribName],
  //       },
  //     })
  // )
  thing.permits = {
    enlistT: PERMITLEVELS.ANON,
    listT: PERMITLEVELS.ANON,
    listOfT: PERMITLEVELS.ANON,
    readT: PERMITLEVELS.ANON,
    schemaT: PERMITLEVELS.ANON,
    takeonT: PERMITLEVELS.ANON,
    takeupT: PERMITLEVELS.ANON, // Usually you'll allow people to takeupT.
    updateT: PERMITLEVELS.ANON,
    unlistT: PERMITLEVELS.ANON,
  }
  delete thing._
  delete thing.$0
  return thing
}

module.exports = initializeT

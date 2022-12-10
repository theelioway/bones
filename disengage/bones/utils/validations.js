module.exports = {
  thingIsTypeT: (body, thingType) => {
    // Checks whether the endpoint matches the package engage, e.g.
    // POST to /Place has Place data in the `engage` property.
    return body.hasOwnProperty(thingType)
    // if (body.hasOwnProperty(thingType)) {
    //   return Object.keys(body.engage).includes(thingType)
    // } else {
    //   // If no `engage` property, allow any type.
    //   return true
    // }
  },
}

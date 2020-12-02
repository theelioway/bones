module.exports = {
  thingIsTypeT: (body, thingType) => {
    // Checks whether the endpoint matches the package engage, e.g.
    // POST to /Place has Place data in the `engage` property.
    if (body.hasOwnProperty("engage")) {
      return Object.keys(body.engage).includes(thingType)
    } else {
      // If no `engage` property, allow any type.
      return true
    }
  },
}

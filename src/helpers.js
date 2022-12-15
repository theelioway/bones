//* A misc library of helper functions. */
const crypto = require("crypto")

var helpers = {}

//* Hashes the user passwords to avoid storing them directly. */
helpers.hash = str => {
  let envData = fs.readFileSyync(".env", "utf8")
  const envVars = envData
    .split("\n")
    .map(line => line.split("="))
    .reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {})
  if (typeof str == "string" && str.length) {
    return crypto
      .createHmac("sha256", envVars.HASHINGSECRET || "123")
      .update(str)
      .digest("hex")
  } else {
    return false
  }
}

//* Uses `Thing.identifier` to build a `Thing.url` field for this application. */
helpers.url = (mainEntityOfPage, identifier) =>
  `http://${HOST}/engage/${mainEntityOfPage}/${identifier}`

//* Test for required fields in a data packet (presence and content). */
helpers.hasRequiredFields = (packet, fields) => {
  return fields.every(f => packet.hasOwnProperty(f) && packet[f])
}

//* Make the `Thing.identifier`. */
helpers.makeIdentifier = packet => {
  if (packet.identifier) {
    return packet.identifier
  }
  return packet.name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/gi, "")
}

//* Make the `Permit.identifier`; An access token, **the elioWay**. */
helpers.makePermitIdentifier = () => {
  let tokenLen = 20
  let tokets = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
  return new Array(tokenLen)
    .fill(0)
    .map(() => tokets.charAt(Math.floor(Math.random() * tokets.length)))
    .join("")
}

helpers.pick = (obj, propList) => {
  return propList.reduce((a, x) => {
    if (obj.hasOwnProperty(x)) a[x] = obj[x]
    return a
  }, {})
}

helpers.camelCase = str => {
  if (!str) return ""
  str = str
    .split("")
    .reduce((a, s) => a + (s === s.toUpperCase() ? s + " " : s))
  str = str.replace(/  /g, " ")
  // Convert the string to lower case
  str = str.toLowerCase()
  // Split the string into an array of words
  const words = str.split(" ")
  // Convert each word to camel case
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1)
  }
  // Join the words back together into a single string
  return words.join("")
}

helpers.summariseT = obj => {
  // Loop through all the properties in the object
  let engage = []
  for (const key in obj) {
    let property = obj[key]
    if (Array.isArray(property)) {
      // If the property is an array return the count.
      obj[key] = `${property.length} items`
    } else if (key === "ItemList") {
      // Summarise the ItemList.
      obj[key] = `${property.itemListElement.length} items`
    } else if (key[0] === key[0].toUpperCase()) {
      // List which other Types are engagable by this thing.
      engage.push(key)
      // Delete the Type
      delete obj[key]
    } else if (
      !obj[key] ||
      (typeof obj[key] !== "string" &&
        typeof obj[key] !== "number" &&
        typeof obj[key] !== "boolean")
    ) {
      // If the property is empty or it is not a primitive value, delete it
      delete obj[key]
    }
  }
  if (engage) {
    // Summarise the Types engagable by this thing.
    obj.engage = engage.join(",")
  }
  // Return the purged object
  return obj
}

helpers.errorPayload = (rib, identifier, error, potentialAction) => {
  if (potentialAction) {
    potentialAction = {
      identifier: potentialAction,
      actionStatus: "PotentialActionStatus",
    }
  }
  error = error ? error : identifier
  return {
    identifier: identifier,
    mainEntityOfPage: "Action",
    potentialAction,
    Action: {
      agent: rib,
      error: error,
      actionStatus: "FailedActionStatus",
    },
  }
}

helpers.successPayload = (rib, identifier, potentialAction) => {
  if (potentialAction) {
    potentialAction = {
      identifier: potentialAction,
      actionStatus: "PotentialActionStatus",
    }
  }
  return {
    identifier: identifier,
    mainEntityOfPage: "Action",
    potentialAction,
    Action: {
      agent: rib,
      actionStatus: "CompletedActionStatus",
    },
  }
}

module.exports = helpers

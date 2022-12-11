//* A misc library of helper functions. */
const crypto = require("crypto")

let { HASHINGSECRET, HOST } = process.env

var helpers = {}

//* Hashes the user passwords to avoid storing them directly. */
helpers.hash = str => {
  if (typeof str == "string" && str.length) {
    return crypto.createHmac("sha256", HASHINGSECRET).update(str).digest("hex")
  } else {
    return false
  }
}

//* Light wrapper and error protection for `JSON.parse`. */
helpers.parseJsonToObject = str => {
  try {
    return JSON.parse(str)
  } catch (err) {
    return {}
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

//* Make the `Permit.identifier`; An access token, the elioWay. */
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


helpers.camelCase = (str) => {
  if (!str) return ""
  str = str.split("").reduce((a, s) => a + (s === s.toUpperCase() ? s+" " : s))
  str = str.replace(/  /g, " ", )
  // Convert the string to lower case
  str = str.toLowerCase();
  // Split the string into an array of words
  const words = str.split(' ');
  // Convert each word to camel case
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  // Join the words back together into a single string
  return words.join('');
}

module.exports = helpers

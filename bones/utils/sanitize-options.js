/**
* @file Run your options through a sanitizor.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const sanitizeOptions = require("@elioway/mongoose-bones/utils/sanitize-options")
const sanitizeOptions = require("@elioway/mongoose-bones/utils/sanitize-options")
let sanitizedOptions = sanitizeOptions(req.query)
* ============================================================================ *
* @param {Object} queryString object being tested.
* @param {Function} sanitizer with keyed sanitizor functions.
*/
const settings = require("../settings")

module.exports = queryString => {
  let sanitized = Object.create(queryString)
  for (let [queryName, queryFunction] of Object.entries(settings.sanitizers)) {
    sanitized = queryFunction(sanitized)
  }
  return sanitized
}

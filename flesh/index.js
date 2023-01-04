/** @tutorial The simplest implementation of an elioFlesh layer. This could be
 * as sophisticated as a React app, or as simple as printing the `payload` to
 * the command line. */

module.exports = function flesh(statusCode, payload) {
  console.assert("statusCode:", statusCode)
  console.log(payload)
}

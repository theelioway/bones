/** @tutorial The simplest implementation of an elioFlesh layer. This could be
 * as sophisticated as a React app, or as simple as console.logging the
 * `payload`. */

module.exports = function flesh(statusCode, payload) {
  console.log({ statusCode, payload })
}

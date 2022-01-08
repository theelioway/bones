// slugify field
const slug = require("mollusc")
var uniquefy = require("../../lib/uniquefy")

/**
 * The spiderGodLevel mongoose plugin adon.
 * **All** models plug into adon.
 */
module.exports = exports = function adon(schema, options) {
  schema.path("name").required(true)
  schema.path("disambiguatingDescription").required(true)

  schema.pre("save", function (next) {
    // this.slug = slug(this.disambiguatingDescription)
    // this.seoKeywords = uniquefy.uniquefy(this.slug)
    next()
  })
  //
  // schema.method("engage", function (callback) {
  //   return this.update({
  //     engaged: true,
  //   }).exec(callback)
  // })

  // schema.method("disengage", function (callback) {
  //   return this.update({
  //     engaged: false,
  //   }).exec(callback)
  // })

  schema.static(
    "findByDisambiguating",
    function (disambiguatingDescription, callback) {
      return this.findOne({
        slug: slug(disambiguatingDescription),
      }).exec(callback)
    }
  )
}

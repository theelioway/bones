"use strict"
const slug = require("mollusc")
const keywordExtractor = require("keyword-extractor")

/**
 * Creates a unique set of alphatized words - without stop words.
 * @param {*string} slimy Any string, but prefers it pre-striped like a slug.
 */
module.exports = slimy => {
  // sorted and unslugged (if slug)
  var unslime = slug(slimy).split("-").sort().join(" ")
  // no stops words and uniq
  unslime = keywordExtractor.extract(unslime, {
    language: "english",
    remove_digits: false,
    return_changed_case: false,
    remove_duplicates: true,
  })
  // turn back to string
  return unslime.join(" ")
}

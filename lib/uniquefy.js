// Creates a unique set of alphatized words without stop words. Prefers a slug.
'use strict'

const slug = require('mollusc')
const keywordExtractor = require('keyword-extractor')

exports.uniquefy = function (slimy) {
  // sorted and unslugged
  var unslime = slug(slimy).split('-').sort().join(' ')
  // no stops words and uniq
  unslime = keywordExtractor.extract(unslime, {
    language: 'english',
    remove_digits: false,
    return_changed_case: false,
    remove_duplicates: true
  })
  // turn back to string
  return unslime.join(' ')
}

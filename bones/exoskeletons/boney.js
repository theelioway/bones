'use strict'
const utils = require('./utils')

var OfThing = function(meta, data) {
  return data.toObject()
}

var ListOfThings = function(meta, data) {
  let list = []
  for (let record in data) {
    list.push(
      OfThing(meta, data[record])
    )
  }
  return list
}

var MetaOfThing = function(meta) {
  return meta.Thing.schema.paths
}

var DeleteOfThing = function(meta, data) {
  return {msg: 'Thing successfully deleted'}
}

function AnatomyOf(method, req, res, mongooseCall) {
  let endoSkeleton = `@elioway/spider/endoskeletons/` + process.env['ENDOSKELETON'] + `/models`
  var schemaName = utils.singularPronoun(req.params.thing)
  var Thing = require(`${endoSkeleton}/${schemaName}`)
  var meta = {
    schemaName: schemaName,
    Thing: Thing,
  }
  mongooseCall(req, res, Thing, meta)
}

module.exports = {
  'outOf': OfThing,
  'listOutOf': ListOfThings,
  'metaOf': MetaOfThing,
  'deleteOf': DeleteOfThing,
  'anatomyOf': AnatomyOf,
}

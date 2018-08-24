'use strict'

// http://jsonapi.org/format/#status
// {
//   'data': {
//     'type': 'articles',
//     'id': '1',
//     'attributes': {
//       // ... this article's attributes
//     },
//     'relationships': {
//       // ... this article's relationships
//     }
//   }
// }

function isDict(v) {
    return typeof v==='object' && v!==null && !(v instanceof Array) && !(v instanceof Date);
}

function jsonApiExoSkeleton(thing, typeOfThing) {
  let newData = {}
  // console.log('jsonApiExoSkeleton:' + thing)
  newData['type'] = typeOfThing
  newData['id'] = thing['_id']
  newData['attributes'] = {}
  for (var key in thing) {
    if (
      key !== '_id' &&
      key !== '__v'
    ) {
      // console.log(key)
      newData['attributes'][key] = thing[key]
    }
  }
  return newData
}

var jsonApiOfThing = function(Thing, thing, typeOfThing) {
  return {
    'jsonapi': {
      'version': '1.0'
    },
    'data': jsonApiExoSkeleton(thing, typeOfThing),
    'meta': Thing.schema.paths
  }
}

var jsonApiListOfThings = function(Thing, thing, typeOfThing) {
  let list = []
  for (let record in thing) {
    list.push(
      jsonApiExoSkeleton(thing[record], typeOfThing)
    )
  }
  return {
    'jsonapi': {
      'version': '1.0'
    },
    'data': list,
    'meta': Thing.schema.paths
  }
}

var jsonApiMetaOfThing = function(Thing) {
  return {
    'jsonapi': {
      'version': '1.0'
    },
    'meta': Thing.schema.paths
  }
}

module.exports = {
  'outOf': jsonApiOfThing,
  'listOutOf': jsonApiListOfThings,
  'metaOf': jsonApiMetaOfThing,
  'deleteOf': jsonApiMetaOfThing
}

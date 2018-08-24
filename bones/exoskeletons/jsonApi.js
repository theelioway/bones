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

function jsonApiExoSkeleton(meta, data) {
  let newData = {}
  // console.log('jsonApiExoSkeleton:' + data)
  newData['type'] = meta.schemaName
  newData['id'] = data['_id']
  newData['attributes'] = {}
  for (var key in data) {
    if (
      key !== '_id' &&
      key !== '__v'
    ) {
      // console.log(key)
      newData['attributes'][key] = data[key]
    }
  }
  return newData
}

var jsonApiOfThing = function(meta, data) {
  return {
    'jsonapi': {
      'version': '1.0'
    },
    'data': jsonApiExoSkeleton(meta, data),
    'meta': meta.Thing.schema.paths
  }
}

var jsonApiListOfThings = function(meta, data) {
  let list = []
  for (let record in data) {
    list.push(
      jsonApiExoSkeleton(meta, data[record])
    )
  }
  return {
    'jsonapi': {
      'version': '1.0'
    },
    'data': list,
    // 'meta': meta.Thing.schema.paths
  }
}

var jsonApiMetaOfThing = function(meta, data) {
  return {
    'jsonapi': {
      'version': '1.0'
    },
    'meta': meta.Thing.schema.paths
  }
}

module.exports = {
  'outOf': jsonApiOfThing,
  'listOutOf': jsonApiListOfThings,
  'metaOf': jsonApiMetaOfThing,
  'deleteOf': jsonApiMetaOfThing
}

'use strict'
let exoSkeletonPath = './exoskeletons/' + process.env['EXOSKELETON']
const exoSkeleton = require(exoSkeletonPath)

/**
 * GET schema route.
 */
exports.schema = function(req, res) {
  exoSkeleton.thenMongoose('GET', req, res, function(req, res, Thing, meta) {
    res.send(exoSkeleton.metaOf(meta))
  })
  // console.log('BONES: schema')
}

/**
 * GET all route.
 */
exports.list_all_things = function(req, res) {
  exoSkeleton.thenMongoose('GET', req, res, function(req, res, Thing, meta) {
    Thing.find(function(err, things) {
      if (err) {
        res.send({
          errors: [err]
        })
      } else {
        res.send(exoSkeleton.listOutOf(meta, things))
      }
    })
  })
  // console.log(`request: list_all_things type ${schemaName}`)
}

/**
 * GET by id route.
 */
exports.read_a_thing = function(req, res) {
  exoSkeleton.thenMongoose('GET', req, res, function(req, res, Thing, meta) {
    Thing.findById(req.params.thingId, function(err, thing) {
      if (err) {
        res.send({
          errors: [err]
        })
      } else {
        res.send(exoSkeleton.outOf(meta, thing))
      }
    })
  })
  // console.log('BONES: read_a_thing')
}

/**
 * POST route
 */
exports.create_a_thing = function(req, res) {
  exoSkeleton.thenMongoose('POST', req, res, function(req, res, Thing, meta) {
    let newThing = new Thing(exoSkeleton.acquire(req))
    newThing.save(function(err, thing) {
      if (err) {
        if (err.code === 11000) {
          return res.json({
            errors: ['A record with this alternative name already exists.'],
          })
        } else {
          res.send({
            errors: [err]
          })
        }
      } else {
        res.send(exoSkeleton.outOf(meta, thing))
      }
    })
  })
  // console.log('BONES: create_a_thing')
}

/**
 * PATCH route.
 */
exports.update_a_thing = function(req, res) {
  exoSkeleton.thenMongoose('PATCH', req, res, function(req, res, Thing, meta) {
    Thing.findOneAndUpdate({
      _id: req.params.thingId
    }, exoSkeleton.acquire(req), {
      new: true
    }, function(err, thing) {
      if (err) {
        res.send({
          errors: [err]
        })
      } else {
        res.send(exoSkeleton.outOf(meta, thing))
      }
    })
  })
  // console.log('BONES: update_a_thing')
}

/**
 * DELETE route.
 */
exports.delete_a_thing = function(req, res) {
  exoSkeleton.thenMongoose('DELETE', req, res, function(req, res, Thing, meta) {
    Thing.deleteOne({
      _id: req.params.thingId
    }, function(err, thing) {
      if (err) {
        res.send({
          errors: [err]
        })
      } else {
        res.send(exoSkeleton.deleteOf(meta, thing))
      }
    })
  })
  // console.log('BONES: delete_a_thing')
}

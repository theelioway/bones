// require('sinon')
// require('sinon-mongoose')
/*
// 'use strict'  // < Things it doesn't like without...
// importFresh('/home/tim/repo/dev/elio/elioData/bones/bones/app.js') < ...this
*/

require('dotenv').config()

const Thing = require('@elioway/spider/endoskeletons/TestVersion/models/Thing')

const chai = require('chai')
const chaiHttp = require('chai-http')
const importFresh = require('import-fresh')
const suites = require('./utils/mongoose_suite')
const should = chai.should()

chai.use(chaiHttp)

suites.moogooseTestSuite('bones.adon.boney', function() {
  describe('bones.routes.adon.boney', function() {
    describe('bones.controller.adon.boney', function() {

      beforeEach(function(done) {
        /*
        // Need these to ensure that our methods load the variables for
        // testing this skeleton.
        */
        process.env['ENDOSKELETON'] = "TestVersion"
        process.env['EXOSKELETON'] = "boney"
        /*
        // Need this otherwise it uses the cached one and doesn't use this
        // new env settings. Try of any method
        */
        importFresh('../bones/controller')
        /*
        // But you don't need to import this fresh because when controller
        // imports this, it does so because it is using the boney exoskeleton.
        // `importFresh('../bones/exoskeletons/boney')`  <-- don't need this
        */
        /*
        // Delete all records to ensure the same starting point.
        */
        Thing.remove({}, (err) => {
          should.not.exist(err)
          done()
        })
      })

      describe('/POST engage/:thing', function() {
        it('should ADD a Thing once', function(done) {
          var mockThing = {
            name: 'should ADD a Thing once',
            disambiguatingDescription: 'should ADD a Thing once'
          }
          var thing = new Thing(mockThing)
          // Need to have the tests as a callback function of the mongoose
          // method so that mongoose has a chance to deliver its payload before
          // you test whether the payload has been delivered because believe me,
          // it probably won't have been delivered if you just go ahead and
          // immediately use chai to make that request. See?
          thing.save(function() {
            chai.request(importFresh('../bones/app.js'))
              .post('/engage/Thing')
              .send(mockThing)
              .end(function(err, res) {
                should.not.exist(err)
                res.should.have.status(200)
                res.should.be.json
                res.body.errors.should.eql(['A record with this alternative name already exists.'])
                done()
              })
          })
        })
      })

    })
  })
})

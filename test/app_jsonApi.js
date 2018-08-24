// require('sinon')
// require('sinon-mongoose')

require('dotenv').config();

const Thing = require('@elioway/spider/endoskeletons/TestVersion/models/Thing')

const chai = require('chai')
const chaiHttp = require('chai-http')
const importFresh = require('import-fresh')
const suites = require('./utils/mongoose_suite')
const should = chai.should()

chai.use(chaiHttp)

suites.moogooseTestSuite('bones.app.jsonApi', function() {
  describe('bones.routes.jsonApi', function() {
    describe('bones.controller.jsonApi', function() {

      this.app = null

      beforeEach(function(done) {
        process.env['ENDOSKELETON'] = 'ThingOnAShoeString'
        process.env['EXOSKELETON'] = 'jsonApi'
        this.app = importFresh('../bones/app')
        console.log(process.env['EXOSKELETON'])
        Thing.remove({}, (err) => {
          should.not.exist(err)
          done()
        })
      })
      //
      // describe('/GET engage/:thing', function() {
      //   it('should GET no Things when there are no Things', function(done) {
      //     chai.request(this.app)
      //       .get('/engage/Thing')
      //       .end(function(err, res) {
      //         should.not.exist(err)
      //         res.should.have.status(200)
      //         res.body.data.should.be.an('array')
      //         let b = []
      //         b.should.be.an('array')
      //         b.length.should.be.eql(0)
      //         res.body.data.should.deep.equal(b)
      //         res.body.data.length.should.be.eql(0)
      //         res.body.meta.should.not.be.null
      //         done()
      //       })
      //   })
      // })
      //
      describe('/GET engage/:thing', function() {
        it('should GET many Things when there are many Things', function(done) {
          // hint - don't use the same thing mock for these tests which
          // can run sychronously causing unique issues.
          var manyThings = [{
              name: 'should GET many Things',
              disambiguatingDescription: 'should GET many Things'
            },
            {
              name: 'when there are many Things',
              disambiguatingDescription: 'when there are many Things'
            }
          ]
          Thing.create(manyThings)
          chai.request(this.app)
            .get('/engage/Thing/')
            .end(function(err, res) {
              should.not.exist(err)
              res.should.have.status(200)
              res.body.data.should.be.a('array')
              res.body.data.length.should.be.eql(2)
              res.body.meta.should.not.be.null
              done()
            })
        })
      })
      //
      // describe('/POST engage/:thing', function() {
      //   it('should ADD a Thing', function(done) {
      //     var mockThing = {
      //       name: 'should ADD a Thing',
      //       disambiguatingDescription: 'should ADD a Thing',
      //       alternateName: 'should ADD a Thing',
      //       description: 'should ADD a Thing'
      //     }
      //     chai.request(this.app)
      //       .post('/engage/Thing')
      //       .send(mockThing)
      //       .end(function(err, res) {
      //         should.not.exist(err)
      //         res.should.have.status(200)
      //         res.should.be.json
      //         res.body.data.id.should.not.be.null
      //         res.body.data.type.should.eql('Thing')
      //         res.body.data.attributes.name.should.eql(mockThing.name)
      //         res.body.data.attributes.disambiguatingDescription.should.eql(mockThing.disambiguatingDescription)
      //         res.body.meta.should.not.be.null
      //         done()
      //       })
      //   })
      // })
      //
      // describe('/GET engage/:thing/:id', function() {
      //   it('should GET a Thing', function(done) {
      //     // hint - don't use the same thing mock for these tests which
      //     // can run sychronously causing unique errors.
      //     var mockThing = {
      //       name: 'should GET a Thing',
      //       disambiguatingDescription: 'should GET a Thing'
      //     }
      //     var thing = new Thing(mockThing)
      //     thing.save()
      //     chai.request(this.app)
      //       .get(`/engage/Thing/${thing._id}`)
      //       .end(function(err, res) {
      //         should.not.exist(err)
      //         res.should.have.status(200)
      //         res.should.be.json
      //         res.body.data.id.should.not.be.null
      //         res.body.data.type.should.eql('Thing')
      //         res.body.data.attributes.name.should.eql(mockThing.name)
      //         res.body.data.attributes.disambiguatingDescription.should.eql(mockThing.disambiguatingDescription)
      //         res.body.meta.should.not.be.null
      //         done()
      //       })
      //   })
      // })
      //
      // describe('/PUT engage/:thing', function() {
      //   it('should UPDATE a Thing', function(done) {
      //     var mockThing = {
      //       name: 'should UPDATE a Thing',
      //       disambiguatingDescription: 'should UPDATE a Thing'
      //     }
      //     var thing = new Thing(mockThing)
      //     thing.save()
      //     var updateThing = {
      //       name: 'Thing should be UPDATED',
      //       disambiguatingDescription: 'Thing should be UPDATED'
      //     }
      //     chai.request(this.app)
      //       .put(`/engage/Thing/${thing._id}`)
      //       .send(updateThing)
      //       .end(function(err, res) {
      //         should.not.exist(err)
      //         res.should.have.status(200)
      //         res.should.be.json
      //         res.body.data.id.should.not.be.null
      //         res.body.data.type.should.eql('Thing')
      //         res.body.data.attributes.name.should.eql(updateThing.name)
      //         res.body.data.attributes.disambiguatingDescription.should.eql(updateThing.disambiguatingDescription)
      //         res.body.meta.should.not.be.null
      //         done()
      //       })
      //   })
      // })
      //
      // describe('/DELETE engage/:thing', function() {
      //   it('should DELETE a Thing', function(done) {
      //     var mockThing = {
      //       name: 'should DELETE a Thing',
      //       disambiguatingDescription: 'should DELETE a Thing'
      //     }
      //     var thing = new Thing(mockThing)
      //     thing.save()
      //     chai.request(this.app)
      //       .delete(`/engage/Thing/${thing._id}`)
      //       .end(function(err, res) {
      //         should.not.exist(err)
      //         res.should.have.status(200)
      //         res.should.be.json
      //         res.body.meta.should.not.be.null
      //         done()
      //       })
      //   })
      // })

    })
  })
})

// require('sinon')
// require('sinon-mongoose')

let Thing = require('@elioway/spider/schemas/TestVersion/models/Thing')

let chai = require('chai')
let chaiHttp = require('chai-http')
let app = require('../bones/app')
let suites = require('./utils/mongoose_suite')
let should = chai.should()

const mockRequire = require("mock-require");
const importFresh = require("import-fresh");

// set up config overrides
process.env.NODE_CONFIG = JSON.stringify({
  BONES: {
    endoskeleton: "TestVersion",
    exoskeleton: "default",
  }
});

const testConfig = importFresh("config");
expect(
  testConfig.get("BONES.exoskeleton"),
  "config value not set to 1"
).to.equal("default");

mockRequire("config", testConfig);

chai.use(chaiHttp)

suites.moogooseTestSuite('bones.default.app', function () {
  describe('bones.routes', function () {
    describe('bones.controller', function () {

      beforeEach(function (done) {
        Thing.remove({}, (err) => {
          should.not.exist(err)
          done()
        })
      })

      describe('/GET nonexistent-route/:thing', function () {
        it('should 404', function (done) {
          chai.request(app)
            .get('/nonexistent-route/Thing')
            .end(function (err, res) {
              should.not.exist(err)
              res.should.have.status(404)
              done()
            })
        })
      })

      describe('/GET engage/:thing', function () {
        it('should GET no Things when there are no Things', function (done) {
          chai.request(app)
            .get('/engage/Thing')
            .end(function (err, res) {
              should.not.exist(err)
              res.should.have.status(200)
              res.body.thing.should.be.an('array')
              let b = []
              b.should.be.an('array')
              b.length.should.be.eql(0)
              res.body.thing.should.deep.equal(b)
              res.body.thing.length.should.be.eql(0)
              done()
            })
        })
      })

      describe('/GET engage/:thing', function () {
        it('should GET many Things when there are many Things', function (done) {
          // hint - don't use the same thing mock for these tests which
          // can run sychronously causing unique issues.
          var manyThings = [{
            name: 'should GET many Things',
            disambiguatingDescription: 'should GET many Things'
          },
          {
            name: 'when there are many Things',
            disambiguatingDescription: 'when there are many Things'
          }]
          Thing.create(manyThings)
          chai.request(app)
            .get('/engage/Thing/')
            .end(function (err, res) {
              should.not.exist(err)
              res.should.have.status(200)
              res.body.thing.should.be.a('array')
              res.body.thing.length.should.be.eql(2)
              done()
            })
        })
      })

      describe('/POST engage/:thing', function () {
        it('should ADD a Thing', function (done) {
          var mockThing = {
            name: 'should ADD a Thing',
            disambiguatingDescription: 'should ADD a Thing',
            alternateName: 'should ADD a Thing',
            description: 'should ADD a Thing'
          }
          chai.request(app)
            .post('/engage/Thing')
            .send(mockThing)
            .end(function (err, res) {
              should.not.exist(err)
              res.should.have.status(200)
              res.should.be.json
              res.body.thing.name.should.eql(mockThing.name)
              res.body.thing.disambiguatingDescription.should.eql(mockThing.disambiguatingDescription)
              res.body.thing.alternateName.should.eql(mockThing.alternateName)
              res.body.thing.description.should.eql(mockThing.description)
              res.body.thing.slug.should.eql('should-add-a-thing')
              res.body.thing.seoKeywords.should.eql('add thing')
              res.body.thing.engaged.should.be.eql('false')
              res.body.thing._id.should.not.be.null
              done()
            })
        })
      })

      describe('/POST engage/:thing', function () {
        it('should ADD a Thing once', function (done) {
          var mockThing = {
            name: 'should ADD a Thing once',
            disambiguatingDescription: 'should ADD a Thing once'
          }
          var thing = new Thing(mockThing)
          thing.save()
          chai.request(app)
            .post('/engage/Thing')
            .send(mockThing)
            .end(function (err, res) {
              should.not.exist(err)
              res.should.have.status(200)
              res.should.be.json
              res.body.thing.should.eql('A record with this alternative name already exists.')
              done()
            })
        })
      })

      describe('/GET engage/:thing/:id', function () {
        it('should GET a Thing', function (done) {
          // hint - don't use the same thing mock for these tests which
          // can run sychronously causing unique errors.
          var mockThing = {
            name: 'should GET a Thing',
            disambiguatingDescription: 'should GET a Thing'
          }
          var thing = new Thing(mockThing)
          thing.save()
          chai.request(app)
            .get(`/engage/Thing/${thing._id}`)
            .end(function (err, res) {
              should.not.exist(err)
              res.should.have.status(200)
              res.should.be.json
              res.body.thing.name.should.eql(mockThing.name)
              res.body.thing.disambiguatingDescription.should.eql(mockThing.disambiguatingDescription)
              res.body.thing.slug.should.eql('should-get-a-thing')
              res.body.thing.seoKeywords.should.eql('thing')
              res.body.thing.engaged.should.be.eql('false')
              res.body.thing._id.should.not.be.null
              done()
            })
        })
      })

      describe('/PUT engage/:thing', function () {
        it('should UPDATE a Thing', function (done) {
          var mockThing = {
            name: 'should UPDATE a Thing',
            disambiguatingDescription: 'should UPDATE a Thing'
          }
          var thing = new Thing(mockThing)
          thing.save()
          var updateThing = {
            name: 'Thing should be UPDATED',
            disambiguatingDescription: 'Thing should be UPDATED'
          }
          chai.request(app)
            .put(`/engage/Thing/${thing._id}`)
            .send(updateThing)
            .end(function (err, res) {
              should.not.exist(err)
              res.should.have.status(200)
              res.should.be.json
              res.body.thing.name.should.eql(updateThing.name)
              res.body.thing.disambiguatingDescription.should.eql(updateThing.name)
              done()
            })
        })
      })

      describe('/DELETE engage/:thing', function () {
        it('should DELETE a Thing', function (done) {
          var mockThing = {
            name: 'should DELETE a Thing',
            disambiguatingDescription: 'should DELETE a Thing'
          }
          var thing = new Thing(mockThing)
          thing.save()
          chai.request(app)
            .delete(`/engage/Thing/${thing._id}`)
            .end(function (err, res) {
              should.not.exist(err)
              res.should.have.status(200)
              res.should.be.json
              res.body.thing.should.eql('Thing successfully deleted')
              done()
            })
        })
      })

    })
  })
})

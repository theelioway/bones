// require("sinon")
// require("sinon-mongoose")


let Thing = require("../../bones/models/thing");

let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../../bones/app");
var suites = require("../mongoose_suite");

let should = chai.should();


chai.use(chaiHttp);

suites.moogooseTestSuite("Thing Routes", function() {

  beforeEach(function(done) {
    Thing.remove({}, (err) => {
      done();
    });
  });

  describe("/GET nonexistent-route/thing", function() {
    it("should 404", function(done) {
      chai.request(app)
        .get("/nonexistent-route/thing")
        .end(function(err, res) {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe("/GET engage/thing", function() {
    it("should GET no Things when there are no Things", function(done) {
      chai.request(app)
        .get("/engage/thing")
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe("/POST engage/thing", function() {
    it("should ADD a Thing", function(done) {
      let thing1 = {
        name: "Thing 1",
        alternateName: "This is really Thing 1",
        description: "This describes Thing 1",
        disambiguatingDescription: "This disambiguates Thing 1",
        engaged: false
      }
      chai.request(app)
        .post("/engage/thing")
        .send(thing1)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.message.should.eql('Thing 1 created');
          res.body._id.should.not.be.null;
          done();
        });
    });
  });

  describe("/POST engage/thing", function() {
    it("should ADD a Thing once", function(done) {
      let thing1 = {
        name: "Thing 1",
        alternateName: "This is really Thing 1",
        description: "This describes Thing 1",
        disambiguatingDescription: "This disambiguates Thing 1",
        engaged: false
      }
      chai.request(app)
        .post("/engage/thing")
        .send(thing1)
        .end(function(err, res) {
          res.body.message.should.eql('Thing 1 created');
          res.body._id.should.not.be.null;
        })
      chai.request(app)
        .post("/engage/thing")
        .send(thing1)
        .end(function(err, res) {
          res.body.message.should.eql('A record with this alternative name already exists.');
        })
      chai.request(app)
        .get("/engage/thing")
        .end(function(err, res) {
          res.body.length.should.be.eql(1);
          done();
        });
    });
  });

  afterEach(function() {
    // runs after each test in this block
  });

});


// describe("Things", () => {
//   beforeEach((done) => {
//     Thing.remove({}, (err) => {
//       done();
//     });
//   });
//   /*
//    * Test the /GET route
//    */
//   describe("/GET thing", () => {
//     it("it should GET no things", (done) => {
//       chai.request(app)
//         .put("/user/me")
//         .send({ password: "123", confirmPassword: "123" })
//         .end(function (err, res) {
//            expect(err).to.be.null;
//            expect(res).to.have.status(200);
//         });
//       chai.request(app)
//         .get("/api/thing")
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a("array");
//           res.body.length.should.be.eql(0);
//           done();
//         });
//     });
//   });
/*
 * Test the /POST route
 */
// describe("/POST thing", () => {
//   it("it should not POST a thing without pages field", (done) => {
//     let thing = {
//       name: "This is Thing 1",
//       alternateName: "This is really Thing 1",
//       engaged: false
//     }
//     chai.request(server)
//       .post("/api/thing")
//       .send(thing)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a("object");
//         res.body.should.have.property("errors");
//         res.body.errors.should.have.property("pages");
//         res.body.errors.pages.should.have.property("kind").eql("required");
//         done();
//       });
//   });
// });
// });

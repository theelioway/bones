// require("sinon")
// require("sinon-mongoose")

let mongoose = require("mongoose");
let Thing = require("../../bones/models/thing");

let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../../bones/app");
let should = chai.should();

chai.use(chaiHttp);

describe("Thing Routes", function() {

  before(function(done) {
    mongoose.connect("mongodb://localhost:27017/elioTest", {
      useNewUrlParser: true
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error"));
    db.once("open", function() {
      done();
    });
  });

  beforeEach(function(done) {
    Thing.remove({}, (err) => {
      done();
    });
  });

  describe("/GET nofuckingway/thing", function() {
    it("should GET no Things when not engaged", function(done) {
      chai.request(app)
        .get("/nofuckingway/thing")
        .end(function(err, res) {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe("/GET engage/thing", function() {
    it("should GET no Things when there are no Things", function(done) {
      chai.request(app)
        .get("/engage/things")
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });


  afterEach(function() {
    // runs after each test in this block
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      mongoose.connection.close(done);
    });
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

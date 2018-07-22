// TestSuite to handle mongoose connect and disconnect.
//
// *** Usage ***
// // var suites = require("../mongoose_suite");
// // suites.moogooseTestSuite("Thing Routes", function() {
// //   describe("Need mongoose", function() {
// //     it("Tests against the test mongoose DB", function() {
// //       // stuff
// //     });
// //   });
// // }

let mongoose = require("mongoose");

exports.moogooseTestSuite = function(name, tests) {
  describe(name, function() {
    before(function(done) {
      mongoose.connect("mongodb://localhost:27017/elioTest", {
        useNewUrlParser: true
      });
      const db = mongoose.connection;
      db.on("error", console.error.bind(console, "connection error"));
      db.once("open", function() {
        done();
        console.log("Mongoose here");
      });
    });
    tests();
    after(function(done) {
      mongoose.connection.db.dropDatabase(function() {
        mongoose.connection.close(done);
        console.log("Mongoose gone");
      });
    });
  });
}

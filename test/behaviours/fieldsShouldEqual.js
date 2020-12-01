/**
* @file Test equality of properties in an object.
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const fieldsShouldEqual = require("./behaviours/fieldsShouldEqual")
it('update', done => {
  chai
    .request(app)
    .post(`/Thing/`)
    .send({ stuff: "you expected" })
    .set('Authorization', token)
    .end((err, res) => {
      fieldsShouldEqual(res.body, { stuff: "you expected" })
      done()
    })
})
* ============================================================================ *
* @param {Object} res object being tested.
* @param {Object} mockObj with the properties and values you expected.
*/
"use strict"
const should = require("chai").should()

module.exports = (body, expected) => {
  for (let [field, mockVal] of Object.entries(expected)) {
    if (typeof mockVal === "object") {
      for (let [engage, mockAdonVal] of Object.entries(mockVal)) {
        body[field][engage].should.be.eql(mockAdonVal)
      }
    } else {
      body[field].should.be.equal(mockVal)
    }
  }
}

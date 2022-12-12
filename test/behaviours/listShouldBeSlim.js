/**
* @file Test creation behaviour
* @author Tim Bushell
*
* @usage
* ============================================================================ *
const listShouldBeIds = require("./behaviours/listShouldBeSlim")
it('update', done => {
  let apprentices = [1, 2, 3].map(x => {
    return { name: `Apprentice ${x}`, thing: "Person" }
  })
  Thing.create(apprentices, (Err, list) => {
    Thing.create({
      name: "Wizard University",
      list: list.map(doc => doc._id)
    },
    (Err, university) => {
        chai
          .request(app)
          .get(`/Thing/${university._id}`)
          .set('Authorization', token)
          .end((Err, res) => {
            should.not.exist(Err)
            res.should.have.status(200)
            listShouldBeSlim(res.body.list)
            done()
          })
      })
  })
})
* ============================================================================ *
* @param {Array} list of documents to check
*/
"use strict"
const should = require("chai").should()

module.exports = list => {
  list[0].should.have.members(Object.values(options.slim))
}

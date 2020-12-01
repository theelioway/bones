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
  Thing.create(apprentices, (err, list) => {
    Thing.create({
      name: "Wizard University",
      list: list.map(doc => doc._id)
    },
    (err, university) => {
        chai
          .request(app)
          .get(`/Thing/${university._id}`)
          .set('Authorization', token)
          .end((err, res) => {
            should.not.exist(err)
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
  console.log(list)
  list[0].should.have.members(Object.values(options.slim))
}

const chai = require("chai")

const Thing = mongoose.models.Thing

const { ribT } = require("../ribs")
const fieldsShouldEqual = require("./behaviours/fieldsShouldEqual")

const { signupLogin } = require("./suites/signupLogin")
const { PermitLevels } = require("../src/permits")

const should = chai.should()

describe("bones | ribs | getT | GET /:engage/:_id", () => {
  it("returns 200 and gets a Thing", done => {
    signupLogin(
      { name: "Wizard", username: "tester", password: "letmein" },
      tokenBody => {
        let thing = {
          // Schema
          additionalType: "Thing",
          alternateName: "Student 1",
          description: "Apprentice 1 is a very smart student.",
          disambiguatingDescription: "This is Apprentice No.1",
          identifier: "a1",
          image: "avatar1.png",
          mainEntityOfPage: "Wizard University",
          name: "Apprentice 1",
          potentialAction: "Potions Class",
          sameAs: "Student",
          subjectOf: "Magic 101",
          url: "http://apprentice1.com",
          // god adon
          god: tokenBody._id,
          thing: "Person",
          created: new Date(Date.now()).toISOString(),
          createdBy: tokenBody._id,
          flag1: 1,
          // permits adon
          permits: { get: PermitLevels.GOD },
          // engage adon
          Person: {
            birthDate: new Date(2001, 1, 1).toISOString(),
            email: "apprentice1@eliomail.com",
          },
        }
        Thing.create(thing, (Err, apprentice) => {
          chai
            .request(app)
            .get(`/Person/${apprentice._id}`)
            .set("Authorization", tokenBody.token)
            .end((Err, res) => {
              should.not.exist(Err)
              res.should.have.status(200)
              fieldsShouldEqual(res.body, thing)
              done()
            })
        })
      }
    )
  })
})

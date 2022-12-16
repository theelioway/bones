const chai = require("chai")

//

const { ribT } = require("../ribs")
const fieldsShouldEqual = require("./behaviours/fieldsShouldEqual")

const { signupLogin } = require("./suites/signupLogin")
const { PermitLevels } = require("../src/permits")

const should = chai.should()

let Thing = mongoose.models.Thing

describe("bones | ribs | permitTo | updateT | PATCH /:Thing/:_id | ANON", () => {
  it.skip("gives permission to update Things when not authenticated", done => {
    Thing.create(
      {
        name: "Wizard's Apprentice",
        permits: { update: PermitLevels.ANON },
      },
      (Err, apprentice) => {
        chai
          .request(app)
          .patch(`/Thing/${apprentice._id}`)
          .send({ name: "Apprentice1" })
          .end((Err, res) => {
            should.not.exist(Err)
            res.should.have.status(206)
            fieldsShouldEqual(res.body, {
              actionStatus: "CompletedActionStatus",
              disambiguatingDescription: "Thing has been updated.",
              name: 206,
            })
            done()
          })
      }
    )
  })
})

describe("bones | ribs | permitTo | updateT | PATCH /:Thing/:_id | AUTH", () => {
  it("denies permission to update Things when not authenticated", done => {
    Thing.create(
      {
        name: "Wizard's Apprentice",
        permits: { update: PermitLevels.AUTH },
      },
      (Err, apprentice) => {
        chai
          .request(app)
          .patch(`/Thing/${apprentice._id}`)
          .send({ name: "Apprentice1" })
          .end((Err, res) => {
            should.not.exist(Err)
            res.should.have.status(401)
            res.text.should.equal("Unauthorized")
            done()
          })
      }
    )
  })

  it("gives permission to update Things when authenticated", done => {
    signupLogin(
      { name: "Wizard", username: "tester", password: "letmein" },
      tokenBody => {
        Thing.create(
          {
            name: "Wizard's Apprentice",
            permits: { update: PermitLevels.AUTH },
          },
          (Err, apprentice) => {
            chai
              .request(app)
              .patch(`/Thing/${apprentice._id}`)
              .send({ name: "Apprentice1" })
              .set("Authorization", tokenBody.token)
              .end((Err, res) => {
                should.not.exist(Err)
                res.should.have.status(206)
                fieldsShouldEqual(res.body, {
                  actionStatus: "CompletedActionStatus",
                  disambiguatingDescription: "Thing has been updated.",
                  name: 206,
                })
                done()
              })
          }
        )
      }
    )
  })
})

describe("bones | ribs | permitTo | updateT | PATCH /:Thing/:_id | LISTED", () => {
  it("denies permission to update if authenticated is not in Thing's list", done => {
    signupLogin(
      { name: "Wizard", username: "tester", password: "letmein" },
      tokenBody => {
        Thing.create(
          {
            name: "Wizard's Apprentice",
            permits: { update: PermitLevels.LISTED },
          },
          (Err, apprentice) => {
            chai
              .request(app)
              .patch(`/Thing/${apprentice._id}`)
              .send({ name: "Apprentice1" })
              .set("Authorization", tokenBody.token)
              .end((Err, res) => {
                should.not.exist(Err)
                res.should.have.status(403)
                fieldsShouldEqual(res.body, {
                  actionStatus: "FailedActionStatus",
                  disambiguatingDescription: `You are not permitted to update this Thing.`,
                  error: "Forbidden",
                  name: 403,
                })
                done()
              })
          }
        )
      }
    )
  })

  it("gives permission to update if authenticated in Thing's list", done => {
    signupLogin(
      { name: "Wizard", username: "tester", password: "letmein" },
      tokenBody => {
        Thing.create(
          {
            name: "Wizard's Apprentice",
            list: [tokenBody._id],
            permits: { update: PermitLevels.LISTED },
          },
          (Err, apprentice) => {
            chai
              .request(app)
              .patch(`/Thing/${apprentice._id}`)
              .send({ name: "Apprentice1" })
              .set("Authorization", tokenBody.token)
              .end((Err, res) => {
                should.not.exist(Err)
                res.should.have.status(206)
                fieldsShouldEqual(res.body, {
                  actionStatus: "CompletedActionStatus",
                  disambiguatingDescription: "Thing has been updated.",
                  name: 206,
                })
                done()
              })
          }
        )
      }
    )
  })

  it("gives owner permission to update even if authenticated not in Thing's list", done => {
    signupLogin(
      { name: "Wizard", username: "tester", password: "letmein" },
      tokenBody => {
        Thing.create(
          {
            name: "Wizard's Apprentice",
            god: tokenBody._id,
            permits: { update: PermitLevels.LISTED },
          },
          (Err, apprentice) => {
            chai
              .request(app)
              .patch(`/Thing/${apprentice._id}`)
              .send({ name: "Apprentice1" })
              .set("Authorization", tokenBody.token)
              .end((Err, res) => {
                should.not.exist(Err)
                res.should.have.status(206)
                fieldsShouldEqual(res.body, {
                  actionStatus: "CompletedActionStatus",
                  disambiguatingDescription: "Thing has been updated.",
                  name: 206,
                })
                done()
              })
          }
        )
      }
    )
  })
})

describe("bones | ribs | permitTo | updateT | PATCH /:Thing/:_id | GOD", () => {
  it("denies permission to update Things not owned by authenticated", done => {
    signupLogin(
      { name: "Wizard", username: "tester", password: "letmein" },
      tokenBody => {
        Thing.create(
          {
            name: "Wizard's Apprentice",
            permits: { update: PermitLevels.GOD },
          },
          (Err, apprentice) => {
            chai
              .request(app)
              .patch(`/Thing/${apprentice._id}`)
              .send({ name: "Apprentice1" })
              .set("Authorization", tokenBody.token)
              .end((Err, res) => {
                should.not.exist(Err)
                res.should.have.status(403)
                fieldsShouldEqual(res.body, {
                  actionStatus: "FailedActionStatus",
                  disambiguatingDescription: `You are not permitted to update this Thing.`,
                  error: "Forbidden",
                  name: 403,
                })
                done()
              })
          }
        )
      }
    )
  })

  it("gives permission to update authenticated's Things", done => {
    signupLogin(
      { name: "Wizard", username: "tester", password: "letmein" },
      tokenBody => {
        Thing.create(
          {
            name: "Wizard's Apprentice",
            god: tokenBody._id,
            permits: { update: PermitLevels.GOD },
          },
          (Err, apprentice) => {
            chai
              .request(app)
              .patch(`/Thing/${apprentice._id}`)
              .send({ name: "Apprentice1" })
              .set("Authorization", tokenBody.token)
              .end((Err, res) => {
                should.not.exist(Err)
                res.should.have.status(206)
                fieldsShouldEqual(res.body, {
                  actionStatus: "CompletedActionStatus",
                  disambiguatingDescription: "Thing has been updated.",
                  name: 206,
                })
                done()
              })
          }
        )
      }
    )
  })
})

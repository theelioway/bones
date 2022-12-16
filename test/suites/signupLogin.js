const chai = require("chai")

const { ribT } = require("../../ribs")

const should = chai.should()

/**
* @file Sign Up, Log In then pass the token back into the "called-back" test.
* @author Tim Bushell
*
* @usage
* ========================================================================== *
const { signupLogin } = require("@elioway/mongoose-bones/test/suites/signupLogin")
describe("POST /Thing", () => {
  it("does something requiring an authenticated user", done => {
    signupLogin(
      { username: "god", password: "letmein" }),
      tokenBody => {
        chai
          .request(app)
          .post("/Thing")
          .send({ name: "Thing 20, bady", god: tokenBody._id })
          .set("Authorization", tokenBody.token)
          .end((Err, res) => {
            res.body.name.equals("Thing 20, bady")
            done()
          })
      }
  })
})
* ========================================================================== *
* @param {Object} credentials with username and password.
* @param {Function} testsCallBack being the context "inside" which test runs.
*/

const login = (credentials, testCallBack) => {
  chai
    .request(app)
    .post("/auth/login")
    .send(credentials)
    .end((Err, res) => {
      should.not.exist(Err)
      res.should.have.status(200)
      res.body.token.should.include("Bearer ")
      testCallBack(res.body)
    })
}

module.exports = {
  signupLogin: (credentials, testCallBack) => {
    chai
      .request(app)
      .post("/auth/Thing/signup")
      .send(credentials)
      .end((Err, res) => {
        login(credentials, testCallBack)
      })
  },
  login: login,
}

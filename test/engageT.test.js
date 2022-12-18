const should = require("chai").should()
const mockDb = require("./mockDB.js")
const mockRibs = require("./mockRibs.js")
const engageT = require("../spine/engageT")

const OK = true
const NOTOK = false

describe("engageT", () => {
  it("engageTs", () => {
    let spareRibs = new Object({ ...mockRibs, engageT: engageT })
    let mock = { identifier: "god", mainEntityOfPage: "Person" }
    let cb = (wasSuccessfullyEngaged, ifFailErrMessage, engagedData) => {
      wasSuccessfullyEngaged.should.equal(OK)
      ifFailErrMessage.should.equal("")
      engagedData.should.eql(mock)
    }
    spareRibs.engageT("testT", mock, spareRibs, mockDb, cb)
  })
  it("only engageTs with objects", () => {
    let spareRibs = new Object({ ...mockRibs, engageT: engageT })
    let mock = "object"
    let cb = (wasSuccessfullyEngaged, ifFailErrMessage, engagedData) => {
      wasSuccessfullyEngaged.should.equal(NOTOK)
      ifFailErrMessage.should.eql({
        Action: {
          actionStatus: "FailedActionStatus",
          agent: "engageT",
          error: "No `identifier` parameter was included in the data packet",
        },
        identifier: "Missing `identifier`",
        mainEntityOfPage: "Action",
        potentialAction: undefined,
      })
      should.not.exist(engagedData)
    }
    spareRibs.engageT("testT", mock, spareRibs, mockDb, cb)
  })
  it("only engageTs with identifier", () => {
    let spareRibs = new Object({ ...mockRibs, engageT: engageT })
    let mock = { mainEntityOfPage: "Person" }
    let cb = (wasSuccessfullyEngaged, ifFailErrMessage, engagedData) => {
      wasSuccessfullyEngaged.should.equal(NOTOK)
      ifFailErrMessage.should.eql({
        identifier: "Missing `identifier`",
        mainEntityOfPage: "Action",
        potentialAction: undefined,
        Action: {
          actionStatus: "FailedActionStatus",
          agent: "engageT",
          error: "No `identifier` parameter was included in the data packet",
        },
      })
      should.not.exist(engagedData)
    }
    spareRibs.engageT("testT", mock, spareRibs, mockDb, cb)
  })
})

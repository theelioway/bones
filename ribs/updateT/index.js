const { errorPayload, saveT } = require("../../src/helpers")
const { assign, merge } = require("lodash")

const OK = 202
const NOTOK = 400

const updateT = (packet, ribs, db, cb) => {
  console.assert("the Real updateT")
  const { authT } = ribs
  // OH WOW `authT` SHOULD MOVE TO THE CLIENT AND BE OPTIONALLY USED TO
  // WRAP EACH `rib`.
  authT("updateT", packet, ribs, db, (permitted, authError, engagedData) => {
    if (permitted && db.canStore(engagedData)) {
      saveT("updateT", merge(engagedData, packet), db, cb)
    } else {
      cb(NOTOK, authError)
    }
  })
}

module.exports = updateT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK

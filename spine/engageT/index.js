/** Take an identifier. Seek the record.
 * @usage
 * > let cb = (wasSuccessfullyEngaged, ifFailErrMessage, engagedData) => {
 * >   console.assert( wasSuccessfullyEngaged, ifFailErrMessage )
 *> }
 * > engageT(rib, packet, ribs, db, cb)
 */
const { errorPayload, cultify } = require("../../src/helpers")

const OK = true
const NOTOK = false

const engageT = (rib, packet, ribs, db, cb) => {
  // Turning this to `log` can add help for tests.
  console.count("the real engageT")
  let { identifier } = packet
  if (identifier) {
    db.read(packet, (readErr, engagedData) => {
      if (!readErr && db.canStore(engagedData)) {
        cb(OK, "", cultify(engagedData))
      } else {
        let failErrMessage = errorPayload(
          "engageT",
          `${identifier} Thing not found`,
          readErr
        )
        cb(NOTOK, failErrMessage)
      }
    })
  } else {
    let failErrMessage = errorPayload(
      "engageT",
      "Missing `identifier`",
      "No `identifier` parameter was included in the data packet"
    )
    cb(NOTOK, failErrMessage)
  }
}

module.exports = engageT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK

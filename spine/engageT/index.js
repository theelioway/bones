/** Take an identifier. Seek the record.
 * @usage
 * > let cb = (wasSuccessfullyEngaged, ifFailErrMessage, engagedData) => {
 * >   console.log({ wasSuccessfullyEngaged, ifFailErrMessage })
 *> }
 * > engageT(rib, packet, ribs, db, cb)
 */
const { errorPayload } = require("../../src/helpers")

const engageT = (rib, packet, ribs, db, cb) => {
  console.log("the real engageT")
  let { identifier } = packet
  if (identifier) {
    db.read(packet, (readErr, engagedData) => {
      if (!readErr && db.canExist(engagedData)) {
        cb(true, "", engagedData)
      } else {
        let failErrMessage = errorPayload(
          "engageT",
          `${identifier} Thing not found`,
          readErr
        )
        cb(false, failErrMessage)
      }
    })
  } else {
    let failErrMessage = errorPayload(
      "engageT",
      "Missing `identifier`",
      "No `identifier` parameter was included in the data packet"
    )
    cb(false, failErrMessage)
  }
}

module.exports = engageT

const { errorPayload, hash } = require("../../src/helpers")
const { assign, merge } = require("lodash")

const OK = 202
const NOTOK = 400

const updateT = (packet, ribs, db, cb) => {
  const { authT } = ribs
  // OH WOW `authT` SHOULD MOVE TO THE CLIENT AND BE OPTIONALLY USED TO
  // WRAP EACH `rib`.
  authT("updateT", packet, ribs, db, (permitted, authError, engagedData) => {
    if (permitted && db.canStore(engagedData)) {
      // @TODO: Write `trackT`: ultimate merge/update data... list changes... can undo!
      delete packet.ItemList.itemListElement /** @TODO probably best? */
      let normalLodashMerge = merge(engagedData, packet)
      db.update(normalLodashMerge, (updateErr, updatedThing) => {
        if (!updateErr) {
          cb(OK, updatedThing)
        } else {
          let { identifier } = packet
          cb(
            NOTOK,
            errorPayload(
              "updateT",
              `${identifier} Thing could not be updated`,
              updateErr
            )
          )
        }
      })
    } else {
      cb(NOTOK, authError)
    }
  })
}

module.exports = updateT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK

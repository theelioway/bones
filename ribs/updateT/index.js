const { errorPayload, hash } = require("../../src/helpers")
const { assign, merge } = require("lodash")

const STATUSCODE = 201

const updateT = (packet, ribs, db, cb) => {
  const { authT } = ribs
  // OH WOW `authT` SHOULD MOVE TO THE CLIENT AND BE OPTIONALLY USED TO
  // WRAP EACH `rib`.
  authT("updateT", packet, ribs, db, (permitted, authError, engagedData) => {
    if (permitted && db.canExist(engagedData)) {
      // @TODO: Write `trackT`: ultimate merge/update data... list changes... can undo!
      delete packet.ItemList.itemListElement /** @TODO probably best? */
      let normalLodashMerge = merge(engagedData, packet)
      db.update(normalLodashMerge, (updateErr, updatedThing) => {
        if (!updateErr) {
          cb(200, updatedThing)
        } else {
          let { identifier } = packet
          cb(
            500,
            errorPayload(
              "updateT",
              `${identifier} Thing could not be updated`,
              updateErr
            )
          )
        }
      })
    } else {
      cb(404, authError)
    }
  })
}

module.exports = updateT
exports = module.exports
exports.STATUSCODE = STATUSCODE

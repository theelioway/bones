const { errorPayload, hash } = require("../../src/helpers")

const updateT = (packet, ribs, db, cb) => {
  const { authT } = ribs
  authT("updateT", packet, ribs, db, (permitted, authError, engagedData) => {
    if (permitted && db.canExist(engagedData)) {
      // The ultimate merge/update data... probably need a whole layer here!
      let updatePacket = {
        ...engagedData,
        ...packet,
      }
      db.update(updatePacket, (updateErr, updatedThing) => {
        if (!updateErr) {
          delete updatedThing.password
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

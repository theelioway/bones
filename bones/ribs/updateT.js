const { errorPayload, hash } = require("../helpers")
const authT = require("../spine/authT")

const updateT = (packet, db, cb) => {
  authT(
    "updateT",
    { identifier: packet.identifier },
    db,
    (permitted, err, engagedData) => {
      if (permitted && engagedData) {
        // Rehash password if being changed.
        if (packet.password) {
          packet.password = hash(password)
        }
        // The ultimate merge/update data... probably need a whole layer here!
        let updatePacket = {
          ...engagedData,
          ...packet,
        }
        db.update(updatePacket, err => {
          if (!err) {
            delete updatePacket.password
            cb(200, updatePacket)
          } else {
            let { identifier } = packet
            cb(
              500,
              errorPayload(`${identifier} Thing could not be updated`, err)
            )
          }
        })
      } else {
        cb(404, errorPayload(err))
      }
    }
  )
}

module.exports = updateT

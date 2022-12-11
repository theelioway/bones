const { hash, hasRequiredFields, makeIdentifier, url } = require("../helpers")

const takeupT = (packet, db, cb) => {
  if (hasRequiredFields(packet, ["identifier"])) {
    let { identifier } = packet
    db.exists(packet, exists => {
      if (!exists) {
        if (packet.password) {
          packet.password = hash(packet.password.trim())
        }
        db.create(packet, (err, createPacket) => {
          if (!err) {
            delete createPacket.password
            cb(200, createPacket)
          } else {
            cb(500, {
              Error: `Could not create ${identifier} Thing.`,
              Reason: err,
            })
          }
        })
      } else {
        cb(400, { Error: `${identifier} Thing already exists. Please login.` })
      }
    })
  } else {
    cb(400, { Error: `Thing missing required fields.` })
  }
}

module.exports = takeupT

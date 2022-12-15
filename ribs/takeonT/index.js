const {
  errorPayload,
  hasRequiredFields,
  makeIdentifier,
} = require("../../src/helpers")
const { authT } = require("../../spine")
const enlistT = require("../enlistT")

const takeonT = (packet, db, cb) => {
  authT(
    "takeonT",
    { identifier: packet.subjectOf },
    db,
    (permitted, authError, engagedData) => {
      if (permitted && db.canExist(engagedData)) {
        if (hasRequiredFields(packet, ["identifier"])) {
          let { identifier } = packet
          db.exists(packet, (exists, existsErr) => {
            if (!exists) {
              db.create(
                {
                  ...packet,
                  subjectOf: engagedData.identifier,
                },
                (createErr, createPacket) => {
                  if (!createErr) {
                    enlistT(createPacket, db, cb)
                  } else {
                    cb(
                      500,
                      errorPayload(
                        "takeonT",
                        `Could not create ${identifier} Thing`,
                        createErr
                      )
                    )
                  }
                }
              )
            } else {
              enlistT(packet, db, cb)
            }
          })
        } else {
          cb(
            400,
            errorPayload(
              "takeonT",
              `${identifier} Thing is missing the required fields`
            )
          )
        }
      } else {
        cb(404, authError)
      }
    }
  )
}

module.exports = takeonT

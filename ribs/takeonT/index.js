const {
  bigUp,
  errorPayload,
  hasRequiredFields,
  makeIdentifier,
} = require("../../src/helpers")

const OK = 201
const NOTOK = 406

const takeonT = (packet, ribs, db, cb) => {
  const { authT, enlistT } = ribs
  authT(
    "takeonT",
    { identifier: packet.subjectOf },
    ribs,
    db,
    (permitted, authError, engagedData) => {
      if (permitted && db.canStore(engagedData)) {
        if (hasRequiredFields(packet, ["identifier"])) {
          let { identifier } = packet
          db.exists(packet, (exists, existsErr) => {
            if (!exists) {
              let createPacket = {
                ...bigUp(packet),
                subjectOf: engagedData.identifier,
              }
              db.create(createPacket, (createErr, createdPacket) => {
                if (!createErr) {
                  enlistT(
                    createdPacket,
                    ribs,
                    db,
                    (enlistStatusCode, enlistedPacket) => {
                      cb(OK, enlistedPacket)
                    }
                  )
                } else {
                  cb(
                    NOTOK,
                    errorPayload(
                      "takeonT",
                      `Could not create ${identifier} Thing`,
                      createErr
                    )
                  )
                }
              })
            } else {
              enlistT(packet, ribs, db, (enlistStatusCode, enlistedMessage) => {
                cb(OK, {
                  ...enlistedMessage,
                  identifier: "takeonT_" + enlistedMessage.subjectOf,
                })
              })
            }
          })
        } else {
          cb(
            NOTOK,
            errorPayload(
              "takeonT",
              `${identifier} Thing is missing the required fields`
            )
          )
        }
      } else {
        cb(NOTOK, authError)
      }
    }
  )
}

module.exports = takeonT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK

const { successPayload, errorPayload, saveT } = require("../../src/helpers")

const OK = 302
const NOTOK = 304

const enlistT = (packet, ribs, db, cb) => {
  console.assert("the Real enlistT")
  const { authT, engageT } = ribs
  authT(
    "enlistT",
    { identifier: packet.subjectOf },
    ribs,
    db,
    (permitted, authError, engagedData) => {
      if (permitted && db.canStore(engagedData)) {
        let { identifier } = packet
        let engagedList = new Set(
          engagedData.ItemList.itemListElement.map(e => e.identifier) || []
        )
        if (!engagedList.has(identifier)) {
          engageT(
            "enlistT",
            packet,
            ribs,
            db,
            (exists, engageErr, engagedListItem) => {
              // It should exist, this is engaged object.
              if (exists) {
                engagedData.ItemList.itemListElement = [
                  ...engagedData.ItemList.itemListElement,
                  engagedListItem,
                ]

                saveT("enlistT", engagedData, db, cb, OK, NOTOK)
              } else {
                cb(
                  NOTOK,
                  errorPayload(
                    "enlistT",
                    `Could not find ${engagedData.identifier} Thing`,
                    engageErr,
                    "Record missing. Find it - or use `takeonT` instead"
                  )
                )
              }
            }
          )
        } else {
          cb(
            NOTOK,
            successPayload("enlistT", `${identifier} Thing already listed`)
          )
        }
      } else {
        cb(NOTOK, authError)
      }
    }
  )
}

module.exports = enlistT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK

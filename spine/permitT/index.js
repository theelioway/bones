const { errorPayload } = require("../../src/helpers")
const PERMITLEVELS = require("../../src/permits")

const isGOD = (engagedData, permitAudience) => {
  return (
    engagedData.identifier === permitAudience ||
    engagedData.subjectOf === permitAudience
  )
}

const isLISTED = (engagedData, permitAudience) => {
  return (
    engagedData.ItemList &&
    engagedData.ItemList.itemListElement &&
    engagedData.ItemList.itemListElement
      .map(i => i.indentifier)
      .includes(permitAudience)
  )
}

/** @TODO Add permits to your list for the ribs. You will give Permission by
 * creating a special Permit and assigning it to a Person.  */
const permitT = (rib, packet, ribs, db, engagedData, cb) => {
  let { identifier, mainEntityOfPage } = packet
  // Route auth/destroy token (aka `signoutT`) should always be level GOD.
  let permittedLevel = PERMITLEVELS.GOD
  // Permits active? Else leave at default "GOD"
  if (engagedData.hasOwnProperty("permits")) {
    // Get the permittedLevel
    permittedLevel = engagedData.permits[rib]
    if (typeof permittedLevel == "object") {
      // Permission may be specific to ThingType.
      if (permittedLevel.hasOwnProperty(mainEntityOfPage)) {
        permittedLevel = permittedLevel[mainEntityOfPage]
      } else {
        // No mainEntityOfPage or not covered by PERMITS, resort to default.
        permittedLevel = PERMITLEVELS.GOD
      }
    } else if (!permittedLevel) {
      permittedLevel = PERMITLEVELS.GOD
    }
  }
  // Does the client have a token?
  // engagedData.permit?
  let permit = engagedData.permit
  if (permit) {
    // Examine the token.
    db.read(permit, (readErr, tokenData) => {
      if (!readErr && db.canExist(tokenData)) {
        let { permitAudience, validUntil } = tokenData.Permit
        // Check token is still valid.
        if (validUntil > Date.now()) {
          // Check permission level + relationship of token owner to Engaged Thing:
          // - token owner is GOD to Engaged Thing OR
          // - token owner is LISTED in Engaged Thing OR
          // - token proves authenticated owner.
          if (
            isGOD(engagedData, permitAudience) ||
            (isLISTED(engagedData, permitAudience) &&
              PERMITLEVELS.LISTED === permittedLevel) ||
            PERMITLEVELS.AUTH === permittedLevel
          ) {
            cb(true)
          } else {
            cb(
              false,
              errorPayload(
                "permitT",
                "Level denied",
                `Permission denied. ${permittedLevel} level required`,
                "Seek permission from owner"
              )
            )
          }
        } else {
          cb(false, errorPayload("permitT", "Permit not valid"))
        }
      } else {
        cb(false, errorPayload("permitT", "Permit not found", readErr))
      }
    })
  } else {
    if (permittedLevel === PERMITLEVELS.ANON) {
      // then Token is not required to perform this action...
      // AKA... allow anonymous client access.
      cb(true)
    } else {
      cb(
        false,
        errorPayload("permitT", "No `permitIdentifier` and no anonymous access")
      )
    }
  }
}

module.exports = permitT

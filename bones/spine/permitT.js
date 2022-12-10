const PERMITLEVELS = require("../permits")

const isGOD = (engagedData, permitAudience) => {
  /** @TODO APP.god? */
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

const permitT = (rib, packet, db, engagedData, cb) => {
  let { identifier, mainEntityOfPage, permit } = packet
  // Route auth/delete token (aka `signoutT`) should always be level GOD.
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
    }
  }
  // Does the client have a token?
  if (permit) {
    // Examine the token.
    db.read("Permit", permit, (err, tokenData) => {
      if (!err && tokenData) {
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
            cb(false, {
              Error: `Permission denied. ${permittedLevel} level required.`,
            })
          }
        } else {
          cb(false, { Error: "Permit not valid." })
        }
      } else {
        cb(false, { Error: "Permit not found." })
      }
    })
  } else {
    if (permittedLevel === PERMITLEVELS.ANON) {
      // then Token is not required to perform this action...
      // AKA... allow anonymous client access.
      cb(true)
    } else {
      cb(false, { Error: "No `permitIdentifier` and no anonymous access." })
    }
  }
}

module.exports = permitT

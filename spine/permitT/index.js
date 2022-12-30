const { errorPayload } = require("../../src/helpers")

const OK = true
const NOTOK = false

const permitT = (rib, engagedData, ribs, db, cb, packet) => {
  console.assert("the Real permitT")
  let { engageT } = ribs
  // Internal function to handle the cb, regardless of whether we are dealing
  // with the target object's permissions.
  const permitCheckT = govPermits => {
    // Get Permit which match the proffered Permit.
    let passing = [],
      blocking = []
    // Is a Permit being proferred.
    if (packet && packet.Permit) {
      let { Permit } = packet
      // Just a normal password situation?
      if (typeof Permit === "string") {
        passing = passing.concat(
          govPermits.filter(
            govP =>
              govP.Permit.issuedBy === engagedData.identifier &&
              govP.Permit.permitAudience === packet.Permit
          )
        )
      } else {
        // Permit was issued to user.
        passing = passing.concat(
          govPermits.filter(
            govP =>
              govP.Permit.issuedBy === packet.Permit.issuedBy &&
              govP.Permit.issuedThrough === packet.Permit.issuedThrough &&
              govP.Permit.permitAudience === packet.Permit.permitAudience
          )
        )
      }
      // Find any endpoints which are blocked.
      blocking = govPermits.filter(govP => {
        let { permitAudience, validFor } = govP.Permit
        let endpoints = validFor ? validFor.split(",") : []
        return (
          permitAudience === packet.identifier &&
          endpoints.some(eP => ["-" + rib, "-"].includes(eP))
        )
      })
    }
    passing = passing.concat(
      // Anon access allowed anyway.
      govPermits.filter(govP => govP.Permit.permitAudience === "*")
    )
    // Filter only Permits which are for this endpoint.
    passing = passing.filter(govP => {
      let { permitAudience, validFor } = govP.Permit
      let endpoints = validFor ? validFor.split(",") : []
      return endpoints.some(eP => [rib, "*"].includes(eP))
    })
    if (passing.length && !blocking.length) {
      cb(OK, "", engagedData)
    } else {
      cb(NOTOK, errorPayload("permitT", "Permission not granted"))
    }
  }
  // `Permit` endpoints are `Permit` (governance of elioWay)
  let engagedPermits = engagedData.ItemList.itemListElement.filter(
    thing => thing.mainEntityOfPage === "GovernmentPermit"
  )
  if (!engagedPermits.length) {
    // Get the any parent permissions then.
    engageT(
      rib,
      { identifier: engagedData.subjectOf },
      ribs,
      db,
      (statm, err, parentData) =>
        permitCheckT(
          parentData.ItemList.itemListElement.filter(
            thing => thing.mainEntityOfPage === "GovernmentPermit"
          )
        )
    )
  } else {
    permitCheckT(engagedPermits)
  }
}

module.exports = permitT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK

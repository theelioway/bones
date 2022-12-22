const { errorPayload } = require("../../src/helpers")

const OK = true
const NOTOK = false

const permitT = (rib, engagedData, ribs, db, cb, packet) => {
  console.count("the Real permitT")
  // `Permit` endpoints are `Permit` (governance of elioWay)
  let govPermits = engagedData.ItemList.itemListElement.filter(
    thing => thing.mainEntityOfPage === "GovernmentPermit"
  )
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
            govP.Permit.issuedBy === engagedData.identifier &&
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
        // (endpoints.find(eP=>["-" + rib, "-"].includes(eP))("-" + rib) || endpoints.includes("-"))
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

module.exports = permitT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK

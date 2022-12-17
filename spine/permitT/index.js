const { errorPayload } = require("../../src/helpers")

const permitT = (rib, packet, ribs, db, cb, permit) => {
  console.log("the real permitT")
  if (!Array.isArray(packet.ItemList?.itemListElement)) {
    packet.ItemList = { itemListElement: [] }
  }
  let actionAccessSpecifications = packet.ItemList.itemListElement
    // `Permit` endpoints are `ActionAccessSpecification`
    .filter(t => t.mainEntityOfPage === "ActionAccessSpecification")
    // Just those covering endpoints because that's all `permitT` covers.
    .filter(
      t =>
        t.ActionAccessSpecification &&
        t.ActionAccessSpecification.category === "endpointT"
    )

  let passingActionAccessSpecifications = actionAccessSpecifications
    // Permit was issued to user.
    .filter(
      t =>
        t.identifier === permit?.Permit?.issuedThrough ||
        !permit?.Permit.issuedThrough
    )
    // For this packet.
    .filter(
      t =>
        packet.identifier === permit?.Permit?.issuedBy ||
        !permit?.Permit.issuedBy
    )
    // Permits for this user.
    .filter(
      t =>
        t.ActionAccessSpecification.eligibleRegion ===
          permit?.Permit?.permitAudience ||
        t.ActionAccessSpecification.eligibleRegion === "*"
    )
    // Which are valid for this endpoint.
    .filter(t => {
      let endpoints = t.ItemList.itemListElement.map(i => i.identifier)
      return endpoints.includes(rib) || endpoints.includes("*")
    })
  let blockingActionAccessSpecifications = actionAccessSpecifications
    // Where blocked for this endpoint.
    .filter(
      t => t.ActionAccessSpecification.ineligibleRegion === permit?.identifier
    )
    // Which are valid for this endpoint.
    .filter(t => {
      let endpoints = t.ItemList.itemListElement.map(i => i.identifier)
      return endpoints.includes(rib) || endpoints.includes("*")
    })
  if (
    passingActionAccessSpecifications.length &&
    !blockingActionAccessSpecifications.length
  ) {
    cb(true, "", packet)
  } else {
    cb(false, errorPayload("permitT", "Permission not granted"))
  }
}

module.exports = permitT

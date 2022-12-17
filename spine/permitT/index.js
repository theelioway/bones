const { errorPayload } = require("../../src/helpers")

const permitT = (rib, packet, ribs, db, cb, permit) => {
  console.log("the real permitT")
  console.assert("packet", packet.ItemList.itemListElement, "permit", permit)
  // Get relevant things from list
  let actionAccessSpecifications = packet.ItemList.itemListElement
    // `Permit` endpoints are `ActionAccessSpecification`
    .filter(spec => spec.mainEntityOfPage === "ActionAccessSpecification")
    // Just those covering endpoints because that's all `permitT` covers.
    .filter(
      spec =>
        spec.ActionAccessSpecification &&
        spec.ActionAccessSpecification.category === "endpointT"
    )
  // Get passes which meet the Permit.
  // - Spec `identifier` === `Permit.issuedThrough`
  // - packet `identifier` === `Permit.issuedBy`
  // - ActionAccessSpecification.eligibleRegion === Permit?.permitAudience
  // - ActionAccessSpecification.ineligibleRegion !== Permit?.permitAudience
  let passingActionAccessSpecifications = actionAccessSpecifications
    // Permit was issued to user.
    .filter(
      spec =>
        spec.identifier === permit?.Permit?.issuedThrough ||
        !permit?.Permit.issuedThrough
    )
    // For this packet.
    .filter(
      spec =>
        packet.identifier === permit?.Permit?.issuedBy ||
        !permit?.Permit.issuedBy
    )
    // Permits for this user.
    .filter(
      spec =>
        spec.ActionAccessSpecification.eligibleRegion ===
          permit?.Permit?.permitAudience ||
        spec.ActionAccessSpecification.eligibleRegion === "*"
    )
    // Which are valid for this endpoint.
    .filter(spec => {
      let endpoints =
        spec.ActionAccessSpecification.requiresSubscription.split(",")
      return endpoints.includes(rib) || endpoints.includes("*")
    })
  // Get block which meet the Permit audience.
  let blockingActionAccessSpecifications = actionAccessSpecifications
    // Where blocked for this endpoint.
    .filter(
      spec =>
        spec.ActionAccessSpecification.ineligibleRegion === permit?.identifier
    )
    // Which are valid for this endpoint.
    .filter(spec => {
      // let endpoints = spec.ItemList.itemListElement.map(i => i.identifier)
      let endpoints =
        spec.ActionAccessSpecification.requiresSubscription.split(",")
      return endpoints.includes(rib) || endpoints.includes("*")
    })

  console.assert(
    "passingActionAccessSpecifications.length",
    passingActionAccessSpecifications.length,
    "blockingActionAccessSpecifications.length",
    blockingActionAccessSpecifications.length
  )
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

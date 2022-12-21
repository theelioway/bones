const { errorPayload } = require("../../src/helpers")

const OK = true
const NOTOK = false

const permitT = (rib, engagedData, ribs, db, cb, packet) => {
  console.count("the real permitT")
  // Get relevant things from list
  let actionAccessSpecifications = engagedData.ItemList.itemListElement
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
  // - engagedData `identifier` === `Permit.issuedBy`
  // - ActionAccessSpecification.eligibleRegion === Permit?.permitAudience
  // - ActionAccessSpecification.ineligibleRegion !== Permit?.permitAudience
  let passingActionAccessSpecifications = actionAccessSpecifications
    // Permit was issued to user.
    .filter(
      spec =>
        spec.identifier === packet?.Permit?.issuedThrough ||
        !packet?.Permit?.issuedThrough
    )
    // For this engagedData.
    .filter(
      spec =>
        engagedData.identifier === packet?.Permit?.issuedBy ||
        !packet?.Permit?.issuedBy
    )
    // Permits for this user.
    .filter(
      spec =>
        spec.ActionAccessSpecification.eligibleRegion ===
          packet?.Permit?.permitAudience ||
        spec.ActionAccessSpecification?.eligibleRegion === "*"
    )
    // Which are valid for this endpoint.
    .filter(spec => {
      let requiresSubscription = spec.ActionAccessSpecification?.requiresSubscription
      console.log(requiresSubscription)
      let endpoints = requiresSubscription ? requiresSubscription.split(",") : []
      return endpoints.includes(rib) || endpoints.includes("*")
    })
  // Get block which meet the Permit audience.
  let blockingActionAccessSpecifications = actionAccessSpecifications
    // Where blocked for this endpoint.
    .filter(
      spec =>
        spec.ActionAccessSpecification?.ineligibleRegion === packet?.identifier
    )
    // Which are valid for this endpoint.
    .filter(spec => {
      // let endpoints = spec.ItemList.itemListElement.map(i => i.identifier)
      let endpoints =
        spec.ActionAccessSpecification?.requiresSubscription.split(",")
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
    cb(OK, "", engagedData)
  } else {
    cb(NOTOK, errorPayload("permitT", "Permission not granted"))
  }
}

module.exports = permitT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK

const { errorPayload, makePermitIdentifier } = require("../../src/helpers")

// We need to make it clear this is okay because we're calling core ribs.
const { OK: TAKEONSTATUSOK } = require("../takeonT")
const { OK: TAKEUPSTATUSOK } = require("../takeupT")

const OK = 206
const NOTOK = 417

const permitMaker = (permitIdentifier, packet) => {
  return new Object({
    identifier: permitIdentifier,
    mainEntityOfPage: "Permit",
    subjectOf: packet.ActionAccessSpecification?.eligibleRegion,
    Permit: {
      issuedBy: packet.subjectOf,
      issuedThrough: packet.identifier,
      permitAudience: packet.ActionAccessSpecification?.eligibleRegion,
      validFor: "",
      validFrom:
        packet.ActionAccessSpecification?.availabilityStarts ||
        new Date(1970, 0, 1),
      validIn: "",
      validUntil:
        packet.ActionAccessSpecification?.availabilityEnds ||
        new Date(2040, 0, 1),
    },
  })
}
const accessSpecsMaker = packet => {
  return new Object({
    identifier: packet.identifier,
    mainEntityOfPage: "ActionAccessSpecification",
    subjectOf: packet.subjectOf,
    ItemList: { itemListElement: [] },
    ActionAccessSpecification: {
      availabilityEnds:
        packet.ActionAccessSpecification.availabilityEnds || "2040-01-01",
      availabilityStarts:
        packet.ActionAccessSpecification.availabilityStarts || "1970-01-01",
      category: "endpointT",
      eligibleRegion: packet.ActionAccessSpecification.eligibleRegion || "*",
      expectsAcceptanceOf: "Terms",
      ineligibleRegion: packet.ActionAccessSpecification.ineligibleRegion || "",
      requiresSubscription:
        packet.ActionAccessSpecification.requiresSubscription || "*",
    },
  })
}

const inviteT = (packet, ribs, db, cb) => {
  console.count("the real inviteT")
  let { takeonT, takeupT } = ribs
  let permitIdentifier = makePermitIdentifier()
  let eligibleRegion =
    packet.ActionAccessSpecification?.eligibleRegion || permitIdentifier
  let accessSpecs = accessSpecsMaker({
    ...packet,
    subjectOf: packet.identifier,
    identifier:
      packet.ActionAccessSpecification?.identifier || makePermitIdentifier(),
    ActionAccessSpecification: {
      ...packet.ActionAccessSpecification,
      eligibleRegion: eligibleRegion,
    },
  })
  takeonT(accessSpecs, ribs, db, (takeonCode, accessSpecsData) => {
    if (takeonCode === TAKEONSTATUSOK) {
      let permit = permitMaker(permitIdentifier, accessSpecsData)
      takeupT(permit, ribs, db, (takeupCode, takeupData) => {
        if (takeupCode === TAKEUPSTATUSOK) {
          cb(OK, permit)
        } else {
          cb(NOTOK, errorPayload("takeupT"))
        }
      })
    } else {
      cb(NOTOK, errorPayload("takeonT", "Permission not granted"))
    }
  })
}

module.exports = inviteT
exports = module.exports // re-assign exports to point it to the updated location.
exports.accessSpecsMaker = accessSpecsMaker // now you can use named export as usual
exports.permitMaker = permitMaker // now you can use named export as usual
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK

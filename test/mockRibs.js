const mockRibs = {}

// successPayload(
//   "destroyT",
//   `${identifier} Thing deleted`,
//   `unlist ${identifier}`
// )
mockRibs.destroyT = (packet, ribs, db, cb) => cb(200, packet)

mockRibs.enlistT = (packet, ribs, db, cb) => {
  delete packet.password
  cb(200, packet)
}
// listData.map(listedThing => summarizeT(listedThing))
mockRibs.listT = (listData, ribs, db, cb) => cb(200, listData)
// cb(200, {
//   // description: "Hello! Will you stay and be my friend?",
//   // mainEntityOfPage: "Action",
//   // Action: { actionStatus: "CompletedActionStatus" },
//   ...packet,
// })
mockRibs.pingT = (packet, ribs, db, cb) => cb(200, packet)
mockRibs.readT = (packet, ribs, db, cb) => {
  delete packet.password
  let { sameAs } = packet
  if (sameAs) {
    cb(200, packet[sameAs])
  } else {
    cb(200, packet)
  }
}
mockRibs.schemaT = (packet, ribs, db, cb) =>
  cb(200, { identifier: { type: "Text" } })
mockRibs.takeonT = (packet, ribs, db, cb) => ribs.enlistT(packet, ribs, db, cb)
mockRibs.takeupT = (packet, ribs, db, cb) => {
  delete packet.password
  cb(200, packet)
}
mockRibs.unlistT = (packet, ribs, db, cb) => cb(200, packet)
mockRibs.updateT = (packet, ribs, db, cb) => cb(200, packet)
mockRibs.inflateT = (packet, ribs, db, cb) => cb(200, packet)
mockRibs.optimizeT = (packet, ribs, db, cb) => cb(200, packet)
mockRibs.undoT = (packet, ribs, db, cb) => cb(200, packet)

module.exports = mockRibs

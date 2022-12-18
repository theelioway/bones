const OK = 103
const NOTOK = 406

const pingT = (packet, ribs, db, cb) => {
  cb(OK, {
    description: "Hello! Will you stay and be my friend?",
    mainEntityOfPage: "Action",
    Action: { actionStatus: "CompletedActionStatus" },
    ...packet,
  })
}

module.exports = pingT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK

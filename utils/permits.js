"use strict"

const PERMITLEVELS = {
  GOD: "GOD", // Owner of Thing can action this Thing
  LISTED: "LISTED", // Listed Things have Permission to action parent Thing
  AUTH: "AUTH", // Authenticated Things can action this Thing
  ANON: "ANON", // Anonymous Things can action this Thing
}

// Common
const Example = {
  takeupT: PERMITLEVELS.ANON, // Usually you'll allow people to takeupT.
  readT: PERMITLEVELS.ANON,
  updateT: PERMITLEVELS.GOD,
  destroyT: PERMITLEVELS.GOD,
  takeonT: PERMITLEVELS.AUTH,
  listT: PERMITLEVELS.ANON,
  enlistT: PERMITLEVELS.GOD,
  unlistT: PERMITLEVELS.GOD,
  schemaT: PERMITLEVELS.ANON,
}

module.exports = PERMITLEVELS

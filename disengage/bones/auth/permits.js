"use strict"

const PermitLevels = {
  GOD: "GOD", // Owner of Thing can action this Thing
  LISTED: "LISTED", // Listed Things have Permission to action parent Thing
  AUTH: "AUTH", // Authenticated Things can action this Thing
  ANON: "ANON", // Anonymous Things can action this Thing
}

const BasePermits = {
  get: PermitLevels.AUTH,
  create: PermitLevels.LISTED,
  update: PermitLevels.GOD,
  delete: PermitLevels.GOD,
}

const AnonPermits = {
  get: PermitLevels.ANON,
  create: PermitLevels.ANON,
  update: PermitLevels.ANON,
  delete: PermitLevels.ANON,
}

module.exports = {
  PermitLevels,
  BasePermits,
}

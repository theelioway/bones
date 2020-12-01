"use strict"
// "const jwtAuthGuard = require("./auth/jwtAuthGuard")
const unGuarded = require("./auth/unGuarded")
const { PermitLevels, BasePermits, AnonPermits } = require("./auth/permits")
const { MONGODB_URL, BONES, BONES_DEPTH, EXTRA_PRIMITIVE, SITE_ID } = process.env

module.exports = {
  guard: unGuarded,
  permits: AnonPermits,
  sanitizers: {
    comment: queryString => {
      queryString = queryString || {}
      queryString.comment =
        queryString.hasOwnProperty("comment") &&
        String(queryString.comment) !== "false"
      return queryString
    },
    depth: queryString => {
      queryString = queryString || {}
      queryString.depth = Number(queryString.depth) || 0
      return queryString
    },
  },
  bones: BONES.split(",").filter(b => b),
  depth: BONES_DEPTH || 0,
  extraPrimitive: EXTRA_PRIMITIVE.split(",").filter(b => b),
  mongoDbUrl: MONGODB_URL || "mongodb://127.0.0.1:27017/elioway",
  siteId: SITE_ID,
  slim: [
    // hooks
    // "additionalType",
    // "alternateName",
    // "description",
    "disambiguatingDescription",
    // "identifier",
    // "image",
    // "mainEntityOfPage",
    "name",
    // "potentialAction",
    // "sameAs",
    // "subjectOf",
    // "url",
    // "created",
    // "createdBy",
    // "god",
    // "thing",
    "_id",
  ],
}

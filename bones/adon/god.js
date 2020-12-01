"use strict"
const mongoose = require("mongoose")

module.exports = (schema, options) => {
  schema.add({
    god: { ref: "Thing", type: mongoose.ObjectId },
    thing: String,
    created: Date,
    createdBy: { ref: "Thing", type: mongoose.ObjectId },
    deleted: Date,
    deletedBy: { ref: "Thing", type: mongoose.ObjectId },
    isDeleted: Boolean,
    updated: Date,
    updatedBy: { ref: "Thing", type: mongoose.ObjectId },
    flag1: Number,
    flag2: Number,
    flag3: Number,
    username: { type: String, unique: true, sparse: true },
    password: { type: String },
  })

  //   schema.pre('save', function(next) {
  //   // do stuff
  //   next();
  // });
  // schema.pre("save", async function () {
  //   return await this.update({
  //     updated: Date.now(),
  //   })
  // })
  // schema.method('own', function (callback, owner) {
  //   return this.update({
  //     god: owner,
  //   }).exec(callback)
  // })
  //
  // schema.method('disown', function (callback, owner) {
  //   if (this.god === this.owner) {
  //     return this.update({
  //       god: null,
  //     }).exec(callback)
  //   }
  // })
  //
  // schema.method('delete', function (callback, user) {
  //   return this.update({ deleted: true, deletedBy: user._id }).exec(callback)
  // })
  //
  // schema.method('undelete', function (callback, user) {
  //   return this.update({ deleted: false, deletedBy: user._id }).exec(callback)
  // })
}

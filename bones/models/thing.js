"use strict";

const mongoose = require("mongoose");

mongoose.plugin(require("./adon"));

const schema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [127, "A 127 character or less name of the item."],
    required: [true, "The name is required."]
  },
  alternateName: {
    type: String,
    maxlength: [255, "A 255 character or less alias for the item."]
  },
  description: {
    type: String,
    required: [false, "A description of the item which not required."]
  },
  disambiguatingDescription: {
    type: String
  },
  engaged: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// schema.methods.findSimilarTypes = function(cb) {
//   return this.model('Animal').find({
//     type: this.type
//   }, cb);
// };

module.exports = mongoose.model("thing", schema);

// var dog = new thing({
//   type: 'dog'
// })
// dog.findSimilarTypes(function(err, dogs) {
//   console.log(dogs); // woof
// });

"use strict";

const mongoose = require("mongoose");

const {
  MONGODB_URL
} = process.env;

function dbconnect() {
  mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  return mongoose.connection;
}

function dbclose() {
  return mongoose.disconnect();
}

module.exports = {
  dbconnect,
  dbclose
};
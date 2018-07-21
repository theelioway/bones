"use strict";

// dependencies
const mongoose = require("mongoose");

// connect to the database
mongoose.connect("mongodb://localhost:27017/elioWay", {
  useNewUrlParser: true
});

let db = mongoose.connection;

// get notified if the connection was successful or not
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log(`Connected to the things database`);
});

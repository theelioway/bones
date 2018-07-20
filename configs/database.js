'use strict';

// dependencies
const mongoose = require('mongoose');

// get the database name
var env = process.env.NODE_ENV || 'development';
var config = require('./settings')[env];

// connect to the database
mongoose.connect(config.db, {
  useNewUrlParser: true
});

// get notified if the connection was successful or not
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`Connected to the things database`);
});

'use strict';

// dependencies
const mongoose = require('mongoose');

// get the database name
var env = process.env.NODE_ENV || 'development';
var config = require('./settings')[env];


let options = {
  useNewUrlParser: true,
  server: {
    socketOptions: {
      keepAlive: 1,
      connectTimeoutMS: 30000
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 1,
      connectTimeoutMS: 30000
    }
  }
};

// connect to the database
mongoose.connect(config.db, options);

// get notified if the connection was successful or not
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log(`Connected to the things database`);
// });

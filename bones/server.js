"use strict";

require("./database");

const app = require("./app")

// set the port
const port = parseInt(process.env.PORT, 10) || 3000;

// start the server
const server = app.listen(port, () => {
  console.log(`App is running at: http://localhost:${server.address().port}`);
});

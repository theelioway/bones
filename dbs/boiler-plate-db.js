/** @tutorial Use this as a base to provide a db service to your bones library.  */
const boilerPlateDB = require("boiler-plate-db")

const db = {}

db.log = msg => {} // console.error(msg)

//* Util to return the file system path. */
db.baseDir = path.join(__dirname, $DATADIR)

//* Util to build the mainEntityOfPage to a JSON record. */
db.makeFilePath = packet => {
  let { identifier } = packet
  return path.join(db.baseDir, `${identifier}.json`)
}

//* Light wrapper and error protection for `JSON.parse`. */
db.parseJsonToObject = str => {
  try {
    return JSON.parse(str)
  } catch (parseJsonToObjectErr) {
    return {}
  }
}

//* Util to determine if a JSON record already exists or not. */
db.exists = (packet, cb) => cb(boilerPlateDB.exists(packet))

//* Util to create a new record if not already exists. */
db.create = (packet, cb) => {
  boilerPlateDB
    .create(packet)
    .then(data => cb(false, helpers.parseJsonToObject(data)))
    .catch(createErr => {
      db.log("db.create", createErr)
      cb(createErr)
    })
}

/** Util to read a record if it exists. */
db.read = (packet, cb) => {
  let data = boilerPlateDB
    .get(packet)
    .then(data => cb(false, helpers.parseJsonToObject(data)))
    .catch(readErr => {
      db.log("db.read", readErr)
      cb(readErr, data)
    })
}

//* Util to list all JSON records belonging to an Engaged record's list. */
db.list = (things, cb) => {
  var promises = things.map(packet => {
    return new Promise((resolve, reject) => boilerPlateDB.get(packet))
  })
  Promise.all(promises)
    .then(results => {
      let list = results.filter(data => typeof data === "object")
      cb(false, list)
    })
    .catch(promisesErr => {
      db.log("db.list", promisesErr)
      cb("Could not `read` files for list. " + promisesErr, packet)
    })
}

//* Util to update a JSON record if it exists. */
db.update = (packet, cb) => {
  packet.ItemList.numberOfItems = packet.ItemList.itemListElement.length
  boilerPlateDB
    .set(packet)
    .then(data => cb(false, helpers.parseJsonToObject(packet)))
    .catch(updateErr => {
      db.log("db.update", updateErr)
      cb(updateErr, packet)
    })
}

//* Util to delete a JSON record if it exists. */
db.delete = (packet, cb) => {
  boilerPlateDB
    .delete(packet)
    .then(data => cb(false, helpers.parseJsonToObject(packet)))
    .catch(deleteErr => {
      db.log("db.delete", deleteErr)
      cb(deleteErr, packet)
    })
}

module.exports = db

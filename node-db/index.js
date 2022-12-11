//* A library to operate a file system database of JSON objects. */
const fs = require("fs")
const path = require("path")
const helpers = require("../bones/helpers")
const db = {}

//* Util to return the file system path. */
db.baseDir = path.join(__dirname, "/../.data")

//* Util to build the mainEntityOfPage to a JSON record. */
db.makeFilePath = packet => {
  let { identifier } = packet
  // const filePath = path.join(, mainEntityOfPage)
  if (!fs.existsSync(db.baseDir)) {
    fs.mkdirSync(db.baseDir, { recursive: true })
  }
  return path.join(db.baseDir, `${identifier}.json`)
}

//* Util to determine if a JSON record already exists or not. */
db.exists = (packet, cb) => {
  const filePath = db.makeFilePath(packet)
  fs.exists(filePath, cb)
}

//* Util to create a new JSON record if not already exists. */
db.create = (packet, cb) => {
  db.exists(packet, (exists, err) => {
    if (!exists && !err) {
      const filePath = db.makeFilePath(packet)
      fs.open(filePath, "wx", (err, fileRef) => {
        if (!err && fileRef) {
          let stringData = JSON.stringify(packet, null, "\t")
          fs.writeFile(fileRef, stringData, err => {
            if (!err) {
              fs.close(fileRef, err => {
                if (!err) {
                  cb(false)
                } else {
                  console.error("db.create", err)
                  cb("Could not `close` file for create.")
                }
              })
            } else {
              cb("Could not `writeFile` for create.")
            }
          })
        } else {
          console.error("db.create", err)
          cb("Could not `open` file for create.")
        }
      })
    } else {
      cb("File already `exists`.")
    }
  })
}

/** Util to read a JSON record if it exists.
 * @TODO Perhaps resolve multiaccess issue using lock field and Promise?
 */
db.read = (packet, cb) => {
  const filePath = db.makeFilePath(packet)
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (!err && data) {
      cb(false, helpers.parseJsonToObject(data))
    } else {
      console.error("db.read", err)
      cb(err, data)
    }
  })
}

//* Util to list all JSON records belonging to an Engaged record's list. */
db.list = (things, cb) => {
  var promises = things.map(packet => {
    return new Promise((resolve, reject) => {
      db.read(packet, (err, data) => {
        if (!err) {
          resolve(data)
        } else {
          reject(err)
        }
      })
    })
  })
  Promise.all(promises)
    .then(results => {
      let list = results.filter(data => typeof data === "object")
      cb(false, list)
    })
    .catch(err => {
      console.error("db.list", err)
      cb("Could not `read` files for list.")
    })
}

//* Util to update a JSON record if it exists. */
db.update = (packet, cb) => {
  const filePath = db.makeFilePath(packet)
  fs.open(filePath, "r+", (err, fileRef) => {
    if (!err && fileRef) {
      let stringData = JSON.stringify(packet, null, "\t")
      fs.ftruncate(fileRef, err => {
        if (!err) {
          fs.writeFile(fileRef, stringData, err => {
            if (!err) {
              fs.close(fileRef, err => {
                if (!err) {
                  cb(false, packet)
                } else {
                  console.error("db.update", err)
                  cb("Could not `close` file for update.")
                }
              })
            } else {
              cb("Could not `writeFile` for update.")
            }
          })
        } else {
          cb("Could not `truncate` file for update.")
        }
      })
    } else {
      console.error("db.update", err)
      cb("Could not `open` file for update.")
    }
  })
}

//* Util to delete a JSON record if it exists. */
db.delete = (packet, cb) => {
  const filePath = db.makeFilePath(packet)
  fs.unlink(filePath, err => {
    if (!err) {
      cb(false)
    } else {
      console.error(err)
      cb("Could not `delete` file.")
    }
  })
}

module.exports = db

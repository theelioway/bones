const fs = require("fs")
const path = require("path")

const inflateT = (packet, ribs, db, cb) => {
  const { authT, updateT } = ribs
  authT("inflateT", packet, ribs, db, (permitted, authError, engagedData) => {
    if (permitted && db.canExist(engagedData)) {
      fs.readdir(db.envVars.DATADIR, (err, files) => {
        // Map files to read promises.
        let proms = files.map(
          possibleListedPath =>
            new Promise((resolve, reject) => {
              let listedThingPath = path.join(possibleListedPath, "thing.json")
              fs.exists(listedThingPath, exists => {
                if (exists) {
                  fs.readFile(listedThingPath, (err, listedData) => {
                    resolve(JSON.parse(listedData))
                  })
                } else {
                  reject()
                }
              })
            })
        )
        // Promise reads.
        Promise.allSettled(proms)
          .then(listedThings => {
            // Append if not listed.
            listedThings
              .filter(p => p.status === "fulfilled")
              .map(p => p.value)
              .forEach(listedThing => {
                if (
                  !engagedData.ItemList.itemListElement
                    .map(t => t.identifier)
                    .includes(listedThing.identifier)
                ) {
                  engagedData.ItemList.itemListElement.push(listedThing)
                }
              })
            // Rewrite.
            updateT(engagedThingPath, db, () => readT(200, db, db))
          })
          .catch(err => console.assert(!err, err)) // promises
      }) // read dir
    } else {
      cb(404, authError)
    }
  }) // authT
}

module.exports = inflateT

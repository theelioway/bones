const fs = require("fs")
const path = require("path")
const { summarizeT } = require("../../src/helpers")

const OK = 201
const NOTOK = 417

/**
let exampleSiteShape = {
  mainEntityOfPage: Restaurent,
  ItemList: { itemListElement: [
    {
      mainEntityOfPage: Menu,
      ItemList: { itemListElement: [
        {
          mainEntityOfPage: MenuItem,
          ItemList: { numberOfItems: 10 }
        }
      ]}
    },
    {
      mainEntityOfPage: Person,
      ItemList: { numberOfItems: 10}
    },
    {
      mainEntityOfPage: Review,
      ItemList: { numberOfItems: 30}
    }
  ]}
}
The data will be checked against the `exampleSiteShape`
*/

const optimizeT = (packet, ribs, db, cb) => {
  const { authT, listT } = ribs
  authT("optimizeT", packet, ribs, db, (permitted, authError, engagedData) => {
    if (permitted && db.canStore(engagedData)) {
      let { identifier, name } = packet
      let reportOnStatusList = engagedData.ItemList.itemListElement.reduce(
        (acc, thing) => {
          let actionStatus =
            thing.Action?.actionStatus || "PotentialActionStatus"
          let findActionStatusReport = acc.ItemList.itemListElement.find(
            t => t.Action?.actionStatus === thing.Action?.actionStatus
          )
          if (findActionStatusReport) {
            findActionStatusReport.CreativeWork.interactionStatistic += 1
          } else {
            acc.ItemList.itemListElement.push({
              identifier: actionStatus,
              mainEntityOfPage: "CreativeWork",
              CreativeWork: { interactionStatistic: 0 },
            })
          }
          return acc
        },
        { identifier, name, ItemList: { itemListElement: [] } }
      )
      cb(OK, reportOnStatusList.ItemList.itemListElement)
    } else {
      cb(NOTOK, authError)
    }
  }) // engage
}

module.exports = optimizeT
exports = module.exports
exports.OK = OK
exports.NOTOK = NOTOK

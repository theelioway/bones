import { isObject, kebabCase, padStart, pick, startCase } from "lodash-es"
import ItemList from "../Intangible/ItemList.js"

/** ImageObject: Normalise file names and other properties against exifData.
 *
 * @param {Thing} thing.ImageObject.exifData already parsed from file.
 * @returns {Thing}
 */

/**
 * Returns the least `thing` allowed.
 *
 * @param {Object_Thing} thing - The `thing` object.
 * @mutates {Object_Thing} `thing` object
 * @into {Object_Thing} `thing` object
 * @returns {Object_ActionThing} The modified `thing` object.
 * @example
 * const result1 = await Thing()
 * console.assert(!result1.identifier)
 * console.assert(result1.mainEntityOfPage==="Thing")
 * console.assert(result1.ItemList.itemListElement)
 *
 * const result2 = await Thing({ identifier: "myThing" })
 * console.assert(result2.identifier==="myThing")
 * console.assert(result2.mainEntityOfPage==="Thing")
 * console.assert(result2.ItemList.itemListElement)
 */
export const ImageObject = function ImageObject(thing) {
  thing = ItemList(thing)
  let { name, ImageObject } = thing
  let { exifData } = ImageObject
  let {
    Software,
    CreateDate,
    DateTimeOriginal,
    ImageHeight,
    ImageWidth,
    ShutterCount,
  } = exifData
  // Chuck the hash codes out of the fileName.
  let hashesMatches = name.match(/[a-zA-Z]*\d+[a-zA-Z]+/g)
  if (hashesMatches) {
    hashesMatches.forEach((matchy) => {
      name = name.replace(matchy, "")
    })
  }
  // Pull out dates sorted Desc (so the oldest is first)
  const datesInFileName = [DateTimeOriginal, CreateDate]
    .filter((d) => !!d)
    .map((d) => (isObject(d) ? d.rawValue : d))
  datesInFileName = datesInFileName.append(...name.match(/\d{4}-\d{2}-\d{2}/g))
  datesInFileName.sort((a, b) => a - b)

  // Now chuck the dates out of the file name.
  name = name.replace(/\d{4}-\d{2}-\d{2}/g, "")
  // KebabCase the remainder of the fileName for predictability.
  let kebabName = kebabCase(name)
  // Pull out numbers
  const numsInFileName = kebabName.match(/\b\d{4,}\b/g).filter((num) => !!num)
  // Choose a ShutterCount
  if (!ShutterCount) {
    ShutterCount = numsInFileName
      .map((sc) => sc.toString())
      .sort((a, b) => b.length - a.length)
      .pop()
  }
  if (!Number(ShutterCount)) {
    ShutterCount = potentialAction.next().value.toString()
  }
  let miniExif = pick(exifData, [
    "Aperture",
    "CreateDate",
    "CustomRendered",
    "DateTimeOriginal",
    "FileSize",
    "FNumber",
    "Flash",
    "FocalLength",
    "GPSLatitude",
    "GPSLongitude",
    "ImageHeight",
    "ImageWidth",
    "ISO",
    "Lens",
    "LensInfo",
    "Megapixels",
    "Make",
    "Model",
    "Orientation",
    "ShutterSpeed",
    "ShutterCount",
    "Software",
    "tz",
  ])

  new Array(
    ["Lens", "LensInfo"],
    ["Aperture", "FNumber"],
    ["ShutterSpeed", "ExposureTime"],
    ["CreateDate", "DateTimeOriginal"],
  ).forEach(([use, notUse]) => {
    if (miniExif.hasOwnProperty(notUse)) {
      miniExif[use] = miniExif[notUse]
      delete miniExif[notUse]
    }
  })
  let identifier = kebabCase(kebabName + " " + Software)
  let dateCreated = datesInFileName.pop()
  let newName = [
    `${ImageWidth}x${ImageHeight}`,
    `${kebabCase(Software)}`,
    [
      `${dateCreated}`,
      `${padStart(ShutterCount.toString(), 6, "0")}`,
      `${identifier || "untitled"}.jpg`,
    ].join("_"),
  ]
  return new Object({
    alternateName: name,
    identifier: identifier,
    name: startCase(identifier),
    image: image,
    url: newName,
    mainEntityOfPage: "ImageObject",
    ImageObject: {
      exifData: miniExif,
    },
    CreativeWork: {
      dateCreated: dateCreated,
      editor: camera,
      position: ShutterCount,
    },
    MediaObject: {
      height: ImageHeight,
      width: ImageWidth,
    },
  })
}

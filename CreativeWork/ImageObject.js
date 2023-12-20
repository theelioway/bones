import { isObject, kebabCase, padStart, pick, startCase } from "lodash-es"
import {
  getHipstamatic,
  getCamera,
  getBigNumbers,
  fixName,
} from "./lib/index.js"

export const ImageObject = (thing) => {
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
  const datesInFileName = getOldestDate(
    kebabCase(name),
    [DateTimeOriginal, CreateDate]
      .filter((d) => !!d)
      .map((d) => (isObject(d) ? d.rawValue : d)),
  )
  // Now chuck the dates out of the file name.
  name = name.replace(/\d{4}-\d{2}-\d{2}/g, "")
  // KebabCase the remainder of the fileName for predictability.
  let kebabName = kebabCase(name)
  // Pull out numbers
  const numsInFileName = getBigNumbers(kebabName)
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

  let Camera = getCamera(exifData)
  if (Camera.toLowerCase() === "hipstamatic") {
    let Hipstamatic = getHipstamatic(miniExif)
    miniExif = {
      ...miniExif,
      ...Hipstamatic,
    }
  }

  let identifier = fixName(kebabName, Software)
  let camera = getCamera(exifData)
  let dateCreated = datesInFileName.pop()
  let newName = [
    `${kebabCase(camera)}`,
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

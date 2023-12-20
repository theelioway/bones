import { promises as fs } from "fs";
import ItemList from "../Intangible/ItemList.js";

/** WriteAction: Write a file to disk.
 *
 * @param {Thing} thing.url as the path to the file.
 * @returns {Thing}
 */
export const WriteAction = async (thing) => {
  thing = ItemList(thing);
  thing.mainEntityOfPage = thing.mainEntityOfPage || "WriteAction";
  if (thing && !thing.url) {
    return ItemList({
      ...thing,
      mainEntityOfPage: "WriteAction",
      name: thing.mainEntityOfPage.slice(0, -6) + " Error",
      Action: {
        error: "Missing `thing.url`",
        ...thing.Action,
        actionStatus: "FailedActionStatus",
      },
    });
  } else {
    await fs.writeFile(thing.url, JSON.stringify(thing, null, 2), "utf8");
    return thing;
  }
};
export default WriteAction;

import { promises as fs } from "fs";
import ItemList from "../Intangible/ItemList.js";

/** ReadAction: Read a file from disk.
 *
 * @param {Thing} thing.url as the path to the file.
 * @returns {Thing}
 */
export const ReadAction = async (thing) => {
  thing = ItemList(thing);
  thing.mainEntityOfPage = thing.mainEntityOfPage || "ReadAction";
  if (thing && !thing.url) {
    return new Object({
      ...thing,
      mainEntityOfPage: "ReadAction",
      name: thing.mainEntityOfPage.slice(0, -6) + " Error",
      Action: {
        error: "Missing `thing.url`",
        ...thing.Action,
        actionStatus: "FailedActionStatus",
      },
      ItemList: {
        itemListElement: [],
      },
    });
  } else {
    return await fs.readFile(thing.url, "utf8");
  }
};
export default ReadAction;

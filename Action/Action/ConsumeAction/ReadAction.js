/** ReadAction of `*.*` file from `action.url`. */
import { promises as fs } from "fs";
import Action from "../../../Thing/Action.js";
import Message from "../../../Thing/CreativeWork/Message.js";
/**
 * Reads `action.Action.url` expected to be a JSON file.
 * @example
 * let UpdateAction = require("@elioway/michael/Action/UpdateAction.js")
 * echo '{ "identifier": "thing-0001" }' > "myThing.json"
 * const action = await ReadAction({
 *    url: "myThing.json",
 *    Action: { object: {} }
 * })
 * console.assert(action.url==="myThing.json")
 * console.assert(!action.identifier)
 * console.assert(action.Action.result.identifier === "thing-0001")
 * console.assert(!action.Action.result.url)
 * console.assert(!action.Action.result.Action)
 */
export const ReadAction = async function ReadAction(action) {
  const mainEntityOfPage = "ReadAction";
  action = await Action({ ...action, mainEntityOfPage });
  let hasError = !action.url || (action.url && !action.url.endsWith("json"));
  if (hasError) {
    action.Action.error = "Missing `action.url`";
    action.Action.actionStatus = "FailedActionStatus";
  } else {
    let fileData = await fs.readFile(action.url, "utf8");
    action.Action.result = fileData;
    action.Action.actionStatus = "CompletedActionStatus";
  }
  return await Message(action);
};
export default ReadAction;

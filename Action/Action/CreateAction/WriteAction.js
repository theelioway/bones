import { promises as fs } from "fs";
import Action from "../../../../thing/Thing/Action.js";
import Message from "../../../../thing/Thing/Thing/CreativeWork/Message.js";

/**
 * Writes `action.Action.object` to a JSON file.
 * @example
 * let WriteAction = require("@elioway/michael/Action/WriteAction.js")
 * let engagedThing = { identifier: "myThing" }
 * const result = await WriteAction({ url: "myThing.json", Action: { object: engagedThing }})
 * console.log(`File written: ${result.url}`)
 */
export const WriteAction = async (action) => {
  const mainEntityOfPage = "WriteAction";
  action = await Action({ ...action, mainEntityOfPage });
  if (action && !action.url) {
    action.Action.actionStatus = "FailedActionStatus";
    action.Action.error = "Missing `action.url`";
  } else {
    action.Action.result = JSON.stringify(action.Action.object, null, 2);
    await fs.writeFile(action.url, action.Action.result, "utf8");
    action.Action.actionStatus = "CompletedActionStatus";
  }
  return action;
};
export default WriteAction;

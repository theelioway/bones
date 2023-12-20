import { objectPicker } from "@elioway/abdiel";
import Action from "../../Thing/Action.js";
import Message from "../../Thing/CreativeWork/Message.js";

/**
 * Writes `action.Action.object` to a JSON file.
 * @example
 * let UpdateAction = require("@elioway/michael/Action/UpdateAction.js")
 * let engagedThing = { identifier: "thing-0001", name: "My Name" }
 * const result = await ConsumeAction({
 *    url: "myThing.json",
 *    Action: { object: engagedThing }
 * })
 * console.log(`File written: ${result.url}`)
 */
export const ConsumeAction = async function ConsumeAction(action) {
  const mainEntityOfPage = "ConsumeAction";
  action = await Action({ ...action, mainEntityOfPage });
  action.ConsumeAction.actionAccessibilityRequirement =
    action.ConsumeAction.actionAccessibilityRequirement || [];
  action.ConsumeAction.actionAccessibilityRequirement =
    action.ConsumeAction.actionAccessibilityRequirement.split(",");

  let requirementPicker = objectPicker(
    action.ConsumeAction.actionAccessibilityRequirement,
  );
  action.Action.result = requirementPicker(action.Action.object);
  action.Action.actionStatus = "CompletedActionStatus";
  return await Message(action);
};

export default ConsumeAction;

import { parseCliArgs } from "@elioway/michael";
import Action from "../../../Thing/Action.js";
import Message from "../../../Thing/CreativeWork/Message.js";

/**
 * The act of applying an object to its intended purpose.
 * @example
 * let UpdateAction = require("@elioway/michael/Action/UpdateAction.js")
 * let UseAction = require("@elioway/michael/Action/ConsumeAction/UseAction.js")
 * let engagedThing = { identifier: "thing-0001", name: "My new thing." }
 * const action1 = await UpdateAction({
 *   Action: { instrument: "name:hello", object: engagedThing },
 * })
 * let action2 = UseAction({
 *   UseAction: { actionAccessibilityRequirement: "identifier:thing-0002" },
 *   ...action1
 * })
 * console.assert(
 *   isEmpty(action2.Action.result)
 * )
 * let action3 = UseAction({
 *   UseAction: { actionAccessibilityRequirement: "identifier:thing-0002" },
 *   ...action1
 * })
 * console.assert(
 *   action3.Action.result.identifier === "thing-0001"
 * )
 * console.assert(
 *   action3.Action.result.name === "hello"
 * )
 */
export const UseAction = async function (action) {
  const mainEntityOfPage = "UseAction";
  action = await Action({ ...action, mainEntityOfPage });
  action.UseAction.actionAccessibilityRequirement =
    action.UseAction.actionAccessibilityRequirement || "";
  if (typeof action.UseAction.actionAccessibilityRequirement === "string") {
    action.UseAction.actionAccessibilityRequirement = parseCliArgs(
      action.UseAction.actionAccessibilityRequirement.split(","),
      ":",
    );
  }
  if (
    Object.entries(action.Action.result).every(
      ([key, val]) =>
        action.UseAction.actionAccessibilityRequirement[key] === val,
    )
  ) {
    action.Action.actionStatus = "CompletedActionStatus";
  } else {
    action.expectsAcceptanceOf.Offer.itemOffered = action.Action.result;
    action.Action.result = {};
    action.Action.actionStatus = "FailedActionStatus";
  }
  return await Message(action);
};

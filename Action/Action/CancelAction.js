import Action from "../../Thing/Action.js";
import ItemList from "../../Thing/Intangible/ItemList.js";
import Message from "../../Thing/CreativeWork/Message.js";

/**
 * The act of asserting that a future event/action is no longer going to happen.
 * @example *
 * let CancelAction = require("@elioway/michael/Action/CancelAction.js")
 * let UpdateAction = require("@elioway/michael/Action/UpdateAction.js")
 * let engagedThing = { identifier: "thing-0001" }
 *
 * const action1 = await UpdateAction({
 *   Action: {
 *     instrument: "url:http://Action.theElioWay.com",
 *     object: engagedThing
 *   }
 * })
 * console.assert(action1.Action.actionStatus==="CompletedActionStatus")
 * console.assert(action1.Action.object.identifier==="thing-0001")
 * console.assert(!action1.Action.object.url)
 * console.assert(action1.Action.result.identifier==="thing-0001")
 * console.assert(action1.Action.result.url==="http://Action.theElioWay.com")
 *
 * let action2 = CancelAction(action1)
 * console.assert(action2.Action.actionStatus==="CompletedActionStatus")
 * console.assert(action2.Action.object.identifier==="thing-0001")
 * console.assert(!action2.Action.object.url)
 * console.assert(action2.Action.result.identifier==="thing-0001")
 * console.assert(!action2.Action.result.url)
 */
export const CancelAction = async function CancelAction(action) {
  const mainEntityOfPage = "CancelAction";
  action = await Action({ ...action, mainEntityOfPage });
  // Put the thing back.
  action.Action.result = action.Action.object;
  action.Action.actionStatus = "CompletedActionStatus";
  return await Message(action);
};
export default CancelAction;

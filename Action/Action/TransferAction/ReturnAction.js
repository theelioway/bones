import Action from "../../../Thing/Action.js";
import ItemList from "../../../Thing/Intangible/ItemList.js";
import Message from "../../../Thing/CreativeWork/Message.js";

/**
 * The act of returning to the origin that which was previously received (concrete objects) or taken (ownership).
 * @returns {Object_ActionThing} The modified `action` object.
 * @throws {Object_Message} `message.Action.error`
 * @example
 * let UpdateAction = require("@elioway/michael/Action/UpdateAction.js")
 * let thing = '{\n "name": "myThing" \n}'
 * const results = await ReceiveAction({ Action: { object: thing } })
 * console.assert(results.Action.result.name === "myThing")
 */
export const ReturnAction = async function ReturnAction(action) {
  const mainEntityOfPage = "ReturnAction";
  action = await Action({ ...action, mainEntityOfPage });
  action.Action.result = await ItemList({ mainEntityOfPage });
  action.Action.actionStatus = "CompletedActionStatus";
  return await Message(action);
};

export default ReturnAction;

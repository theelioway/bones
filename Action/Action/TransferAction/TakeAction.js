import Action from "../../../Thing/Action.js";
import ItemList from "../../../Thing/Intangible/ItemList.js";
import Message from "../../../Thing/CreativeWork/Message.js";

/**
 * The act of gaining ownership of an object from an origin. Reciprocal of GiveAction.objects) or taken (ownership).
 * @returns {Object_ActionThing} The modified `action` object.
 * @throws {Object_Message} `message.Action.error`
 * @example
 * let TakeAction = require("@elioway/michael/Action/TransferAction/TakeAction.js")
 * let thing = '{\n "name": "myThing" \n}'
 * const results = await TakeAction({ Action: { object: thing } })
 * console.assert(results.Action.result.name === "myThing")
 */
export const TakeAction = async function TakeAction(action) {
  const mainEntityOfPage = "TakeAction";
  action = await Action({ ...action, mainEntityOfPage });
  action.Action.result = await ItemList({ mainEntityOfPage });
  action.Action.actionStatus = "CompletedActionStatus";
  return await Message(action);
};

export default TakeAction;

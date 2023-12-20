import Action from "../../Thing/Action.js";
import Message from "../../Thing/CreativeWork/Message.js";

/**
 * The act of managing by changing/editing the state of the object.
 * @example
 * let UpdateAction = require("@elioway/michael/Action/UpdateAction.js")
 * let engagedThing = { identifier: "thing-0001", name: "My new thing." }
 * const action = await UpdateAction({
 *   Action: {
 *     instrument: "url:http://Action.theElioWay.com",
 *     object: engagedThing
 *   }
 * })
 * console.assert(action.identifier==="thing-0001")
 * console.assert(action.name==="My new thing.")
 * console.assert(action.Action.url==="http://Action.theElioWay.com")
 * console.assert(action.Action.actionStatus==="CompletedActionStatus")
 */
export const UpdateAction = async function UpdateAction(action) {
  const mainEntityOfPage = "UpdateAction";
  action = await Action({ ...action, mainEntityOfPage });
  action.Action.result = new Object({
    ...action.Action.object,
    ...action.Action.instrument,
  });
  action.Action.actionStatus = "CompletedActionStatus";
  return await Message(action);
};

export default UpdateAction;

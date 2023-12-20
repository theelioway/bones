import { default as ActionThing } from "../../michael/Thing/Action.js";
import Message from "../../michael/Thing/CreativeWork/Message.js";

/**
 * @example
 * let Action = require("@elioway/michael/Action/Action.js")
 * const action1 = await Action()
 * console.assert(!action1.identifier)
 * console.assert(action1.mainEntityOfPage==="Action")
 * console.assert(!action1.Action.object.identifier)
 * console.assert(!action1.Action.result.identifier)
 * console.assert(action1.Action.object.mainEntityOfPage==="Action")
 * console.assert(action1.Action.result.mainEntityOfPage==="Action")
 * console.assert(
 *   action1.Action.provider(action1.Action.object)===action1.Action.result
 * )
 * *
 * const action2 = await Action({
 *   Action: {
 *     object: { identifier: "thing-0001", name: "My Test Thing" },
 *     provider: thing => new Object({
 *       ...thing,
 *       identifier: thing.identifier.toUpperCase()
 *     })
 *   }
 * })
 * console.assert(!action2.identifier)
 * console.assert(!action2.name)
 * console.assert(action2.mainEntityOfPage==="Action")
 * console.assert(action2.Action.object.identifier==="thing-0001")
 * console.assert(action2.Action.object.name==="My Test Thing")
 * console.assert(action2.Action.result.identifier==="THING-0001")
 * console.assert(action2.Action.result.name==="My Test Thing")
 * console.assert(
 *   action2.Action.provider(action2.Action.object)==action2.Action.result
 * )
 */
export const Action = async function Action(action) {
  action = await ActionThing(action);
  // Run the action
  if (typeof action.Action.provider === "function") {
    // Run the "action".
    try {
      action.Action.result = action.Action.provider(action.Action.object);
      action.Action.actionStatus = "CompletedActionStatus";
    } catch (error) {
      action.Action.actionStatus = "FailedActionStatus";
      action.Action.error = error;
    }
  }
  return await Message(action);
};

export default Action;

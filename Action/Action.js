import { default as ActionThing } from "../../michael/Thing/Action.js";
import Message from "../../michael/Thing/CreativeWork/Message.js";

export const Action = (action) =>
  async function Action(prevAction) {
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

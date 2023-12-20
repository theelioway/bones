import Action from "../../../Thing/Action.js";
import Message from "../../../Thing/CreativeWork/Message.js";

/**
 * Import a node module which resolves to a thing.
 * @example
 * let UpdateAction = require("@elioway/michael/Action/UpdateAction.js")
 * echo 'export default { "identifier": "thing-0001" }' > "thing-0001.js"
 * const action = await InstallAction({
 *    url: "thing-0001.js"
 * })
 * console.assert(action.url==="thing-0001.js")
 * console.assert(!action.identifier)
 * console.assert(action.Action.result.identifier==="thing-0001")
 * console.assert(!action.Action.result.url)
 * console.assert(!action.Action.result.Action)
 */
export const InstallAction = async function InstallAction(action) {
  const mainEntityOfPage = " InstallAction";
  action = await Action({ ...action, mainEntityOfPage });
  let hasError = !action.url || (action.url && !action.url.endsWith("js"));
  if (hasError) {
    action.Action.error = "Missing `action.url`";
    action.Action.actionStatus = "FailedActionStatus";
  } else {
    let importedThing = await import(action.url);
    action.Action.result = importedThing.default;
    action.Action.actionStatus = "CompletedActionStatus";
  }
  return await Message(action);
};
export default InstallAction;

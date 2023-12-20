import Action from "../../../../Thing/Action.js";
import ItemList from "../../../../Thing/Intangible/ItemList.js";
import Message from "../../../../Thing/CreativeWork/Message.js";

/** The act of committing to/adopting an object.
 * @example
 * let AcceptAction = require("@elioway/michael/Action/OrganizeAction/AllocateAction/AcceptAction.js")
 * let UpdateAction = require("@elioway/michael/Action/UpdateAction.js")
 *
 * let engagedThing = { name: "Blue Thing" }
 * let action1 = await UpdateAction({
 *   Action: {
 *     object: engagedThing,
 *     instrument: "name:'Red Thing'"
 *   }
 * })
 * console.assert(
 *   action1.Action.object.name==='Blue Thing'
 *   action1.Action.result.name==='Red Thing'
 * )
 * let thing = AcceptAction(action1)
 * console.assert(
 *   thing.name==='Red Thing'
 * )
 */
export const AcceptAction = async function AcceptAction(action) {
  const mainEntityOfPage = "AcceptAction";
  action = await Action({ ...action, mainEntityOfPage });
  action.Action.result = cloneDeep(action.Action.object);
  let thing = ItemList(action.Action.instrument);
  // Add the `object` from the list.
  if (
    !action.Action.result.ItemList.itemListElement
      .map((t) => t.identifier)
      .includes(thing.identifier)
  ) {
    action.Action.result.ItemList.itemListElement.push(thing);
  }
  action.Action.actionStatus === "CompletedActionStatus";
  return await Message(action);
};

export default AcceptAction;

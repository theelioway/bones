import Action from "../../../../Thing/Action.js";
import ItemList from "../../../../Thing/Intangible/ItemList.js";
import Message from "../../../../Thing/CreativeWork/Message.js";

/** The act of rejecting to/adopting an object.
 * @example
 * let RejectAction = require("@elioway/michael/Action/OrganizeAction/AllocateAction/RejectAction.js")
 * let engagedThing = {
 *   ItemList: {
 *     itemListElement: [
 *       { identifier: 1, sameAs: "odd" },
 *       { identifier: 2, sameAs: "even" },
 *       { identifier: 3, sameAs: "odd" },
 *       { identifier: 4, sameAs: "even" },
 *       { identifier: 5, sameAs: "odd" },
 *       { identifier: 6, sameAs: "even" },
 *     ],
 *   },
 * }
 * const action = await RejectAction({
 *   Action: {
 *     object: engagedThing, instrument: "identifier:5"
 *   }
 * })
 * console.assert(
 *   thing.Action.result.ItemList.itemListElement.length===5
 * )
 * console.assert(
 *   thing.Action.result.ItemList.itemListElement[1].identifier===6
 * )
 */
export const RejectAction = async function RejectAction(action) {
  const mainEntityOfPage = "RejectAction";
  action = await Action({ ...action, mainEntityOfPage });
  action.Action.result = action.Action.object;
  let thing = ItemList(action.Action.instrument);
  // Remove the `object` from the list.
  action.Action.result.ItemList.itemListElement =
    action.Action.result.ItemList.itemListElement.filter(
      (obj) => obj.identifier !== thing.identifier,
    );

  action.Action.actionStatus = "CompletedActionStatus";
  return await Message(action);
};
export default RejectAction;

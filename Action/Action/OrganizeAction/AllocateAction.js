import Action from "../../../Thing/Action.js";
import ItemList from "../../../Thing/Intangible/ItemList.js";
import Message from "../../../Thing/CreativeWork/Message.js";

/** The act of organizing tasks/objects/events by associating resources to it.
 * @example
 * let RejectAction = require("@elioway/michael/Action/OrganizeAction/AllocateAction.js")
 * let engagedThing = {
 *   ItemList: {
 *     itemListElement: [
 *       { identifier: 1, sameAs: "odd" },
 *       { identifier: 2, sameAs: "even" },
 *       { identifier: 3, sameAs: "odd" },
 *     ],
 *   },
 * }
 * const action = await AllocateAction({
 *     Action: {
 *       object: engagedThing, instrument: "subjectOf:sorter"
 *     }
 * })
 * console.assert(
 *   thing.Action.result.ItemList.itemListElement===[
 *       { identifier: 1, sameAs: "odd", subjectOf: "sorter" },
 *       { identifier: 2, sameAs: "even", subjectOf: "sorter" },
 *       { identifier: 3, sameAs: "odd", subjectOf: "sorter" },
 *     ]
 * )
 */
export const AllocateAction = async function AllocateAction(action) {
  const mainEntityOfPage = "RejectAction";
  action = await Action({ ...action, mainEntityOfPage });
  action.Action.result = action.Action.object;
  action.Action.result.ItemList.itemListElement =
    action.Action.object.ItemList.itemListElement.map(
      (thing) => new Object({ ...thing, ...action.Action.instrument }),
    );
  action.Action.result = await ItemList({ mainEntityOfPage });
  action.Action.actionStatus = "CompletedActionStatus";
  return await Message(action);
};

export default AllocateAction;

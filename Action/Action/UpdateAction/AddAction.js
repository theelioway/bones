import { parseCliArgs } from "@elioway/michael";
import Action from "../../../Thing/Action.js";
import ItemList from "../../../Thing/Intangible/ItemList.js";
import Message from "../../../Thing/CreativeWork/Message.js";

/**
 * The act of editing a recipient by replacing an old object with a new object.
 * @example
 * let AddAction = require("@elioway/michael/Action/UpdateAction/AddAction.js")
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
 *     numberOfItems: 6, *   },
 * }
 * const thing1 = await AddAction({
 *   SearchAction: { query: "identifier:4" },
 *   Action: { object: engagedThing },
 * })
 * console.assert(
 *   thing1.Action.result.ItemList.itemListElement === [
 *     { identifier: 4, sameAs: "even" }
 *   ]
 * )
 * const thing2 = await AddAction({
 *   SearchAction: { query: "sameAs:odd" },
 *   Action: { object: thing },
 * })
 * console.assert(
 *   thing1.Action.result.ItemList.itemListElement === [
 *     { identifier: 1, sameAs: "odd" },
 *     { identifier: 3, sameAs: "odd" },
 *     { identifier: 5, sameAs: "odd" },
 *   ]
 * )
 */
export const AddAction = async function AddAction(action) {
  const mainEntityOfPage = "AddAction";
  action = await Action({ ...action, mainEntityOfPage });
  // A sub property of object. The object that is being replaced.
  action.AddAction.replacee = action.AddAction.replacee || "";
  action.AddAction.replacee = parseCliArgs(
    action.AddAction.replacee.split(","),
    ":",
  );
  // 	A sub property of object. The object that replaces.
  action.AddAction.replacer = action.AddAction.replacer || "";
  action.AddAction.replacer = parseCliArgs(
    action.AddAction.replacer.split(","),
    ":",
  );
  //   action.Action.result.ItemList.itemListElement = map(
  //     thing.ItemList.itemListElement,
  //     thing =>
  //   )
  action.Action.result = await ItemList({ mainEntityOfPage });
  action.Action.actionStatus = "CompletedActionStatus";
  return await Message(action);
};

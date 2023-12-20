import { parseCliArgs } from "@elioway/michael";
import ItemList from "../../../../Thing/Intangible/ItemList.js";
import Message from "../../../../Thing/CreativeWork/Message.js";

/**
 * The act of editing a recipient by replacing an old object with a new object.
 * @example
 * let InsertAction = require("@elioway/michael/Action/UpdateAction/InsertAction.js")
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
 * const thing1 = await InsertAction({
 *   SearchAction: { query: "identifier:4" },
 *   Action: { object: engagedThing },
 * })
 * console.assert(
 *   thing1.Action.result.ItemList.itemListElement === [
 *     { identifier: 4, sameAs: "even" }
 *   ]
 * )
 * const thing2 = await InsertAction({
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
export const InsertAction = async function InsertAction(action) {
  const mainEntityOfPage = "InsertAction";
  action = await Action({ ...action, mainEntityOfPage });
  // A sub property of object. The object that is being replaced.
  action.InsertAction.replacee = action.InsertAction.replacee || "";
  action.InsertAction.replacee = parseCliArgs(
    action.InsertAction.replacee.split(","),
    ":",
  );
  // 	A sub property of object. The object that replaces.
  action.InsertAction.replacer = action.InsertAction.replacer || "";
  action.InsertAction.replacer = parseCliArgs(
    action.InsertAction.replacer.split(","),
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

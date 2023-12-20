import { parseCliArgs } from "@elioway/michael";
import Action from "../../Thing/Action.js";

/**
 * Search `things` in  `action.Action.object.ItemList.itemListElement`
 * partially matching the pattern in `action.SearchAction.query`.
 * @example
 * let UpdateAction = require("@elioway/michael/Action/UpdateAction.js")
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
 * const thing1 = await ChooseAction({
 *   SearchAction: { query: "identifier:4" },
 *   Action: { object: engagedThing },
 * })
 * console.assert(
 *   thing1.Action.result.ItemList.itemListElement === [
 *     { identifier: 4, sameAs: "even" }
 *   ]
 * )
 * const thing2 = await ChooseAction({
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
export const SearchAction = async function SearchAction(action) {
  const mainEntityOfPage = "SearchAction";
  action = await Action({ ...action, mainEntityOfPage });
  action.Action.result = cloneDeep(action.Action.object);
  action.SearchAction = action.SearchAction || {};
  action.SearchAction.query = action.SearchAction.query || "";
  action.SearchAction.query = parseCliArgs(action.Action.query.split(","), ":");
  action.Action.result.ItemList.itemListElement =
    action.Action.object.ItemList.itemListElement.filter((thing) =>
      Object.entries(action.SearchAction.query).some(
        ([key, val]) => thing[key] === val,
      ),
    );
  action.Action.actionStatus = "CompletedActionStatus";
  return await Message(action);
};
export default SearchAction;

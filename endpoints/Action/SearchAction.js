import { parseCliArgs } from "@elioway/michael";
import ItemList from "../Intangible/ItemList.js";

/** SearchAction: returns partial matches from a `thing`'s list.
 *
 * @param {Thing} thing.SearchAction.query with any Thing
 * @returns {Thing}
 */
export const SearchAction = (thing) => {
  thing = ItemList(thing);
  thing.SearchAction = thing.SearchAction || {};
  thing.SearchAction.query = thing.SearchAction.query || "";
  const QUERY = parseCliArgs(
    thing.SearchAction.query.replace(/:/g, "=").split(","),
  );
  return new Object({
    description: "Search " + JSON.stringify(thing.SearchAction.query),
    mainEntityOfPage: "SearchAction",
    name: "Search Results",
    ItemList: {
      itemListElement: thing.ItemList.itemListElement.filter((thing) =>
        Object.entries(QUERY).some(([key, val]) => thing[key] === val),
      ),
    },
  });
};
export default SearchAction;

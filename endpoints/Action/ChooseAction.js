import { parseCliArgs } from "@elioway/michael";
import ErrorT from "../ErrorT.js";
import ItemList from "../Intangible/ItemList.js";

/** ChooseAction: Choose one thing from a `thing`'s list.
 *
 * @param {Thing} thing.ChooseAction.actionOption with enough unique info to find.
 * @returns {Thing}
 */
export const ChooseAction = (thing) => {
  thing = ItemList(thing);
  thing.mainEntityOfPage = thing.mainEntityOfPage || "ChooseAction";
  thing.ChooseAction = thing.ChooseAction || {};
  thing.ChooseAction.actionOption = thing.ChooseAction.actionOption || "";
  let ACTIONOPTION = parseCliArgs(
    thing.ChooseAction.actionOption.replace(/:/g, "=").split(","),
  );
  let chosenThing = thing.ItemList.itemListElement.find(({ identifier }) =>
    Object.entries(ACTIONOPTION).every(
      ([key, val]) => ACTIONOPTION[key] === val,
    ),
  );
  if (!chosenThing) {
    return ErrorT({
      ...thing,
      description: "Search " + thing.ChooseAction.actionOption,
      Action: { error: "Nothing found." },
    });
  }
  return chosenThing;
};

export default ChooseAction;

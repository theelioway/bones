import { objectPick } from "@elioway/abdiel";
import ItemList from "../Intangible/ItemList.js";

/** QuoteAction: a summary.
 *
 * @returns {Thing}
 */
export const QuoteAction = (fields) => (thing) => {
  thing = ItemList(thing);
  let fieldPicker = objectPick(fields);
  thing = fieldPicker({
    mainEntityOfPage: "QuoteAction",
    ...thing,
  });
  return thing;
};

export default QuoteAction;

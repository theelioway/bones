import { objectPicker } from "@elioway/abdiel";
import ItemList from "../Intangible/ItemList.js";

/** QuoteAction: console.log a summary.
 *
 * @returns {Thing}
 */
export const QuoteAction = (fields) => (thing) => {
  thing = ItemList(thing);
  let fieldPicker = objectPicker(fields);
  thing = fieldPicker({
    mainEntityOfPage: "QuoteAction",
    ...thing,
  });
  console.log(thing);
  return thing;
};

export default QuoteAction;

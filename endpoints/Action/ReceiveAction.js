import ItemList from "../Intangible/ItemList.js";

/** ReceiveAction: JSON.parse a json string.
 *
 * @returns {Thing} json string
 */
export const ReceiveAction = (jsonThing) => {
  let thing = ItemList(JSON.parse(jsonThing || "{}"));
  thing.mainEntityOfPage = thing.mainEntityOfPage || "ReceiveAction";
  return thing;
};

export default ReceiveAction;

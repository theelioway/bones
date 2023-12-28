import ItemList from "../Intangible/ItemList.js";

/** ViewAction: console log thing.
 *
 * @returns {Thing}
 */
export const ViewAction = (action) => (thing) => {
  thing = ItemList(thing);
  thing = new Object({
    mainEntityOfPage: "ViewAction",
    ...thing,
    ItemList: {
      itemListElement: thing.ItemList.itemListElement.map(
        ({ identifier }) => identifier,
      ),
    },
  });
  return thing;
};
export default ViewAction;

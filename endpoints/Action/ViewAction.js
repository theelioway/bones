import ItemList from "../Intangible/ItemList.js";

/** ViewAction: console.log to screen.
 *
 * @returns {Thing}
 */
export const ViewAction = (thing) => {
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

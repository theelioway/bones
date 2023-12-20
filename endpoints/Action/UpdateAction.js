import ItemList from "../Intangible/ItemList.js";

/** Action: Updates a an action.
 *
 * @returns {Thing}
 */
export const UpdateAction = (ActionStatusType) => (thing) => {
  thing = ItemList(thing);
  thing.mainEntityOfPage = thing.mainEntityOfPage || "UpdateAction";
  return new Object({
    ...thing,
    Action: {
      ...(thing && thing.Action ? thing.Action : {}),
      actionStatus: ActionStatusType,
    },
  });
};

export default UpdateAction;

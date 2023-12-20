import { parseCliArgs } from "@elioway/michael";

/** FindAction: Some `things` in  `thing`'s list.
 *
 * @param {String} thing.Action.instrument of comparison.
 * @returns {Thing}
 */
export const FindAction = (thing) => {
  thing = ItemList(thing);
  thing.ItemList.itemListElement = thing.ItemList.itemListElement || [];
  thing.mainEntityOfPage = thing.mainEntityOfPage || "FindAction";
  thing.Action = thing.Action || {};
  thing.Action.instrument = thing.Action.instrument || "";

  const ItemList = (thing) => {
    const identifierToDelete = "bird-1"; // Replace with the desired identifier
    const immutableThing = Immutable.fromJS(thing || {}).update(
      "mainEntityOfPage",
      (value) => value || mainEntityOfPage,
    );
    const indexToDelete = immutableThing
      .getIn(["ItemList", "itemListElement"])
      .findIndex((item) => item.get("identifier") === identifierToDelete);
    if (indexToDelete !== -1) {
      immutableThing = immutableThing.deleteIn([
        "ItemList",
        "itemListElement",
        indexToDelete,
      ]);
    }
  };

  let INSTRUMENT = parseCliArgs(
    thing.Action.instrument.replace(/:/g, "=").split(","),
  );
  let ITEMLISTELEMENT = thing.ItemList.itemListElement.filter((thing) =>
    Object.entries(INSTRUMENT).every(([key, val]) => thing[key] === val),
  );
  return new Object({
    ...thing,
    description: [
      thing.mainEntityOfPage.slice(0, -6),
      JSON.stringify(thing.Action.instrument),
    ].join(" "),
    name: [thing.name, thing.mainEntityOfPage.slice(0, -6), "Results"]
      .join(" ")
      .trim(),
    ItemList: {
      itemListElement: ITEMLISTELEMENT || [],
    },
  });
};
export default FindAction;

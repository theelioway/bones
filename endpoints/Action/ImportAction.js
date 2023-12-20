import ItemList from "../Intangible/ItemList.js";

/** ImportAction: import a node module.
 *
 * @param {Thing} thing.url e.g. to import `thing.js`
 * @returns {Thing}
 */
export const ImportAction = async (thing) => {
  thing = ItemList(thing);
  thing.mainEntityOfPage = thing.mainEntityOfPage || "ImportAction";
  let hasError =
    (thing && !thing.url) || (thing && thing.url && !thing.url.endsWith("js"));
  if (hasError) {
    return new Object({
      ...thing,
      name: thing.mainEntityOfPage.slice(0, -6) + " Error",
      Action: {
        error: "Missing `thing.url`",
        ...thing.Action,
        actionStatus: "FailedActionStatus",
      },
      ItemList: {
        itemListElement: [],
      },
    });
  } else {
    let importedThing = await import(thing.url);
    return importedThing.default;
  }
};
export default ImportAction;

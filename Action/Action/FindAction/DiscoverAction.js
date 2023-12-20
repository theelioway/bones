import Action from "../../../Thing/Action.js";
import Message from "../../../Thing/CreativeWork/Message.js";

/**
 * The act of expressing a preference from a set of options or a large or unbounded set of choices/options.
 * @example
 * let DiscoverAction = require("@elioway/michael/Action/AssessAction/DiscoverAction.js")
 * let engagedThing = {
 *   ItemList: {
 *     itemListElement: [
 *       { identifier: 1, sameAs: "even" },
 *       { identifier: 2, sameAs: "even" },
 *       { identifier: 3, sameAs: "even" },
 *       { identifier: 4, sameAs: "odd" },
 *       { identifier: 5, sameAs: "odd" },
 *       { identifier: 6, sameAs: "odd" },
 *     ],
 *   },
 * }
 * const thing1 = await DiscoverAction({
 *   DiscoverAction: { actionOption: "identifier:5" },
 *   Action: { object: engagedThing },
 * })
 * console.assert(
 *  thing1.Action.result.identifier === 5
 * )
 * const thing2 = await DiscoverAction({
 *   DiscoverAction: { actionOption: "sameAs:even" },
 *   Action: { object: engagedThing  },
 * })
 * console.assert(
 *  thing2.Action.result.identifier === 1
 * )
 * // Three `things` match "sameAs:even"
 * const thing3 = await FindAction({
 *   DiscoverAction: { actionOption: "sameAs:odd" },
 *   Action: { object: engagedThing  },
 * })
 * console.assert(
 *  thing3.Action.result.identifier === 4
 * )
 */
export const DiscoverAction = async function DiscoverAction(action) {
  const mainEntityOfPage = "DiscoverAction";
  action = await Action({ ...action, mainEntityOfPage });
  action.DiscoverAction = action.DiscoverAction || {};
  let discoveredThing = action.Action.object.ItemList.itemListElement.find(
    (thing) =>
      Object.entries(action.Action.instrument).every(
        ([key, val]) => thing[key] === val,
      ),
  );
  if (!discoveredThing) {
    action.Action.error = `${JSON.stringify(
      action.DiscoverAction.actionOption,
    )} not found in \`thing.ItemList.itemListElement\``;
    action.Action.actionStatus = "FailedActionStatus";
  } else {
    action.Action.result = discoveredThing;
    action.Action.actionStatus = "CompletedActionStatus";
  }
  return await Message(action);
};

export default DiscoverAction;

import Action from "../../../Thing/Action.js";
import Message from "../../../Thing/CreativeWork/Message.js";

const CLEANABLE = [
  "",
  "0",
  0,
  0.0,
  new Date(0).toISOString().slice(0, 10),
  new Date(0).toISOString().slice(11),
  new Date(0).toISOString(),
];

/**
 * The act of expressing a preference [`Action.instrument`] from a set of
 * options [`Action.object`] or a large or unbounded set of choices/options.
 * @example
 * let ChooseAction = require("@elioway/michael/AssessAction/ChooseAction.js")
 * let engagedThing = {
 *          identifier: "thing-0001",
 *          sameAs: "",
 *          QuantitativeValue: { value: 0 }
 * }
 * const action = await ChooseAction({
 *    Action:{ instrument: ["", 0], object: engagedThing },
 * })
 * console.assert(action.Action.result.identifier==="thing-0001")
 * console.assert(!action.Action.result.sameAs)
 * console.assert(action.Action.QuantitativeValue)
 * console.assert(!action.Action.QuantitativeValue.value)
 */
export const ChooseAction = async function ChooseAction(action) {
  const mainEntityOfPage = "InstallAction";
  action = await Action({ ...action, mainEntityOfPage });
  action.Action.instrument = action.Action.instrument | CLEANABLE;
  const cleaner = (thing) =>
    Object.entries(thing).reduce((acc, [key, val]) => {
      if (Array.isArray(val)) {
        acc[key] = val.map(cleaner);
      } else if (typeof val === "object") {
        acc[key] = cleaner(val);
      } else if (!CLEANABLE.includes(val)) {
        acc[key] = val;
      }
      return acc;
    }, {});
  action.Action.result = cleaner(action.Action.object);
  action.Action.actionStatus = "CompletedActionStatus";
  return await Message(action);
};

export default ChooseAction;

/** ErrorT: A generic error message.
 *
 * @param {String} thing.Action.error especially.
 * @returns {Thing}
 */
export const ErrorT = (thing) => {
  thing = thing || {};
  thing.mainEntityOfPage = thing.mainEntityOfPage || "Action";
  return new Object({
    ...thing,
    name: [thing.mainEntityOfPage.slice(0, -6), "Error"].join(" ").trim(),
    Action: {
      error: "Something went wrong.",
      ...thing.Action,
      actionStatus: "FailedActionStatus",
    },
  });
};

export default ErrorT;

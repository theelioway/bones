import { join } from "lodash-es"

/** Message: A generic error message.
 *
 * @param {String} thing.Actiion.error especially.
 * @returns {Thing}
 */

/**
 * Returns the least `thing` allowed.
 * @example
 * import Action from "@elioway/michael/Action.js"
 * import Thing from "@elioway/thing/Thing.js"
 * import Message from "@elioway/thing/Message.js"
 * const thing1 = await Thing()
 * const action1 = await Action(thing1)
 * const message1 = await Message(action1)
 * console.assert(!message1.identifier)
 * console.assert(message1.mainEntityOfPage==="Message")
 * console.assert(!IsNaN(new Date(message1.Message.dateSent)))
 * console.assert(message1.Message.recipient==="thing@theElioWay.com")
 * console.assert(message1.Message.sender==="thing@theElioWay.com")
 */
export const Message = function Message(action) {
  const mainEntityOfPage = "Message"
  return new Object({
    mainEntityOfPage,
    description: join([
      action.mainEntityOfPage,
      action.Action.instrument,
    ]).trim(),
    name: join(
      [
        action.Action.object.identifier,
        action.Action.object.action.mainEntityOfPage,
        mainEntityOfPage,
      ],
      " ",
    ).trim(),
    CreativeWork: {
      about: action.Action.object,
      abstract: action.name,
      sender: action,
    },
    Message: {
      dateSent: new Date(Date.now()).toISOString(),
      recipient: "thing@theElioWay.com",
      sender: "thing@theElioWay.com",
    },
  })
}

export default Message

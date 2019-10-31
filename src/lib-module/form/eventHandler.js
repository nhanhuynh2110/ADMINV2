export default class EventHandler {
  _events = {}

  constructor(events) {
    events.forEach(e => {
      this._events[e] = []
    })
  }

  on(event, handler) {
    if (!this._events.hasOwnProperty(event))
      throw new Error("Event is not implemented")
    this._events[event].push(handler)
  }
  off(event, handler) {
    if (!this._events.hasOwnProperty(event))
      throw new Error("Event is not implemented")
    this._events[event] = this._events[event].filter(h => h !== handler)
  }
  trigger(event, ...payload) {
    if (!this._events.hasOwnProperty(event))
      throw new Error("Event is not implemented")
    this._events[event].forEach(handler => {
      typeof handler === "function" && handler.call(this, ...payload)
    })
  }
}

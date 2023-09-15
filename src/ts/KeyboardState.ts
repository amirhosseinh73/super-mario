import { KeyboardHandleEventsType } from "../@types/keyboard"
import { PRESSED, RELEASED } from "./defines"

export default class KeyboardState {
  keyStates!: Map<any, any>
  keyMap!: Map<any, any>

  constructor() {
    this.keyStates = new Map()

    this.keyMap = new Map()
  }

  public addMapping(code: string, callback: Function) {
    this.keyMap.set(code, callback)
  }

  public handleEvent(event: KeyboardEvent) {
    const { code } = event

    if (!this.keyMap.has(code)) return

    event.preventDefault()

    const keyState = event.type === "keydown" ? PRESSED : RELEASED

    if (this.keyStates.get(code) === keyState) return

    this.keyStates.set(code, keyState)

    this.keyMap.get(code)(keyState)
  }

  public listenTo(window: Window & typeof globalThis) {
    const eventNames: KeyboardHandleEventsType = ["keydown", "keyup"]

    eventNames.forEach(eventName => {
      window.addEventListener(eventName, event => {
        this.handleEvent(event)
      })
    })
  }
}

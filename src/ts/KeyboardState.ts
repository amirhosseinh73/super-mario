import { KeyboardHandleEventsType } from "../@types/keyboard"
import { PRESSED, RELEASED } from "./defines"

export default class KeyboardState {
  keyStates!: Map<any, any>
  keyMap!: Map<any, any>

  constructor() {
    this.keyStates = new Map()

    this.keyMap = new Map()
  }

  public addMapping(keyCode: number, callback: Function) {
    this.keyMap.set(keyCode, callback)
  }

  private handleEvent(event: KeyboardEvent) {
    const { keyCode } = event

    if (!this.keyMap.has(keyCode)) return

    const keyState = event.type === "keydown" ? PRESSED : RELEASED

    if (this.keyStates.get(keyCode) === keyState) return

    this.keyStates.set(keyCode, keyState)

    console.log(this.keyStates)

    this.keyMap.get(keyCode)(keyState)
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

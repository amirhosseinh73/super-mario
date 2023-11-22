import { PRESSED, RELEASED } from "./defines";

export default class KeyboardState {
    keyStates!: Map<any, any>;
    keyMap!: Map<any, any>;

    constructor() {
        // Holds the current state of a given key
        this.keyStates = new Map();

        // Holds the callback functions for a key code
        this.keyMap = new Map();
    }

    public addMapping(code: string, callback: Function) {
        this.keyMap.set(code, callback);
    }

    public handleEvent(event: KeyboardEvent) {
        const { code } = event;

        // Did not have key mapped.
        if (!this.keyMap.has(code)) return;

        event.preventDefault();

        const keyState = event.type === "keydown" ? PRESSED : RELEASED;

        if (this.keyStates.get(code) === keyState) return;

        this.keyStates.set(code, keyState);

        this.keyMap.get(code)(keyState);
    }

    public listenTo(window: Window & typeof globalThis) {
        const eventNames: KeyboardHandleEvents = ["keydown", "keyup"];

        eventNames.forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event);
            });
        });
    }
}

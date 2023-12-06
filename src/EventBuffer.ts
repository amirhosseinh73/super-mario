export default class EventBuffer {
    events: {
        name: Symbol;
        args: unknown[];
    }[];

    constructor() {
        this.events = [];
    }

    public emit(name: Symbol, ...args: unknown[]) {
        const event = { name, args };

        this.events.push(event);
    }

    public process(name: Symbol, callback: (...args: unknown[]) => void) {
        this.events.forEach(event => {
            if (event.name !== name) return;

            callback(...event.args);
        });
    }

    public clear() {
        this.events.length = 0;
    }
}

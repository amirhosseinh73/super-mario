export default class EventEmitter {
    listeners: {
        name: string;
        callback: (...args: unknown[]) => void;
    }[];

    constructor() {
        this.listeners = [];
    }

    public listen(name: string, callback: (...args: unknown[]) => void) {
        const listener = { name, callback };

        this.listeners.push(listener);
    }

    public emit(name: string, ...args: unknown[]) {
        this.listeners.forEach(listener => {
            if (listener.name !== name) return;

            listener.callback(...args);
        });
    }
}

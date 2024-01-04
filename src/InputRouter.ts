import Entity from "./Entity";

export default class InputRouter {
    receivers: Set<Entity>;

    constructor() {
        this.receivers = new Set();
    }

    public addReceiver(receiver: Entity) {
        this.receivers.add(receiver);
    }

    public dropReceiver(receiver: Entity) {
        this.receivers.delete(receiver);
    }

    public route(routeInput: (entity: Entity) => void) {
        for (const receiver of this.receivers) {
            routeInput(receiver);
        }
    }
}

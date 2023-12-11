import { EntityWithTraits } from "./@types/traits";

export default class InputRouter {
    receivers: Set<EntityWithTraits>;

    constructor() {
        this.receivers = new Set();
    }

    public addReceiver(receiver: EntityWithTraits) {
        this.receivers.add(receiver);
    }

    public dropReceiver(receiver: EntityWithTraits) {
        this.receivers.delete(receiver);
    }

    public route(routeInput: (entity: EntityWithTraits) => void) {
        for (const receiver of this.receivers) {
            routeInput(receiver);
        }
    }
}

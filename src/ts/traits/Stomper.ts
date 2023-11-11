import Entity, { Trait } from "../Entity";

export default class Stomper extends Trait {
    queueBounce: boolean;
    bounceSpeed: number;

    constructor() {
        super("stomper");

        this.bounceSpeed = 400;
        this.queueBounce = false;
    }

    public bounce() {
        this.queueBounce = true;
    }

    public update(entity: Entity, _deltaTime: number): void {
        if (!this.queueBounce) return;

        entity.vel.y = -this.bounceSpeed;
        this.queueBounce = false;
    }
}

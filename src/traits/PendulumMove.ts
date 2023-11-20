import Entity, { Trait } from "../Entity";
import { Sides } from "../defines";

export default class PendulumMove extends Trait {
    speed: number;
    enabled: boolean;

    constructor() {
        super("pendulumMove");
        this.enabled = true;
        this.speed = -30;
    }

    public obstruct(_entity: Entity, side: Symbol) {
        if (side === Sides.LEFT || side === Sides.RIGHT) this.speed = -this.speed;
    }

    public update(entity: Entity, _deltaTime: number) {
        if (this.enabled) entity.vel.x = this.speed;
    }
}

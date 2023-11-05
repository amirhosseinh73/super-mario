import Entity, { Trait } from "../Entity";
import { Sides } from "../defines";

export default class PendulumWalk extends Trait {
    speed: number;

    constructor() {
        super("pendulumWalk");
        this.speed = -30;
    }

    public obstruct(_entity: Entity, side: Symbol) {
        if (side === Sides.LEFT || side === Sides.RIGHT) this.speed = -this.speed;
    }

    public update(entity: Entity, _deltaTime: number) {
        entity.vel.x = this.speed;
    }
}

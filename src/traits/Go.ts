import { EntityWithTraits } from "./../@types/traits";
import { Trait } from "../Entity";
import { SLOW_DRAG } from "../defines";

export default class Go extends Trait {
    dir: 0 | 1 | -1;
    acceleration: number;
    deceleration: number;
    dragFactor: number;

    distance: number;

    heading: 1 | -1;

    constructor() {
        super("go");

        this.dir = 0;
        this.acceleration = 400;
        this.deceleration = 300;
        this.dragFactor = SLOW_DRAG;

        this.distance = 0;
        this.heading = 1;
    }

    public update(entity: EntityWithTraits, deltaTime: number): void {
        const absX = Math.abs(entity.vel.x);

        if (this.dir !== 0) {
            entity.vel.x += this.acceleration * deltaTime * this.dir;

            if (entity.jump) {
                if (entity.jump.falling === false) {
                    this.heading = this.dir;
                }
            } else {
                this.heading = this.dir;
            }
        } else if (entity.vel.x !== 0) {
            const decel = Math.min(absX, this.deceleration * deltaTime);
            entity.vel.x += entity.vel.x > 0 ? -decel : decel;
        } else {
            this.distance = 0;
        }

        const drag = this.dragFactor * entity.vel.x * absX;
        entity.vel.x -= drag;

        this.distance += absX * deltaTime;
    }
}

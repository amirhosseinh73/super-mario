import Entity, { Trait } from "../Entity";

export default class Velocity extends Trait {
    constructor() {
        super("velocity");
    }

    public update(entity: Entity, { deltaTime }: GameContext): void {
        entity.pos.x += entity.vel.x * deltaTime;
        entity.pos.y += entity.vel.y * deltaTime;
    }
}

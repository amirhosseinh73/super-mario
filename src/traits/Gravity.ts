import { GameContext } from "../@types/traits";
import Entity, { Trait } from "../Entity";
import Level from "../Level";

export default class Gravity extends Trait {
    constructor() {
        super("gravity");
    }

    public update(entity: Entity, { deltaTime }: GameContext, level: Level): void {
        entity.vel.y += level.gravity * deltaTime;
    }
}

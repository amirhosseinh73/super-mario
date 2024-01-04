import { GameContext } from "../@types/traits";
import Entity from "../Entity";
import Level from "../Level";
import Trait from "../Trait";

export default class Gravity extends Trait {
    constructor() {
        super("gravity");
    }

    public update(entity: Entity, { deltaTime }: GameContext, level: Level): void {
        entity.vel.y += level.gravity * deltaTime;
    }
}

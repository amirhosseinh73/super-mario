import { GameContext } from "../@types/traits";
import Trait from "../Trait";
import Level from "../Level";
import Entity from "../Entity";

export default class Physics extends Trait {
    constructor() {
        super("physics");
    }

    public update(entity: Entity, gameContext: GameContext, level: Level): void {
        const { deltaTime } = gameContext;

        entity.pos.x += entity.vel.x * deltaTime;
        level.tileCollider!.checkX(entity, gameContext, level); //level.tileCollider checked in method before call

        entity.pos.y += entity.vel.y * deltaTime;
        level.tileCollider!.checkY(entity, gameContext, level);

        entity.vel.y += level.gravity * deltaTime;
    }
}

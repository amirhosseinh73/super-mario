import { GameContext } from "../@types/global";
import Entity, { Trait } from "../Entity";
import Level from "../Level";

export default class Physics extends Trait {
    constructor() {
        super("physics");
    }

    public update(entity: Entity, { deltaTime }: GameContext, level: Level): void {
        entity.pos.x += entity.vel.x * deltaTime;
        level.tileCollider!.checkX(entity); //level.tileCollider checked in method before call

        entity.pos.y += entity.vel.y * deltaTime;
        level.tileCollider!.checkY(entity);

        entity.vel.y += level.gravity * deltaTime;
    }
}

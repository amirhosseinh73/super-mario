import { GameContext } from "../@types/traits";
import Trait from "../Trait";
import Level from "../Level";
import Entity from "../Entity";

export default class Killable extends Trait {
    dead: boolean;
    deadTime: number;
    removeAfter: number;

    constructor() {
        super("killable");

        this.dead = false;
        this.deadTime = 0;
        this.removeAfter = 2;
    }

    public kill() {
        this.queue(() => (this.dead = true));
    }

    public revive() {
        this.dead = false;
        this.deadTime = 0;
    }

    public update(entity: Entity, { deltaTime }: GameContext, level: Level): void {
        if (!this.dead) return;

        this.deadTime += deltaTime;

        if (this.deadTime <= this.removeAfter) return;

        this.queue(() => {
            if (entity.traits.has("player")) entity.getTrait("player")?.die(entity.pos);
            else level.entities.delete(entity);
        });
    }
}

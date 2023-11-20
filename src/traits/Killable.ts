import Entity, { Trait } from "../Entity";
import Level from "../Level";

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

    public update(entity: Entity, deltaTime: number, level: Level): void {
        if (!this.dead) return;

        this.deadTime += deltaTime;

        if (this.deadTime <= this.removeAfter) return;

        this.queue(() => {
            level.entities.delete(entity);
        });
    }
}

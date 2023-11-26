import Entity, { Trait } from "../Entity";
import Level from "../Level";

export default class Emitter extends Trait {
    interval: number;
    coolDown: number;

    emitters: Function[];

    constructor() {
        super("emitter");

        this.interval = 2;
        this.coolDown = this.interval;

        this.emitters = [];
    }

    public emit(entity: Entity, level: Level) {
        for (const emitter of this.emitters) {
            emitter(entity, level);
        }
    }

    public update(entity: Entity, { deltaTime }: GameContext, level: Level): void {
        this.coolDown -= deltaTime;

        if (this.coolDown > 0) return;

        this.emit(entity, level);
        this.coolDown = this.interval;
    }
}

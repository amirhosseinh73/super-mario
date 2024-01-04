import { GameContext } from "../@types/traits";
import Entity from "../Entity";
import Level from "../Level";
import Trait from "../Trait";

export default class Emitter extends Trait {
    interval: number;
    coolDown: number;

    emitters: Function[];

    constructor() {
        super("emitter");

        this.interval = 4;
        this.coolDown = this.interval;

        this.emitters = [];
    }

    public emit(entity: Entity, gameContext: GameContext, level: Level) {
        for (const emitter of this.emitters) {
            emitter(entity, gameContext, level);
        }
    }

    public update(entity: Entity, gameContext: GameContext, level: Level): void {
        if (gameContext.deltaTime) this.coolDown -= gameContext.deltaTime;

        if (this.coolDown > 0) return;

        this.emit(entity, gameContext, level);
        this.coolDown = this.interval;
    }
}

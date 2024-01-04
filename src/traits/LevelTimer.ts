import { GameContext } from "../@types/traits";
import Entity from "../Entity";
import Level from "../Level";
import Trait from "../Trait";

export default class LevelTimer extends Trait {
    static EVENT_TIMER_HURRY = Symbol("timer hurry");
    static EVENT_TIMER_OK = Symbol("timer ok");

    totalTime: number;
    currentTime: number;
    hurryTime: number;
    hurryEmitted: boolean | null;

    constructor() {
        super("levelTimer");

        this.totalTime = 300;
        this.currentTime = this.totalTime;
        this.hurryTime = 100;
        this.hurryEmitted = null;
    }

    public update(_entity: Entity, { deltaTime }: GameContext, level?: Level | undefined): void {
        this.currentTime -= deltaTime * 2;

        if (this.hurryEmitted !== true && this.currentTime < this.hurryTime) {
            level?.events.emit(LevelTimer.EVENT_TIMER_HURRY);
            this.hurryEmitted = true;
        }

        if (this.hurryEmitted !== false && this.currentTime > this.hurryTime) {
            level?.events.emit(LevelTimer.EVENT_TIMER_OK);
            this.hurryEmitted = false;
        }
    }
}

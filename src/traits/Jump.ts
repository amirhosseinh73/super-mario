import { GameContext } from "../@types/global";
import Entity, { Trait } from "../Entity";
import { Sides } from "../defines";

export default class Jump extends Trait {
    duration: number;
    velocity: number;
    engageTime: number;
    ready: number;

    requestTime: number;
    gracePeriod: number;

    speedBoost: 0.3;

    constructor() {
        super("jump");

        this.ready = 0;
        this.duration = 0.3;
        this.engageTime = 0;
        this.requestTime = 0;
        this.gracePeriod = 0.1;
        this.speedBoost = 0.3;

        this.velocity = 200;
    }

    public get falling() {
        return this.ready < 0;
    }

    public start() {
        this.requestTime = this.gracePeriod;
    }

    public cancel() {
        this.engageTime = 0;
        this.requestTime = 0;
    }

    public obstruct(_entity: Entity, side: Symbol): void {
        if (side === Sides.BOTTOM) this.ready = 1;
        else if (side === Sides.TOP) this.cancel();
    }

    public update(entity: Entity, { deltaTime, audioBoard }: GameContext): void {
        if (this.requestTime > 0) {
            if (this.ready > 0) {
                audioBoard.playAudio("jump");
                this.engageTime = this.duration;
                this.requestTime = 0;
            }

            this.requestTime -= deltaTime;
        }

        if (this.engageTime > 0) {
            entity.vel.y = -(this.velocity + Math.abs(entity.vel.x) * this.speedBoost);
            this.engageTime -= deltaTime;
        }

        this.ready--;
    }
}

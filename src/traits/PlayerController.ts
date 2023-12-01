import { EntityWithTraits, GameContext } from "./../@types/traits";
import Entity, { Trait } from "../Entity";
import Level from "../Level";
import { Vec2 } from "../Math";
import { KILLING_SCORE } from "../defines";

export default class PlayerController extends Trait {
    player: EntityWithTraits | null;
    checkpoint: Vec2;
    time: number;
    score: number;

    constructor() {
        super("playerController");

        this.checkpoint = new Vec2(0, 0);
        this.player = null;

        this.time = 300;
        this.score = 0;
    }

    public setPlayer(entity: EntityWithTraits) {
        this.player = entity;

        if (this.player.stomper)
            this.player.stomper.events.listen("stomp", () => {
                this.score += KILLING_SCORE;
            });
    }

    public update(_entity: Entity, { deltaTime }: GameContext, level: Level): void {
        if (!this.player) return;

        if (!level.entities.has(this.player)) {
            this.player.killable?.revive();
            this.player.pos.set(this.checkpoint.x, this.checkpoint.y);
            level.entities.add(this.player);
            return;
        }

        this.time -= deltaTime * 2;
    }
}

import { EntityWithTraits } from "../../@types/traits";
import Entity, { Trait } from "../Entity";
import Level from "../Level";
import { MARIO_INIT_POS } from "../defines";

export default class PlayerController extends Trait {
    player: EntityWithTraits | null;

    constructor() {
        super("playerController");

        this.player = null;
    }

    public setPlayer(entity: EntityWithTraits) {
        this.player = entity;
    }

    public update(entity: Entity, deltaTime: number, level: Level): void {
        if (!this.player) return;

        if (level.entities.has(this.player)) return;

        this.player.killable?.revive();
        this.player.pos.set(MARIO_INIT_POS.x, MARIO_INIT_POS.y);
        level.entities.add(this.player);
    }
}

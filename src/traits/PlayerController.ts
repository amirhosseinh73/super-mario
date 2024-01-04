import { GameContext } from "./../@types/traits";
import Entity from "../Entity";
import Trait from "../Trait";
import Level from "../Level";
import { Vec2 } from "../Math";

export default class PlayerController extends Trait {
    player: Entity | null;
    checkpoint: Vec2;

    constructor() {
        super("playerController");

        this.checkpoint = new Vec2(0, 0);
        this.player = null;
    }

    public setPlayer(entity: Entity) {
        this.player = entity;
    }

    public update(_entity: Entity, _gameContext: GameContext, level: Level): void {
        if (!this.player) return;

        if (!level.entities.has(this.player)) {
            this.player.getTrait("killable")?.revive();
            this.player.pos.set(this.checkpoint.x, this.checkpoint.y);
            level.entities.add(this.player);
            return;
        }
    }
}

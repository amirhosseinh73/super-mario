import { GameContext } from "../@types/traits";
import Entity from "../Entity";
import Level from "../Level";
import Trait from "../Trait";

export default class Trigger extends Trait {
    touches: Set<Entity>;
    conditions: any[];

    constructor() {
        super("trigger");

        this.touches = new Set();
        this.conditions = [];
    }

    public collides(_us: Entity, them: Entity): void {
        this.touches.add(them);
    }

    public update(entity: Entity, gameContext: GameContext, level: Level): void {
        if (this.touches.size > 0) {
            for (const condition of this.conditions) {
                condition(entity, this.touches, gameContext, level);
            }
            this.touches.clear();
        }
    }
}

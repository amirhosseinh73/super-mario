import { EntityWithTraits } from "./../@types/traits";
import Entity, { Trait } from "../Entity";
import SpriteSheet from "../SpriteSheet";
import { ENTITY_INIT_SIZE } from "../defines";
import Killable from "../traits/Killable";
import PendulumMove from "../traits/PendulumMove";
import Physics from "../traits/Physics";
import Solid from "../traits/Solid";
import { loadSpriteSheet } from "../loaders/sprite";

export const loadGoomba = async function (_audioContext: AudioContext) {
    return loadSpriteSheet("goomba").then(createGoombaFactory);
};

export class Behavior extends Trait {
    constructor() {
        super("behavior");
    }

    public collides(us: EntityWithTraits, them: EntityWithTraits): void {
        if (us.killable!.dead) return;

        if (!them.stomper) return;

        if (them.vel.y <= us.vel.y) {
            them.killable?.kill();
            return;
        }

        us.killable!.kill();
        us.pendulumMove.speed = 0;
    }
}

const createGoombaFactory = function (sprite: SpriteSheet) {
    const walkAnim = sprite.animations.get("walk") as (distance: number) => AnimationFrames;

    const routeAnim = function (goomba: EntityWithTraits): AnimationFrames {
        if (goomba.killable!.dead) return "flat";

        return walkAnim(goomba.lifetime);
    };

    const drawGoomba = function (this: EntityWithTraits, context: CanvasRenderingContext2D) {
        sprite.draw(routeAnim(this), context, 0, 0);
    };

    return function createGoomba() {
        const goomba = new Entity() as EntityWithTraits;
        goomba.size.set(ENTITY_INIT_SIZE.w, ENTITY_INIT_SIZE.h);

        goomba.addTrait(new Physics());
        goomba.addTrait(new Solid());
        goomba.addTrait(new PendulumMove());
        goomba.addTrait(new Behavior());
        goomba.addTrait(new Killable());

        goomba.draw = drawGoomba;

        return goomba;
    };
};

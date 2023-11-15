import { AnimationFrames } from "../../@types/statics";
import { EntityWithTraits } from "../../@types/traits";
import Entity, { Trait } from "../Entity";
import SpriteSheet from "../SpriteSheet";
import { ENTITY_INIT_SIZE } from "../defines";
import { loadSpriteSheet } from "../loaders";
import Killable from "../traits/Killable";
import PendulumWalk from "../traits/PendulumWalk";

export const loadGoomba = async function () {
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
            them.killable!.kill();
            return;
        }

        them.stomper.bounce();
        us.killable!.kill();
        us.pendulumWalk.speed = 0;
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

        goomba.addTrait(new PendulumWalk());
        goomba.addTrait(new Behavior());
        goomba.addTrait(new Killable());

        goomba.draw = drawGoomba;

        return goomba;
    };
};

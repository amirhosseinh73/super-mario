import { AnimationFrames } from "../../@types/statics";
import { EntityWithTraits } from "../../@types/traits";
import Entity, { Trait } from "../Entity";
import SpriteSheet from "../SpriteSheet";
import { ENTITY_INIT_SIZE } from "../defines";
import { loadSpriteSheet } from "../loaders";
import Killable from "../traits/Killable";
import PendulumWalk from "../traits/PendulumWalk";

export const loadKoopa = async function () {
    return loadSpriteSheet("koopa").then(createKoopaFactory);
};

class Behavior extends Trait {
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

const createKoopaFactory = function (sprite: SpriteSheet) {
    const walkAnim = sprite.animations.get("walk") as (distance: number) => AnimationFrames;

    const routeAnim = function (koopa: EntityWithTraits): AnimationFrames {
        if (koopa.killable!.dead) return "hiding";

        return walkAnim(koopa.lifetime);
    };

    const drawKoopa = function (this: EntityWithTraits, context: CanvasRenderingContext2D) {
        sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0);
    };

    return function createKoopa() {
        const koopa = new Entity() as EntityWithTraits;
        koopa.size.set(ENTITY_INIT_SIZE.w, ENTITY_INIT_SIZE.h);
        koopa.offset.y = 8;

        koopa.addTrait(new PendulumWalk());
        koopa.addTrait(new Behavior());
        koopa.addTrait(new Killable());

        koopa.draw = drawKoopa;

        return koopa;
    };
};

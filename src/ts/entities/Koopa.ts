import { AnimationFrames } from "../../@types/statics";
import { EntityWithTraits } from "../../@types/traits";
import Entity from "../Entity";
import SpriteSheet from "../SpriteSheet";
import { ENTITY_INIT_SIZE } from "../defines";
import { loadSpriteSheet } from "../loaders";
import PendulumWalk from "../traits/PendulumWalk";

export const loadKoopa = async function () {
    return loadSpriteSheet("koopa").then(createKoopaFactory);
};

const createKoopaFactory = function (sprite: SpriteSheet) {
    const walkAnim = sprite.animations.get("walk") as (distance: number) => AnimationFrames;

    const drawKoopa = function (this: EntityWithTraits, context: CanvasRenderingContext2D) {
        sprite.draw(walkAnim(this.lifetime), context, 0, 0, this.vel.x < 0);
    };

    return function createKoopa() {
        const koopa = new Entity() as EntityWithTraits;
        koopa.size.set(ENTITY_INIT_SIZE.w, ENTITY_INIT_SIZE.h);
        koopa.offset.y = 8;

        koopa.addTrait(new PendulumWalk());

        koopa.draw = drawKoopa;

        return koopa;
    };
};

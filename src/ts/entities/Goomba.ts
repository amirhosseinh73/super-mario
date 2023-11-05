import { AnimationFrames } from "../../@types/statics";
import { EntityWithTraits } from "../../@types/traits";
import Entity from "../Entity";
import SpriteSheet from "../SpriteSheet";
import { ENTITY_INIT_SIZE } from "../defines";
import { loadSpriteSheet } from "../loaders";
import PendulumWalk from "../traits/PendulumWalk";

export const loadGoomba = async function () {
    return loadSpriteSheet("goomba").then(createGoombaFactory);
};

const createGoombaFactory = function (sprite: SpriteSheet) {
    const walkAnim = sprite.animations.get("walk") as (distance: number) => AnimationFrames;

    const drawGoomba = function (this: EntityWithTraits, context: CanvasRenderingContext2D) {
        sprite.draw(walkAnim(this.lifetime), context, 0, 0);
    };

    return function createGoomba() {
        const goomba = new Entity() as EntityWithTraits;
        goomba.size.set(ENTITY_INIT_SIZE.w, ENTITY_INIT_SIZE.h);

        goomba.addTrait(new PendulumWalk());

        goomba.draw = drawGoomba;

        return goomba;
    };
};

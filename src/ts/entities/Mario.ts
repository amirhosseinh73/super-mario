import { MarioFrames } from "../../@types/levels";
import { EntityWithTraits } from "../../@types/traits";
import Entity from "../Entity";
import SpriteSheet from "../SpriteSheet";
import { FAST_DRAG, MARIO_INIT_SIZE, SLOW_DRAG } from "../defines";
import { createAnim } from "../helper";
import { loadSpriteSheet } from "../loaders";
import Go from "../traits/Go";
import Jump from "../traits/Jump";

export const loadMario = async function () {
    // const sprite = await loadSpriteSheet("mario");

    // return createMarioFactory(sprite);

    return loadSpriteSheet("mario").then(createMarioFactory);
};

const createMarioFactory = function (sprite: SpriteSheet) {
    // const frames: MarioFrames[] = ["run-1", "run-2", "run-3"];
    const runAnim = createAnim(["run-1", "run-2", "run-3"], 6);

    function routeFrame(mario: EntityWithTraits): MarioFrames {
        if (mario.jump.falling) return "jump";

        if (mario.go.distance > 0) {
            if ((mario.vel.x > 0 && mario.go.dir < 0) || (mario.vel.x < 0 && mario.go.dir > 0)) {
                return "break";
            }

            return runAnim(mario.go.distance) as MarioFrames;
        }

        return "idle";
    }

    function setTurboState(this: EntityWithTraits, turboOn: boolean) {
        this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
    }

    function drawMario(this: EntityWithTraits, context: CanvasRenderingContext2D) {
        sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
    }

    return function createMario() {
        const mario = new Entity() as EntityWithTraits;
        mario.size.set(MARIO_INIT_SIZE.w, MARIO_INIT_SIZE.h);

        mario.addTrait(new Go());
        mario.go.dragFactor = SLOW_DRAG;

        mario.addTrait(new Jump());

        mario.turbo = setTurboState;

        mario.draw = drawMario;

        return mario;
    };
};

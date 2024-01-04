import Entity from "../Entity";
import SpriteSheet from "../SpriteSheet";
import { ENTITY_INIT_SIZE } from "../defines";
import Killable from "../traits/Killable";
import PendulumMove from "../traits/PendulumMove";
import Physics from "../traits/Physics";
import Solid from "../traits/Solid";
import { loadSpriteSheet } from "../loaders/sprite";
import Trait from "../Trait";

export const loadGoomba = async function (_audioContext: AudioContext) {
    return loadSpriteSheet("goomba").then(createGoombaFactory);
};

export class Behavior extends Trait {
    constructor() {
        super("behavior");
    }

    public collides(us: Entity, them: Entity): void {
        const killable = us.getTrait("killable") as Killable;
        if (killable.dead) return;

        if (!them.traits.has("stomper")) return;

        if (them.vel.y <= us.vel.y) {
            them.getTrait("killable")?.kill();
            return;
        }

        killable.kill();
        us.getTrait("pendulumMove").speed = 0;
    }
}

const createGoombaFactory = function (sprite: SpriteSheet) {
    const walkAnim = sprite.animations.get("walk") as (distance: number) => AnimationFrames;

    const routeAnim = function (goomba: Entity): AnimationFrames {
        if (goomba.getTrait("killable")!.dead) return "flat";

        return walkAnim(goomba.lifetime);
    };

    const drawGoomba = function (this: Entity, context: CanvasRenderingContext2D) {
        sprite.draw(routeAnim(this), context, 0, 0);
    };

    return function createGoomba() {
        const goomba = new Entity();
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

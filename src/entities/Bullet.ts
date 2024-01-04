import { GameContext } from "./../@types/traits";
import Entity from "../Entity";
import SpriteSheet from "../SpriteSheet";
import { BULLET_INIT_SIZE, JUMP_OUT_POS } from "../defines";
import { loadSpriteSheet } from "../loaders/sprite";
import Killable from "../traits/Killable";
import Velocity from "../traits/Velocity";
import Level from "../Level";
import Gravity from "../traits/Gravity";
import Trait from "../Trait";

export const loadBullet = async function (_audioContext: AudioContext) {
    return loadSpriteSheet("bullet").then(createBulletFactory);
};

export class Behavior extends Trait {
    gravity: Gravity;

    constructor() {
        super("behavior");

        this.gravity = new Gravity();
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
        us.vel.set(JUMP_OUT_POS.x, JUMP_OUT_POS.y);
    }

    public update(entity: Entity, gameContext: GameContext, level: Level): void {
        if (entity.getTrait("killable")!.dead) {
            // entity is us
            this.gravity.update(entity, gameContext, level);
        }
    }
}

const createBulletFactory = function (sprite: SpriteSheet) {
    const drawBullet = function (this: Entity, context: CanvasRenderingContext2D) {
        sprite.draw("bullet", context, 0, 0, this.vel.x < 0);
    };

    return function createBullet() {
        const bullet = new Entity() as Entity;
        bullet.size.set(BULLET_INIT_SIZE.w, BULLET_INIT_SIZE.h);

        bullet.addTrait(new Velocity());
        bullet.addTrait(new Behavior());
        bullet.addTrait(new Killable());

        bullet.draw = drawBullet;

        return bullet;
    };
};

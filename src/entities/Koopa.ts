import { GameContext } from "./../@types/traits";
import Entity from "../Entity";
import SpriteSheet from "../SpriteSheet";
import { ENTITY_INIT_SIZE, JUMP_OUT_POS } from "../defines";
import { loadSpriteSheet } from "../loaders/sprite";
import Killable from "../traits/Killable";
import PendulumMove from "../traits/PendulumMove";
import Physics from "../traits/Physics";
import Solid from "../traits/Solid";
import Trait from "../Trait";

export const loadKoopa = async function (_audioContext: AudioContext) {
    return loadSpriteSheet("koopa").then(createKoopaFactory);
};

const STATE_WALKING = Symbol("walking");
const STATE_HIDING = Symbol("hiding");
const STATE_PANIC = Symbol("panic");

export class Behavior extends Trait {
    state: Symbol;
    hideTime: number;
    hideDuration: number;
    panicSpeed: number;
    walkSpeed: number | null;

    constructor() {
        super("behavior");

        this.hideTime = 0;
        this.hideDuration = 5;
        this.panicSpeed = 300;
        this.walkSpeed = null;

        this.state = STATE_WALKING;
    }

    public collides(us: Entity, them: Entity): void {
        if (us.getTrait("killable")!.dead) return;

        if (!them.traits.has("stomper")) return;

        if (them.vel.y <= us.vel.y) {
            this.handleNudge(us, them);
            return;
        }

        this.handleStomp(us, them);
    }

    public handleNudge(us: Entity, them: Entity) {
        const killable = them.getTrait("killable");
        if (this.state === STATE_WALKING) {
            killable?.kill();
        } else if (this.state === STATE_HIDING) {
            this.panic(us, them);
        } else if (this.state === STATE_PANIC) {
            const travelDir = Math.sign(us.vel.x);
            const impactDir = Math.sign(us.pos.x - them.pos.x);
            if (travelDir !== 0 && travelDir !== impactDir) {
                killable?.kill();
            }
        }
    }

    public handleStomp(us: Entity, _them: Entity) {
        if (this.state === STATE_WALKING) {
            this.hide(us);
        } else if (this.state === STATE_HIDING) {
            us.getTrait("killable")!.kill();
            us.vel.set(JUMP_OUT_POS.x, JUMP_OUT_POS.y);
            us.getTrait("solid")!.obstructs = false;
        } else if (this.state === STATE_PANIC) {
            this.hide(us);
        }
    }

    public hide(us: Entity) {
        const pendulumMove = us.getTrait("pendulumMove");
        us.vel.x = 0;
        pendulumMove.enabled = false;
        if (this.walkSpeed === null) {
            this.walkSpeed = pendulumMove.speed;
        }
        this.hideTime = 0;
        this.state = STATE_HIDING;
    }

    public unhide(us: Entity) {
        const pendulumMove = us.getTrait("pendulumMove");
        pendulumMove.enabled = true;
        if (this.walkSpeed) pendulumMove.speed = this.walkSpeed;
        this.state = STATE_WALKING;
    }

    public panic(us: Entity, them: Entity) {
        const pendulumMove = us.getTrait("pendulumMove");
        pendulumMove.enabled = true;
        pendulumMove.speed = this.panicSpeed * Math.sign(them.vel.x);
        this.state = STATE_PANIC;
    }

    public update(us: Entity, { deltaTime }: GameContext): void {
        if (this.state !== STATE_HIDING) return;

        this.hideTime += deltaTime;
        if (this.hideTime <= this.hideDuration) return;
        this.unhide(us);
    }
}

const createKoopaFactory = function (sprite: SpriteSheet) {
    const walkAnim = sprite.animations.get("walk") as (distance: number) => AnimationFrames;
    const wakeAnim = sprite.animations.get("wake") as (distance: number) => AnimationFrames;

    const routeAnim = function (koopa: Entity): AnimationFrames {
        const koobaBehavior = koopa.getTrait("behavior") as Behavior;
        if (koobaBehavior.state === STATE_HIDING) {
            if (koobaBehavior.hideTime > 3) {
                return wakeAnim(koobaBehavior.hideTime);
            }
            return "hiding";
        }

        if (koobaBehavior.state === STATE_PANIC) {
            return "hiding";
        }

        return walkAnim(koopa.lifetime);
    };

    const drawKoopa = function (this: Entity, context: CanvasRenderingContext2D) {
        sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0);
    };

    return function createKoopa() {
        const koopa = new Entity();
        koopa.size.set(ENTITY_INIT_SIZE.w, ENTITY_INIT_SIZE.h);
        koopa.offset.y = 8;

        koopa.addTrait(new Physics());
        koopa.addTrait(new Solid());
        koopa.addTrait(new PendulumMove());
        koopa.addTrait(new Behavior());
        koopa.addTrait(new Killable());

        koopa.draw = drawKoopa;

        return koopa;
    };
};

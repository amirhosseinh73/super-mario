import { EntityWithTraits } from "./../@types/traits";
import Entity, { Trait } from "../Entity";
import { GameContext } from "../@types/global";

export default class Stomper extends Trait {
    bounceSpeed: number;
    onStomp: () => void;
    didStomp: boolean;

    constructor() {
        super("stomper");

        this.bounceSpeed = 400;
        this.didStomp = false;

        this.onStomp = function () {};
    }

    public bounce(us: EntityWithTraits, them: EntityWithTraits) {
        us.bounds.bottom = them.bounds.top;
        us.vel.y = -this.bounceSpeed;
    }

    public collides(us: EntityWithTraits, them: EntityWithTraits): void {
        if (!them.killable || them.killable.dead) return;

        if (us.vel.y > them.vel.y) {
            this.bounce(us, them);
            this.didStomp = true;
            this.onStomp();
        }
    }

    public update(_entity: Entity, { audioBoard }: GameContext): void {
        if (this.didStomp) {
            audioBoard.playAudio("stomp");
            this.didStomp = false;
        }
    }
}

import Entity from "../Entity";
import Trait from "../Trait";

export default class Stomper extends Trait {
    static EVENT_STOMP = Symbol("stomp");

    bounceSpeed: number;

    constructor() {
        super("stomper");

        this.bounceSpeed = 400;
    }

    public bounce(us: Entity, them: Entity) {
        us.bounds.bottom = them.bounds.top;
        us.vel.y = -this.bounceSpeed;
    }

    public collides(us: Entity, them: Entity): void {
        const killable = them.getTrait("killable");
        if (!killable || killable.dead) return;

        if (us.vel.y > them.vel.y) {
            this.queue(() => this.bounce(us, them));

            us.sounds.add("stomp");
            us.events.emit(Stomper.EVENT_STOMP, us, them);
        }
    }
}

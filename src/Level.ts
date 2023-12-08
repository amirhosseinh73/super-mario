import { EntityWithTraits, GameContext } from "./@types/traits";
import Compositor from "./Compositor";
import EntityCollider from "./EntityCollider";
import EventEmitter from "./EventEmitter";
import { Matrix } from "./Math";
import MusicController from "./MusicController";
import TileCollider from "./TileCollider";
import { GRAVITY } from "./defines";

export default class Level {
    gravity: number;
    comp: Compositor;
    entities: Set<EntityWithTraits>;
    tiles!: Matrix;
    tileCollider: TileCollider;
    entityCollider: EntityCollider;
    totalTime: number;
    music: MusicController;
    events: EventEmitter;

    constructor() {
        this.gravity = GRAVITY;
        this.totalTime = 0;

        this.music = new MusicController();

        this.comp = new Compositor();
        this.entities = new Set();

        this.entityCollider = new EntityCollider(this.entities);

        this.tileCollider = new TileCollider();

        this.events = new EventEmitter();
    }

    public update(gameContext: GameContext) {
        this.entities.forEach(entity => {
            if (!this.tileCollider) return;

            entity.update(gameContext, this);
        });

        this.entities.forEach(entity => {
            this.entityCollider.check(entity);
        });

        this.entities.forEach(entity => {
            entity.finalize();
        });

        this.totalTime += gameContext.deltaTime;
    }
}

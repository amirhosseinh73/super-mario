import { EntityWithTraits } from "./@types/traits";
import Compositor from "./Compositor";
import EntityCollider from "./EntityCollider";
import { Matrix } from "./Math";
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

    constructor() {
        this.gravity = GRAVITY;
        this.totalTime = 0;

        this.comp = new Compositor();
        this.entities = new Set();
        // this.tiles = new Matrix();

        this.entityCollider = new EntityCollider(this.entities);

        this.tileCollider = new TileCollider();
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

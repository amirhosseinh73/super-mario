import { GameContext } from "./@types/audio";
import Compositor from "./Compositor";
import Entity from "./Entity";
import EntityCollider from "./EntityCollider";
import { Matrix } from "./Math";
import TileCollider from "./TileCollider";
import { GRAVITY } from "./defines";

export default class Level {
    gravity: number;

    comp: Compositor;
    entities: Set<Entity>;
    tiles!: Matrix;
    tileCollider: TileCollider | null;

    entityCollider: EntityCollider;

    totalTime: number;

    constructor() {
        this.gravity = GRAVITY;
        this.totalTime = 0;

        this.comp = new Compositor();
        this.entities = new Set();
        // this.tiles = new Matrix();

        this.entityCollider = new EntityCollider(this.entities);

        this.tileCollider = null;
    }

    public setCollisionGrid(matrix: Matrix) {
        this.tileCollider = new TileCollider(matrix);
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

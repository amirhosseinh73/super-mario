import Compositor from "./Compositor";
import Entity from "./Entity";
import { Matrix } from "./Math";
import TileCollider from "./TileCollider";
import { GRAVITY } from "./defines";

export default class Level {
    gravity: number;

    comp: Compositor;
    entities: Set<Entity>;
    tiles!: Matrix;
    tileCollider: TileCollider | null;

    totalTime: number;

    constructor() {
        this.gravity = GRAVITY;
        this.totalTime = 0;

        this.comp = new Compositor();
        this.entities = new Set();
        // this.tiles = new Matrix();

        this.tileCollider = null;
    }

    public setCollisionGrid(matrix: Matrix) {
        this.tileCollider = new TileCollider(matrix);
    }

    public update(deltaTime: number) {
        this.entities.forEach(entity => {
            if (!this.tileCollider) return;

            entity.update(deltaTime);

            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity);

            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity);

            entity.vel.y += this.gravity * deltaTime;
        });

        this.totalTime += deltaTime;
    }
}

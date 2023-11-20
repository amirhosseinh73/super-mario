import Entity from "./Entity";
import { Matrix } from "./Math";
import TileResolver from "./TileResolver";
import { Sides } from "./defines";

export default class TileCollider {
    tiles: TileResolver;

    constructor(tileMatrix: Matrix) {
        this.tiles = new TileResolver(tileMatrix);
    }

    public checkX(entity: Entity) {
        let x: number | undefined;

        if (entity.vel.x > 0) x = entity.bounds.right;
        else if (entity.vel.x < 0) x = entity.bounds.left;
        else return;

        const matches = this.tiles.searchByRange(x, x, entity.bounds.top, entity.bounds.bottom);

        matches.forEach(match => {
            if (match.tile.type !== "ground") return;

            if (entity.vel.x > 0) {
                if (entity.bounds.right > match.x1) {
                    entity.obstruct(Sides.RIGHT, match);
                }
            } else if (entity.vel.x < 0) {
                if (entity.bounds.left < match.x2) {
                    entity.obstruct(Sides.LEFT, match);
                }
            }
        });
    }

    public checkY(entity: Entity) {
        let y: number | undefined;

        if (entity.vel.y > 0) y = entity.bounds.bottom;
        else if (entity.vel.y < 0) y = entity.bounds.top;
        else return;

        const matches = this.tiles.searchByRange(entity.bounds.left, entity.bounds.right, y, y);

        matches.forEach(match => {
            if (match.tile.type !== "ground") return;

            //falling
            if (entity.vel.y > 0) {
                if (entity.bounds.bottom > match.y1) {
                    entity.obstruct(Sides.BOTTOM, match);
                }
            } else if (entity.vel.y < 0) {
                if (entity.bounds.top < match.y2) {
                    entity.obstruct(Sides.TOP, match);
                }
            }
        });
    }
}

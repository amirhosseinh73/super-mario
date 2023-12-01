import Entity from "../Entity";
import TileResolver from "../TileResolver";
import { Sides } from "../defines";

function handleX(entity: Entity, match: MatchTiles) {
    if (entity.vel.x > 0) {
        if (entity.bounds.right > match.x1) {
            entity.obstruct(Sides.RIGHT, match);
        }
    } else if (entity.vel.x < 0) {
        if (entity.bounds.left < match.x2) {
            entity.obstruct(Sides.LEFT, match);
        }
    }
}

function handleY(entity: Entity, match: MatchTiles, resolver: TileResolver | undefined) {
    if (entity.vel.y > 0) {
        if (entity.bounds.bottom > match.y1) {
            entity.obstruct(Sides.BOTTOM, match);
        }
    } else if (entity.vel.y < 0) {
        const grid = resolver?.matrix;
        if (grid) grid.delete(match.indexX, match.indexY);

        console.log("Collide from the bottom", match);

        if (entity.bounds.top < match.y2) {
            entity.obstruct(Sides.TOP, match);
        }
    }
}

const brick = [handleX, handleY];

export default brick;

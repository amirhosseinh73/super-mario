import Entity from "./Entity";
import { Matrix } from "./Math";
import TileResolver from "./TileResolver";
import ground from "./tiles/ground";

const handlers = {
    ground,
};

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
            this._handle(0, entity, match);
        });
    }

    public checkY(entity: Entity) {
        let y: number | undefined;

        if (entity.vel.y > 0) y = entity.bounds.bottom;
        else if (entity.vel.y < 0) y = entity.bounds.top;
        else return;

        const matches = this.tiles.searchByRange(entity.bounds.left, entity.bounds.right, y, y);

        matches.forEach(match => {
            //falling
            this._handle(1, entity, match);
        });
    }

    private _handle(index: number, entity: Entity, match: getByIndexReturnType) {
        if (!match.tile.type) return;
        const handler = handlers[match.tile.type][index];
        if (handler) handler(entity, match);
    }
}

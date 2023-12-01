import Entity from "./Entity";
import { Matrix } from "./Math";
import TileResolver from "./TileResolver";
import ground from "./tiles/ground";
import brick from "./tiles/brick";

const handlers = {
    ground,
    brick,
};

export default class TileCollider {
    resolvers: TileResolver[];

    constructor() {
        this.resolvers = [];
    }

    public addGrid(tileMatrix: Matrix) {
        this.resolvers.push(new TileResolver(tileMatrix));
    }

    public checkX(entity: Entity) {
        let x: number | undefined;

        if (entity.vel.x > 0) x = entity.bounds.right;
        else if (entity.vel.x < 0) x = entity.bounds.left;
        else return;

        for (const resolver of this.resolvers) {
            const matches = resolver.searchByRange(x, x, entity.bounds.top, entity.bounds.bottom);

            matches.forEach(match => {
                this._handle(0, entity, match);
            });
        }
    }

    public checkY(entity: Entity) {
        let y: number | undefined;

        if (entity.vel.y > 0) y = entity.bounds.bottom;
        else if (entity.vel.y < 0) y = entity.bounds.top;
        else return;

        for (const resolver of this.resolvers) {
            const matches = resolver.searchByRange(entity.bounds.left, entity.bounds.right, y, y);

            matches.forEach(match => {
                //falling
                this._handle(1, entity, match, resolver);
            });
        }
    }

    private _handle(
        index: number,
        entity: Entity,
        match: MatchTiles,
        resolver: TileResolver | undefined = undefined
    ) {
        if (!match.tile.type) return;
        const handler = handlers[match.tile.type][index];
        if (handler) handler(entity, match, resolver);
    }
}

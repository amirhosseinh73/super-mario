import { Matrix } from "./Math";
import TileResolver from "./TileResolver";
import ground from "./tiles/ground";
import brick from "./tiles/brick";
import Level from "./Level";
import { GameContext } from "./@types/traits";
import coin from "./tiles/coin";
import Entity from "./Entity";
import trigger from "./tiles/trigger";
import flag from "./tiles/flag";

const handlers = {
    ground,
    brick,
    coin,
    trigger,
    flag,
};

export default class TileCollider {
    resolvers: TileResolver[];

    constructor() {
        this.resolvers = [];
    }

    public addGrid(tileMatrix: Matrix) {
        this.resolvers.push(new TileResolver(tileMatrix));
    }

    public checkX(entity: Entity, gameContext: GameContext, level: Level) {
        let x: number | undefined;

        if (entity.vel.x > 0) x = entity.bounds.right;
        else if (entity.vel.x < 0) x = entity.bounds.left;
        else return;

        for (const resolver of this.resolvers) {
            const matches = resolver.searchByRange(x, x, entity.bounds.top, entity.bounds.bottom);

            matches.forEach(match => {
                this._handle(0, entity, match, resolver, gameContext, level);
            });
        }
    }

    public checkY(entity: Entity, gameContext: GameContext, level: Level) {
        let y: number | undefined;

        if (entity.vel.y > 0) y = entity.bounds.bottom;
        else if (entity.vel.y < 0) y = entity.bounds.top;
        else return;

        for (const resolver of this.resolvers) {
            const matches = resolver.searchByRange(entity.bounds.left, entity.bounds.right, y, y);

            matches.forEach(match => {
                //falling
                this._handle(1, entity, match, resolver, gameContext, level);
            });
        }
    }

    private _handle(
        index: number,
        entity: Entity,
        match: MatchTiles,
        resolver: TileResolver,
        gameContext: GameContext,
        level: Level
    ) {
        if (!match.tile.type) return;

        const tileCollisionContext: tileCollisionContextType = {
            entity,
            match,
            resolver,
            gameContext,
            level,
        };

        const handler = handlers[match.tile.type][index];
        if (handler) handler(tileCollisionContext);
    }
}

export type tileCollisionContextType = {
    entity: Entity;
    match: MatchTiles;
    resolver: TileResolver;
    gameContext: GameContext;
    level: Level;
};

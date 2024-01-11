import Entity from "./Entity";
import Player from "./traits/Player";

export const createPlayer = function (entity: Entity, name: string) {
    const player = new Player();
    player.name = name;
    entity.addTrait(player);
};

export const findPlayers = function* (entities: Set<Entity>) {
    for (const entity of entities) {
        if (entity.traits.has("player")) yield entity;
    }
};

import Entity from "./Entity";
import { MARIO_INIT_POS } from "./defines";
import Player from "./traits/Player";
import PlayerController from "./traits/PlayerController";

export const createPlayerEnv = function (playerEntity: Entity) {
    const playerEnv = new Entity();
    const playerControl = new PlayerController();
    playerControl.checkpoint.set(MARIO_INIT_POS.x, MARIO_INIT_POS.y);
    playerControl.setPlayer(playerEntity);
    playerEnv.addTrait(playerControl);
    return playerEnv;
};

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

import { EntityWithTraits } from "./@types/traits";
import Entity from "./Entity";
import Level from "./Level";
import { MARIO_INIT_POS } from "./defines";
import Player from "./traits/Player";
import PlayerController from "./traits/PlayerController";

export const createPlayerEnv = function (playerEntity: EntityWithTraits) {
    const playerEnv = new Entity();
    const playerControl = new PlayerController();
    playerControl.checkpoint.set(MARIO_INIT_POS.x, MARIO_INIT_POS.y);
    playerControl.setPlayer(playerEntity);
    playerEnv.addTrait(playerControl);
    return playerEnv as EntityWithTraits;
};

export const createPlayer = function (entity: EntityWithTraits) {
    entity.addTrait(new Player());

    return entity;
};

export const findPlayers = function* (level: Level) {
    for (const entity of level.entities) {
        if (entity.player) yield entity;
    }
};

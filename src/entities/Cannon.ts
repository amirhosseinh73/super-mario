import { GameContext } from "./../@types/traits";
import Entity from "../Entity";
import { loadAudioBoard } from "../loaders/audio";
import AudioBoard from "../AudioBoard";
import Emitter from "../traits/Emitter";
import Level from "../Level";
import { findPlayers } from "../player";
import { HOLD_FIRE_THRESHOLD } from "../defines";

export const loadCannon = async function (audioContext: AudioContext) {
    const audio = await loadAudioBoard("cannon", audioContext);

    return createCannonFactory(audio);
};

const createCannonFactory = function (audio: AudioBoard) {
    const emitBullet = function (cannon: Entity, { entityFactory }: GameContext, level: Level) {
        let dir = 1;

        for (const player of findPlayers(level.entities)) {
            const CLOSE_TO_CANNON =
                player.pos.x > cannon.pos.x - HOLD_FIRE_THRESHOLD &&
                player.pos.x < cannon.pos.x + HOLD_FIRE_THRESHOLD;

            if (CLOSE_TO_CANNON) return;

            if (player.pos.x < cannon.pos.x) dir = -1;
        }

        const bullet = entityFactory.bullet();

        bullet.pos.copy(cannon.pos);
        bullet.vel.set(80 * dir, 0);

        cannon.sounds.add("shoot");
        level.entities.add(bullet);
    };

    return function createCannon() {
        const cannon = new Entity();
        cannon.audio = audio;

        const emitter = new Emitter();
        emitter.emitters.push(emitBullet);
        cannon.addTrait(emitter);

        return cannon;
    };
};

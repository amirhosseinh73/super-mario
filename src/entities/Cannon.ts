import { EntityWithTraits } from "./../@types/traits";
import Entity from "../Entity";
import { loadAudioBoard } from "../loaders/audio";
import AudioBoard from "../AudioBoard";
import Emitter from "../traits/Emitter";
import Level from "../Level";
import { findPlayers } from "../player";
import { HOLD_FIRE_THRESHOLD } from "../defines";

export const loadCannon = async function (
    audioContext: AudioContext,
    entityFactories: EntityFactories
) {
    const audio = await loadAudioBoard("cannon", audioContext);

    return createCannonFactory(audio, entityFactories);
};

const createCannonFactory = function (audio: AudioBoard, entityFactories: EntityFactories) {
    const emitBullet = function (cannon: Entity, level: Level) {
        let dir = 1;

        for (const player of findPlayers(level)) {
            const CLOSE_TO_CANNON =
                player.pos.x > cannon.pos.x - HOLD_FIRE_THRESHOLD &&
                player.pos.x < cannon.pos.x + HOLD_FIRE_THRESHOLD;

            if (CLOSE_TO_CANNON) return;

            if (player.pos.x < cannon.pos.x) dir = -1;
        }

        const bullet = entityFactories.bullet();

        bullet.pos.copy(cannon.pos);
        bullet.vel.set(80 * dir, 0);

        cannon.sounds.add("shoot");
        level.entities.add(bullet);
    };

    return function createCannon() {
        const cannon = new Entity() as EntityWithTraits;
        cannon.audio = audio;

        const emitter = new Emitter();
        emitter.interval = 0.2;
        emitter.emitters.push(emitBullet);
        cannon.addTrait(emitter);

        return cannon;
    };
};
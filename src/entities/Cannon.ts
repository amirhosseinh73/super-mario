import { EntityWithTraits } from "./../@types/traits";
import Entity from "../Entity";
import { loadAudioBoard } from "../loaders/audio";
import AudioBoard from "../AudioBoard";
import Emitter from "../traits/Emitter";
import Level from "../Level";

export const loadCannon = async function (
    audioContext: AudioContext,
    entityFactories: EntityFactories
) {
    const audio = await loadAudioBoard("cannon", audioContext);

    return createCannonFactory(audio, entityFactories);
};

const createCannonFactory = function (audio: AudioBoard, entityFactories: EntityFactories) {
    const emitBullet = function (cannon: Entity, level: Level) {
        const bullet = entityFactories.bullet();

        bullet.pos.copy(cannon.pos);

        level.entities.add(bullet);
    };

    return function createCannon() {
        const cannon = new Entity() as EntityWithTraits;
        cannon.audio = audio;

        const emitter = new Emitter();
        emitter.emitters.push(emitBullet);
        cannon.addTrait(emitter);

        return cannon;
    };
};

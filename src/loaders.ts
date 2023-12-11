import { EntityFactories, EntityWithTraits } from "./@types/traits";
import { loadBullet } from "./entities/Bullet";
import { loadCannon } from "./entities/Cannon";
import { loadGoomba } from "./entities/Goomba";
import { loadKoopa } from "./entities/Koopa";
import { loadMario } from "./entities/Mario";

export const loadImage = function (url: string): Promise<CanvasImageSource> {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener("load", () => {
            resolve(image);
        });
        image.src = url;
    });
};

export const loadJSON = async function (
    url: string
): Promise<LevelsInterface | SpritesInterface | AudioType | MusicType | patternsData> {
    return fetch(url).then(r => r.json());
};

export const loadEntities = async function (audioContext: AudioContext) {
    const entityFactories: EntityFactories = {
        mario: function (): EntityWithTraits {
            throw new Error("Function not implemented.");
        },
        goomba: function (): EntityWithTraits {
            throw new Error("Function not implemented.");
        },
        koopa: function (): EntityWithTraits {
            throw new Error("Function not implemented.");
        },
        bullet: function (): EntityWithTraits {
            throw new Error("Function not implemented.");
        },
        cannon: function (): EntityWithTraits {
            throw new Error("Function not implemented.");
        },
    };

    const AddAs = function (name: EntityNames) {
        return (factory: () => EntityWithTraits) => (entityFactories[name] = factory);
    };

    return Promise.all([
        loadMario(audioContext).then(AddAs("mario")),
        loadGoomba(audioContext).then(AddAs("goomba")),
        loadKoopa(audioContext).then(AddAs("koopa")),
        loadBullet(audioContext).then(AddAs("bullet")),
        loadCannon(audioContext).then(AddAs("cannon")),
    ]).then(() => entityFactories);
};

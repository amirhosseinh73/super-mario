import { AudioInterface } from "./@types/audio";
import { EntityFactories, LevelsInterface, SpritesInterface } from "./@types/levels";
import { EntityNames, SpritesFileNames } from "./@types/statics";
import { EntityWithTraits } from "./@types/traits";
import SpriteSheet from "./SpriteSheet";
import { TILE_SIZE } from "./defines";
import { loadGoomba } from "./entities/Goomba";
import { loadKoopa } from "./entities/Koopa";
import { loadMario } from "./entities/Mario";
import { createAnim } from "./helper";

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
): Promise<LevelsInterface | SpritesInterface | AudioInterface> {
    return fetch(url).then(r => r.json());
};

export const loadSpriteSheet = async function (name: SpritesFileNames) {
    const sheetSpec = (await loadJSON(`/data/sprites/${name}.json`)) as SpritesInterface;

    const image = await loadImage(sheetSpec.imageURL);

    const sprites = new SpriteSheet(
        image,
        sheetSpec.tileW || TILE_SIZE,
        sheetSpec.tileH || TILE_SIZE
    );

    sheetSpec.tiles?.forEach(tileSpec => {
        sprites.defineTile(tileSpec.name, tileSpec.index[0], tileSpec.index[1]);
    });

    sheetSpec.frames?.forEach(frameSpec => {
        sprites.define(frameSpec.name, ...frameSpec.rect);
    });

    sheetSpec.animations?.forEach(animSpec => {
        const animation = createAnim(animSpec.frames, animSpec.frameLen);
        sprites.defineAnim(animSpec.name, animation);
    });

    return sprites;
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
    };

    const AddAs = function (name: EntityNames) {
        return (factory: () => EntityWithTraits) => (entityFactories[name] = factory);
    };

    return Promise.all([
        loadMario(audioContext).then(AddAs("mario")),
        loadGoomba(audioContext).then(AddAs("goomba")),
        loadKoopa(audioContext).then(AddAs("koopa")),
    ]).then(() => entityFactories);
};

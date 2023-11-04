import { LevelsInterface, SpritesFileNames, SpritesInterface } from "../@types/levels";
import SpriteSheet from "./SpriteSheet";
import { TILE_SIZE } from "./defines";
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

export const loadJSON = async function (url: string): Promise<LevelsInterface | SpritesInterface> {
    return fetch(url).then(r => r.json());
};

export const loadSpriteSheet = async function (name: SpritesFileNames) {
    const sheetSpec = (await loadJSON(`/@sprites/${name}.json`)) as SpritesInterface;

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
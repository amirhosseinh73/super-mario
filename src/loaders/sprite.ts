import SpriteSheet from "../SpriteSheet";
import { TILE_SIZE } from "../defines";
import { createAnim } from "../helper";
import { loadImage, loadJSON } from "../loaders";

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

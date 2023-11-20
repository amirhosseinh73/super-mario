import SpriteSheet from "../SpriteSheet";
import { FONT_SIZE } from "../defines";
import { loadImage } from "../loaders";

const CHARS =
    " !\"#$%&'()*+,-./0123456789:;<=>@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";

export const loadFont = function () {
    return loadImage("./assets/img/font.png").then(image => {
        const fontSprite = new SpriteSheet(image, FONT_SIZE, FONT_SIZE);

        fontSprite.define("A", 8, 16, FONT_SIZE, FONT_SIZE);

        return fontSprite;
    });
};

import { FontCharacters } from "../@types/fonts";
import SpriteSheet from "../SpriteSheet";
import { FONT_CHARS, FONT_SIZE } from "../defines";
import { loadImage } from "../loaders";

// const regexFont = new RegExp(`^[${FONT_CHARS}]$`);
function isOfTypeFontChars(text: string): text is FontCharacters {
    return [...text].includes(text);
}
export class Font {
    sprites: SpriteSheet;
    size = FONT_SIZE;

    constructor(sprites: SpriteSheet, size = FONT_SIZE) {
        this.sprites = sprites;
        this.size = size;
    }

    public print(text: string, context: CanvasRenderingContext2D, x: number, y: number) {
        [...text].forEach((char, pos) => {
            if (!isOfTypeFontChars(char)) return;
            this.sprites.draw(char, context, x + pos * this.size, y);
        });
    }
}

export const loadFont = async function () {
    return loadImage("./assets/img/font.png").then(image => {
        const fontSprite = new SpriteSheet(image, FONT_SIZE, FONT_SIZE);

        const rowLen = (image as HTMLImageElement).width;
        for (const [idx, char] of [...FONT_CHARS].entries()) {
            const x = (idx * FONT_SIZE) % rowLen;
            const y = Math.floor((idx * FONT_SIZE) / rowLen) * FONT_SIZE;
            fontSprite.define(char as FontCharacters, x, y, FONT_SIZE, FONT_SIZE);
        }

        return new Font(fontSprite);
    });
};

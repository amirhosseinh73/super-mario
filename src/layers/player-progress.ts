import Level from "../Level";
import { CREAT_SPRITE_LAYER_DIMENTIONS } from "../defines";
import { Font } from "../loaders/font";
import { findPlayers } from "../player";

const getPlayer = function (level: Level) {
    for (const entity of findPlayers(level)) return entity;
};

export const createPlayerProgressLayer = function (font: Font, level: Level) {
    const size = font.size;

    const spriteBuffer = document.createElement("canvas");
    spriteBuffer.width = CREAT_SPRITE_LAYER_DIMENTIONS.width;
    spriteBuffer.height = CREAT_SPRITE_LAYER_DIMENTIONS.height;
    const spriteBufferContext = spriteBuffer.getContext("2d") as CanvasRenderingContext2D;

    return function drawPlayerProgress(context: CanvasRenderingContext2D) {
        const entity = getPlayer(level);
        if (!entity) return;
        font.print(`WORLD ${level.name}`, context, size * 12, size * 12);

        spriteBufferContext.clearRect(0, 0, spriteBuffer.width, spriteBuffer.height);
        entity.draw(spriteBufferContext);
        context.drawImage(spriteBuffer, size * 12, size * 15);

        font.print(
            `x ${entity.player?.lives.toString().padStart(3, " ")}`,
            context,
            size * 16,
            size * 16
        );
    };
};

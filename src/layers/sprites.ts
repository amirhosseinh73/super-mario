import Camera from "../Camera";
import Entity from "../Entity";
import { CREAT_SPRITE_LAYER_DIMENTIONS } from "../defines";

export const createSpriteLayer = function (
    entities: Set<Entity>,
    width = CREAT_SPRITE_LAYER_DIMENTIONS.width,
    height = CREAT_SPRITE_LAYER_DIMENTIONS.width
) {
    const spriteBuffer = document.createElement("canvas");
    spriteBuffer.width = width;
    spriteBuffer.height = height;
    const spriteBufferContext = spriteBuffer.getContext("2d") as CanvasRenderingContext2D;

    return function drawSpriteLayer(context: CanvasRenderingContext2D, camera: Camera) {
        entities.forEach(entity => {
            spriteBufferContext.clearRect(0, 0, width, height);

            entity.draw(spriteBufferContext);

            context.drawImage(
                spriteBuffer,
                Math.floor(entity.pos.x - camera.pos.x),
                Math.floor(entity.pos.y - camera.pos.y)
            );
        });
    };
};

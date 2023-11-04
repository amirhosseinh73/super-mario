import { Position } from "../@types/global";
import { MatrixValueBackground } from "../@types/levels";
import Camera from "./Camera";
import Entity from "./Entity";
import Level from "./Level";
import { Matrix } from "./Math";
import SpriteSheet from "./SpriteSheet";
import TileResolver from "./TileResolver";
import {
    CREAT_SPRITE_LAYER_DIMENTIONS,
    RENDERED_HEIGHT,
    RENDERED_WIDTH,
    TILE_SIZE,
} from "./defines";

export const createBackgroundLayer = function (level: Level, tiles: Matrix, sprites: SpriteSheet) {
    const resolver = new TileResolver(tiles);

    const buffer = document.createElement("canvas");
    buffer.width = RENDERED_WIDTH;
    buffer.height = RENDERED_HEIGHT;

    const context = buffer.getContext("2d") as CanvasRenderingContext2D;

    function redraw(startIndex: number, endIndex: number) {
        context.clearRect(0, 0, buffer.width, buffer.height);

        for (let x = startIndex; x <= endIndex; ++x) {
            const col = tiles.grid[x];
            if (col) {
                col.forEach((tileBackground, y) => {
                    const tile = tileBackground as MatrixValueBackground;
                    if (sprites.animation.has(tile.name))
                        sprites.drawAnim(tile.name, context, x - startIndex, y, level.totalTime);
                    else {
                        sprites.drawTile(tile.name, context, x - startIndex, y);
                    }
                });
            }
        }
    }

    return function drawBackgroundLayer(context: CanvasRenderingContext2D, camera: Camera) {
        const drawWidth = resolver.toIndex(camera.size.x);
        const drawFrom = resolver.toIndex(camera.pos.x);
        const drawTo = drawFrom + drawWidth;
        redraw(drawFrom, drawTo);

        context.drawImage(buffer, -camera.pos.x % TILE_SIZE, -camera.pos.y);
    };
};

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
                entity.pos.x - camera.pos.x,
                entity.pos.y - camera.pos.y
            );
        });
    };
};

export function createCollisionLayer(level: Level) {
    const resolvedTiles: Position[] = [];

    const tileResolver = level.tileCollider?.tiles;
    if (!tileResolver) return;

    const tileSize = tileResolver.tileSize;

    const getByIndexOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.push({ x, y });
        return getByIndexOriginal.call(tileResolver, x, y);
    };

    return function drawCollision(context: CanvasRenderingContext2D, camera: Camera) {
        context.strokeStyle = "blue";
        resolvedTiles.forEach(({ x, y }) => {
            context.beginPath();
            context.rect(
                x * tileSize - camera.pos.x,
                y * tileSize - camera.pos.y,
                tileSize,
                tileSize
            );
            context.stroke();
        });

        context.strokeStyle = "red";
        level.entities.forEach(entity => {
            context.beginPath();
            context.rect(
                entity.pos.x - camera.pos.x,
                entity.pos.y - camera.pos.y,
                entity.size.x,
                entity.size.y
            );
            context.stroke();
        });

        resolvedTiles.length = 0;
    };
}

export const createCameraLayer = function (cameraToDraw: Camera) {
    return function drawCameraRect(context: CanvasRenderingContext2D, fromCamera: Camera) {
        context.strokeStyle = "purple";
        context.beginPath();
        context.rect(
            cameraToDraw.pos.x - fromCamera.pos.x,
            cameraToDraw.pos.y - fromCamera.pos.y,
            cameraToDraw.size.x,
            cameraToDraw.size.y
        );
        context.stroke();
    };
};

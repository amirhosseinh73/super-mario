import { MatrixValueBackground } from "../@types/levels";
import { AnimationNames } from "../@types/statics";
import Camera from "../Camera";
import Level from "../Level";
import { Matrix } from "../Math";
import SpriteSheet from "../SpriteSheet";
import TileResolver from "../TileResolver";
import { RENDERED_HEIGHT, RENDERED_WIDTH, TILE_SIZE } from "../defines";

export const createBackgroundLayer = function (level: Level, tiles: Matrix, sprites: SpriteSheet) {
    const resolver = new TileResolver(tiles);

    const buffer = document.createElement("canvas");
    buffer.width = RENDERED_WIDTH + 16;
    buffer.height = RENDERED_HEIGHT;

    const context = buffer.getContext("2d") as CanvasRenderingContext2D;

    function redraw(startIndex: number, endIndex: number) {
        context.clearRect(0, 0, buffer.width, buffer.height);

        for (let x = startIndex; x <= endIndex; ++x) {
            const col = tiles.grid[x];
            if (col) {
                col.forEach((tileBackground, y) => {
                    const tile = tileBackground as MatrixValueBackground;
                    if (sprites.animations.has(tile.name as AnimationNames))
                        sprites.drawAnim(
                            tile.name as AnimationNames,
                            context,
                            x - startIndex,
                            y,
                            level.totalTime
                        );
                    else sprites.drawTile(tile.name, context, x - startIndex, y);
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

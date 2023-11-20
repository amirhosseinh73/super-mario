import { Position } from "../@types/global";
import Camera from "../Camera";
import Level from "../Level";

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
                entity.bounds.left - camera.pos.x,
                entity.bounds.top - camera.pos.y,
                entity.size.x,
                entity.size.y
            );
            context.stroke();
        });

        resolvedTiles.length = 0;
    };
}

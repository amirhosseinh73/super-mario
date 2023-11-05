import {
    BackgroundLayers,
    BackgroundsTile,
    LevelsInterface,
    RangeType,
    patternsData,
} from "../../@types/levels";
import { levelsFileName } from "../../@types/statics";
import Level from "../Level";
import { Matrix } from "../Math";
import { createBackgroundLayer, createSpriteLayer } from "../layers";
import { loadJSON, loadSpriteSheet } from "../loaders";

const expandSpan = function* (xStart: number, xLen: number, yStart: number, yLen: number) {
    const xEnd = xStart + xLen;
    const yEnd = yStart + yLen;
    for (let x = xStart; x < xEnd; ++x) {
        for (let y = yStart; y < yEnd; ++y) {
            yield { x, y };
        }
    }
};

const expandRange = function (range: RangeType) {
    if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range;
        return expandSpan(xStart, xLen, yStart, yLen);
    } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range;
        return expandSpan(xStart, xLen, yStart, 1);
    } else {
        const [xStart, yStart] = range;
        return expandSpan(xStart, 1, yStart, 1);
    }
};

const expandRanges = function* (ranges: RangeType[]) {
    for (const range of ranges) {
        for (const item of expandRange(range)) {
            yield item;
        }
    }
};

const expandTiles = function (tiles: BackgroundLayers[], patterns: patternsData) {
    const expandedTiles: {
        tile: BackgroundsTile;
        x: number;
        y: number;
    }[] = [];

    function walkTiles(tiles: BackgroundLayers[], offsetX: number, offsetY: number) {
        for (const tile of tiles) {
            for (const { x, y } of expandRanges(tile.ranges)) {
                const derivedX = x + offsetX;
                const derivedY = y + offsetY;

                if (tile.pattern) {
                    const tilesOfPattern = patterns[tile.pattern];
                    walkTiles(tilesOfPattern.tiles, derivedX, derivedY);
                    continue;
                }

                expandedTiles.push({
                    tile,
                    x: derivedX,
                    y: derivedY,
                });
            }
        }
    }

    walkTiles(tiles, 0, 0);

    return expandedTiles;
};

const createCollisionGrid = function (tiles: BackgroundLayers[], patterns: patternsData) {
    const grid = new Matrix();

    for (const { tile, x, y } of expandTiles(tiles, patterns)) {
        grid.set(x, y, { type: tile.type });
    }

    return grid;
};

const createBackgroundGrid = function (tiles: BackgroundLayers[], patterns: patternsData) {
    const grid = new Matrix();

    for (const { tile, x, y } of expandTiles(tiles, patterns)) {
        grid.set(x, y, { name: tile.name });
    }

    return grid;
};

export const loadLevel = async function (name: levelsFileName) {
    const levelSpec = (await loadJSON(`/@levels/${name}.json`)) as LevelsInterface;

    const backgroundSprites = await loadSpriteSheet(levelSpec.spritesheet);

    const level = new Level();

    const mergedTiles = levelSpec.layers.reduce((mergedTiles: BackgroundLayers[], layerSpec) => {
        return mergedTiles.concat(layerSpec.tiles);
    }, []);

    const collisionGrid = createCollisionGrid(mergedTiles, levelSpec.patterns);
    level.setCollisionGrid(collisionGrid);

    levelSpec.layers.forEach(layer => {
        const backgroundGrid = createBackgroundGrid(layer.tiles, levelSpec.patterns);
        const backgroundLayer = createBackgroundLayer(level, backgroundGrid, backgroundSprites);
        level.comp.layers.push(backgroundLayer);
    });

    const spriteLayer = createSpriteLayer(level.entities);
    level.comp.layers.push(spriteLayer);

    return level;
};

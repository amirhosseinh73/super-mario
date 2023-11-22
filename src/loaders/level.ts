import {
    BackgroundLayers,
    EntityFactories,
    LevelsInterface,
    RangeType,
    patternsData,
} from "./../@types/levels";
import { levelsFileName } from "./../@types/statics";
import Level from "../Level";
import { Matrix } from "../Math";
import SpriteSheet from "../SpriteSheet";
import { loadJSON, loadSpriteSheet } from "../loaders";
import { createBackgroundLayer } from "../layers/background";
import { createSpriteLayer } from "../layers/sprites";

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
    for (const range of ranges) yield* expandRange(range);
};

const expandTiles = function* (tiles: BackgroundLayers[], patterns: patternsData) {
    function* walkTiles(
        tiles: BackgroundLayers[],
        offsetX: number,
        offsetY: number
    ): Generator<{
        tile: BackgroundLayers;
        x: number;
        y: number;
    }> {
        for (const tile of tiles) {
            for (const { x, y } of expandRanges(tile.ranges)) {
                const derivedX = x + offsetX;
                const derivedY = y + offsetY;

                if (tile.pattern) {
                    const tilesOfPattern = patterns[tile.pattern];
                    yield* walkTiles(tilesOfPattern.tiles, derivedX, derivedY);
                    continue;
                }

                yield {
                    tile,
                    x: derivedX,
                    y: derivedY,
                };
            }
        }
    }

    yield* walkTiles(tiles, 0, 0);
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

const setupCollision = function (levelSpec: LevelsInterface, level: Level) {
    const mergedTiles = levelSpec.layers.reduce((mergedTiles: BackgroundLayers[], layerSpec) => {
        return mergedTiles.concat(layerSpec.tiles);
    }, []);

    const collisionGrid = createCollisionGrid(mergedTiles, levelSpec.patterns);
    level.setCollisionGrid(collisionGrid);
};

const setupBackground = function (
    levelSpec: LevelsInterface,
    level: Level,
    backgroundSprites: SpriteSheet
) {
    levelSpec.layers.forEach(layer => {
        const backgroundGrid = createBackgroundGrid(layer.tiles, levelSpec.patterns);
        const backgroundLayer = createBackgroundLayer(level, backgroundGrid, backgroundSprites);
        level.comp.layers.push(backgroundLayer);
    });
};

const setupEntities = function (
    levelSpec: LevelsInterface,
    level: Level,
    entityFactory: EntityFactories
) {
    levelSpec.entities.forEach(({ name, pos: [x, y] }) => {
        const createEntity = entityFactory[name];
        const entity = createEntity();
        entity.pos.set(x, y);
        level.entities.add(entity);
    });

    const spriteLayer = createSpriteLayer(level.entities);
    level.comp.layers.push(spriteLayer);
};

export const createLevelLoader = async function (entityFactory: EntityFactories) {
    return async function loadLevel(name: levelsFileName) {
        const levelSpec = (await loadJSON(`/data/levels/${name}.json`)) as LevelsInterface;

        const backgroundSprites = await loadSpriteSheet(levelSpec.spritesheet);

        const level = new Level();

        setupCollision(levelSpec, level);
        setupBackground(levelSpec, level, backgroundSprites);
        setupEntities(levelSpec, level, entityFactory);

        return level;
    };
};

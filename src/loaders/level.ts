import Level from "../Level";
import { Matrix } from "../Math";
import SpriteSheet from "../SpriteSheet";
import { loadJSON } from "../loaders";
import { loadSpriteSheet } from "./sprite";
import { createBackgroundLayer } from "../layers/background";
import { createSpriteLayer } from "../layers/sprites";
import { EntityFactories, EntityWithTraits } from "../@types/traits";
import { loadMusicSheet } from "./music";
import Entity from "../Entity";
import LevelTimer from "../traits/LevelTimer";

const createTimer = function () {
    const timer = new Entity() as EntityWithTraits;
    timer.addTrait(new LevelTimer());
    return timer;
};

const setupBehavior = function (level: Level) {
    const timer = createTimer();
    level.entities.add(timer);

    level.events.listen(LevelTimer.EVENT_TIMER_OK, () => {
        level.music.playTheme();
    });
    level.events.listen(LevelTimer.EVENT_TIMER_HURRY, () => {
        level.music.playHurryTheme();
    });
};

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

const createGrid = function (tiles: BackgroundLayers[], patterns: patternsData) {
    const grid = new Matrix();

    for (const { tile, x, y } of expandTiles(tiles, patterns)) {
        grid.set(x, y, tile);
    }

    return grid;
};

const setupBackgrounds = function (
    levelSpec: LevelsInterface,
    level: Level,
    backgroundSprites: SpriteSheet
) {
    levelSpec.layers.forEach(layer => {
        const grid = createGrid(layer.tiles, levelSpec.patterns);
        const backgroundLayer = createBackgroundLayer(level, grid, backgroundSprites);
        level.comp.layers.push(backgroundLayer);
        level.tileCollider.addGrid(grid);
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

        const backgroundSprites = await loadSpriteSheet(levelSpec.spriteSheet);
        const musicPlayer = await loadMusicSheet(levelSpec.musicSheet);

        const level = new Level();

        level.music.setPlayer(musicPlayer);

        // setupCollision(levelSpec, level);
        setupBackgrounds(levelSpec, level, backgroundSprites);
        setupEntities(levelSpec, level, entityFactory);
        setupBehavior(level);

        return level;
    };
};

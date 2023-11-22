import {
    AnimationFrames,
    AnimationNames,
    EntityNames,
    MarioFrames,
    PatternNames,
    TileNames,
} from "./statics";
import { EntityWithTraits } from "./traits";

interface LevelsInterface {
    spritesheet: SpritesFileNames;
    layers: LayersData[];
    patterns: patternsData;
    entities: entitiesData[];
}

type RangeType = [number, number, number, number] | [number, number, number] | [number, number];

interface BackgroundsBase {
    name?: TileNames;
    type?: "ground";
    ranges: RangeType[];
    pattern?: PatternNames;
}

interface BackgroundsTile extends BackgroundsBase {
    name: TileNames;
    pattern: undefined;
}

interface BackgroundsPattern extends BackgroundsBase {
    name: undefined;
    pattern: PatternNames;
}

type BackgroundLayers = BackgroundsPattern | BackgroundsTile;

type patternsData = {
    [key in PatternNames]: {
        tiles: BackgroundsTile[];
    };
};

interface LayersData {
    tiles: BackgroundLayers[];
}

type entitiesData = {
    name: EntityNames;
    pos: number[];
};

interface MatrixValue {
    name?: TileNames;
    type?: BackgroundLayers["type"];
}

interface MatrixValueCollision extends MatrixValue {
    name: undefined;
    type: BackgroundLayers["type"];
}

interface MatrixValueBackground extends MatrixValue {
    name: TileNames;
    type: undefined;
}

interface SpritesInterface {
    imageURL: string;
    tileW?: number;
    tileH?: number;

    tiles?: SpritesTiles[];

    frames?: SpritesFrames[];

    animations?: SpritesAnimation[];
}

interface SpritesTiles {
    name: TileNames;
    index: number[];
}

interface SpritesFrames {
    name: MarioFrames;
    rect: [number, number, number, number];
}

interface SpritesAnimation {
    name: AnimationNames;
    frameLen: number;
    frames: AnimationFrames[];
}

type EntityFactories = {
    [key in EntityNames]: () => EntityWithTraits;
};

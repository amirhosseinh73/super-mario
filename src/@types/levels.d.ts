import {
    AnimationFrames,
    AnimationNames,
    EntityNames,
    MarioFrames,
    PatternNames,
    TileNames,
} from "./statics";
import { EntityWithTraits } from "./traits";

export interface LevelsInterface {
    spritesheet: SpritesFileNames;
    layers: LayersData[];
    patterns: patternsData;
}

export type RangeType =
    | [number, number, number, number]
    | [number, number, number]
    | [number, number];

export interface BackgroundsBase {
    name?: TileNames;
    type?: "ground";
    ranges: RangeType[];
    pattern?: PatternNames;
}

export interface BackgroundsTile extends BackgroundsBase {
    name: TileNames;
    pattern: undefined;
}

export interface BackgroundsPattern extends BackgroundsBase {
    name: undefined;
    pattern: PatternNames;
}

export type BackgroundLayers = BackgroundsPattern | BackgroundsTile;

export type patternsData = {
    [key in PatternNames]: {
        tiles: BackgroundsTile[];
    };
};

export interface LayersData {
    tiles: BackgroundLayers[];
}

export interface MatrixValue {
    name?: TileNames;
    type?: BackgroundLayers["type"];
}

export interface MatrixValueCollision extends MatrixValue {
    name: undefined;
    type: BackgroundLayers["type"];
}

export interface MatrixValueBackground extends MatrixValue {
    name: TileNames;
    type: undefined;
}

export interface SpritesInterface {
    imageURL: string;
    tileW?: number;
    tileH?: number;

    tiles?: SpritesTiles[];

    frames?: SpritesFrames[];

    animations?: SpritesAnimation[];
}

export interface SpritesTiles {
    name: TileNames;
    index: number[];
}

export interface SpritesFrames {
    name: MarioFrames;
    rect: [number, number, number, number];
}

export interface SpritesAnimation {
    name: AnimationNames;
    frameLen: number;
    frames: AnimationFrames[];
}

export type EntityFactories = {
    [key in EntityNames]: () => EntityWithTraits;
};

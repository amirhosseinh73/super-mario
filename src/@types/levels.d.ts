import { Position } from "./global";

export type levelsFileName = "1-1";

export type MarioFrames = "idle" | "run-1" | "run-2" | "run-3" | "break" | "jump";
export type ChanceFrames = "chance" | "chance-1" | "chance-2" | "chance-3";

export type TileNames =
    | "sky"
    | "ground"
    | MarioFrames
    | "block"
    | "brick"
    | ChanceFrames
    | pipePatternTiles
    | cloudPatternTiles;

export type MarioSide = "bottom" | "top";

export type pipePatternTiles =
    | "pipe-insert-vert-left"
    | "pipe-insert-vert-right"
    | "pipe-vert-left"
    | "pipe-vert-right";

export type cloudPatternTiles =
    | "cloud-1-1"
    | "cloud-1-2"
    | "cloud-1-3"
    | "cloud-2-1"
    | "cloud-2-2"
    | "cloud-2-3";

export type PatternNames =
    | "cloud-single"
    | "pipe-section-vert"
    | "pipe-cap-vert"
    | "pipe-2h"
    | "pipe-3h"
    | "pipe-4h";

export type patternsData = {
    [key in PatternNames]: {
        tiles: BackgroundsTile[];
    };
};

export interface LayersData {
    tiles: BackgroundLayers[];
}

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

// export type MatrixValue = MatrixValueBackground|MatrixValueCollision

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

export type SpritesFileNames = "overworld" | "underworld" | "mario";

export type AnimationFrames = MarioFrames | ChanceFrames;

export interface SpritesFrames {
    name: MarioFrames;
    rect: [number, number, number, number];
}

export interface SpritesAnimation {
    name: TileNames;
    frameLen: 1;
    frames: AnimationFrames[];
}

// export type ImageTilesType = {
//   [key in tileNamesType]: Position
// }

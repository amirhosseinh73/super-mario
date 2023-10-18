import { Position } from "./global";

export type levelsFileName = "1-1";

export type MarioFrames = "idle" | "run-1" | "run-2" | "run-3" | "break" | "jump";
export type ChanceFrames = "chance" | "chance-1" | "chance-2" | "chance-3";

export type TileNamesType = "sky" | "ground" | MarioFrames | "block" | "brick" | ChanceFrames;

export type MarioSide = "bottom" | "top";

// export type ImageTilesType = {
//   [key in tileNamesType]: Position
// }

export interface LevelsInterface {
    spritesheet: SpritesFileNames;
    backgrounds: BackgroundsInterface[];
}

export interface BackgroundsInterface {
    tile: TileNamesType;
    type?: TileNamesType;
    ranges: number[][];
}

export interface MatrixValueInterface {
    name: TileNamesType;
    type?: TileNamesType;
}

export interface SpritesInterface {
    imageURL: string;
    tileW?: number;
    tileH?: number;

    tiles?: SpritesTilesInterface[];

    frames?: SpritesFramesInterface[];

    animations?: SpritesAnimationInterface[];
}

export interface SpritesTilesInterface {
    name: TileNamesType;
    index: number[];
}

export type SpritesFileNames = "overworld" | "underworld" | "mario";

export type AnimationFrames = MarioFrames | ChanceFrames;

export interface SpritesFramesInterface {
    name: MarioFrames;
    rect: [number, number, number, number];
}

export interface SpritesAnimationInterface {
    name: TileNamesType;
    frameLen: 1;
    frames: AnimationFrames[];
}

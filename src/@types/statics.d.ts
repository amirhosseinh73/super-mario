export type levelsFileName = "1-1";
export type EntityNames = "mario" | "goomba" | "koopa";
export type SpritesFileNames = "overworld" | "underworld" | EntityNames;

export type MarioAnimationFrames = "run-1" | "run-2" | "run-3";
export type MarioFrames = "idle" | "break" | "jump" | MarioAnimationFrames;

export type ChanceAnimationFrames = "chance-1" | "chance-2" | "chance-3";

export type GoombaAnimationFrames = "walk-1" | "walk-2" | "flat";
export type GoombaFrames = GoombaAnimationFrames | "flat";

export type AnimationNames = "chance" | "run" | "walk";
export type AnimationFrames = MarioAnimationFrames | ChanceAnimationFrames | GoombaAnimationFrames;

export type TileNames =
    | "sky"
    | "ground"
    | MarioFrames
    | "block"
    | "brick"
    | ChanceAnimationFrames
    | pipePatternTiles
    | cloudPatternTiles
    | GoombaAnimationFrames;

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

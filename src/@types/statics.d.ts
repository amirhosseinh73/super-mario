type levelsFileName = "1-1";
type EntityNames = "mario" | "goomba" | "koopa" | "bullet" | "cannon";
type SpritesFileNames = "overworld" | "underworld" | EntityNames;

type MarioAnimationFrames = "run-1" | "run-2" | "run-3";
type MarioFrames = "idle" | "break" | "jump" | MarioAnimationFrames;

type ChanceAnimationFrames = "chance-1" | "chance-2" | "chance-3";

type GoombaAnimationFrames = "walk-1" | "walk-2" | "flat";
type KoopaAnimationFrames = "walk-1" | "walk-2" | "hiding" | "hiding-with-legs";

type AnimationNames = "chance" | "run" | "walk" | "wake";
type AnimationFrames =
    | MarioAnimationFrames
    | ChanceAnimationFrames
    | GoombaAnimationFrames
    | KoopaAnimationFrames;

type TileNames =
    | "sky"
    | "ground"
    | MarioFrames
    | "block"
    | "brick"
    | ChanceAnimationFrames
    | PipePatternTiles
    | CloudPatternTiles
    | GoombaAnimationFrames
    | KoopaAnimationFrames
    | CannonPatternTiles
    | BulletTiles;

type TileTypes = "ground" | "brick";

type MarioSide = "bottom" | "top";

type PipePatternTiles =
    | "pipe-insert-vert-left"
    | "pipe-insert-vert-right"
    | "pipe-vert-left"
    | "pipe-vert-right";

type CloudPatternTiles =
    | "cloud-1-1"
    | "cloud-1-2"
    | "cloud-1-3"
    | "cloud-2-1"
    | "cloud-2-2"
    | "cloud-2-3";

type PatternNames =
    | "cloud-single"
    | "pipe-section-vert"
    | "pipe-cap-vert"
    | "pipe-2h"
    | "pipe-3h"
    | "pipe-4h"
    | "cannon-2h";

type CannonPatternTiles = "cannon-1" | "cannon-2" | "cannon-3";
type BulletTiles = "bullet";

type LevelsFileName = "1-1" | "1-2";
type PatternsFileName = "overworld";
type EntityNames = "mario" | "goomba" | "koopa" | "bullet" | "cannon";
type SpritesFileNames = "overworld" | "underworld" | EntityNames;

type MarioAnimationFrames = "run-1" | "run-2" | "run-3";
type MarioFrames = "idle" | "break" | "jump" | MarioAnimationFrames;

type ChanceAnimationFrames = "chance-1" | "chance-2" | "chance-3";

type CoinAnimationFrames = "coin-1" | "coin-2" | "coin-3";

type GoombaAnimationFrames = "walk-1" | "walk-2" | "flat";
type KoopaAnimationFrames = "walk-1" | "walk-2" | "hiding" | "hiding-with-legs";

type AnimationNames = "chance" | "run" | "walk" | "wake" | "coin";
type AnimationFrames =
    | MarioAnimationFrames
    | ChanceAnimationFrames
    | GoombaAnimationFrames
    | KoopaAnimationFrames
    | CoinAnimationFrames;

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
    | BulletTiles
    | CoinAnimationFrames
    | CastlePatternTiles;

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
    | "cannon-2h"
    | "castle";

type CannonPatternTiles = "cannon-1" | "cannon-2" | "cannon-3";
type BulletTiles = "bullet";

type CastlePatternTiles =
    | "castle-crown-sky"
    | "castle-window-left"
    | "castle-window-right"
    | "castle-crown-wall"
    | "castle-wall"
    | "castle-entrance-top"
    | "castle-entrance-bottom";

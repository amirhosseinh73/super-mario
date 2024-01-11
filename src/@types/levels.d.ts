interface LevelsInterface {
    spriteSheet: SpritesFileNames;
    musicSheet: MusicFileNames;
    patternSheet: PatternsFileName;
    layers: LayersData[];
    // patterns: patternsData;
    entities: EntitiesData[];
    triggers?: TriggersData[];
    checkpoints?: CheckpointData[];
}

type RangeType = [number, number, number, number] | [number, number, number] | [number, number];

interface BackgroundsBase {
    name?: TileNames;
    type?: TileTypes;
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
    [key in PatternNames]: BackgroundsTile[];
};

interface LayersData {
    tiles: BackgroundLayers[];
}

type EntitiesData = {
    name: EntityNames;
    pos: number[];
};

type TriggersData = {
    type: "goto" | "something else";
    name: LevelsFileName;
    pos: number[];
};

type CheckpointData = {
    range: number;
    start: number;
};

interface MatrixValue {
    name?: TileNames;
    type?: BackgroundLayers["type"];
    ranges?: RangeType[];
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

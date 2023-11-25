export const TILE_SIZE = 16;
export const FONT_SIZE = 8;

export enum MARIO_INIT_POS {
    x = 64,
    y = 64, // 206
}

export enum MARIO_INIT_VEL {
    x = 200,
    y = -600,
}

export enum MARIO_INIT_SIZE {
    w = 14,
    h = 16,
}

export enum ENTITY_INIT_SIZE {
    w = 16,
    h = 16,
}

export enum BULLET_INIT_SIZE {
    w = 16,
    h = 14,
}

export enum JUMP_OUT_POS {
    x = 100,
    y = -200,
}

export const GRAVITY = 1500;

export const PRESSED = 1;
export const RELEASED = 0;

export enum KEYBOARD_KEY {
    SPACE = "Space",
    ARROW_RIGHT = "ArrowRight",
    ARROW_LEFT = "ArrowLeft",
    SPEED_X = "KeyX",
}

export const RENDERED_WIDTH = 256;
export const RENDERED_HEIGHT = 256;

export enum CREAT_SPRITE_LAYER_DIMENTIONS {
    width = 64,
    height = 64,
}

export const SLOW_DRAG = 0.001;
export const FAST_DRAG = 0.0002;

export const Sides = {
    TOP: Symbol("top"),
    BOTTOM: Symbol("bottom"),
    RIGHT: Symbol("right"),
    LEFT: Symbol("left"),
} as const;

export const KILLING_SCORE = 100;

export const FONT_FILE_NAME = "./assets/img/font-coin.png";

export const FONT_CHARS =
    " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";

export enum FONT_CHARS_ENUM {
    Space = " ",
    Exclamation = "!",
    DoubleQuote = '"',
    Hash = "#",
    Dollar = "$",
    Percent = "%",
    Ampersand = "&",
    SingleQuote = "'",
    LeftParenthesis = "(",
    RightParenthesis = ")",
    Asterisk = "*",
    Plus = "+",
    Comma = ",",
    Hyphen = "-",
    Period = ".",
    Slash = "/",
    Digit0 = "0",
    Digit1 = "1",
    Digit2 = "2",
    Digit3 = "3",
    Digit4 = "4",
    Digit5 = "5",
    Digit6 = "6",
    Digit7 = "7",
    Digit8 = "8",
    Digit9 = "9",
    Colon = ":",
    Semicolon = ";",
    LessThan = "<",
    Equals = "=",
    GreaterThan = ">",
    Question = "?",
    At = "@",
    UppercaseA = "A",
    UppercaseB = "B",
    UppercaseC = "C",
    UppercaseD = "D",
    UppercaseE = "E",
    UppercaseF = "F",
    UppercaseG = "G",
    UppercaseH = "H",
    UppercaseI = "I",
    UppercaseJ = "J",
    UppercaseK = "K",
    UppercaseL = "L",
    UppercaseM = "M",
    UppercaseN = "N",
    UppercaseO = "O",
    UppercaseP = "P",
    UppercaseQ = "Q",
    UppercaseR = "R",
    UppercaseS = "S",
    UppercaseT = "T",
    UppercaseU = "U",
    UppercaseV = "V",
    UppercaseW = "W",
    UppercaseX = "X",
    UppercaseY = "Y",
    UppercaseZ = "Z",
    LeftSquareBracket = "[",
    Backslash = "\\",
    RightSquareBracket = "]",
    Caret = "^",
    Underscore = "_",
    GraveAccent = "`",
    LowercaseA = "a",
    LowercaseB = "b",
    LowercaseC = "c",
    LowercaseD = "d",
    LowercaseE = "e",
    LowercaseF = "f",
    LowercaseG = "g",
    LowercaseH = "h",
    LowercaseI = "i",
    LowercaseJ = "j",
    LowercaseK = "k",
    LowercaseL = "l",
    LowercaseM = "m",
    LowercaseN = "n",
    LowercaseO = "o",
    LowercaseP = "p",
    LowercaseQ = "q",
    LowercaseR = "r",
    LowercaseS = "s",
    LowercaseT = "t",
    LowercaseU = "u",
    LowercaseV = "v",
    LowercaseW = "w",
    LowercaseX = "x",
    LowercaseY = "y",
    LowercaseZ = "z",
    LeftCurlyBrace = "{",
    VerticalBar = "|",
    RightCurlyBrace = "}",
    Tilde = "~",
}

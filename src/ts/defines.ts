export const TILE_SIZE = 16 as const;

export const MARIO_INIT_POS = {
    x: 64,
    y: 64, // 206
};

export const MARIO_INIT_VEL = {
    x: 200,
    y: -600,
};

export const MARIO_INIT_SIZE = {
    w: 14,
    h: 16,
} as const;

export const GRAVITY = 1500 as const;

export const PRESSED = 1;
export const RELEASED = 0;

export const KEYBOARD_KEY = {
    SPACE: "Space",
    ARROW_RIGHT: "ArrowRight",
    ARROW_LEFT: "ArrowLeft",
    SPEED_X: "KeyX",
} as const;

export const RENDERED_WIDTH = 256 + 16;
export const RENDERED_HEIGHT = 240;

export const SLOW_DRAG = 0.001 as const;
export const FAST_DRAG = 0.0002 as const;

export const Sides = {
    TOP: Symbol("top"),
    BOTTOM: Symbol("bottom"),
} as const;

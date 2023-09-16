import { ImageTilesType } from "../@types/levels"

export const TILE_SIZE = 16 as const

export const IMAGE_TILES: ImageTilesType = {
  mario: {
    x: 276,
    y: 44,
  },
}

export const MARIO_INIT_POS = {
  x: 64,
  y: 64, // 206
}

export const MARIO_INIT_VEL = {
  x: 200,
  y: -600,
}

export const MARIO_INIT_SIZE = {
  w: 14,
  h: 16,
} as const

export const GRAVITY = 2000 as const

export const PRESSED = true
export const RELEASED = false
export const KEYBOARD_KEY = {
  SPACE: "Space",
  ARROW_RIGHT: "ArrowRight",
  ARROW_LEFT: "ArrowLeft",
} as const

export const RENDERED_WIDTH = 256 + 16
export const RENDERED_HEIGHT = 256

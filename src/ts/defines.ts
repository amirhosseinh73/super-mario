import { ImageTilesType } from "../@types/global"

export const TILE_SIZE = 16 as const

export const IMAGE_TILES: ImageTilesType = {
  sky: {
    X: 3,
    Y: 23,
  },
  ground: {
    X: 0,
    Y: 0,
  },
  mario: {
    X: 276,
    Y: 44,
  },
}

export const MARIO_INIT_POS = {
  X: 64,
  Y: 206, // 206
}

export const MARIO_INIT_VEL = {
  X: 200,
  Y: -600,
}

export const GRAVITY = 30

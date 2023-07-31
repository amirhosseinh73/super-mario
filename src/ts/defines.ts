import { imageTilesType } from "../@types/global"

export const TILE_SIZE = 16 as const

export const IMAGE_TILES: imageTilesType = {
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

export const marioPos = {
  X: 64,
  Y: 64, // 206
}

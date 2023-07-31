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
    X: 16,
    Y: 3,
  },
}

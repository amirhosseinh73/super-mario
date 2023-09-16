import { Position } from "./global"

export type TileNamesType = "sky" | "ground" | "idle" | "block" | "brick" | "chance"

export type ImageTilesType = {
  [key in tileNamesType]: Position
}

export interface LevelsInterface {
  spritesheet: SpritesFileNames
  backgrounds: BackgroundsInterface[]
}

export interface BackgroundsInterface {
  tile: TileNamesType
  type?: TileNamesType
  ranges: number[][]
}

export interface MatrixValueInterface {
  name: TileNamesType
  type?: TileNamesType
}

export interface SpritesInterface {
  imageURL: string
  tileW: number
  tileH: number

  tiles: SpritesTilesInterface[]
}

export interface SpritesTilesInterface {
  name: TileNamesType
  index: number[]
}

export type SpritesFileNames = "overworld" | "underworld"

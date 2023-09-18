import { Position } from "./global"

export type MarioFrames = "idle" | "run-1" | "run-2" | "run-3"

export type TileNamesType = "sky" | "ground" | MarioFrames | "block" | "brick" | "chance"

// export type ImageTilesType = {
//   [key in tileNamesType]: Position
// }

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
  tileW?: number
  tileH?: number

  tiles?: SpritesTilesInterface[]

  frames?: SpritesFramesInterface[]
}

export interface SpritesTilesInterface {
  name: TileNamesType
  index: number[]
}

export type SpritesFileNames = "overworld" | "underworld" | "mario"

export interface SpritesFramesInterface {
  name: MarioFrames
  rect: [number, number, number, number]
}

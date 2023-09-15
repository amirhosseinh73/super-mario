import { Position } from "./global"

export type TileNamesType = "sky" | "ground" | "idle"

export type ImageTilesType = {
  [key in tileNamesType]: Position
}

export interface LevelsInterface {
  backgrounds: BackgroundsInterface[]
}

export interface BackgroundsInterface {
  tile: TileNamesType
  ranges: number[][]
}

export interface MatrixValueInterface {
  name: TileNamesType
}

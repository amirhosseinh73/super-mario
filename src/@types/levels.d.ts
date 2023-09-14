export type TileNamesType = "sky" | "ground" | "mario"

export type ImageTilesType = {
  [key in tileNamesType]: {
    X: number
    Y: number
  }
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

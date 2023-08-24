export type TileNamesType = "sky" | "ground" | "mario"

export type ImageTilesType = {
  [key in tileNamesType]: {
    X: number
    Y: number
  }
}

export type Position = {
  X: number
  Y: number
}

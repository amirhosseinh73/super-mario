export type tileNamesType = "sky" | "ground"

export type imageTilesType = {
  [key in tileNamesType]: {
    X: number
    Y: number
  }
}

import { loadImage, loadLevel } from "./loader"
import tiles from "../img/tiles.png"
import SpriteSheet from "./SpriteSheet"
import { IMAGE_TILES, TILE_SIZE } from "./defines"
import { levelsInterface } from "../@types/levels"
import { drawBackground } from "./helper"
import { tileNamesType } from "../@types/global"

const canvas = document.getElementById("screen") as HTMLCanvasElement
const context = canvas.getContext("2d") as CanvasRenderingContext2D

loadImage(tiles).then(image => {
  const sprites = new SpriteSheet(image, context, TILE_SIZE, TILE_SIZE)

  loadLevel("1-1").then((level: levelsInterface) => {
    level.backgrounds.forEach(background => {
      const tileSize = IMAGE_TILES[background.tile as tileNamesType]
      sprites.define(background.tile, tileSize.X, tileSize.Y)
      drawBackground(background, sprites)
    })
  })
})

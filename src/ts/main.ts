import { loadImage, loadLevel } from "./loader"
import SpriteSheet from "./SpriteSheet"
import { IMAGE_TILES, TILE_SIZE } from "./defines"
import { drawBackground } from "./helper"
import { ImageAddresses } from "./config"

const loadMarioSprite = async function () {
  return loadImage(ImageAddresses.characters).then(image => {
    const sprites = new SpriteSheet(image, context, TILE_SIZE, TILE_SIZE)

    const mario = IMAGE_TILES["mario"]
    sprites.define("mario", mario.X, mario.Y)

    return sprites
  })
}

const loadBackgroundSprites = async function () {
  return loadImage(ImageAddresses.tiles).then(image => {
    const sprites = new SpriteSheet(image, context, TILE_SIZE, TILE_SIZE)

    const ground = IMAGE_TILES["ground"]
    sprites.define("ground", ground.X, ground.Y)

    const sky = IMAGE_TILES["sky"]
    sprites.define("sky", sky.X, sky.Y)

    return sprites
  })
}

const canvas = document.getElementById("screen") as HTMLCanvasElement
const context = canvas.getContext("2d") as CanvasRenderingContext2D

Promise.all([loadMarioSprite(), loadBackgroundSprites(), loadLevel("1-1")]).then(
  ([mario, sprites, level]) => {
    level.backgrounds.forEach(background => {
      // const tileSize = IMAGE_TILES[background.tile as tileNamesType]
      // sprites.define(background.tile, tileSize.X, tileSize.Y)
      drawBackground(background, sprites)
    })
    mario.draw("mario", 64, 64)
  }
)

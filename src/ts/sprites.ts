import SpriteSheet from "./SpriteSheet"
import { ImageAddresses } from "./config"
import { IMAGE_TILES, TILE_SIZE } from "./defines"
import { loadImage } from "./loader"

export const loadMarioSprite = async function () {
  return loadImage(ImageAddresses.characters).then(image => {
    const sprites = new SpriteSheet(image, TILE_SIZE, TILE_SIZE)

    const mario = IMAGE_TILES["mario"]
    sprites.define("mario", mario.X, mario.Y, 16, 16)

    return sprites
  })
}

export const loadBackgroundSprites = async function () {
  return loadImage(ImageAddresses.tiles).then(image => {
    const sprites = new SpriteSheet(image, TILE_SIZE, TILE_SIZE)

    const ground = IMAGE_TILES["ground"]
    sprites.defineTile("ground", ground.X, ground.Y)

    const sky = IMAGE_TILES["sky"]
    sprites.defineTile("sky", sky.X, sky.Y)

    return sprites
  })
}

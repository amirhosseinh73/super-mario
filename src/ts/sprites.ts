import SpriteSheet from "./SpriteSheet"
import { ImageAddresses } from "./config"
import { IMAGE_TILES, TILE_SIZE } from "./defines"
import { loadImage } from "./loader"

export const loadMarioSprite = async function () {
  const image = await loadImage(ImageAddresses.characters)

  const sprites = new SpriteSheet(image, TILE_SIZE, TILE_SIZE)

  const mario = IMAGE_TILES["mario"]
  sprites.define("idle", mario.x, mario.y, 16, 16)

  return sprites
}

export const loadBackgroundSprites = async function () {
  const image = await loadImage(ImageAddresses.tiles)

  const sprites = new SpriteSheet(image, TILE_SIZE, TILE_SIZE)

  const ground = IMAGE_TILES["ground"]
  sprites.defineTile("ground", ground.x, ground.y)

  const sky = IMAGE_TILES["sky"]
  sprites.defineTile("sky", sky.x, sky.y)

  return sprites
}

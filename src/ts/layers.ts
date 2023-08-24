import { TileNamesType } from "../@types/global"
import { BackgroundsInterface } from "../@types/levels"
import Entity from "./Entity"
import SpriteSheet from "./SpriteSheet"

const drawBackground = function (
  background: BackgroundsInterface,
  context: CanvasRenderingContext2D,
  sprites: SpriteSheet
) {
  background.ranges.forEach(([x1, x2, y1, y2]) => {
    for (let i = x1; i < x2; i++) {
      for (let j = y1; j < y2; j++) {
        sprites.drawTile(background.tile as TileNamesType, context, i, j)
      }
    }
  })
}

export const createBackgroundLayer = function (
  backgrounds: BackgroundsInterface[],
  sprites: SpriteSheet
) {
  const buffer = document.createElement("canvas")
  buffer.width = 640
  buffer.height = 256

  backgrounds.forEach(background => {
    // const tileSize = IMAGE_TILES[background.tile as tileNamesType]
    // sprites.define(background.tile, tileSize.X, tileSize.Y)
    const bufferContext = buffer.getContext("2d") as CanvasRenderingContext2D
    drawBackground(background, bufferContext, sprites)
  })

  const drawBackgroundLayer = function (context: CanvasRenderingContext2D) {
    context.drawImage(buffer, 0, 0)
  }

  return drawBackgroundLayer
}

export const createSpriteLayer = function (entity: Entity) {
  const drawSpriteLayer = function (context: CanvasRenderingContext2D) {
    entity.draw(context)
  }

  return drawSpriteLayer
}

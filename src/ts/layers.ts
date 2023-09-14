import Entity from "./Entity"
import Level from "./Level"
import SpriteSheet from "./SpriteSheet"

export const createBackgroundLayer = function (level: Level, sprites: SpriteSheet) {
  const buffer = document.createElement("canvas")
  buffer.width = 640
  buffer.height = 256

  const bufferContext = buffer.getContext("2d") as CanvasRenderingContext2D
  level.tiles.grid.forEach((column, x) => {
    column.forEach((tile, y) => {
      sprites.drawTile(tile.name, bufferContext, x, y)
    })
  })

  const drawBackgroundLayer = function (context: CanvasRenderingContext2D) {
    context.drawImage(buffer, 0, 0)
  }

  return drawBackgroundLayer
}

export const createSpriteLayer = function (entities: Set<Entity>) {
  const drawSpriteLayer = function (context: CanvasRenderingContext2D) {
    entities.forEach(entity => {
      entity.draw(context)
    })
  }

  return drawSpriteLayer
}

import { backgroundsInterface } from "../@types/levels"
import SpriteSheet from "./SpriteSheet"

export const drawBackground = function (background: backgroundsInterface, sprites: SpriteSheet) {
  background.ranges.forEach(([x1, x2, y1, y2]) => {
    for (let i = x1; i < x2; i++) {
      for (let j = y1; j < y2; j++) {
        sprites.drawTile(background.tile, i, j)
      }
    }
  })
}

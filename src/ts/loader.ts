import { BackgroundsInterface } from "../@types/levels"
import Level from "./Level"
import { getLevelData } from "./helper"
import { createBackgroundLayer, createSpriteLayer } from "./layers"
import { loadBackgroundSprites } from "./sprites"

export const loadImage = function (url: string): Promise<CanvasImageSource> {
  return new Promise(resolve => {
    const image = new Image()
    image.addEventListener("load", () => {
      resolve(image)
    })
    image.src = url
  })
}

const createTiles = function (level: Level, backgrounds: BackgroundsInterface[]) {
  backgrounds.forEach(background => {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
      for (let x = x1; x < x2; x++) {
        for (let y = y1; y < y2; y++) {
          level.tiles.set(x, y, {
            name: background.tile,
          })
        }
      }
    })
  })
}

export const loadLevel = async function (name: string) {
  return Promise.all([getLevelData(name), loadBackgroundSprites()]).then(
    ([levelSpec, backgroundSprites]) => {
      const level = new Level()

      createTiles(level, levelSpec.backgrounds)

      const backgroundLayer = createBackgroundLayer(level, backgroundSprites)
      level.comp.layers.push(backgroundLayer)

      const spriteLayer = createSpriteLayer(level.entities)
      level.comp.layers.push(spriteLayer)

      return level
    }
  )
}

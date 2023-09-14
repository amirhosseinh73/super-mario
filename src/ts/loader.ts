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

export const loadLevel = async function (name: string) {
  return Promise.all([getLevelData(name), loadBackgroundSprites()]).then(
    ([levelSpec, backgroundSprites]) => {
      const level = new Level()

      const backgroundLayer = createBackgroundLayer(levelSpec.backgrounds, backgroundSprites)
      level.comp.layers.push(backgroundLayer)

      const spriteLayer = createSpriteLayer(level.entities)
      level.comp.layers.push(spriteLayer)

      return level
    }
  )
}

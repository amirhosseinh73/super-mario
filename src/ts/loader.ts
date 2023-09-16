import {
  BackgroundsInterface,
  LevelsInterface,
  SpritesFileNames,
  SpritesInterface,
} from "../@types/levels"
import Level from "./Level"
import SpriteSheet from "./SpriteSheet"
import { loadJSON } from "./helper"
import { createBackgroundLayer, createSpriteLayer } from "./layers"

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
  function applyRange(
    background: BackgroundsInterface,
    xStart: number,
    xLen: number,
    yStart: number,
    yLen: number
  ) {
    const xEnd = xStart + xLen
    const yEnd = yStart + yLen

    for (let x = xStart; x < xEnd; ++x) {
      for (let y = yStart; y < yEnd; ++y) {
        level.tiles.set(x, y, {
          name: background.tile,
          type: background.type,
        })
      }
    }
  }

  backgrounds.forEach(background => {
    background.ranges.forEach(range => {
      if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range
        applyRange(background, xStart, xLen, yStart, yLen)
      } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range
        applyRange(background, xStart, xLen, yStart, 1)
      } else if (range.length === 2) {
        const [xStart, yStart] = range
        applyRange(background, xStart, 1, yStart, 1)
      }
    })
  })
}

const loadSpriteSheet = async function (name: SpritesFileNames) {
  const sheetSpec = (await loadJSON(`/@sprites/${name}.json`)) as SpritesInterface

  const image = await loadImage(sheetSpec.imageURL)

  const sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH)

  sheetSpec.tiles.forEach(tile => {
    sprites.defineTile(tile.name, tile.index[0], tile.index[1])
  })

  return sprites
}

export const loadLevel = async function (name: string) {
  const levelSpec = (await loadJSON(`/@levels/${name}.json`)) as LevelsInterface

  const backgroundSprites = await loadSpriteSheet(levelSpec.spritesheet)

  const level = new Level()

  createTiles(level, levelSpec.backgrounds)

  const backgroundLayer = createBackgroundLayer(level, backgroundSprites)
  level.comp.layers.push(backgroundLayer)

  const spriteLayer = createSpriteLayer(level.entities)
  level.comp.layers.push(spriteLayer)

  return level
}

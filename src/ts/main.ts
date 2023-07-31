import { loadLevel } from "./loader"
import { loadBackgroundSprites, loadMarioSprite } from "./sprites"
import { marioPos } from "./defines"
import SpriteSheet from "./SpriteSheet"
import { position } from "../@types/global"
import Compositor from "./Compositor"
import { createBackgroundLayer } from "./layers"

const canvas = document.getElementById("screen") as HTMLCanvasElement
const context = canvas.getContext("2d") as CanvasRenderingContext2D

const createSpriteLayer = function (sprites: SpriteSheet, pos: position) {
  const drawSpriteLayer = function (context: CanvasRenderingContext2D) {
    sprites.draw("mario", context, pos.X, pos.Y)
  }

  return drawSpriteLayer
}

Promise.all([loadMarioSprite(), loadBackgroundSprites(), loadLevel("1-1")]).then(
  ([marioSprite, backgroundSprites, level]) => {
    const comp = new Compositor()

    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites)
    comp.layers.push(backgroundLayer)

    const spriteLayer = createSpriteLayer(marioSprite, marioPos)
    comp.layers.push(spriteLayer)

    const updateMarioPos = function () {
      comp.draw(context)
      marioSprite.draw("mario", context, marioPos.X, marioPos.Y)
      marioPos.X += 2
      marioPos.Y += 2

      requestAnimationFrame(updateMarioPos)
    }

    updateMarioPos()
  }
)

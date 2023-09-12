import { loadLevel } from "./loader"
import { loadBackgroundSprites } from "./sprites"
import { GRAVITY, KEYBOARD_KEY, MARIO_INIT_POS, MARIO_INIT_VEL } from "./defines"
import Compositor from "./Compositor"
import { createBackgroundLayer, createSpriteLayer } from "./layers"
import { createMario } from "./helper"
import Timer from "./Timer"
import KeyboardState from "./KeyboardState"

const canvas = document.getElementById("screen") as HTMLCanvasElement
const context = canvas.getContext("2d") as CanvasRenderingContext2D

Promise.all([createMario(), loadBackgroundSprites(), loadLevel("1-1")]).then(
  ([mario, backgroundSprites, level]) => {
    const comp = new Compositor()

    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites)
    comp.layers.push(backgroundLayer)

    mario.pos.set(MARIO_INIT_POS.X, MARIO_INIT_POS.Y)
    // mario.vel.set(MARIO_INIT_VEL.X, MARIO_INIT_VEL.Y)

    const input = new KeyboardState()
    input.addMapping(KEYBOARD_KEY.SPACE, (keyState: unknown) => {
      if (!mario.jump) return
      if (keyState) mario.jump.start()
      else mario.jump.start()
    })
    input.listenTo(window)

    const spriteLayer = createSpriteLayer(mario)
    comp.layers.push(spriteLayer)

    const timer = new Timer()

    timer.update = function update(deltaTime: number) {
      mario.update(deltaTime)

      comp.draw(context)

      mario.vel.y += GRAVITY * deltaTime
    }

    timer.start()
  }
)

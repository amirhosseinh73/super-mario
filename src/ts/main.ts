import { loadLevel } from "./loader"
import { loadBackgroundSprites } from "./sprites"
import { GRAVITY, MARIO_INIT_POS, MARIO_INIT_VEL } from "./defines"
import Compositor from "./Compositor"
import { createBackgroundLayer, createSpriteLayer } from "./layers"
import { createMario } from "./helper"
import Timer from "./Timer"

const canvas = document.getElementById("screen") as HTMLCanvasElement
const context = canvas.getContext("2d") as CanvasRenderingContext2D

Promise.all([createMario(), loadBackgroundSprites(), loadLevel("1-1")]).then(
  ([mario, backgroundSprites, level]) => {
    const comp = new Compositor()

    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites)
    comp.layers.push(backgroundLayer)

    mario.position.set(MARIO_INIT_POS.X, MARIO_INIT_POS.Y)
    mario.velocity.set(MARIO_INIT_VEL.X, MARIO_INIT_VEL.Y)

    const spriteLayer = createSpriteLayer(mario)
    comp.layers.push(spriteLayer)

    const timer = new Timer()

    timer.update = function update(deltaTime: number) {
      comp.draw(context)
      mario.update(deltaTime)
      mario.velocity.y += GRAVITY
    }

    timer.start()
  }
)

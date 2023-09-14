import { loadLevel } from "./loader"
import { GRAVITY, KEYBOARD_KEY, MARIO_INIT_POS } from "./defines"
import { createMario } from "./helper"
import Timer from "./Timer"
import KeyboardState from "./KeyboardState"

const canvas = document.getElementById("screen") as HTMLCanvasElement
const context = canvas.getContext("2d") as CanvasRenderingContext2D

Promise.all([createMario(), loadLevel("1-1")]).then(([mario, level]) => {
  mario.pos.set(MARIO_INIT_POS.X, MARIO_INIT_POS.Y)
  // mario.vel.set(MARIO_INIT_VEL.X, MARIO_INIT_VEL.Y)

  level.entities.add(mario)

  const input = new KeyboardState()
  input.addMapping(KEYBOARD_KEY.SPACE, (keyState: unknown) => {
    if (!mario.jump) return
    if (keyState) mario.jump.start()
    else mario.jump.start()
  })
  input.listenTo(window)

  const timer = new Timer()

  timer.update = function update(deltaTime: number) {
    // mario.update(deltaTime)
    level.update(deltaTime)

    level.comp.draw(context)

    mario.vel.y += GRAVITY * deltaTime
  }

  timer.start()
})

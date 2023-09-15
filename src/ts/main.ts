import { loadLevel } from "./loader"
import { MARIO_INIT_POS } from "./defines"
import { createMario, setupKeyboard } from "./helper"
import Timer from "./Timer"
import { createCollisionLayer } from "./layers"

const canvas = document.getElementById("screen") as HTMLCanvasElement
const context = canvas.getContext("2d") as CanvasRenderingContext2D

Promise.all([createMario(), loadLevel("1-1")]).then(([mario, level]) => {
  mario.pos.set(MARIO_INIT_POS.x, MARIO_INIT_POS.y)

  level.comp.layers.push(createCollisionLayer(level))

  level.entities.add(mario)

  const input = setupKeyboard(mario)
  input.listenTo(window)
  ;(["mousedown", "mousemove"] as ("mousedown" | "mousemove")[]).forEach(eventName => {
    canvas.addEventListener(eventName, event => {
      if (event.buttons === 1) {
        mario.vel.set(0, 0)
        mario.pos.set(event.offsetX, event.offsetY)
      }
    })
  })

  const timer = new Timer()
  timer.update = function update(deltaTime: number) {
    level.update(deltaTime)

    level.comp.draw(context)
  }

  timer.start()
})

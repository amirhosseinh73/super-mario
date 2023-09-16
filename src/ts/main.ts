import { loadLevel } from "./loader"
import { MARIO_INIT_POS } from "./defines"
import { createMario, setupKeyboard, setupMouseControlDebug } from "./helper"
import Timer from "./Timer"
import { createCameraLayer, createCollisionLayer } from "./layers"
import Camera from "./Camera"

const canvas = document.getElementById("screen") as HTMLCanvasElement
const context = canvas.getContext("2d") as CanvasRenderingContext2D

Promise.all([createMario(), loadLevel("1-1")]).then(([mario, level]) => {
  const camera = new Camera()

  mario.pos.set(MARIO_INIT_POS.x, MARIO_INIT_POS.y)

  level.comp.layers.push(createCollisionLayer(level), createCameraLayer(camera))

  level.entities.add(mario)

  const input = setupKeyboard(mario)
  input.listenTo(window)

  setupMouseControlDebug(canvas, mario, camera)

  const timer = new Timer()
  timer.update = function update(deltaTime: number) {
    level.update(deltaTime)

    level.comp.draw(context, camera)
  }

  timer.start()
})

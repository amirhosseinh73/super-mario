import { LevelsInterface, SpritesInterface } from "../@types/levels"
import { EntityWithTraits } from "../@types/traits"
import Camera from "./Camera"
import Entity from "./Entity"
import KeyboardState from "./KeyboardState"
import { KEYBOARD_KEY, MARIO_INIT_SIZE } from "./defines"
import { loadMarioSprite } from "./sprites"
import Go from "./traits/Go"
import Jump from "./traits/Jump"

export const createMario = async function () {
  const sprite = await loadMarioSprite()
  const mario = new Entity() as EntityWithTraits
  mario.size.set(MARIO_INIT_SIZE.w, MARIO_INIT_SIZE.h)

  mario.addTrait(new Go())
  mario.addTrait(new Jump())
  // mario.addTrait(new Velocity())

  mario.draw = function drawMario(context) {
    sprite.draw("idle", context, 0, 0)
  }

  return mario
}

export const loadJSON = async function (url: string): Promise<LevelsInterface | SpritesInterface> {
  return fetch(url).then(resp => {
    return resp.json()
  })
}

export const setupKeyboard = function (entity: EntityWithTraits) {
  const input = new KeyboardState()

  input.addMapping(KEYBOARD_KEY.SPACE, (keyState: boolean) => {
    if (keyState) entity.jump.start()
    else entity.jump.cancel()
  })

  input.addMapping(KEYBOARD_KEY.ARROW_RIGHT, (keyState: boolean) => {
    entity.go.dir = +keyState
  })

  input.addMapping(KEYBOARD_KEY.ARROW_LEFT, (keyState: boolean) => {
    entity.go.dir = -keyState
  })

  return input
}

export function setupMouseControlDebug(canvas: HTMLCanvasElement, entity: Entity, camera: Camera) {
  const eventNames = ["mousedown", "mousemove"] as ("mousedown" | "mousemove")[]

  let lastEvent: MouseEvent | undefined

  eventNames.forEach(eventName => {
    canvas.addEventListener(eventName, event => {
      if (event.buttons === 1) {
        entity.vel.set(0, 0)
        entity.pos.set(event.offsetX + camera.pos.x, event.offsetY + camera.pos.y)
      } else if (
        event.buttons === 2 &&
        lastEvent &&
        lastEvent.buttons === 2 &&
        lastEvent.type === "mousemove"
      ) {
        camera.pos.x -= event.offsetX - lastEvent.offsetX
      }

      lastEvent = event
    })
  })

  canvas.addEventListener("contextmenu", e => e.preventDefault())
}

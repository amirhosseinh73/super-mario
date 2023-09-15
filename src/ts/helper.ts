import { LevelsInterface } from "../@types/levels"
import { EntityWithTraits } from "../@types/traits"
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
    sprite.draw("idle", context, this.pos.x, this.pos.y)
  }

  return mario
}

export const getLevelData = async function (name: string): Promise<LevelsInterface> {
  return fetch(`/@levels/${name}.json`).then(resp => {
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

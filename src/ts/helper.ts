import { EntityWithTraits } from "../@types/traits"
import Entity from "./Entity"
import { loadMarioSprite } from "./sprites"
import Jump from "./traits/Jump"
import Velocity from "./traits/Velocity"

export const createMario = async function () {
  const sprite = await loadMarioSprite()
  const mario: EntityWithTraits = new Entity()

  mario.addTrait(new Velocity())
  mario.addTrait(new Jump())

  mario.draw = function drawMario(context_1) {
    sprite.draw("mario", context_1, this.pos.x, this.pos.y)
  }

  return mario
}

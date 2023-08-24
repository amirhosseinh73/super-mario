import Entity from "./Entity"
import { loadMarioSprite } from "./sprites"

export const createMario = async function () {
  const sprite = await loadMarioSprite()
  const mario = new Entity()

  mario.draw = function drawMario(context_1) {
    sprite.draw("mario", context_1, this.position.x, this.position.y)
  }
  mario.update = function updateMario(deltaTime) {
    this.position.x += this.velocity.x * deltaTime
    this.position.y += this.velocity.y * deltaTime
  }
  return mario
}

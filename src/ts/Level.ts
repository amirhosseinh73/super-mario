import Compositor from "./Compositor"
import Entity from "./Entity"
import { Matrix } from "./Math"
import TileCollider from "./TileCollider"
import { GRAVITY } from "./defines"

export default class Level {
  comp: Compositor
  entities: Set<Entity>
  tiles: Matrix
  tileCollider: TileCollider

  constructor() {
    this.comp = new Compositor()

    this.entities = new Set()

    this.tiles = new Matrix()

    this.tileCollider = new TileCollider(this.tiles)
  }

  public update(deltaTime: number) {
    this.entities.forEach(entity => {
      entity.update(deltaTime)

      entity.pos.x += entity.vel.x * deltaTime
      this.tileCollider.checkX(entity)

      entity.pos.y += entity.vel.y * deltaTime
      this.tileCollider.checkY(entity)

      entity.vel.y += GRAVITY * deltaTime
    })
  }
}

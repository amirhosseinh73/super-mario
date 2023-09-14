import Compositor from "./Compositor"
import Entity from "./Entity"
import { Matrix } from "./Math"

export default class Level {
  comp: Compositor
  entities: Set<Entity>
  tiles: Matrix

  constructor() {
    this.comp = new Compositor()

    this.entities = new Set()

    this.tiles = new Matrix()
  }

  public update(delteTime: number) {
    this.entities.forEach(entity => {
      entity.update(delteTime)
    })
  }
}

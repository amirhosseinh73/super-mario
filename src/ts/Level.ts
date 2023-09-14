import Compositor from "./Compositor"
import Entity from "./Entity"

export default class Level {
  comp: Compositor
  entities: Set<Entity>

  constructor() {
    this.comp = new Compositor()

    this.entities = new Set()
  }

  public update(delteTime: number) {
    this.entities.forEach(entity => {
      entity.update(delteTime)
    })
  }
}

import Entity, { Trait } from "../Entity"

export default class Go extends Trait {
  dir: number
  speed: number

  constructor() {
    super("go")

    this.dir = 0
    this.speed = 6000
  }

  public update(entity: Entity, deltaTime: number): void {
    entity.vel.x = this.speed * this.dir * deltaTime
  }
}

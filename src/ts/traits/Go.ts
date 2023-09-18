import Entity, { Trait } from "../Entity"

export default class Go extends Trait {
  dir: 0 | 1 | -1
  speed: number

  distance: number

  heading: 1 | -1

  constructor() {
    super("go")

    this.dir = 0
    this.speed = 6000

    this.distance = 0
    this.heading = 1
  }

  public update(entity: Entity, deltaTime: number): void {
    entity.vel.x = this.speed * this.dir * deltaTime

    if (this.dir) {
      this.heading = this.dir
      this.distance += Math.abs(entity.vel.x) * deltaTime
    } else this.distance = 0
  }
}

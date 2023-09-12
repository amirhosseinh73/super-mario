import Entity, { Trait } from "../Entity"

export default class Velocity extends Trait {
  public constructor() {
    super("velocity")
  }

  public update(entity: Entity, deltaTime: number): void {
    entity.pos.x += entity.vel.x * deltaTime
    entity.pos.y += entity.vel.y * deltaTime
  }
}

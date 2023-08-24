import { Vec2 } from "./Math"

export default class Entity {
  position: Vec2
  velocity: Vec2

  constructor() {
    this.position = new Vec2(0, 0)
    this.velocity = new Vec2(0, 0)
  }

  public draw!: (context: CanvasRenderingContext2D) => void
  public update!: (deltaTime: number) => void
}

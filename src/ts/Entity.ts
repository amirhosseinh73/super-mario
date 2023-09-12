import { MarioTraitNames } from "../@types/traits"
import { Vec2 } from "./Math"

export class Trait {
  NAME: MarioTraitNames

  public constructor(name: MarioTraitNames) {
    this.NAME = name
  }

  public update(_entity: Entity, _deltaTime: number): void {}
}

export default class Entity {
  pos: Vec2
  vel: Vec2
  traits: Trait[]

  constructor() {
    this.pos = new Vec2(0, 0)
    this.vel = new Vec2(0, 0)

    this.traits = []
  }

  public addTrait(trait: Trait) {
    this.traits.push(trait)
    // this[trait.NAME] = trait
    ;(this as any)[trait.NAME] = trait
  }

  public draw!: (context: CanvasRenderingContext2D) => void
  public update(deltaTime: number) {
    this.traits.forEach(trait => {
      trait.update(this, deltaTime)
    })
  }
}

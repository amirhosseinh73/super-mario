import Entity from "../ts/Entity"
import Jump from "../ts/traits/Jump"
import Velocity from "../ts/traits/Velocity"

export type MarioTraitNames = "jump" | "run" | "velocity"

type EntityWithTraits = Entity & {
  jump?: Jump
  velocity?: Velocity
}

import Entity from "../ts/Entity"
import Go from "../ts/traits/Go"
import Jump from "../ts/traits/Jump"
import Velocity from "../ts/traits/Velocity"

export type MarioTraitNames = "jump" | "run" | "velocity" | "go"

type EntityWithTraits = Entity & {
  jump: Jump
  velocity: Velocity
  go: Go
}

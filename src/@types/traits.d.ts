import Entity from "../ts/Entity";
import Go from "../ts/traits/Go";
import Jump from "../ts/traits/Jump";

export type MarioTraitNames = "jump" | "run" | "velocity" | "go";

type EntityWithTraits = Entity & {
    jump: Jump;
    // velocity: Velocity
    go: Go;
};

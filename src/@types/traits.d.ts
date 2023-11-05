import Entity from "../ts/Entity";
import Go from "../ts/traits/Go";
import Jump from "../ts/traits/Jump";

export type EntityTraitNames = "jump" | "go" | "pendulumWalk"; //"run" | "velocity" |

type EntityWithTraits = Entity & {
    jump: Jump;
    go: Go;
};

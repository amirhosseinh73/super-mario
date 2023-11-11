import Entity from "../ts/Entity";
import { Behavior as GoombaBehavior } from "../ts/entities/Goomba";
import Go from "../ts/traits/Go";
import Jump from "../ts/traits/Jump";
import Killable from "../ts/traits/Killable";
import PendulumWalk from "../ts/traits/PendulumWalk";
import PlayerController from "../ts/traits/PlayerController";
import Stomper from "../ts/traits/Stomper";

//"run" | "velocity" |
// export type EntityTraitNames = "jump" | "go" | "pendulumWalk" | "behavior" | "stomper" | "killable" | "playerController";

export type EntityTraitNames = keyof Traits;

export type Traits = {
    jump: Jump;
    go: Go;
    pendulumWalk: PendulumWalk;
    behavior?: GoombaBehavior;
    stomper?: Stomper;
    killable?: Killable;
    playerController?: PlayerController;
};

export type EntityWithTraits = Entity & Traits;

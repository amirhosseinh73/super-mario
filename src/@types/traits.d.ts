import Entity from "../ts/Entity";
import { Behavior as GoombaBehavior } from "../ts/entities/Goomba";
import { Behavior as KoopaBehavior } from "../ts/entities/Koopa";
import Go from "../ts/traits/Go";
import Jump from "../ts/traits/Jump";
import Killable from "../ts/traits/Killable";
import PendulumMove from "../ts/traits/PendulumMove";
import Physics from "../ts/traits/Physics";
import PlayerController from "../ts/traits/PlayerController";
import Solid from "../ts/traits/Solid";
import Stomper from "../ts/traits/Stomper";

export type EntityTraitNames = keyof Traits;

export type Traits = {
    jump: Jump;
    go: Go;
    pendulumMove: PendulumMove;
    behavior?: KoopaBehavior | GoombaBehavior;
    stomper?: Stomper;
    killable?: Killable;
    playerController?: PlayerController;
    solid?: Solid;
    physics?: Physics;
};

export type EntityWithTraits = Entity & Traits;

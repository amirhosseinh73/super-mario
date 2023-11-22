import Entity from "../Entity";
import { Behavior as GoombaBehavior } from "../entities/Goomba";
import { Behavior as KoopaBehavior } from "../entities/Koopa";
import Go from "../traits/Go";
import Jump from "../traits/Jump";
import Killable from "../traits/Killable";
import PendulumMove from "../traits/PendulumMove";
import Physics from "../traits/Physics";
import PlayerController from "../traits/PlayerController";
import Solid from "../traits/Solid";
import Stomper from "../traits/Stomper";

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

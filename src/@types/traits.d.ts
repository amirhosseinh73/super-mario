import Entity from "../Entity";
import { Behavior as GoombaBehavior } from "../entities/Goomba";
import { Behavior as KoopaBehavior } from "../entities/Koopa";
import Go from "../traits/Go";
import Gravity from "../traits/Gravity";
import Jump from "../traits/Jump";
import Killable from "../traits/Killable";
import LevelTimer from "../traits/LevelTimer";
import PendulumMove from "../traits/PendulumMove";
import Physics from "../traits/Physics";
import Player from "../traits/Player";
import PlayerController from "../traits/PlayerController";
import Solid from "../traits/Solid";
import Stomper from "../traits/Stomper";
import Trigger from "../traits/Trigger";
import Velocity from "../traits/Velocity";

type EntityTraitNames = keyof Traits;

type Traits = {
    jump: Jump;
    go: Go;
    pendulumMove: PendulumMove;
    behavior?: KoopaBehavior | GoombaBehavior;
    stomper?: Stomper;
    killable?: Killable;
    playerController?: PlayerController;
    solid?: Solid;
    physics?: Physics;
    velocity?: Velocity;
    gravity?: Gravity;
    emitter?: Emitter;
    player?: Player;
    levelTimer?: LevelTimer;
    trigger?: Trigger;
};

type EntityWithTraits = Entity & Traits;

type EntityFactories = {
    [key in EntityNames]: () => EntityWithTraits;
};

interface GameContext {
    audioContext: AudioContext;
    videoContext: CanvasRenderingContext2D;
    entityFactory: EntityFactories;
    deltaTime: number;
}

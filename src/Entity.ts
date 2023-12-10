import { EntityTraitNames, GameContext } from "./@types/traits";
import AudioBoard from "./AudioBoard";
import BoundingBox from "./BoundingBox";
import EventBuffer from "./EventBuffer";
import Level from "./Level";
import { Vec2 } from "./Math";

export class Trait {
    static EVENT_TASK = Symbol("task");

    NAME: EntityTraitNames;

    listeners: {
        name: Symbol;
        callback: (...args: unknown[]) => void;
        count: number;
    }[];

    constructor(name: EntityTraitNames) {
        this.NAME = name;

        this.listeners = [];
    }

    public listen(name: Symbol, callback: (...args: unknown[]) => void, count = Infinity) {
        const listener = { name, callback, count };

        this.listeners.push(listener);
    }

    public finalize(entity: Entity) {
        this.listeners = this.listeners.filter(listener => {
            entity.events.process(listener.name, listener.callback);
            return --listener.count;
        });
    }

    public queue(task: (...args: any[]) => void) {
        this.listen(Trait.EVENT_TASK, task, 1);
    }

    public collides(_us: Entity, _them: Entity) {}

    public obstruct(
        _entity: Entity,
        _side: Symbol,
        _match: MatchTiles | undefined = undefined
    ): void {
        // console.log(side)
    }

    public update(
        _entity: Entity,
        _gameContext: GameContext,
        _level: Level | undefined = undefined
    ): void {
        // console.warn("Unhandled update call in Trait");
    }
}

export default class Entity {
    pos: Vec2;
    vel: Vec2;
    size: Vec2;
    offset: Vec2;
    bounds: BoundingBox;
    traits: Trait[];
    lifetime: number;
    canCollide: boolean;
    audio: AudioBoard;
    sounds: Set<AudioNames>;
    events: EventBuffer;

    constructor() {
        this.canCollide = true;

        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
        this.size = new Vec2(0, 0);
        this.offset = new Vec2(0, 0);
        this.bounds = new BoundingBox(this.pos, this.size, this.offset);

        this.lifetime = 0;

        this.traits = [];

        this.audio = new AudioBoard();
        this.sounds = new Set();

        this.events = new EventBuffer();
    }

    public addTrait(trait: Trait) {
        this.traits.push(trait);
        (this as any)[trait.NAME] = trait;
    }

    public collides(candidate: Entity) {
        this.traits.forEach(trait => {
            trait.collides(this, candidate);
        });
    }

    public obstruct(side: Symbol, match: MatchTiles | undefined = undefined) {
        this.traits.forEach(trait => {
            trait.obstruct(this, side, match);
        });
    }

    public playSound(audioBoard: AudioBoard, audioContext: AudioContext) {
        this.sounds.forEach(name => {
            audioBoard.playAudio(name, audioContext);
        });

        this.sounds.clear();
    }

    public update(gameContext: GameContext, level: Level) {
        this.traits.forEach(trait => {
            trait.update(this, gameContext, level);
        });

        this.playSound(this.audio, gameContext.audioContext);

        this.lifetime += gameContext.deltaTime;
    }

    public draw(_context: CanvasRenderingContext2D) {}

    public finalize() {
        this.events.emit(Trait.EVENT_TASK, this);

        this.traits.forEach(trait => {
            trait.finalize(this);
        });

        this.events.clear();
    }

    public turbo: ((turboOn: boolean) => void) | undefined;
}

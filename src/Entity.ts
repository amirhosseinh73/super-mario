import { GameContext, TraitMap } from "./@types/traits";
import AudioBoard from "./AudioBoard";
import BoundingBox from "./BoundingBox";
import EventBuffer from "./EventBuffer";
import Level from "./Level";
import { Vec2 } from "./Math";
import Trait from "./Trait";

export default class Entity {
    pos: Vec2;
    vel: Vec2;
    size: Vec2;
    offset: Vec2;
    bounds: BoundingBox;
    traits: Map<keyof TraitMap, Trait>;
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

        this.traits = new Map();

        this.audio = new AudioBoard();
        this.sounds = new Set();

        this.events = new EventBuffer();
    }

    public addTrait(trait: Trait) {
        // console.log(trait.constructor);

        this.traits.set(trait.NAME, trait);
    }

    public getTrait<T extends keyof TraitMap>(traitName: T): TraitMap[T] {
        return this.traits.get(traitName);
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

import { getByIndexReturnType } from "../@types/tileResorver";
import { EntityTraitNames } from "../@types/traits";
import BoundingBox from "./BoundingBox";
import Level from "./Level";
import { Vec2 } from "./Math";

export class Trait {
    NAME: EntityTraitNames;
    tasks: Array<Function>;

    constructor(name: EntityTraitNames) {
        this.NAME = name;

        this.tasks = [];
    }

    public finalize() {
        this.tasks.forEach(task => task());
        this.tasks.length = 0;
    }

    public queue(task: () => void) {
        this.tasks.push(task);
    }

    public collides(_us: Entity, _them: Entity) {}

    public obstruct(
        _entity: Entity,
        _side: Symbol,
        _match: getByIndexReturnType | undefined = undefined
    ): void {
        // console.log(side)
    }

    public update(
        _entity: Entity,
        _deltaTime: number,
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

    constructor() {
        this.canCollide = true;

        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
        this.size = new Vec2(0, 0);
        this.offset = new Vec2(0, 0);
        this.bounds = new BoundingBox(this.pos, this.size, this.offset);

        this.lifetime = 0;

        this.traits = [];
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

    public obstruct(side: Symbol, match: getByIndexReturnType | undefined = undefined) {
        this.traits.forEach(trait => {
            trait.obstruct(this, side, match);
        });
    }

    public update(deltaTime: number, level: Level) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime, level);
        });

        this.lifetime += deltaTime;
    }

    public draw(_context: CanvasRenderingContext2D) {}

    public finalize() {
        this.traits.forEach(trait => {
            trait.finalize();
        });
    }

    public turbo: ((turboOn: boolean) => void) | undefined;
}

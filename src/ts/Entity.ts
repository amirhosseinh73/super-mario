import { EntityTraitNames } from "../@types/traits";
import BoundingBox from "./BoundingBox";
import { Vec2 } from "./Math";

export class Trait {
    NAME: EntityTraitNames;

    constructor(name: EntityTraitNames) {
        this.NAME = name;
    }

    public obstruct(_entity: Entity, _side: Symbol): void {
        // console.log(side)
    }

    public update(_entity: Entity, _deltaTime: number): void {
        console.warn("Unhandled update call in Trait");
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

    constructor() {
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

    public obstruct(side: Symbol) {
        this.traits.forEach(trait => {
            trait.obstruct(this, side);
        });
    }

    public update(deltaTime: number) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime);
        });

        this.lifetime += deltaTime;
    }

    public draw!: (context: CanvasRenderingContext2D) => void;

    public turbo: ((turboOn: boolean) => void) | undefined;
}

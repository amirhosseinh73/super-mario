import { MarioTraitNames } from "../@types/traits";
import { Vec2 } from "./Math";

export class Trait {
    NAME: MarioTraitNames;

    constructor(name: MarioTraitNames) {
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
    traits: Trait[];

    constructor() {
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
        this.size = new Vec2(0, 0);

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
    }

    public draw!: (context: CanvasRenderingContext2D) => void;

    public turbo!: (turboOn: boolean) => void;
}

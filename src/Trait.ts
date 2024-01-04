import { GameContext, TraitMap } from "./@types/traits";
import Entity from "./Entity";
import Level from "./Level";

export default class Trait {
    static EVENT_TASK = Symbol("task");

    NAME: keyof TraitMap;

    listeners: {
        name: Symbol;
        callback: (...args: unknown[]) => void;
        count: number;
    }[];

    constructor(name: keyof TraitMap) {
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

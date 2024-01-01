import { GameContext } from "./@types/traits";
import Camera from "./Camera";
import Compositor from "./Compositor";
import EventEmitter from "./EventEmitter";

export default class Scene {
    static EVENT_COMPLETE = Symbol("scene complete");

    events: EventEmitter;
    comp: Compositor;

    constructor() {
        this.events = new EventEmitter();
        this.comp = new Compositor();
    }

    public draw({ videoContext }: GameContext) {
        this.comp.draw(videoContext, new Camera());
    }

    public update(_gameContext: GameContext) {}

    public pause() {
        // this.comp.layers.length = 0;
        console.log("Pause", this);
    }
}

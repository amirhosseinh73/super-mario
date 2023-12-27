import { GameContext } from "./@types/traits";
import Scene from "./Scene";

export default class CompositionScene extends Scene {
    countDown: number;

    constructor() {
        super();
        this.countDown = 2;
    }

    public update({ deltaTime }: GameContext) {
        this.countDown -= deltaTime;

        if (this.countDown <= 0) {
            this.events.emit(Scene.EVENT_COMPLETE);
        }
    }
}

import { GameContext } from "./@types/traits";
import Level from "./Level";
import Scene from "./Scene";

export default class SceneRunner {
    sceneIndex: number;
    scenes: (Level | Scene)[];

    constructor() {
        this.sceneIndex = -1;
        this.scenes = [];
    }

    public addScene(scene: Level | Scene) {
        scene.events.listen(Scene.EVENT_COMPLETE, () => {
            this.runNext();
        });
        this.scenes.push(scene);
    }

    public runNext() {
        this.sceneIndex++;
    }

    public update(gameContext: GameContext) {
        const currentScene = this.scenes[this.sceneIndex];
        if (!currentScene) return;

        currentScene.update(gameContext);
        currentScene.draw(gameContext);
    }
}

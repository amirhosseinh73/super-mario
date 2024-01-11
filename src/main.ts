import { setupKeyboard, writeOnCanvas } from "./helper";
import Timer from "./Timer";
import { createLevelLoader } from "./loaders/level";
import { loadEntities } from "./loaders";
import { setupMouseEvents } from "./MouseState";
import { loadFont } from "./loaders/font";
import { createPlayer } from "./player";
import { GameContext } from "./@types/traits";
import SceneRunner from "./SceneRunner";
import { runGame } from "./runLevel";

const main = async function (canvas: HTMLCanvasElement) {
    const videoContext = canvas.getContext("2d") as CanvasRenderingContext2D;
    const audioContext = new AudioContext();

    const [entityFactory, font] = await Promise.all([loadEntities(audioContext), loadFont()]);
    const loadLevel = await createLevelLoader(entityFactory);

    const mario = entityFactory.mario();
    createPlayer(mario, "MARIO");
    const inputRouter = setupKeyboard(window);
    inputRouter.addReceiver(mario);

    const inputRouterMouse = setupMouseEvents();
    inputRouterMouse.addReceiver(mario);

    const gameContext: GameContext = {
        audioContext,
        videoContext,
        entityFactory,
        deltaTime: 0,
    };

    const sceneRunner = new SceneRunner();
    const runLevel = runGame({ font, entity: mario, loadLevel, sceneRunner });

    const timer = new Timer();
    timer.update = function update(deltaTime: number) {
        gameContext.deltaTime = deltaTime;
        sceneRunner.update(gameContext);

        if (mario.getTrait("player")?.endOfLife) {
            writeOnCanvas(videoContext, "Game Over!");
            sceneRunner.reset();
        }
    };

    videoContext.imageSmoothingEnabled = false;
    videoContext.clearRect(0, 0, videoContext.canvas.width, videoContext.canvas.height);

    timer.start();
    runLevel("1-1");
};

const canvas = document.getElementById("screen") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

writeOnCanvas(context, "Hit Click To Play");

const start = function () {
    window.removeEventListener("click", start);
    main(canvas);
};

window.addEventListener("click", start);

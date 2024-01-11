import { setupKeyboard, writeOnCanvas } from "./helper";
import Timer from "./Timer";
import { createLevelLoader } from "./loaders/level";
import { loadEntities } from "./loaders";
import { setupMouseEvents } from "./MouseState";
import { loadFont } from "./loaders/font";
import { createDashboardLayer } from "./layers/dashboard";
import { createPlayer, findPlayers } from "./player";
import { GameContext } from "./@types/traits";
import { MARIO_INIT_POS } from "./defines";
import SceneRunner from "./SceneRunner";
import { createPlayerProgressLayer } from "./layers/player-progress";
import { createColorLayer } from "./layers/color";
import Level from "./Level";
import TimedScene from "./TimedScene";
import Entity from "./Entity";
import Scene from "./Scene";
import { createTextLayer } from "./layers/text";
import { createCollisionLayer } from "./layers/collision";

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

    const runLevel = async function (name: LevelsFileName) {
        // sceneRunner.reset();

        const loadScreen = new Scene();
        loadScreen.comp.layers.push(createTextLayer(font, `load level ${name}...`));
        sceneRunner.addScene(loadScreen);
        sceneRunner.runNext();

        await new Promise(resolve => setTimeout(resolve, 500));

        const level = await loadLevel(name);

        level.events.listen(
            Level.EVENT_TRIGGER,
            async (spec: triggersData, _trigger, touches: Set<Entity>) => {
                if (spec.type !== "goto") return;
                for (const _entity of findPlayers(touches)) return await runLevel(spec.name);
            }
        );

        const playerProgressLayer = createPlayerProgressLayer(font, level);
        const dashboardLayer = createDashboardLayer(font, level);

        mario.pos.set(MARIO_INIT_POS.x, MARIO_INIT_POS.y);
        level.entities.add(mario);

        const waitScreen = new TimedScene();
        waitScreen.countDown = 2;
        waitScreen.comp.layers.push(createColorLayer("#000"));
        waitScreen.comp.layers.push(playerProgressLayer);
        sceneRunner.addScene(waitScreen);

        const debugLayers = createCollisionLayer(level);
        if (debugLayers) level.comp.layers.push(debugLayers);

        level.comp.layers.push(dashboardLayer);
        sceneRunner.addScene(level);

        sceneRunner.runNext();
    };

    const gameContext: GameContext = {
        audioContext,
        videoContext,
        entityFactory,
        deltaTime: 0,
    };

    const sceneRunner = new SceneRunner();

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

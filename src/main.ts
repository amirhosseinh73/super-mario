import { setupKeyboard } from "./helper";
import Timer from "./Timer";
import { createLevelLoader } from "./loaders/level";
import { loadEntities } from "./loaders";
import { setupMouseEvents } from "./MouseState";
// import { createCollisionLayer } from "./layers/collision";
import { loadFont } from "./loaders/font";
import { createDashboardLayer } from "./layers/dashboard";
import { createPlayer, createPlayerEnv } from "./player";
import { GameContext } from "./@types/traits";
import { MARIO_INIT_POS } from "./defines";
import SceneRunner from "./SceneRunner";
import { createPlayerProgressLayer } from "./layers/player-progress";
import { createCollisionLayer } from "./layers/collision";
import CompositionScene from "./CompositionScene";

const main = async function (canvas: HTMLCanvasElement) {
    const videoContext = canvas.getContext("2d") as CanvasRenderingContext2D;
    const audioContext = new AudioContext();

    const [entityFactory, font] = await Promise.all([loadEntities(audioContext), loadFont()]);
    const loadLevel = await createLevelLoader(entityFactory);

    const mario = createPlayer(entityFactory.mario());
    mario.player!.name = "MARIO";
    mario.pos.set(MARIO_INIT_POS.x, MARIO_INIT_POS.y);

    const inputRouter = setupKeyboard(window);
    inputRouter.addReceiver(mario);

    const inputRouterMouse = setupMouseEvents();
    inputRouterMouse.addReceiver(mario);

    const runLevel = async function (name: LevelsFileName) {
        const level = await loadLevel(name);

        const playerProgressLayer = createPlayerProgressLayer(font, level);
        const dashboardLayer = createDashboardLayer(font, level);

        level.entities.add(mario);

        const playerEnv = createPlayerEnv(mario);
        level.entities.add(playerEnv);

        const waitScreen = new CompositionScene();
        // waitScreen.comp.layers.push(createColorLayer("#000"));
        waitScreen.comp.layers.push(dashboardLayer);
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
    videoContext.clearRect(0, 0, canvas.width, canvas.height);

    const timer = new Timer();
    timer.update = function update(deltaTime: number) {
        gameContext.deltaTime = deltaTime;
        sceneRunner.update(gameContext);
    };

    timer.start();
    runLevel("1-2");
};

const canvas = document.getElementById("screen") as HTMLCanvasElement;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

ctx.font = "30px Comic Sans MS";
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.fillText("Hit Click To Play", canvas.width / 2, canvas.height / 2);

const start = function () {
    window.removeEventListener("click", start);
    main(canvas);
};

window.addEventListener("click", start);

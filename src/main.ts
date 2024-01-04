import { setupKeyboard } from "./helper";
import Timer from "./Timer";
import { createLevelLoader } from "./loaders/level";
import { loadEntities } from "./loaders";
import { setupMouseEvents } from "./MouseState";
import { loadFont } from "./loaders/font";
import { createDashboardLayer } from "./layers/dashboard";
import { createPlayer, createPlayerEnv, findPlayers } from "./player";
import { GameContext } from "./@types/traits";
import { MARIO_INIT_POS } from "./defines";
import SceneRunner from "./SceneRunner";
import { createPlayerProgressLayer } from "./layers/player-progress";
import { createCollisionLayer } from "./layers/collision";
import { createColorLayer } from "./layers/color";
import Level from "./Level";
import TimedScene from "./TimedScene";
import Scene from "./Scene";
import { createTextLayer } from "./layers/text";
import Entity from "./Entity";

const main = async function (canvas: HTMLCanvasElement) {
    const videoContext = canvas.getContext("2d") as CanvasRenderingContext2D;
    const audioContext = new AudioContext();

    const [entityFactory, font] = await Promise.all([loadEntities(audioContext), loadFont()]);
    const loadLevel = await createLevelLoader(entityFactory);

    const mario = entityFactory.mario();
    createPlayer(mario, "MARIO");
    mario.pos.set(MARIO_INIT_POS.x, MARIO_INIT_POS.y);
    const inputRouter = setupKeyboard(window);
    inputRouter.addReceiver(mario);

    const inputRouterMouse = setupMouseEvents();
    inputRouterMouse.addReceiver(mario);

    const runLevel = async function (name: LevelsFileName) {
        // sceneRunner.reset();

        const loadScreen = new Scene();
        loadScreen.comp.layers.push(createColorLayer("#000"));
        loadScreen.comp.layers.push(createTextLayer(font, `load level ${name}...`));
        sceneRunner.addScene(loadScreen);
        sceneRunner.runNext();

        await new Promise(resolve => setTimeout(resolve, 1000));

        const level = await loadLevel(name);

        level.events.listen(
            Level.EVENT_TRIGGER,
            (spec: triggersData, _trigger, touches: Set<Entity>) => {
                if (spec.type !== "goto") return;
                for (const _entity of findPlayers(touches)) {
                    // if (entity.traits.has("player")) {
                    runLevel(spec.name);
                    return;
                    // }
                }
            }
        );

        const playerProgressLayer = createPlayerProgressLayer(font, level);
        const dashboardLayer = createDashboardLayer(font, level);

        mario.pos.set(MARIO_INIT_POS.x, MARIO_INIT_POS.y);
        level.entities.add(mario);

        const playerEnv = createPlayerEnv(mario);
        level.entities.add(playerEnv);

        const waitScreen = new TimedScene();
        waitScreen.countDown = 2;
        waitScreen.comp.layers.push(createColorLayer("#000"));
        // waitScreen.comp.layers.push(dashboardLayer);
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
    // videoContext.clearRect(0, 0, canvas.width, canvas.height);

    const timer = new Timer();
    timer.update = function update(deltaTime: number) {
        gameContext.deltaTime = deltaTime;
        sceneRunner.update(gameContext);
    };

    timer.start();
    runLevel("1-1");

    videoContext.imageSmoothingEnabled = false;
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

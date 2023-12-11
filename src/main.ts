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

const main = async function (canvas: HTMLCanvasElement) {
    const videoContext = canvas.getContext("2d") as CanvasRenderingContext2D;
    const audioContext = new AudioContext();

    const [entityFactory, font] = await Promise.all([loadEntities(audioContext), loadFont()]);
    const loadLevel = await createLevelLoader(entityFactory);
    const level = await loadLevel("1-2");

    const mario = createPlayer(entityFactory.mario());
    mario.player!.name = "MARIO";
    mario.pos.set(MARIO_INIT_POS.x, MARIO_INIT_POS.y);
    level.entities.add(mario);

    const playerEnv = createPlayerEnv(mario);
    level.entities.add(playerEnv);

    // const debugLayers = createCollisionLayer(level);
    // if (debugLayers) level.comp.layers.push(debugLayers);

    level.comp.layers.push(createDashboardLayer(font, level));

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

    const timer = new Timer();
    timer.update = function update(deltaTime: number) {
        gameContext.deltaTime = deltaTime;
        level.update(gameContext);
        level.draw(gameContext);
        // camera.pos.x = Math.max(0, mario.pos.x - 100);

        // level.comp.draw(context, camera);
    };

    timer.start();
};

const canvas = document.getElementById("screen") as HTMLCanvasElement;

const ctx = canvas.getContext("2d");

ctx!.font = "30px Comic Sans MS";
ctx!.fillStyle = "white";
ctx!.textAlign = "center";
ctx!.fillText("Hit Click To Play", canvas.width / 2, canvas.height / 2);

const start = function () {
    window.removeEventListener("click", start);
    main(canvas);
};

window.addEventListener("click", start);

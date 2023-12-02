import { setupKeyboard } from "./helper";
import Timer from "./Timer";
import Camera from "./Camera";
import { createLevelLoader } from "./loaders/level";
import { loadEntities } from "./loaders";
import { setupMouseEvents } from "./MouseState";
// import { createCollisionLayer } from "./layers/collision";
import { loadFont } from "./loaders/font";
import { createDashboardLayer } from "./layers/dashboard";
import { createPlayer, createPlayerEnv } from "./player";
import { GameContext } from "./@types/traits";

const main = async function (canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    const audioContext = new AudioContext();

    const [entityFactory, font] = await Promise.all([loadEntities(audioContext), loadFont()]);
    const loadLevel = await createLevelLoader(entityFactory);
    const level = await loadLevel("1-1");

    const camera = new Camera();

    const mario = createPlayer(entityFactory.mario());

    const playerEnv = createPlayerEnv(mario);
    level.entities.add(playerEnv);

    // const debugLayers = createCollisionLayer(level);
    // if (debugLayers) level.comp.layers.push(debugLayers);
    level.comp.layers.push(createDashboardLayer(font, playerEnv));

    const input = setupKeyboard(mario);
    input.listenTo(window);

    setupMouseEvents(mario);

    const gameContext: GameContext = {
        audioContext,
        entityFactory,
        deltaTime: 0,
    };

    const timer = new Timer();
    timer.update = function update(deltaTime: number) {
        gameContext.deltaTime = deltaTime;
        level.update(gameContext);

        camera.pos.x = Math.max(0, mario.pos.x - 100);

        level.comp.draw(context, camera);
    };

    timer.start();
    level.music.player?.playTrack("main");
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

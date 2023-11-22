import { MARIO_INIT_POS } from "./defines";
import { setupKeyboard } from "./helper";
import Timer from "./Timer";
import Camera from "./Camera";
import { createLevelLoader } from "./loaders/level";
import { loadEntities } from "./loaders";
import { setupMouseEvents } from "./MouseState";
import Entity from "./Entity";
import PlayerController from "./traits/PlayerController";
import { EntityWithTraits } from "./@types/traits";
import { createCollisionLayer } from "./layers/collision";
import { loadFont } from "./loaders/font";
import { createDashboardLayer } from "./layers/dashboard";
import { GameContext } from "./@types/audio";

const createPlayerEnv = function (playerEntity: EntityWithTraits) {
    const playerEnv = new Entity();
    const playerControl = new PlayerController();
    playerControl.checkpoint.set(MARIO_INIT_POS.x, MARIO_INIT_POS.y);
    playerControl.setPlayer(playerEntity);
    playerEnv.addTrait(playerControl);
    return playerEnv as EntityWithTraits;
};

const main = async function (canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    const audioContext = new AudioContext();

    const [entityFactory, font] = await Promise.all([loadEntities(audioContext), loadFont()]);
    const loadLevel = await createLevelLoader(entityFactory);
    const level = await loadLevel("1-1");

    const camera = new Camera();

    const mario = entityFactory.mario();

    const playerEnv = createPlayerEnv(mario);
    level.entities.add(playerEnv);

    const debugLayers = createCollisionLayer(level);
    if (debugLayers) level.comp.layers.push(debugLayers);
    level.comp.layers.push(createDashboardLayer(font, playerEnv));

    const input = setupKeyboard(mario);
    input.listenTo(window);

    setupMouseEvents(mario);

    const gameContext: GameContext = {
        audioContext,
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

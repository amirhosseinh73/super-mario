import { MARIO_INIT_POS } from "./defines";
import { setupKeyboard } from "./helper";
import Timer from "./Timer";
import Camera from "./Camera";
import { createLevelLoader } from "./loaders/level";
import { loadEntities } from "./loaders";
import { setupMouseEvents } from "./MouseState";
import Entity from "./Entity";
import PlayerController from "./traits/PlayerController";
import { EntityWithTraits } from "../@types/traits";
import { createCollisionLayer } from "./layers";

const createPlayerEnv = function (playerEntity: EntityWithTraits) {
    const playerEnv = new Entity();
    const playerControl = new PlayerController();
    playerControl.checkpoint.set(MARIO_INIT_POS.x, MARIO_INIT_POS.y);
    playerControl.setPlayer(playerEntity);
    playerEnv.addTrait(playerControl);
    return playerEnv;
};

const main = async function (canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    const entityFactory = await loadEntities();
    const loadLevel = await createLevelLoader(entityFactory);
    const level = await loadLevel("1-1");

    const camera = new Camera();

    const mario = entityFactory.mario();
    // mario.pos.set(MARIO_INIT_POS.x, MARIO_INIT_POS.y);
    // level.entities.add(mario);

    const playerEnv = createPlayerEnv(mario);
    level.entities.add(playerEnv);

    const debugLayers = createCollisionLayer(level);
    if (debugLayers) level.comp.layers.push(debugLayers);

    const input = setupKeyboard(mario);
    input.listenTo(window);

    setupMouseEvents(mario);

    const timer = new Timer();
    timer.update = function update(deltaTime: number) {
        level.update(deltaTime);

        camera.pos.x = Math.max(0, mario.pos.x - 100);

        level.comp.draw(context, camera);
    };

    timer.start();
};

const canvas = document.getElementById("screen") as HTMLCanvasElement;
main(canvas);

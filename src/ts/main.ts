import { MARIO_INIT_POS } from "./defines";
import { setupKeyboard } from "./helper";
import Timer from "./Timer";
import Camera from "./Camera";
import { loadLevel } from "./loaders/level";
import { loadEntities } from "./loaders";
import { setupMouseEvents } from "./MouseState";
// import { createCameraLayer, createCollisionLayer } from "./layers";

const canvas = document.getElementById("screen") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

Promise.all([loadEntities(), loadLevel("1-1")]).then(([entity, level]) => {
    const camera = new Camera();

    const mario = entity.mario();
    mario.pos.set(MARIO_INIT_POS.x, MARIO_INIT_POS.y);
    level.entities.add(mario);

    const goomba = entity.goomba();
    goomba.pos.set(220, 16);
    level.entities.add(goomba);

    const koopa = entity.koopa();
    koopa.pos.x = 150;
    level.entities.add(koopa);

    // const debugLayers = createCollisionLayer(level);
    // if (debugLayers) level.comp.layers.push(debugLayers);

    const input = setupKeyboard(mario);
    input.listenTo(window);

    setupMouseEvents(mario);

    const timer = new Timer();
    timer.update = function update(deltaTime: number) {
        level.update(deltaTime);

        if (mario.pos.x > 100) camera.pos.x = mario.pos.x - 100;

        level.comp.draw(context, camera);
    };

    timer.start();
});

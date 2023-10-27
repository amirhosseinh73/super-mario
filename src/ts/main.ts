import { MARIO_INIT_POS } from "./defines";
import { createMario, setupKeyboard } from "./helper";
import Timer from "./Timer";
import Camera from "./Camera";
import { loadLevel } from "./loaders/level";
// import { createCameraLayer, createCollisionLayer } from "./layers"

const canvas = document.getElementById("screen") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

Promise.all([createMario(), loadLevel("1-1")]).then(([mario, level]) => {
    const camera = new Camera();

    mario.pos.set(MARIO_INIT_POS.x, MARIO_INIT_POS.y);

    level.entities.add(mario);

    const input = setupKeyboard(mario);
    input.listenTo(window);

    const timer = new Timer();
    timer.update = function update(deltaTime: number) {
        level.update(deltaTime);

        if (mario.pos.x > 100) camera.pos.x = mario.pos.x - 100;

        level.comp.draw(context, camera);
    };

    timer.start();
});

import InputRouter from "./InputRouter";
import KeyboardState from "./KeyboardState";
import { jumpAction, moveLeftAction, moveRightAction, speedAction } from "./actions";
import { KEYBOARD_KEY } from "./defines";

export const createAnim = function (frames: AnimationFrames[], frameLen: number) {
    return function resolveFrame(distance: number) {
        const frameIndex = Math.floor(distance / frameLen) % frames.length;
        const frameName = frames[frameIndex];

        return frameName;
    };
};

export const setupKeyboard = function (window: Window & typeof globalThis) {
    const input = new KeyboardState();
    const router = new InputRouter();

    input.listenTo(window);

    input.addMapping(KEYBOARD_KEY.SPACE, (keyState: boolean) => {
        jumpAction(keyState, router);
    });

    input.addMapping(KEYBOARD_KEY.SPEED_X, (keyState: boolean) => {
        speedAction(keyState, router);
    });

    input.addMapping(KEYBOARD_KEY.ARROW_RIGHT, (keyState: boolean) => {
        moveRightAction(keyState, router);
    });

    input.addMapping(KEYBOARD_KEY.ARROW_LEFT, (keyState: boolean) => {
        moveLeftAction(keyState, router);
    });

    return router;
};

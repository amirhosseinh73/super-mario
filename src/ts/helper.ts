import { AnimationFrames } from "../@types/statics";
import { EntityWithTraits } from "../@types/traits";
import Camera from "./Camera";
import Entity from "./Entity";
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

export const setupKeyboard = function (mario: EntityWithTraits) {
    const input = new KeyboardState();

    input.addMapping(KEYBOARD_KEY.SPACE, (keyState: boolean) => {
        jumpAction(mario, keyState);
    });

    input.addMapping(KEYBOARD_KEY.SPEED_X, (keyState: boolean) => {
        speedAction(mario, keyState);
    });

    input.addMapping(KEYBOARD_KEY.ARROW_RIGHT, (keyState: boolean) => {
        moveRightAction(mario, keyState);
    });

    input.addMapping(KEYBOARD_KEY.ARROW_LEFT, (keyState: boolean) => {
        moveLeftAction(mario, keyState);
    });

    return input;
};

export function setupMouseControlDebug(canvas: HTMLCanvasElement, entity: Entity, camera: Camera) {
    const eventNames = ["mousedown", "mousemove"] as ("mousedown" | "mousemove")[];

    let lastEvent: MouseEvent | undefined;

    eventNames.forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons === 1) {
                entity.vel.set(0, 0);
                entity.pos.set(event.offsetX + camera.pos.x, event.offsetY + camera.pos.y);
            } else if (
                event.buttons === 2 &&
                lastEvent &&
                lastEvent.buttons === 2 &&
                lastEvent.type === "mousemove"
            ) {
                camera.pos.x -= event.offsetX - lastEvent.offsetX;
            }

            lastEvent = event;
        });
    });

    canvas.addEventListener("contextmenu", e => e.preventDefault());
}

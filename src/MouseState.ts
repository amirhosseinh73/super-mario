import InputRouter from "./InputRouter";
import { jumpAction, moveLeftAction, moveRightAction, speedAction } from "./actions";

export const setupMouseEvents = function () {
    const left = document.querySelector("[data-action='left']") as HTMLButtonElement;
    const right = document.querySelector("[data-action='right']") as HTMLButtonElement;

    const jump = document.querySelector("[data-action='jump']") as HTMLButtonElement;
    const speed = document.querySelector("[data-action='speed']") as HTMLButtonElement;

    const router = new InputRouter();

    const buttons = {
        left: {
            elem: left,
            fn: function (move: boolean) {
                moveLeftAction(move, router);
            },
            handle: false,
        },

        right: {
            elem: right,
            fn: function (move: boolean) {
                moveRightAction(move, router);
            },
            handle: false,
        },

        jump: {
            elem: jump,
            fn: function (move: boolean) {
                jumpAction(move, router);
            },
            handle: false,
        },

        speed: {
            elem: speed,
            fn: function (move: boolean) {
                speedAction(move, router);
            },
            handle: false,
        },
    };

    const mouseEvents = [
        "pointerdown",
        "pointerup",
        "pointercancel",
        "pointerout",
        "pointerleave",
    ] as const;

    mouseEvents.forEach(event => {
        for (const item in buttons) {
            const btn = buttons[item as ButtonActions];
            btn.elem.addEventListener(event, function () {
                if (event === "pointerdown") {
                    btn.handle = true;
                    return btn.fn(true);
                }

                if (!btn.handle) return;
                btn.fn(false);
                btn.handle = false;
            });
        }
    });

    return router;
};

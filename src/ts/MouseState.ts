import { ButtonActions } from "../@types/global";
import { EntityWithTraits } from "../@types/traits";
import { jumpAction, moveLeftAction, moveRightAction, speedAction } from "./actions";

export const setupMouseEvents = function (mario: EntityWithTraits) {
    const left = document.querySelector("[data-action='left']") as HTMLButtonElement;
    const right = document.querySelector("[data-action='right']") as HTMLButtonElement;

    const jump = document.querySelector("[data-action='jump']") as HTMLButtonElement;
    const speed = document.querySelector("[data-action='speed']") as HTMLButtonElement;

    const buttons = {
        left: {
            elem: left,
            fn: function (move: boolean) {
                moveLeftAction(mario, move);
            },
            handle: false,
        },

        right: {
            elem: right,
            fn: function (move: boolean) {
                moveRightAction(mario, move);
            },
            handle: false,
        },

        jump: {
            elem: jump,
            fn: function (move: boolean) {
                jumpAction(mario, move);
            },
            handle: false,
        },

        speed: {
            elem: speed,
            fn: function (move: boolean) {
                speedAction(mario, move);
            },
            handle: false,
        },
    };

    const mouseEvents = ["mousedown", "mouseup", "mouseleave"] as const;

    mouseEvents.forEach(event => {
        for (const item in buttons) {
            const btn = buttons[item as ButtonActions];
            btn.elem.addEventListener(event, function () {
                if (event === "mousedown") {
                    btn.handle = true;
                    return btn.fn(true);
                }

                if (!btn.handle) return;
                btn.fn(false);
                btn.handle = false;
            });
        }
    });
};

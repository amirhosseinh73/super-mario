import { EntityWithTraits } from "../@types/traits";
import { Font } from "../loaders/font";

export const createDashboardLayer = function (font: Font, playerEnv: EntityWithTraits) {
    const LINE_1 = font.size;
    const LINE_2 = font.size * 2;

    const coins = 16;

    return function drawDashboard(context: CanvasRenderingContext2D) {
        const { time, score } = playerEnv.playerController!;

        font.print("MARIO", context, 16, LINE_1);
        font.print(score.toString().padStart(6, "0"), context, 16, LINE_2);

        font.print(`@x${coins.toString().padStart(2, "0")}`, context, 96, LINE_2);

        font.print("WORLD", context, 152, LINE_1);
        font.print("1-1", context, 160, LINE_2);

        font.print("TIME", context, 208, LINE_1);
        font.print(time.toFixed().toString().padStart(3, "0"), context, 216, LINE_2);
    };
};

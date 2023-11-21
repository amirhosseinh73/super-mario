import { Font } from "../loaders/font";

export const createDashboardLayer = function (font: Font) {
    const LINE_1 = font.size;
    const LINE_2 = font.size * 2;

    const score = 25400;
    const time = 26;

    return function drawDashboard(context: CanvasRenderingContext2D) {
        font.print("MARIO", context, 16, LINE_1);
        font.print(score.toString().padStart(6, "0"), context, 16, LINE_2);

        font.print("WORLD", context, 152, LINE_1);

        font.print("TIME", context, 208, LINE_1);
        font.print(time.toString().padStart(3, "0"), context, 216, LINE_2);
    };
};

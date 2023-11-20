import SpriteSheet from "../SpriteSheet";

export const createDashboardLayer = function (font: SpriteSheet) {
    return function drawDashboard(context: CanvasRenderingContext2D) {
        font.draw("A", context, 0, 0);
    };
};

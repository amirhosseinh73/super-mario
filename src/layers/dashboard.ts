import Level from "../Level";
import { Font } from "../loaders/font";
import { findPlayers } from "../player";

const getPlayerTrait = function (level: Level) {
    for (const entity of findPlayers(level)) return entity.player;
};

const getTimerTrait = function (level: Level) {
    for (const entity of level.entities) {
        if (entity.levelTimer) return entity.levelTimer;
    }
};

export const createDashboardLayer = function (font: Font, level: Level) {
    const LINE_1 = font.size;
    const LINE_2 = font.size * 2;

    return function drawDashboard(context: CanvasRenderingContext2D) {
        const playerTrait = getPlayerTrait(level);
        const timerTrait = getTimerTrait(level);
        if (!playerTrait || !timerTrait) return;

        const { score, coins, name, lives } = playerTrait;

        font.print(name, context, 16, LINE_1);
        font.print(score.toString().padStart(6, "0"), context, 16, LINE_2);

        font.print(`livesx${lives.toString().padStart(2, "0")}`, context, 80, LINE_1);
        font.print(`@x${coins.toString().padStart(2, "0")}`, context, 96, LINE_2);

        font.print("WORLD", context, 152, LINE_1);
        font.print(level.name, context, 160, LINE_2);

        font.print("TIME", context, 208, LINE_1);
        font.print(
            timerTrait.currentTime.toFixed().toString().padStart(3, "0"),
            context,
            216,
            LINE_2
        );
    };
};

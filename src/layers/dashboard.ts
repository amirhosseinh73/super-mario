import Entity from "../Entity";
import Level from "../Level";
import { Font } from "../loaders/font";
import { findPlayers } from "../player";

const getPlayerTrait = function (entities: Set<Entity>) {
    for (const entity of findPlayers(entities)) return entity.getTrait("player");
};

const getTimerTrait = function (entities: Set<Entity>) {
    for (const entity of entities) {
        if (entity.traits.has("levelTimer")) return entity.getTrait("levelTimer");
    }
};

export const createDashboardLayer = function (font: Font, level: Level) {
    const LINE_1 = font.size;
    const LINE_2 = font.size * 2;

    const timerTrait = getTimerTrait(level.entities);

    return function drawDashboard(context: CanvasRenderingContext2D) {
        const playerTrait = getPlayerTrait(level.entities);
        if (!playerTrait || !timerTrait) return;

        const { score, coins, name } = playerTrait;

        font.print(name, context, 16, LINE_1);
        font.print(score.toString().padStart(6, "0"), context, 16, LINE_2);

        // font.print(`livesx${lives.toString().padStart(2, "0")}`, context, 80, LINE_1);
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

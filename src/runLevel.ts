import Entity from "./Entity";
import Level from "./Level";
import Scene from "./Scene";
import SceneRunner from "./SceneRunner";
import TimedScene from "./TimedScene";
import { MARIO_INIT_POS } from "./defines";
import { createCollisionLayer } from "./layers/collision";
import { createColorLayer } from "./layers/color";
import { createDashboardLayer } from "./layers/dashboard";
import { createPlayerProgressLayer } from "./layers/player-progress";
import { createTextLayer } from "./layers/text";
import { Font } from "./loaders/font";
import { findPlayers } from "./player";

type RunGame = {
    entity: Entity;
    font: Font;
    sceneRunner: SceneRunner;
    loadLevel: (name: LevelsFileName) => Promise<Level>;
};

export const runGame = function ({ font, entity: mario, loadLevel, sceneRunner }: RunGame) {
    return async function runLevel(name: LevelsFileName) {
        const loadScreen = new Scene();
        loadScreen.comp.layers.push(createTextLayer(font, `load level ${name}...`));
        sceneRunner.addScene(loadScreen);
        sceneRunner.runNext();

        await new Promise(resolve => setTimeout(resolve, 500));

        const level = await loadLevel(name);

        level.events.listen(
            Level.EVENT_TRIGGER,
            async (spec: triggersData, _trigger, touches: Set<Entity>) => {
                if (spec.type !== "goto") return;
                for (const _entity of findPlayers(touches)) return await runLevel(spec.name);
            }
        );

        const playerProgressLayer = createPlayerProgressLayer(font, level);
        const dashboardLayer = createDashboardLayer(font, level);

        mario.pos.set(MARIO_INIT_POS.x, MARIO_INIT_POS.y);
        level.entities.add(mario);

        const waitScreen = new TimedScene();
        waitScreen.countDown = 2;
        waitScreen.comp.layers.push(createColorLayer("#000"));
        waitScreen.comp.layers.push(playerProgressLayer);
        sceneRunner.addScene(waitScreen);

        const debugLayers = createCollisionLayer(level);
        if (debugLayers) level.comp.layers.push(debugLayers);

        level.comp.layers.push(dashboardLayer);
        sceneRunner.addScene(level);

        sceneRunner.runNext();
    };
};

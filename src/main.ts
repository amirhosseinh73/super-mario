import { AUDIO_FILES, MARIO_INIT_POS } from "./defines";
import { setupKeyboard } from "./helper";
import Timer from "./Timer";
import Camera from "./Camera";
import { createLevelLoader } from "./loaders/level";
import { loadEntities } from "./loaders";
import { setupMouseEvents } from "./MouseState";
import Entity from "./Entity";
import PlayerController from "./traits/PlayerController";
import { EntityWithTraits } from "./@types/traits";
import { createCollisionLayer } from "./layers/collision";
import { loadFont } from "./loaders/font";
import { createDashboardLayer } from "./layers/dashboard";
import { createAudioLoader } from "./loaders/audio";
import { AudioNames } from "./@types/statics";
import { GameContext } from "./@types/global";

const createPlayerEnv = function (playerEntity: EntityWithTraits) {
    const playerEnv = new Entity();
    const playerControl = new PlayerController();
    playerControl.checkpoint.set(MARIO_INIT_POS.x, MARIO_INIT_POS.y);
    playerControl.setPlayer(playerEntity);
    playerEnv.addTrait(playerControl);
    return playerEnv as EntityWithTraits;
};

export class AudioBoard {
    context: AudioContext;
    buffers: Map<AudioNames, AudioBuffer>;

    constructor(context: AudioContext) {
        this.context = context;
        this.buffers = new Map();
    }

    public addAudio(name: AudioNames, buffer: AudioBuffer) {
        this.buffers.set(name, buffer);
    }

    public playAudio(name: AudioNames) {
        const source = this.context.createBufferSource();
        source.connect(this.context.destination);
        source.buffer = this.buffers.get(name) || null;
        source.start(0);
    }
}

const main = async function (canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    const [entityFactory, font] = await Promise.all([loadEntities(), loadFont()]);
    const loadLevel = await createLevelLoader(entityFactory);
    const level = await loadLevel("1-1");

    const audioContext = new AudioContext();
    const audioBoard = new AudioBoard(audioContext);
    const loadAudio = createAudioLoader(audioContext);
    loadAudio(AUDIO_FILES.jump).then(buffer => {
        audioBoard.addAudio("jump", buffer);
    });
    loadAudio(AUDIO_FILES.stomp).then(buffer => {
        audioBoard.addAudio("stomp", buffer);
    });

    const camera = new Camera();

    const mario = entityFactory.mario();

    const playerEnv = createPlayerEnv(mario);
    level.entities.add(playerEnv);

    const debugLayers = createCollisionLayer(level);
    if (debugLayers) level.comp.layers.push(debugLayers);
    level.comp.layers.push(createDashboardLayer(font, playerEnv));

    const input = setupKeyboard(mario);
    input.listenTo(window);

    setupMouseEvents(mario);

    const gameContext: GameContext = {
        audioBoard,
        deltaTime: 0,
    };

    const timer = new Timer();
    timer.update = function update(deltaTime: number) {
        gameContext.deltaTime = deltaTime;
        level.update(gameContext);

        camera.pos.x = Math.max(0, mario.pos.x - 100);

        level.comp.draw(context, camera);
    };

    timer.start();
};

const canvas = document.getElementById("screen") as HTMLCanvasElement;

const start = function () {
    window.removeEventListener("click", start);
    main(canvas);
};

window.addEventListener("click", start);

import { EntityWithTraits, GameContext } from "./@types/traits";
import Camera from "./Camera";
import EntityCollider from "./EntityCollider";
import { Matrix } from "./Math";
import MusicController from "./MusicController";
import Scene from "./Scene";
import TileCollider from "./TileCollider";
import { GRAVITY } from "./defines";
import { findPlayers } from "./player";

const focusPlayer = function (level: Level) {
    for (const player of findPlayers(level)) {
        level.camera.pos.x = Math.max(0, player.pos.x - 100);
    }
};

export default class Level extends Scene {
    gravity: number;
    name: LevelsFileName | "";
    entities: Set<EntityWithTraits>;
    tiles!: Matrix;
    tileCollider: TileCollider;
    entityCollider: EntityCollider;
    totalTime: number;
    music: MusicController;
    camera: Camera;

    constructor() {
        super();
        this.name = "";
        this.gravity = GRAVITY;
        this.totalTime = 0;

        this.music = new MusicController();
        this.entities = new Set();
        this.entityCollider = new EntityCollider(this.entities);
        this.tileCollider = new TileCollider();
        this.camera = new Camera();
    }

    public draw({ videoContext }: GameContext) {
        this.comp.draw(videoContext, this.camera);
    }

    public update(gameContext: GameContext) {
        this.entities.forEach(entity => {
            if (!this.tileCollider) return;

            entity.update(gameContext, this);
        });

        this.entities.forEach(entity => {
            this.entityCollider.check(entity);
        });

        this.entities.forEach(entity => {
            entity.finalize();
        });

        focusPlayer(this);

        this.totalTime += gameContext.deltaTime;
    }
}

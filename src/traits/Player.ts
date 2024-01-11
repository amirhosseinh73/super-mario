import { GameContext } from "../@types/traits";
import Entity from "../Entity";
import Level from "../Level";
import { Vec2 } from "../Math";
import Trait from "../Trait";
import { COIN_LIFE_THRESHOLD, COIN_SCORE, KILLING_SCORE, MARIO_INIT_POS } from "../defines";
import Stomper from "./Stomper";

export default class Player extends Trait {
    lives: number;
    score: number;
    coins: number;
    name: string;
    dead: boolean;
    endOfLife: boolean;

    checkpoint: Vec2;
    checkpointOffsetX: 500;

    constructor() {
        super("player");

        this.name = "UNNAMED";

        this.lives = 3;
        this.score = 0;
        this.coins = 0;
        this.dead = false;
        this.endOfLife = false;

        this.listen(Stomper.EVENT_STOMP, () => {
            this.score += KILLING_SCORE;
        });

        this.checkpoint = new Vec2(0, 0);
        this.checkpointOffsetX = 500;
    }

    public addCoins(count: number) {
        this.coins += count;
        this.score += COIN_SCORE;
        this.queue((entity: Entity) => entity.sounds.add("coin"));

        while (this.coins >= COIN_LIFE_THRESHOLD) {
            this.addLives(1);
            this.coins -= COIN_LIFE_THRESHOLD;
            this.queue((entity: Entity) => entity.sounds.add("1up"));
        }
    }

    public addLives(count: number) {
        this.lives += count;
    }

    public die(pos: Vec2) {
        if (this.dead) return;

        this.lives--;
        this.calcPos(pos);
        this.dead = true;
    }

    public calcPos(curPos: Vec2) {
        this.checkpoint.y = MARIO_INIT_POS.y;

        if (curPos.x > 500 && curPos.x <= 1000) return (this.checkpoint.x = 500);
        if (curPos.x > 1000 && curPos.x <= 1500) return (this.checkpoint.x = 1000);
        if (curPos.x > 1500) return (this.checkpoint.x = 1500);

        return (this.checkpoint.x = MARIO_INIT_POS.x);
    }

    public update(player: Entity, _gameContext: GameContext, level: Level): void {
        if (!this.dead) return;

        if (this.lives <= 0) {
            level.entities.delete(player);
            this.endOfLife = true;
            return;
        }

        this.queue(() => {
            // await new Promise(resolve => setTimeout(resolve, 1000));

            player.getTrait("killable")?.revive();
            player.pos.set(this.checkpoint.x, this.checkpoint.y);
            level.entities.add(player);
            this.dead = false;
        });
    }
}

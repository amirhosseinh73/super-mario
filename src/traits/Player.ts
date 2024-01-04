import Entity from "../Entity";
import Trait from "../Trait";
import { COIN_LIFE_THRESHOLD, COIN_SCORE, KILLING_SCORE } from "../defines";
import Stomper from "./Stomper";

export default class Player extends Trait {
    lives: 3;
    score: number;
    coins: number;

    name: string;

    constructor() {
        super("player");

        this.name = "UNNAMED";

        this.lives = 3;
        this.score = 0;
        this.coins = 0;

        this.listen(Stomper.EVENT_STOMP, () => {
            this.score += KILLING_SCORE;
        });
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
}

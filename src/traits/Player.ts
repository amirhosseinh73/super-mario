import { Trait } from "../Entity";
import { KILLING_SCORE } from "../defines";
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
}

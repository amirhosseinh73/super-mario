import { Trait } from "../Entity";

export default class Player extends Trait {
    lives: 3;
    score: number;

    constructor() {
        super("player");

        this.lives = 3;
        this.score = 0;
    }
}

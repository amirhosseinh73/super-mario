import { Vec2 } from "./Math";
import { RENDERED_HEIGHT, RENDERED_WIDTH } from "./defines";

export default class Camera {
    pos: Vec2;
    size: Vec2;

    constructor() {
        this.pos = new Vec2(0, 0);
        this.size = new Vec2(RENDERED_WIDTH, RENDERED_HEIGHT);
    }
}

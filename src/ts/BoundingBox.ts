import { Vec2 } from "./Math";

export default class BoundingBox {
    pos: Vec2;
    size: Vec2;
    offset: Vec2;

    constructor(pos: Vec2, size: Vec2, offset: Vec2) {
        this.pos = pos;
        this.size = size;
        this.offset = offset;
    }

    public overlaps(box: BoundingBox) {
        return (
            this.bottom > box.top &&
            this.top < box.bottom &&
            this.left < box.right &&
            this.right > box.left
        );
    }

    public get bottom() {
        return this.pos.y + this.size.y + this.offset.y;
    }

    public set bottom(y: number) {
        this.pos.y = y - (this.size.y + this.offset.y);
    }

    public get top() {
        return this.pos.y + this.offset.y;
    }

    public set top(y: number) {
        this.pos.y = y - this.offset.y;
    }

    public get left() {
        return this.pos.x + this.offset.x;
    }

    public set left(x: number) {
        this.pos.x = x - this.offset.x;
    }

    public get right() {
        return this.pos.x + this.size.x + this.offset.x;
    }

    public set right(x: number) {
        this.pos.x = x - (this.size.x + this.offset.x);
    }
}

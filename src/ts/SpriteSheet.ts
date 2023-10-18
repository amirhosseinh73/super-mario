import { AnimationFrames, TileNamesType } from "../@types/levels";

export default class SpriteSheet {
    image: CanvasImageSource;
    width: number;
    height: number;
    tiles: Map<TileNamesType, HTMLCanvasElement[]>;
    animation: Map<TileNamesType, (distance: number) => AnimationFrames>;

    constructor(image: CanvasImageSource, width: number, height: number) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map();
        this.animation = new Map();
    }

    public defineAnim(name: TileNamesType, animation: (distance: number) => AnimationFrames) {
        this.animation.set(name, animation);
    }

    public define(name: TileNamesType, x: number, y: number, width: number, height: number) {
        const buffers = [false, true].map(flip => {
            const buffer = document.createElement("canvas");
            buffer.width = width;
            buffer.height = height;

            const context = buffer.getContext("2d") as CanvasRenderingContext2D;

            if (flip) {
                context.scale(-1, 1);
                context.translate(-width, 0);
            }

            context.drawImage(this.image, x, y, width, height, 0, 0, width, height);

            return buffer;
        });

        this.tiles.set(name, buffers);
    }

    public defineTile(name: TileNamesType, x: number, y: number) {
        this.define(name, x * this.width, y * this.height, this.width, this.height);
    }

    public draw(
        name: TileNamesType,
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        flip = false
    ) {
        const buffer = this.tiles.get(name);
        if (!buffer) return;
        context.drawImage(buffer[Number(flip)], x, y);
    }

    public drawAnim(
        name: TileNamesType,
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        distance: number
    ) {
        const animation = this.animation.get(name) as (distance: number) => AnimationFrames;
        this.drawTile(animation(distance), context, x, y);
    }

    public drawTile(name: TileNamesType, context: CanvasRenderingContext2D, x: number, y: number) {
        this.draw(name, context, x * this.width, y * this.height);
    }
}

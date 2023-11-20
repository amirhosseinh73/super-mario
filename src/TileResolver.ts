import { getByIndexReturnType } from "./@types/tileResorver";
import { Matrix } from "./Math";
import { TILE_SIZE } from "./defines";

export default class TileResolver {
    matrix: Matrix;
    tileSize: number;

    constructor(matrix: Matrix, tileSize: number = TILE_SIZE) {
        this.matrix = matrix;
        this.tileSize = tileSize;
    }

    public toIndex(pos: number) {
        return Math.floor(pos / this.tileSize); //Math.floor
    }

    public toIndexRange(pos1: number, pos2: number) {
        const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize; // Math.ceil
        const range = [];
        let pos = pos1;

        do {
            range.push(this.toIndex(pos));
            pos += this.tileSize;
        } while (pos < pMax);

        return range;
    }

    public getByIndex(indexX: number, indexY: number) {
        const tile = this.matrix.get(indexX, indexY);
        if (tile) {
            const x1 = indexX * this.tileSize;
            const x2 = x1 + this.tileSize;
            const y1 = indexY * this.tileSize;
            const y2 = y1 + this.tileSize;
            return {
                tile,
                x1,
                x2,
                y1,
                y2,
            };
        }
    }

    public searchByPosition(posX: number, posY: number) {
        return this.getByIndex(this.toIndex(posX), this.toIndex(posY));
    }

    public searchByRange(x1: number, x2: number, y1: number, y2: number) {
        const matches: getByIndexReturnType[] = []; //ReturnType<TileResolver["getByIndex"]>[]

        this.toIndexRange(x1, x2).forEach(indexX => {
            this.toIndexRange(y1, y2).forEach(indexY => {
                const match = this.getByIndex(indexX, indexY);
                if (match) matches.push(match);
            });
        });

        return matches;
    }
}

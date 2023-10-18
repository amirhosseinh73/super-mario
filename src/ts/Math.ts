import { MatrixValueInterface } from "../@types/levels";

export class Matrix {
    grid: MatrixValueInterface[][];
    constructor() {
        this.grid = [];
    }

    public forEach(callback: (tile: MatrixValueInterface, x: number, y: number) => void) {
        this.grid.forEach((column, x) => {
            column.forEach((value, y) => {
                callback(value, x, y);
            });
        });
    }

    public get(x: number, y: number) {
        const col = this.grid[x];

        if (col) return col[y];

        return undefined;
    }

    public set(x: number, y: number, value: MatrixValueInterface) {
        if (!this.grid[x]) {
            this.grid[x] = [];
        }

        this.grid[x][y] = value;
    }
}

export class Vec2 {
    x!: number;
    y!: number;

    constructor(x: number, y: number) {
        this.set(x, y);
    }

    public set(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

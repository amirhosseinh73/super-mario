import { MatrixValueInterface } from "../@types/levels"

export class Matrix {
  grid: MatrixValueInterface[][]
  constructor() {
    this.grid = []
  }

  public get(x: number, y: number) {
    const col = this.grid[x]

    if (col) return col[y]

    return undefined
  }

  public set(x: number, y: number, value: MatrixValueInterface) {
    if (!this.grid[x]) {
      this.grid[x] = []
    }

    this.grid[x][y] = value
  }
}

export class Vec2 {
  x!: number
  y!: number

  constructor(x: number, y: number) {
    this.set(x, y)
  }

  public set(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

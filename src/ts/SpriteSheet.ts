import { TileNamesType } from "../@types/global"

export default class SpriteSheet {
  image: CanvasImageSource
  width: number
  height: number
  tiles: Map<any, any>

  constructor(image: CanvasImageSource, width: number, height: number) {
    this.image = image
    this.width = width
    this.height = height
    this.tiles = new Map()
  }

  public define(name: TileNamesType, x: number, y: number, width: number, height: number) {
    const buffer = document.createElement("canvas")
    buffer.width = width
    buffer.height = height

    buffer.getContext("2d")?.drawImage(this.image, x, y, width, height, 0, 0, width, height)

    this.tiles.set(name, buffer)
  }

  public defineTile(name: TileNamesType, x: number, y: number) {
    this.define(name, x * this.width, y * this.height, this.width, this.height)
  }

  public draw(name: TileNamesType, context: CanvasRenderingContext2D, x: number, y: number) {
    const buffer = this.tiles.get(name)
    context.drawImage(buffer, x, y)
  }

  public drawTile(name: TileNamesType, context: CanvasRenderingContext2D, x: number, y: number) {
    this.draw(name, context, x * this.width, y * this.height)
  }
}

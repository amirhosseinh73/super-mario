export default class SpriteSheet {
  image: CanvasImageSource
  width: number
  height: number
  context: CanvasRenderingContext2D
  tiles: Map<any, any>

  constructor(
    image: CanvasImageSource,
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    this.image = image
    this.context = context
    this.width = width
    this.height = height
    this.tiles = new Map()
  }

  define(name: string, x: number, y: number) {
    const buffer = document.createElement("canvas")
    buffer.width = this.width
    buffer.height = this.height

    buffer
      .getContext("2d")
      ?.drawImage(
        this.image,
        x * this.width,
        y * this.height,
        this.width,
        this.height,
        0,
        0,
        this.width,
        this.height
      )

    this.tiles.set(name, buffer)
  }

  draw(name: string, x: number, y: number) {
    const buffer = this.tiles.get(name)
    this.context.drawImage(buffer, x, y)
  }

  drawTile(name: string, x: number, y: number) {
    this.draw(name, x * this.width, y * this.height)
  }
}

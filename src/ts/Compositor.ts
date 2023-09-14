export default class Compositor {
  layers: ((context: CanvasRenderingContext2D) => void)[]

  constructor() {
    this.layers = []
  }

  public draw(context: CanvasRenderingContext2D) {
    this.layers.forEach(layer => {
      layer(context)
    })
  }
}

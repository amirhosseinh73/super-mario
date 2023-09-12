export default class Timer {
  public constructor(deltaTime = 1 / 60) {
    let accumulatedTime = 0
    let lastTime = 0

    this.updateProxy = (time: number) => {
      accumulatedTime += (time - lastTime) / 1000 //convert ms to s

      while (accumulatedTime > deltaTime) {
        this.update(deltaTime)
        accumulatedTime -= deltaTime
      }

      lastTime = time

      this.enqueue()
    }
  }

  public enqueue() {
    requestAnimationFrame(this.updateProxy)
  }

  public start() {
    this.enqueue()
  }

  public update!: (deltaTime: number) => void
  public updateProxy!: (time: number) => void
}

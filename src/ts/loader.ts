export const loadImage = function (url: string): Promise<CanvasImageSource> {
  return new Promise(resolve => {
    const image = new Image()
    image.addEventListener("load", () => {
      resolve(image)
    })
    image.src = url
  })
}

export const loadLevel = async function (name: string) {
  return fetch(`../@levels/${name}.json`).then(resp => resp.json())
}

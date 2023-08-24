import { LevelsInterface } from "../@types/levels"

export const loadImage = function (url: string): Promise<CanvasImageSource> {
  return new Promise(resolve => {
    const image = new Image()
    image.addEventListener("load", () => {
      resolve(image)
    })
    image.src = url
  })
}

export const loadLevel = async function (name: string): Promise<LevelsInterface> {
  return fetch(`/@levels/${name}.json`).then(resp => resp.json())
}

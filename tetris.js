class Tetris {
  constructor (imageX, imageY, template) {
    this.imageX = imageX
    this.imageY = imageY
    this.template = template
  }

  checkBottom () {}

  checkLeft () {}

  checkRight () {}

  moveLeft () {}

  moveRight () {}

  moveBottom () {}

  rotate () {}
}

const imageSquareSize = 24
const size = 40
const framePerSecond = 24
const gameSpeed = 5
const canvas = document.getElementById('canvas')
const image = document.getElementById('image')
const ctx = canvas.getContext('2d')
const squareCountX = canvas.width / size
const squareCountY = canvas.height / size

const shapes = [
  new Tetris(0, 120, [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0]
  ]),
  new Tetris(0, 96, [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
  ]),
  new Tetris(0, 72, [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1]
  ]),
  new Tetris(0, 48, [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0]
  ]),
  new Tetris(0, 24, [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0]
  ]),
  new Tetris(0, 0, [
    [1, 1],
    [1, 1]
  ])
]

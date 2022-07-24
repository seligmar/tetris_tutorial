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
  ]),
  new Tetris(0, 48, [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1]
  ])
]

let gameMap
let gameOver
let currentShape
let nextShape
let score
let initialTwoDArr
let whiteLineThickness = 4

let gameLoop = () => {
  setInterval(update, 1000 / gameSpeed)
  setInterval(draw, 1000 / framePerSecond)
}

let update = () => {}

let drawRect = (x, y, width, height, color) => {
  ctx.fillStyle = color
  ctx.fillRect(x, y, width, height)
}

let drawBackground = () => {
  drawRect(0, 0, canvas.width, canvas.height, '#bca0dc')
  for (let i = 0; i < squareCountX + 1; i++) {
    drawRect(
      size * i - whiteLineThickness,
      0,
      whiteLineThickness,
      canvas.height,
      'white'
    )
  }
  for (let i = 0; i < squareCountY + 1; i++) {
    drawRect(
      0,
      size * i - whiteLineThickness,
      canvas.width,
      whiteLineThickness,

      'white'
    )
  }
}

let draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBackground()
  drawSquares()
  drawCurrentTetris()
  if (gameOver) {
    drawGameOver()
  }
}

let getRandomShape = () => {
  return Object.create(shapes[Math.floor(Math.random() * shapes.length)])
}

let resetVars = () => {
  initialTwoDArr = []
  for (let i = 0; i < squareCountY; i++) {
    let temp = []
    for (let j = 0; j < squareCountX; j++) {
      temp.push({ imageX: -1, imageY: -1 })
    }
    initialTwoDArr.push(temp)
  }
  score = 0
  gameOver = false
  currentShape = getRandomShape()
  nextShape = getRandomShape()
  gameMap = initialTwoDArr
}

gameLoop()

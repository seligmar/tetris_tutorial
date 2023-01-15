class Tetris {
  constructor (imageX, imageY, template) {
    this.imageX = imageX
    this.imageY = imageY
    this.template = template
    this.x = squareCountX / 2
    this.y = 0
  }

  checkBottom () {
    for (let i = 0; i < this.template.length; i++) {
      for (let j = 0; j < this.template.length; j++) {
        if (this.template[i][j] === 0) continue
        const realX = i + this.getTruncedPosition().x
        const realY = j + this.getTruncedPosition().y
        if (realY + 1 >= squareCountY) {
          return false
        }
        if (gameMap[realY + 1][realX].imageX !== -1) {
          return false
        }
      }
    }
    return true
  }

  getTruncedPosition () {
    return { x: Math.trunc(this.x), y: Math.trunc(this.y) }
  }

  checkLeft () {
    for (let i = 0; i < this.template.length; i++) {
      for (let j = 0; j < this.template.length; j++) {
        if (this.template[i][j] === 0) continue
        let realX = i + this.getTruncedPosition().x
        let realY = j + this.getTruncedPosition().y
        if (realX - 1 < 0) {
          return false
        }
        if (gameMap[realY][realX - 1].imageX !== -1) return false
      }
    }
    return true
  }

  checkRight () {
    return true
  }

  moveLeft () {
    if (this.checkLeft()) {
      this.x -= 1
    }
  }

  moveRight () {
    if (this.checkRight()) {
      this.x += 1
    }
  }

  moveBottom () {
    if (this.checkBottom()) {
      this.y += 1
    }
  }

  changeRotation () {
    let tempTemplate = []
    for (let i = 0; i < this.template.length; i++) {
      tempTemplate[i] = this.template[i].slice()
      let n = this.template.length
      for (let layer = 0; layer < n / 2; layer++) {
        let first = layer
        let last = n - 1 - layer
        for (let i = first; i < last; i++) {
          let offset = i - first
          let top = this.template[first][i]
          this.template[first][i] = this.template[i][last] // top = right
          this.template[i][last] = this.template[last][last - offset] // right = bottom
          this.template[last][last - offset] =
            this.template[last - offset][first] // bottom = left
          this.template[last - offset][first] = top // left = top
        }
      }
    }
  }
  // rotate () {}
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

var gameMap
var gameOver
var currentShape
var nextShape
var score
var initialTwoDArr
const whiteLineThickness = 4

const gameLoop = () => {
  setInterval(update, 1000 / gameSpeed)
  setInterval(draw, 1000 / framePerSecond)
}

const update = () => {
  if (gameOver) return
  if (currentShape.checkBottom()) {
    // console.log('is this the issue?', currentShape)
    currentShape.y += 1
    // console.log('is this the issue?', currentShape)
  } else {
    for (let k = 0; k < currentShape.template.length; k++) {
      for (let l = 0; l < currentShape.template.length; l++) {
        if (currentShape.template[k][l] == 0) continue
        gameMap[currentShape.getTruncedPosition().y + l][
          currentShape.getTruncedPosition().x + k
        ] = { imageX: currentShape.imageX, imageY: currentShape.imageY }
      }
    }
    //  console.log('currentShape?', currentShape)
    //  deleteCompleteRows()
    currentShape = nextShape
    nextShape = getRandomShape()
    if (!currentShape.checkBottom()) {
      gameOver = true
    }
    score += 100
  }
}

const drawRect = (x, y, width, height, color) => {
  ctx.fillStyle = color
  ctx.fillRect(x, y, width, height)
}

const drawBackground = () => {
  // console.log('drawBackground?') // this is calling way too often
  drawRect(0, 0, canvas.width, canvas.height, '#dfecf2')
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

const drawCurrentTetris = () => {
  for (let i = 0; i < currentShape.template.length; i++) {
    for (let j = 0; j < currentShape.template.length; j++) {
      if (currentShape.template[i][j] == 0) continue
      ctx.drawImage(
        image,
        currentShape.imageX,
        currentShape.imageY,
        imageSquareSize,
        imageSquareSize,
        Math.trunc(currentShape.x) * size * size * i,
        Math.trunc(currentShape.y) * size * size * j,
        size,
        size
      )
      //  console.log('draw', size)
    }
  }
}

let drawSquares = () => {
  for (let i = 0; i < gameMap.length; i++) {
    let t = gameMap[i]
    for (let j = 0; j < t.length; j++) {
      if (t[j].imageX == -1) continue
      ctx.drawImage(
        image,
        t[j].imageX,
        t[j].imageY,
        imageSquareSize,
        imageSquareSize,
        j * size,
        i * size,
        size,
        size
      )
    }
  }
}

const drawNextShape = () => {}

const drawScore = () => {}

const drawGameOver = () => {}

let draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBackground()
  drawSquares()
  drawCurrentTetris()
  drawNextShape()
  // drawScore()
  if (gameOver) {
    drawGameOver()
  }
}

let getRandomShape = () => {
  console.log(Object.create(shapes[Math.floor(Math.random() * shapes.length)]))
  return Object.create(shapes[Math.floor(Math.random() * shapes.length)])
}

const resetVars = () => {
  initialTwoDArr = []
  for (let i = 0; i < squareCountY; i++) {
    const temp = []
    for (let j = 0; j < squareCountX; j++) {
      temp.push({ imageX: -1, imageY: -1 })
    }
    initialTwoDArr.push(temp)
  }
  score = 0
  gameOver = false
  // var checkThis = getRandomShape()
  currentShape = getRandomShape() // getRandomShape()
  nextShape = getRandomShape()
  console.log('currentShape', currentShape)
  gameMap = initialTwoDArr
}

window.addEventListener('keydown', event => {
  console.log('key?', currentShape)
  if (event.key === 'ArrowLeft') currentShape.moveLeft()
  else if (event.key === 'ArrowUp') currentShape.changeRotation()
  else if (event.key === 'ArrowRight') currentShape.moveRight()
  else if (event.key === 'ArrowDown') currentShape.moveBottom()
})

resetVars()
gameLoop()

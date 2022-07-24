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

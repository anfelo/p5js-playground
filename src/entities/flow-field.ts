import { vector2SetMag, type Vector2 } from '@/utils/lalg'
import p5 from 'p5'

export class FlowField {
  resolution: number
  cols: number
  rows: number
  field: Vector2[][]

  private width: number
  private height: number

  private p: p5

  constructor(p: p5, r: number, width: number, height: number) {
    this.resolution = r
    this.cols = Math.floor(width / this.resolution)
    this.rows = Math.floor(height / this.resolution)
    this.width = width
    this.height = height

    this.field = new Array(this.cols)
    for (let i = 0; i < this.cols; i++) {
      this.field[i] = new Array(this.rows)
    }

    this.p = p

    this.init()
  }

  init() {
    this.p.noiseSeed(this.p.random(10000))
    let xoff = 0
    for (let i = 0; i < this.cols; i++) {
      let yoff = 0
      for (let j = 0; j < this.rows; j++) {
        const angle = this.p.map(this.p.noise(xoff, yoff), 0, 1, 0, this.p.TWO_PI)
        this.field[i][j] = p5.Vector.fromAngle(angle)
        yoff += 0.1
      }
      xoff += 0.1
    }
  }

  lookup(position: Vector2) {
    const col = this.p.constrain(Math.floor(position.x / this.resolution), 0, this.cols - 1)
    const row = this.p.constrain(Math.floor(position.y / this.resolution), 0, this.rows - 1)
    return { ...this.field[col][row] }
  }

  show() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        const w = this.width / this.cols
        const h = this.height / this.rows
        let v = { ...this.field[i][j] }
        v = vector2SetMag(v, w * 0.5)

        const x = i * w + w / 2
        const y = j * h + h / 2

        this.p.stroke(175)
        this.p.strokeWeight(1)
        this.p.line(x, y, x + v.x, y + v.y)
      }
    }
  }
}

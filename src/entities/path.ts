import { createVector2, type Vector2 } from '@/utils/lalg'
import type p5 from 'p5'

export class Path {
  radius: number
  start: Vector2
  end: Vector2

  private p: p5

  constructor(p: p5) {
    this.radius = 20
    this.p = p

    this.start = createVector2(0, p.height / 3)
    this.end = createVector2(p.width, (2 * p.height) / 3)
  }

  show() {
    this.p.strokeWeight(this.radius * 2)
    this.p.stroke(100, 100)
    this.p.line(this.start.x, this.start.y, this.end.x, this.end.y)
    this.p.strokeWeight(1)
    this.p.stroke(245)
    this.p.line(this.start.x, this.start.y, this.end.x, this.end.y)
  }
}

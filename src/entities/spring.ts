import type p5 from 'p5'
import {
  createVector2,
  vector2Mag,
  vector2SetMag,
  vector2Subtract,
  type Vector2,
} from '@/utils/lalg'
import { Body } from '@/entities/body'

export class Spring {
  private anchor: Vector2
  private restLength: number
  private k: number
  private p: p5

  constructor(p: p5, x: number, y: number, length: number) {
    this.anchor = createVector2(x, y)
    this.restLength = length
    this.k = 0.2
    this.p = p
  }

  connect(body: Body) {
    let force = vector2Subtract(body.position, this.anchor)
    const currentLength = vector2Mag(force)
    const stretch = currentLength - this.restLength
    force = vector2SetMag(force, -1 * this.k * stretch)

    body.applyForce(force)
  }

  show() {
    this.p.fill(127)
    this.p.circle(this.anchor.x, this.anchor.y, 10)
  }

  showLine(body: Body) {
    this.p.stroke(180)
    this.p.line(body.position.x, body.position.y, this.anchor.x, this.anchor.y)
  }
}

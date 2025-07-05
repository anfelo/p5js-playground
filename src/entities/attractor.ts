import p5 from 'p5'
import {
  createVector2,
  vector2Mag,
  vector2SetMag,
  vector2Subtract,
  type Vector2,
} from '@/utils/lalg'
import { Body } from '@/entities/body'

const G = 1.0

export class Attractor {
  position: Vector2
  mass: number

  private p: p5

  constructor(p: p5) {
    this.position = createVector2(p.width / 2, p.height / 2)
    this.p = p
    this.mass = 20
  }

  attract(body: Body) {
    let force = vector2Subtract(this.position, body.position)
    let distance = vector2Mag(force)
    distance = this.p.constrain(distance, 5, 25)

    const strength = (G * this.mass * body.mass) / (distance * distance)
    force = vector2SetMag(force, strength)
    return force
  }

  show() {
    this.p.stroke(0)
    this.p.fill(175, 200)
    this.p.circle(this.position.x, this.position.y, this.mass * 2)
  }
}

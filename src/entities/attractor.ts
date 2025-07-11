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

  p: p5

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

export class WalkableAttractor extends Attractor {
  tx: number
  ty: number

  constructor(p: p5) {
    super(p)
    this.tx = 0
    this.ty = 10000
  }

  step() {
    // With Perlin Noise
    const xstep = this.p.map(this.p.noise(this.tx), 0, 1, 0, this.p.width)
    const ystep = this.p.map(this.p.noise(this.ty), 0, 1, 0, this.p.height)

    this.position.x = xstep
    this.position.y = ystep

    this.tx += 0.01
    this.ty += 0.01
  }
}

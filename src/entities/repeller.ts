import type p5 from 'p5'
import {
  createVector2,
  vector2Mag,
  vector2SetMag,
  vector2Subtract,
  type Vector2,
} from '@/utils/lalg'
import type { Particle } from './particle'

export class Repeller {
  position: Vector2
  power = 150

  private p: p5

  constructor(p: p5, x: number, y: number) {
    this.position = createVector2(x, y)
    this.p = p
  }

  repel(particle: Particle) {
    let force = vector2Subtract(this.position, particle.position)

    let distance = vector2Mag(force)
    distance = this.p.constrain(distance, 5, 50)

    const strength = (-1 * this.power) / (distance * distance)
    force = vector2SetMag(force, strength)

    return force
  }

  show() {
    this.p.stroke(245)
    this.p.fill(127)
    this.p.circle(this.position.x, this.position.y, 32)
  }
}

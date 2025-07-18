import { createVector2, vector2Add, vector2ScalarMul, type Vector2 } from '@/utils/lalg'
import type p5 from 'p5'

export class Particle {
  position: Vector2
  velocity: Vector2
  acceleration: Vector2
  lifespan: number
  mass: number

  private p: p5

  constructor(p: p5, x: number, y: number) {
    this.position = createVector2(x, y)
    this.velocity = createVector2(p.random(-1, 1), p.random(-2, 0))
    this.acceleration = createVector2(0, 0)
    this.lifespan = 255.0
    this.mass = 1
    this.p = p
  }

  update() {
    this.velocity = vector2Add(this.velocity, this.acceleration)
    this.position = vector2Add(this.position, this.velocity)
    this.lifespan -= 2.0
    this.acceleration = vector2ScalarMul(this.acceleration, 0)
  }

  show() {
    this.p.stroke(245, this.lifespan)
    this.p.fill(0, this.lifespan)
    this.p.circle(this.position.x, this.position.y, 8)
  }

  applyForce(force: Vector2) {
    const f = vector2ScalarMul(force, 1 / this.mass)
    this.acceleration = vector2Add(this.acceleration, f)
  }

  run() {
    this.update()
    this.show()
  }

  isDead(): boolean {
    return this.lifespan < 0
  }
}

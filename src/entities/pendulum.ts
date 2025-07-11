import { createVector2, vector2Add, type Vector2 } from '@/utils/lalg'
import p5 from 'p5'

export class Pendulum {
  private p: p5
  private r: number

  private pivot: Vector2
  private bob: Vector2

  private angle: number
  private angleVelocity: number
  private angleAcceleration: number
  private damping: number
  private ballr: number

  constructor(p: p5, x: number, y: number, r: number) {
    this.p = p
    this.r = r

    this.pivot = createVector2(x, y)
    this.bob = createVector2(0, 0)
    this.angle = p.PI / 4
    this.angleVelocity = 0
    this.angleAcceleration = 0
    this.damping = 0.99
    this.ballr = 24
  }

  update() {
    const gravity = 0.4

    this.angleAcceleration = ((-1 * gravity) / this.r) * this.p.sin(this.angle)
    this.angleVelocity += this.angleAcceleration
    this.angle += this.angleVelocity
    this.angleVelocity *= this.damping

    this.bob.x = this.r * this.p.sin(this.angle)
    this.bob.y = this.r * this.p.cos(this.angle)
    this.bob = vector2Add(this.bob, this.pivot)
  }

  show() {
    this.p.stroke(245)
    this.p.line(this.pivot.x, this.pivot.y, this.bob.x, this.bob.y)
    this.p.fill(127)
    this.p.circle(this.bob.x, this.bob.y, this.ballr * 2)
  }
}

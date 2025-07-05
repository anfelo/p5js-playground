import p5 from 'p5'
import { createVector2, vector2Add, type Vector2 } from '@/utils/lalg'

export class Oscillator {
  private angle: Vector2
  private angleVelocity: Vector2
  private amplitude: Vector2

  private p: p5

  constructor(p: p5) {
    this.angle = createVector2(0, 0)
    this.angleVelocity = createVector2(p.random(-0.05, 0.05), p.random(-0.05, 0.05))
    this.amplitude = createVector2(p.random(20, p.width / 2), p.random(20, p.height / 2))

    this.p = p
  }

  update() {
    this.angle = vector2Add(this.angle, this.angleVelocity)
  }

  show() {
    const x = this.p.sin(this.angle.x) * this.amplitude.x
    const y = this.p.sin(this.angle.y) * this.amplitude.y

    this.p.push()
    this.p.translate(this.p.width / 2, this.p.height / 2)
    this.p.stroke(245)
    this.p.fill(127)
    this.p.line(0, 0, x, y)
    this.p.circle(x, y, 32)
    this.p.pop()
  }
}

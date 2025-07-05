import p5 from 'p5'
import {
  createVector2,
  vector2Add,
  vector2Limit,
  vector2Mag,
  vector2ScalarMul,
  vector2SetMag,
  vector2Subtract,
  type Vector2,
} from '@/utils/lalg'

const G = 1.0

export class Body {
  private acceleration: Vector2
  private size: number
  private angle: number
  private angleVelocity: number
  private angleAcceleration: number

  private p: p5
  private maxVelocity = 10

  mass: number
  velocity: Vector2
  position: Vector2

  constructor(p: p5, x: number, y: number, mass: number) {
    this.p = p
    this.position = createVector2(x, y)
    this.velocity = createVector2(0.0, 0.0)
    this.acceleration = createVector2(0.0, 0.0)
    this.mass = mass
    this.size = mass * 16

    this.angle = 0
    this.angleVelocity = 0
    this.angleAcceleration = 0.01
  }

  update() {
    this.velocity = vector2Add(this.velocity, this.acceleration)
    this.velocity = vector2Limit(this.velocity, this.maxVelocity)
    this.position = vector2Add(this.position, this.velocity)
    this.angleAcceleration = this.acceleration.x / 10.0
    this.angleVelocity += this.angleAcceleration
    this.angleVelocity = this.p.constrain(this.angleVelocity, -0.1, 0.1)
    this.angle += this.angleVelocity
    this.acceleration = vector2ScalarMul(this.acceleration, 0)
  }

  show() {
    this.p.stroke(245)
    this.p.strokeWeight(2)
    this.p.fill(127)

    this.p.push()

    this.p.translate(this.position.x, this.position.y)
    this.p.rotate(this.angle)

    this.p.circle(0, 0, this.size)
    this.p.line(0, 0, this.size / 2, 0)

    this.p.pop()
  }

  applyForce(force: Vector2) {
    // Newton's second law Acceleration = Force, but with force
    // accumulation, adding all input forces to acceleration
    const f = vector2ScalarMul(force, 1 / this.mass)
    this.acceleration = vector2Add(this.acceleration, f)
  }

  checkEdges() {
    if (this.position.x + this.size / 2 > this.p.width) {
      this.position.x = this.p.height - this.size / 2
      this.velocity.x *= -1
    } else if (this.position.x - this.size / 2 < 0) {
      this.position.x = this.size / 2
      this.velocity.x *= -1
    }

    if (this.position.y + this.size / 2 > this.p.width) {
      this.position.y = this.p.height - this.size / 2
      this.velocity.y *= -1
    } else if (this.position.y - this.size / 2 < 0) {
      this.position.y = this.size / 2
      this.velocity.y *= -1
    }
  }

  bounceEdges() {
    const bounce = -0.9
    if (this.position.y > this.p.height - this.size / 2) {
      this.position.y = this.p.height - this.size / 2
      this.velocity.y *= bounce
    }
  }

  contactEdge() {
    return this.position.y > this.p.height - this.size / 2 - 1
  }

  attract(body: Body) {
    let force = vector2Subtract(this.position, body.position)
    let distance = vector2Mag(force)
    distance = this.p.constrain(distance, 5, 25)

    const strength = (G * this.mass * body.mass) / (distance * distance)
    force = vector2SetMag(force, strength)
    return force
  }
}

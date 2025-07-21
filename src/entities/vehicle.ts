import p5 from 'p5'
import {
  createVector2,
  vector2Add,
  vector2Heading,
  vector2Limit,
  vector2ScalarMul,
  vector2SetMag,
  vector2Subtract,
  type Vector2,
} from '@/utils/lalg'

export class Vehicle {
  private p: p5
  private maxspeed: number
  private maxforce: number
  private r: number

  velocity: Vector2
  position: Vector2
  acceleration: Vector2

  constructor(p: p5, x: number, y: number) {
    this.p = p
    this.position = createVector2(x, y)
    this.velocity = createVector2(0.0, 0.0)
    this.acceleration = createVector2(0.0, 0.0)
    this.r = 6.0
    this.maxspeed = 8
    this.maxforce = 0.2
  }

  update() {
    this.velocity = vector2Add(this.velocity, this.acceleration)
    this.velocity = vector2Limit(this.velocity, this.maxspeed)
    this.position = vector2Add(this.position, this.velocity)
    this.acceleration = vector2ScalarMul(this.acceleration, 0)
  }

  applyForce(force: Vector2) {
    this.acceleration = vector2Add(this.acceleration, force)
  }

  seek(target: Vector2) {
    let desired = vector2Subtract(target, this.position)
    desired = vector2SetMag(desired, this.maxspeed)
    let steer = vector2Subtract(desired, this.velocity)
    steer = vector2Limit(steer, this.maxforce)
    this.applyForce(steer)
  }

  show() {
    const angle = vector2Heading(this.velocity)
    this.p.fill(127)
    this.p.stroke(245)

    this.p.push()
    this.p.translate(this.position.x, this.position.y)
    this.p.rotate(angle)
    this.p.beginShape()
    this.p.vertex(this.r * 2, 0)
    this.p.vertex(-this.r * 2, -this.r)
    this.p.vertex(-this.r * 2, this.r)
    this.p.endShape(this.p.CLOSE)
    this.p.pop()
  }
}

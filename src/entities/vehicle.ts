import p5 from 'p5'
import {
  createVector2,
  vector2Add,
  vector2Heading,
  vector2Limit,
  vector2Mag,
  vector2ScalarMul,
  vector2SetMag,
  vector2Subtract,
  type Vector2,
} from '@/utils/lalg'
import type { FlowField } from './flow-field'

export class Vehicle {
  private p: p5
  private maxspeed: number
  private maxforce: number
  private r: number

  velocity: Vector2
  position: Vector2
  acceleration: Vector2

  constructor(p: p5, x: number, y: number, ms: number, mf: number) {
    this.p = p
    this.position = createVector2(x, y)
    this.velocity = createVector2(0.0, 0.0)
    this.acceleration = createVector2(0.0, 0.0)
    this.r = 6.0
    this.maxspeed = ms
    this.maxforce = mf
  }

  update() {
    this.velocity = vector2Add(this.velocity, this.acceleration)
    this.velocity = vector2Limit(this.velocity, this.maxspeed)
    this.position = vector2Add(this.position, this.velocity)
    this.acceleration = vector2ScalarMul(this.acceleration, 0)
  }

  run() {
    this.update()
    this.borders()
    this.show()
  }

  applyForce(force: Vector2) {
    this.acceleration = vector2Add(this.acceleration, force)
  }

  // Wraparound
  borders() {
    if (this.position.x < -this.r) this.position.x = this.p.width + this.r
    if (this.position.y < -this.r) this.position.y = this.p.height + this.r
    if (this.position.x > this.p.width + this.r) this.position.x = -this.r
    if (this.position.y > this.p.height + this.r) this.position.y = -this.r
  }

  seek(target: Vector2) {
    let desired = vector2Subtract(target, this.position)
    const dMag = vector2Mag(desired)

    if (dMag < 100) {
      const m = this.p.map(dMag, 0, 100, 0, this.maxspeed)
      desired = vector2SetMag(desired, m)
    } else {
      desired = vector2SetMag(desired, this.maxspeed)
    }

    let steer = vector2Subtract(desired, this.velocity)
    steer = vector2Limit(steer, this.maxforce)
    this.applyForce(steer)
  }

  // Implementing Reynolds' flow field following algorithm
  // http://www.red3d.com/cwr/steer/FlowFollow.html
  follow(flow: FlowField) {
    // What is the vector at that spot in the flow field?
    let desired = flow.lookup(this.position)
    // Scale it up by maxspeed
    desired = vector2ScalarMul(desired, this.maxspeed)

    // Steering is desired minus velocity
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

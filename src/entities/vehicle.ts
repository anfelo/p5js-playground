import p5 from 'p5'
import {
  createVector2,
  vector2Add,
  vector2Copy,
  vector2Dist,
  vector2Dot,
  vector2Heading,
  vector2Limit,
  vector2Mag,
  vector2Normalize,
  vector2ScalarMul,
  vector2SetMag,
  vector2Subtract,
  type Vector2,
} from '@/utils/lalg'
import type { FlowField } from './flow-field'
import type { Path } from './path'

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

    if (dMag === 0) return

    desired = vector2Normalize(desired)
    desired = vector2ScalarMul(desired, this.maxspeed)

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

  followPath(path: Path) {
    let future = vector2Copy(this.velocity)
    future = vector2SetMag(future, 25)
    future = vector2Add(future, this.position)
    let target = null
    let worldRecord = Infinity

    for (let i = 0; i < path.points.length - 1; i++) {
      const a = path.points[i]
      const b = path.points[i + 1]
      let normalPoint = this.getNormalPoint(future, a, b)

      if (normalPoint.x < a.x || normalPoint.x > b.x) {
        normalPoint = vector2Copy(b)
      }

      const distance = vector2Dist(future, normalPoint)
      if (distance < worldRecord) {
        worldRecord = distance
        target = vector2Copy(normalPoint)

        let dir = vector2Subtract(b, a)
        dir = vector2SetMag(dir, 25)
        target = vector2Add(target, dir)
      }
    }

    if (worldRecord > path.radius && target !== null) {
      this.seek(target)
    }
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

  /**
   * Calculates the normal vector in the position between 2 poinsts a and b
   */
  private getNormalPoint(position: Vector2, a: Vector2, b: Vector2): Vector2 {
    const v1 = vector2Subtract(position, a)
    let v2 = vector2Subtract(b, a)
    v2 = vector2Normalize(v2)
    v2 = vector2ScalarMul(v2, vector2Dot(v1, v2))
    const normalPoint = vector2Add(a, v2)

    return normalPoint
  }
}

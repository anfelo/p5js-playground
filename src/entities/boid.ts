import p5 from 'p5'
import {
  createVector2,
  vector2Add,
  vector2Dist,
  vector2Heading,
  vector2Limit,
  vector2Mag,
  vector2Normalize,
  vector2ScalarMul,
  vector2SetMag,
  vector2Subtract,
  type Vector2,
} from '@/utils/lalg'

export class Boid {
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
    this.velocity = createVector2(p.random(-1, 1), p.random(-1, 1))
    this.acceleration = createVector2(0.0, 0.0)
    this.r = 3.0
    this.maxspeed = ms
    this.maxforce = mf
  }

  update() {
    this.velocity = vector2Add(this.velocity, this.acceleration)
    this.velocity = vector2Limit(this.velocity, this.maxspeed)
    this.position = vector2Add(this.position, this.velocity)
    this.acceleration = vector2ScalarMul(this.acceleration, 0)
  }

  run(boids: Boid[]) {
    this.flock(boids)
    this.update()
    this.borders()
    this.show()
  }

  applyForce(force: Vector2) {
    this.acceleration = vector2Add(this.acceleration, force)
  }

  applyBehaviors(vehicles: Boid[]) {
    this.separate(vehicles)
    this.seek(createVector2(this.p.mouseX, this.p.mouseY))
  }

  // Wraparound
  borders() {
    if (this.position.x < -this.r) this.position.x = this.p.width + this.r
    if (this.position.y < -this.r) this.position.y = this.p.height + this.r
    if (this.position.x > this.p.width + this.r) this.position.x = -this.r
    if (this.position.y > this.p.height + this.r) this.position.y = -this.r
  }

  seek(target: Vector2): Vector2 {
    let desired = vector2Subtract(target, this.position)
    const dMag = vector2Mag(desired)

    if (dMag === 0) return createVector2(0, 0)

    desired = vector2Normalize(desired)
    desired = vector2ScalarMul(desired, this.maxspeed)

    let steer = vector2Subtract(desired, this.velocity)
    steer = vector2Limit(steer, this.maxforce)

    return steer
  }

  separate(boids: Boid[]): Vector2 {
    const desiredSeparation = 25
    let steer = createVector2(0, 0)
    let count = 0
    // For every boid in the system, check if it's too close
    for (let i = 0; i < boids.length; i++) {
      const d = vector2Dist(this.position, boids[i].position)
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if (d > 0 && d < desiredSeparation) {
        // Calculate vector pointing away from neighbor
        let diff = vector2Subtract(this.position, boids[i].position)
        diff = vector2Normalize(diff)
        diff = vector2ScalarMul(diff, 1 / d)
        steer = vector2Add(steer, diff)
        count++ // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer = vector2ScalarMul(steer, 1 / count)
    }

    // As long as the vector is greater than 0
    if (vector2Mag(steer) > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer = vector2SetMag(steer, this.maxspeed)
      steer = vector2Subtract(steer, this.velocity)
      steer = vector2Limit(steer, this.maxforce)
    }
    return steer
  }

  align(boids: Boid[]): Vector2 {
    const neighborDistance = 50

    let sum = createVector2(0, 0)
    let steer = createVector2(0, 0)
    let count = 0

    for (let i = 0; i < boids.length; i++) {
      const d = vector2Dist(this.position, boids[i].position)
      if (d > 0 && d < neighborDistance) {
        sum = vector2Add(sum, boids[i].velocity)
        count++
      }
    }

    if (count > 0) {
      sum = vector2ScalarMul(sum, 1 / count)
      sum = vector2SetMag(sum, this.maxspeed)
      steer = vector2Subtract(sum, this.velocity)
      steer = vector2Limit(steer, this.maxforce)
    }

    return steer
  }

  cohere(boids: Boid[]): Vector2 {
    const neighborDistance = 50

    let sum = createVector2(0, 0)
    const seek = createVector2(0, 0)
    let count = 0

    for (const other of boids) {
      const d = vector2Dist(this.position, other.position)
      if (this != other && d < neighborDistance) {
        sum = vector2Add(sum, other.position)
        count++
      }
    }

    if (count > 0) {
      sum = vector2ScalarMul(sum, 1 / count)
      return this.seek(sum)
    }

    return seek
  }

  flock(boids: Boid[]) {
    let separation = this.separate(boids)
    let alignment = this.align(boids)
    let cohesion = this.cohere(boids)

    separation = vector2ScalarMul(separation, 1.5)
    alignment = vector2ScalarMul(alignment, 1.0)
    cohesion = vector2ScalarMul(cohesion, 1.0)

    this.applyForce(separation)
    this.applyForce(alignment)
    this.applyForce(cohesion)
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

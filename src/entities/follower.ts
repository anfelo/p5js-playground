import {
  createVector2,
  vector2Add,
  vector2Limit,
  vector2SetMag,
  vector2Subtract,
  type Vector2,
} from '@/utils/lalg'
import type p5 from 'p5'

export class Follower {
  position: Vector2
  velocity: Vector2
  acceleration: Vector2
  topspeed: number

  private p: p5

  constructor(p: p5, x: number, y: number) {
    this.position = createVector2(x, y)
    this.velocity = createVector2(0, 0)
    this.acceleration = createVector2(0, 0)
    this.topspeed = 5
    this.p = p
  }

  update() {
    const mouse = createVector2(this.p.mouseX, this.p.mouseY)
    // Step 1: Compute direction
    let dir = vector2Subtract(mouse, this.position)

    // Steps 2 and 3 could be combined into:
    dir = vector2SetMag(dir, 0.2)

    // Step 4: Accelerate
    this.acceleration = dir

    this.velocity = vector2Add(this.velocity, this.acceleration)
    this.velocity = vector2Limit(this.velocity, this.topspeed)
    this.position = vector2Add(this.position, this.velocity)
  }

  show() {
    this.p.stroke(245)
    this.p.strokeWeight(2)
    this.p.fill(127)
    this.p.circle(this.position.x, this.position.y, 48)
  }
}

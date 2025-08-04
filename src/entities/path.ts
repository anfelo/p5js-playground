import { createVector2, type Vector2 } from '@/utils/lalg'
import type p5 from 'p5'

export class Path {
  radius: number
  points: Vector2[]

  private p: p5

  constructor(p: p5) {
    this.radius = 20
    this.p = p

    this.points = []
  }

  addPoint(x: number, y: number) {
    const pathPoint = createVector2(x, y)
    this.points.push(pathPoint)
  }

  show() {
    this.p.stroke(100, 100)
    this.p.strokeWeight(this.radius * 2)
    this.p.noFill()
    this.p.beginShape()
    for (const point of this.points) {
      this.p.vertex(point.x, point.y)
    }
    this.p.endShape()
    this.p.stroke(245)
    this.p.strokeWeight(1)
    this.p.beginShape()
    for (const point of this.points) {
      this.p.vertex(point.x, point.y)
    }
    this.p.endShape()
  }
}

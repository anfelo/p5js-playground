import p5 from 'p5'
import { Body } from '@/entities/body'
import { vector2Copy, vector2Mag, vector2ScalarMul, vector2SetMag } from '@/utils/lalg'

export class Liquid {
  private x: number
  private y: number
  private w: number
  private h: number
  private c: number

  private p: p5

  constructor(p: p5, x: number, y: number, w: number, h: number, c: number) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.c = c
    this.p = p
  }

  show() {
    this.p.noStroke()
    this.p.fill(175)
    this.p.rect(this.x, this.y, this.w, this.h)
  }

  contains(body: Body) {
    const pos = body.position

    return pos.x > this.x && pos.x < this.x + this.w && pos.y > this.y && pos.y < this.y + this.h
  }

  calculateDrag(body: Body) {
    const speed = vector2Mag(body.velocity)
    const dragMagnitude = this.c * speed * speed
    let dragForce = vector2Copy(body.velocity)
    dragForce = vector2ScalarMul(dragForce, -1)
    dragForce = vector2SetMag(dragForce, dragMagnitude)

    return dragForce
  }
}
